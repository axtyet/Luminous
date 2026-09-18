import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import { RegionListReply, RegionShortcutReq } from "@biliverse/protobuf/bilibili/app/show/v1/mixture.js";
import gRPC from "@nsnanocat/grpc";
import { Storage } from "@nsnanocat/util";
import Region from "../src/class/Region.mjs";
import database from "../src/function/database.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";

globalThis.$argument = {};
const storageFile = `/tmp/biliverse-enhanced-region-list-${process.pid}.json`;
Storage.dataFile = storageFile;

beforeEach(() => {
	writeFileSync(storageFile, "{}\n");
	Storage.data = null;
	globalThis.$argument = {};
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
	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}), {});
});

test("RegionShortcut is consumed locally with a trailers-only gRPC success response on every observed host", async () => {
	const uniqueIds = ["801", "999999", "774", "65552"];
	for (const hostname of ["grpc.biliapi.net", "app.bilibili.com", "app.biliapi.net"]) {
		const { $response } = await Request({
			method: "POST",
			url: `https://${hostname}/bilibili.app.show.v1.Mixture/RegionShortcut`,
			headers: { "Content-Type": "application/grpc" },
			body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: uniqueIds })),
		});

		assert.equal($response.status, 200);
		assert.deepEqual($response.headers, {
			"Content-Type": "application/grpc",
			"grpc-status": "0",
			"grpc-message": "",
			"bili-status-code": "0",
		});
		assert.equal($response.body, undefined);
		assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}).Home.Tab, uniqueIds);
		assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Caches", {}), {});
	}
});

test("empty RegionShortcut request remains empty", async () => {
	await Request({
		method: "POST",
		url: "https://app.bilibili.com/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: [] })),
	});

	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}).Home.Tab, []);
});

test("RegionShortcut creates the Home path when settings are empty", () => {
	const settings = {};
	Region.saveShortcuts(
		{
			body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["1028", "884"] })),
		},
		settings,
	);

	assert.deepEqual(settings, { Home: { Tab: ["1028", "884"] } });
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

	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}).Home.Tab, ["0"]);
	assert.deepEqual(regionList.shortcut.icons, []);
	assert.deepEqual(tabs, []);
});

test("Biliverse entry remains available when Mine customization is disabled", async () => {
	globalThis.$argument = { Mine: { Switch: "false", iPad: { Switch: "false" } } };
	const settings = { id: 410, title: "设置", uri: "bilibili://user_center/setting" };
	const phoneResponse = await Response({ url: "https://app.bilibili.com/x/v2/account/mine", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: { sections_v2: [{ title: "更多服务", items: [settings, { id: 411 }] }] } }) });
	const iPadResponse = await Response({ url: "https://app.bilibili.com/x/v2/account/mine/ipad", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: { ipad_more_sections: [{ ...settings, id: 798 }, { id: 1070 }] } }) });
	const phoneData = JSON.parse(phoneResponse.body).data;
	const iPadData = JSON.parse(iPadResponse.body).data;

	assert.deepEqual(
		phoneData.sections_v2[0].items.map(item => item.id),
		[410, 129515498, 411],
	);
	assert.deepEqual(
		iPadData.ipad_more_sections.map(item => item.id),
		[798, 129515498, 1070],
	);
});

test("Biliverse entry remains unique and follows the current settings entry", async () => {
	globalThis.$argument = { Storage: "PersistentStore", LogLevel: "OFF" };
	Storage.setItem("@Biliverse.Enhanced.Settings", {
		Mine: {
			Switch: "true",
			Shortcuts: ["494", "495", "4001", "3084"],
			CreatorCenter: [],
			Recommend: ["3994"],
			More: ["4021", "4022", "1028"],
			iPad: { Switch: "true", Upper: [], Recommend: [], More: ["797", "1070"] },
		},
	});
	const phoneResponse = await Response({ url: "https://app.bilibili.com/x/v2/account/mine", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const iPadResponse = await Response({ url: "https://app.bilibili.com/x/v2/account/mine/ipad", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const phoneData = JSON.parse(phoneResponse.body).data;
	const iPadData = JSON.parse(iPadResponse.body).data;
	const phoneItems = phoneData.sections_v2.flatMap(section => section.items);
	const more = phoneData.sections_v2.find(section => section.title === "更多服务");

	assert.ok(phoneData.sections_v2.every(section => Array.isArray(section.items) && section.items.length > 0));
	assert.deepEqual(
		more.items.map(item => item.id),
		[4021, 4022, 129515498, 1028],
	);
	assert.equal(phoneItems.filter(item => item.id === 129515498).length, 1);
	assert.deepEqual(
		iPadData.ipad_more_sections.map(item => item.id),
		[797, 1070, 129515498],
	);
});

test("JSON responses create missing data paths from configured selections", async () => {
	globalThis.$argument = { Storage: "PersistentStore", LogLevel: "OFF" };
	Storage.setItem("@Biliverse.Enhanced.Settings", {
		Home: { Switch: true, Top: ["mall"], Top_more: ["search"], Tab: ["1028"], Tab_default: "1028" },
		Bottom: ["messages"],
		Mine: { Switch: true, Shortcuts: [], CreatorCenter: [], Recommend: [], More: ["741"] },
		Region: { Switch: true, Index: ["1"] },
	});
	const response = { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0 }) };
	const tab = JSON.parse((await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} }, { ...response })).body).data;
	const mine = JSON.parse((await Response({ url: "https://app.bilibili.com/x/v2/account/mine", headers: {} }, { ...response })).body).data;
	const region = JSON.parse((await Response({ url: "https://app.bilibili.com/x/v2/region/index", headers: {} }, { ...response })).body).data;

	assert.deepEqual(
		tab.top.map(({ id }) => id),
		["mall"],
	);
	assert.deepEqual(
		tab.top_more.map(({ id }) => id),
		["search"],
	);
	assert.deepEqual(
		tab.tab.map(({ id }) => id),
		[1028],
	);
	assert.deepEqual(
		tab.bottom.map(({ id }) => id),
		["messages"],
	);
	assert.deepEqual(
		mine.sections_v2.find(({ title }) => title === "更多服务").items.map(({ id }) => id),
		[741, 129515498],
	);
	assert.deepEqual(
		region.map(({ tid }) => tid),
		[1],
	);
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

	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}).Home.Tab, ["1028", "884", "801", "774", "65552"]);
	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Caches", {}), {});
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

test("saved RegionShortcut tabs override module argument defaults in later responses", async () => {
	globalThis.$argument = {
		Storage: "Argument",
		Home: { Tab: ["2036", "2037", "780", "545", "151"] },
		LogLevel: "OFF",
	};
	const uniqueIds = ["1028", "884", "801", "774"];
	await Request({
		method: "POST",
		url: "https://grpc.biliapi.net/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: uniqueIds })),
	});
	const regionListResponse = await runRegionList(RegionListReply.create({ contents: [] }));
	const regionList = RegionListReply.fromBinary(gRPC.decode(regionListResponse.body));
	const homeResponse = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} }, { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: {} }) });
	const tabs = JSON.parse(homeResponse.body).data.tab;

	assert.deepEqual(Storage.getItem("@Biliverse.Enhanced.Settings", {}).Home.Tab, uniqueIds);
	assert.deepEqual(
		regionList.shortcut.icons.map(icon => icon.uniqueId),
		uniqueIds,
	);
	assert.deepEqual(
		tabs.map(tab => String(tab.id)),
		uniqueIds,
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
