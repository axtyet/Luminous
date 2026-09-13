import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import gRPC from "@nsnanocat/grpc";
import { Storage } from "@nsnanocat/util";
import database from "../src/function/database.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";
import { RegionListReply, RegionShortcutReq } from "../src/protobuf/bilibili/app/show/v1/mixture.js";

globalThis.$argument = {};
const storageFile = `/tmp/biliverse-enhanced-region-list-${process.pid}.json`;
Storage.dataFile = storageFile;

beforeEach(() => {
	writeFileSync(storageFile, "{}\n");
	Storage.data = null;
});

after(() => rmSync(storageFile, { force: true }));

test("RegionList config contains the captured entries and every custom tab", () => {
	const { RegionList } = database.Enhanced.Configs;
	const regionIds = RegionList.groups.flatMap(group => group.ids);
	const uniqueIds = new Set(regionIds);

	assert.equal(RegionList.groups.length, 4);
	assert.deepEqual(
		RegionList.groups.map(group => group.title),
		["默认分区", "推荐分区/服务", "港澳台分区/服务", "全部分区"],
	);
	assert.deepEqual(RegionList.groups.find(group => group.title === "默认分区").ids, RegionList.defaultShortcut);
	assert.deepEqual(RegionList.groups.find(group => group.title === "港澳台分区/服务").ids, ["774", "801", "884", "1028"]);
	assert.equal(regionIds.length, 57);
	assert.equal(uniqueIds.size, regionIds.length);
	assert.equal(Object.keys(RegionList.items).length, regionIds.length);
	for (const uniqueId of regionIds) {
		const item = RegionList.items[uniqueId];
		assert.ok(item, `${uniqueId} must exist in RegionList.items`);
		assert.equal(typeof item.tab_id, "string");
		assert.ok(!("tab" in item));
	}
	assert.deepEqual(database.Enhanced.Settings.Home.Tab, RegionList.defaultShortcut);
	assert.equal(RegionList.items["774"].title, "动画（港澳台）");
	assert.equal(RegionList.items["801"].title, "韩综（港澳台）");
	assert.deepEqual({ title: RegionList.items["884"].title, url: RegionList.items["884"].url, tab_id: RegionList.items["884"].tab_id }, { title: "节目", url: "bilibili://following/home_bottom_tab_activity_tab/168312", tab_id: "ogv" });
	assert.deepEqual({ title: RegionList.items["1028"].title, url: RegionList.items["1028"].url, tab_id: RegionList.items["1028"].tab_id }, { title: "我的NFT", url: "https://www.bilibili.com/h5/pangu/gat?navhide=1", tab_id: "1028" });
});

test("RegionList response keeps online entries and applies the configured section order", async () => {
	const online = RegionListReply.create({
		shortcut: {
			title: "快捷访问",
			icons: [{ img: "online.png", title: "线上快捷访问", url: "bilibili://online", uniqueId: "774", rid: "774" }],
		},
		contents: [
			{
				title: "全部分区",
				icons: [{ img: "online.png", title: "番剧", url: "bilibili://online", uniqueId: "13", rid: "13" }],
			},
		],
	});
	const response = await Response(
		{
			url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionList",
			headers: { "User-Agent": "bili-inter/1" },
		},
		{
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(RegionListReply.toBinary(online)),
		},
	);
	const result = RegionListReply.fromBinary(gRPC.decode(response.body));
	const icons = result.contents.flatMap(content => content.icons);

	assert.deepEqual(
		result.contents.map(content => content.title),
		["默认分区", "推荐分区/服务", "港澳台分区/服务", "全部分区"],
	);
	assert.equal(result.shortcut.title, "自定义标签页");
	assert.equal(icons.length, 57);
	assert.equal(icons.filter(icon => icon.uniqueId === "13").length, 1);
	assert.equal(icons.find(icon => icon.uniqueId === "13").url, "bilibili://online");
	assert.ok(icons.some(icon => icon.uniqueId === "774" && icon.title === "动画（港澳台）"));
	assert.ok(icons.some(icon => icon.uniqueId === "801" && icon.title === "韩综（港澳台）"));
	assert.ok(icons.some(icon => icon.uniqueId === "884" && icon.title === "节目"));
	assert.ok(icons.some(icon => icon.uniqueId === "1028" && icon.title === "我的NFT"));
	assert.deepEqual(
		result.shortcut.icons.map(icon => icon.uniqueId),
		["2036", "2037", "780", "545", "151"],
	);
});

test("empty RegionList shortcut uses the Enhanced default tabs", async () => {
	const response = await runRegionList(RegionListReply.create({ contents: [] }));
	const result = RegionListReply.fromBinary(gRPC.decode(response.body));
	const shortcutIds = result.shortcut.icons.map(icon => icon.uniqueId);

	assert.equal(result.shortcut.title, "自定义标签页");
	assert.deepEqual(shortcutIds, ["2036", "2037", "780", "545", "151"]);
	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Settings", {}), {});
});

test("RegionShortcut request is consumed locally and returns an empty gRPC response", async () => {
	const { $response } = await Request({
		method: "POST",
		url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["801", "999999", "774", "65552"] })),
	});

	assert.deepEqual($response.headers, { "Content-Type": "application/grpc" });
	assert.deepEqual(gRPC.decode($response.body), new Uint8Array());
	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Settings", {}).Home.Tab, ["801", "999999", "774", "65552"]);
	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Caches", {}), {});
});

test("empty RegionShortcut request remains empty", async () => {
	await Request({
		method: "POST",
		url: "https://app.bilibili.com/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: [] })),
	});

	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Settings", {}).Home.Tab, []);
});

test("RegionShortcut clear sentinel keeps shortcuts and home tabs empty", async () => {
	await Request({
		method: "POST",
		url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["0"] })),
	});
	const regionListResponse = await runRegionList(RegionListReply.create({ contents: [] }));
	const regionList = RegionListReply.fromBinary(gRPC.decode(regionListResponse.body));
	const homeResponse = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const tabs = JSON.parse(homeResponse.body).data.tab;

	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Settings", {}).Home.Tab, ["0"]);
	assert.deepEqual(regionList.shortcut.icons, []);
	assert.deepEqual(tabs, []);
});

test("RegionShortcut setting is used to build both shortcut icons and home tabs", async () => {
	await Request({
		method: "POST",
		url: "https://app.bilibili.com/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["1028", "884", "801", "774", "65552"] })),
	});
	const regionListResponse = await runRegionList(RegionListReply.create({ contents: [] }));
	const regionList = RegionListReply.fromBinary(gRPC.decode(regionListResponse.body));
	const response = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const tabs = JSON.parse(response.body).data.tab;

	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Settings", {}).Home.Tab, ["1028", "884", "801", "774", "65552"]);
	assert.deepEqual(Storage.getItem("@BiliBili.Enhanced.Caches", {}), {});
	assert.deepEqual(
		regionList.shortcut.icons.map(icon => icon.uniqueId),
		["1028", "884", "801", "774", "65552"],
	);
	assert.deepEqual(
		tabs.map(tab => tab.id),
		[1028, 884, 801, 774, 65552],
	);
	assert.deepEqual(
		tabs.map(tab => tab.name),
		["我的NFT", "节目", "韩综（港澳台）", "动画（港澳台）", "全区排行榜"],
	);
	assert.deepEqual(
		tabs.map(tab => tab.pos),
		[1, 2, 3, 4, 5],
	);
});

function runRegionList(body) {
	return Response(
		{
			url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionList",
			headers: { "User-Agent": "bili-inter/1" },
		},
		{
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(RegionListReply.toBinary(body)),
		},
	);
}
