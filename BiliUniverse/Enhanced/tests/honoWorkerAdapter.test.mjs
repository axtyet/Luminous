import assert from "node:assert/strict";
import { rmSync, writeFileSync } from "node:fs";
import { after, beforeEach, test } from "node:test";
import { RegionShortcutReq } from "@biliverse/protobuf/bilibili/app/show/v1/mixture.js";
import gRPC from "@nsnanocat/grpc";
import { Storage } from "@nsnanocat/util";
import HonoWorkerAdapter from "../src/class/HonoWorkerAdapter.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";

const storageFile = `/tmp/biliverse-enhanced-hono-worker-${process.pid}.json`;
Storage.dataFile = storageFile;

beforeEach(() => {
	writeFileSync(storageFile, "{}\n");
	Storage.data = null;
	globalThis.$argument = {};
});

after(() => rmSync(storageFile, { force: true }));

test("rewrites Pages and Workers paths to the original upstream host", () => {
	const pages = HonoWorkerAdapter.routeRewrite(new URL("https://enhanced-cdt.pages.dev/app.bilibili.com/x/resource/show/tab/v2"), "app.bilibili.com/x/resource/show/tab/v2");
	assert.equal(pages.toString(), "https://app.bilibili.com/x/resource/show/tab/v2");

	const workers = HonoWorkerAdapter.routeRewrite(new URL("https://enhanced.nanocat.workers.dev/app.biliapi.net/x/v2/account/mine"), "app.biliapi.net/x/v2/account/mine");
	assert.equal(workers.toString(), "https://app.biliapi.net/x/v2/account/mine");
});

test("extracts module arguments from the transport header", () => {
	const request = {
		url: "https://app.bilibili.com/x/resource/show/tab/v2",
		headers: { "biliverse-args": "Home.Switch=false" },
	};
	HonoWorkerAdapter.buildArgument(request);
	assert.deepEqual(globalThis.$argument, { Home: { Switch: "false" } });
	assert.deepEqual(request.headers, {});
});

test("removes module settings from the upstream query", () => {
	const request = {
		url: "https://app.bilibili.com/x/resource/show/tab/v2?Home.Switch=false&Mine.Switch=false&foo=bar",
		headers: {},
	};
	HonoWorkerAdapter.buildArgument(request);
	assert.deepEqual(globalThis.$argument, { Home: { Switch: "false" }, Mine: { Switch: "false" }, foo: "bar" });
	assert.equal(request.url, "https://app.bilibili.com/x/resource/show/tab/v2?foo=bar");
});

test("returns an unchanged response when the matching feature is disabled", async () => {
	HonoWorkerAdapter.buildArgument({
		url: "https://app.bilibili.com/x/resource/show/tab/v2",
		headers: { "biliverse-args": "Home.Switch=false&LogLevel=OFF" },
	});
	const response = {
		status: 200,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ code: 0, message: "0", data: { sentinel: true } }),
	};
	const result = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2" }, response);
	assert.equal(result, response);
	assert.deepEqual(JSON.parse(result.body), { code: 0, message: "0", data: { sentinel: true } });
});

test("returns a fully local Tab response during request processing", async () => {
	HonoWorkerAdapter.buildArgument({
		url: "https://app.bilibili.com/x/resource/show/tab/v2",
		headers: { "biliverse-args": "Home.Switch=true&LogLevel=OFF" },
	});
	const { $response } = await Request({ method: "GET", url: "https://app.bilibili.com/x/resource/show/tab/v2", headers: {} });
	const body = JSON.parse($response.body);

	assert.equal($response.status, undefined);
	assert.equal(body.config.popup_style, 1);
	assert.equal(body.config.search_entrance, 5);
	assert.equal(body.config.tab_simplify, false);
	assert.deepEqual(
		body.data.tab.map(item => item.id),
		[2036, 2037, 780, 545, 151],
	);
	assert.deepEqual(
		body.data.bottom.map(item => item.id),
		["home", "dynamic", "ogv", "mall", "mine"],
	);
	assert.ok(body.data.tab.every(item => typeof item.id === "number"));
});

test("writes the local RegionShortcut trailers-only response through Hono", async () => {
	const written = { headers: {} };
	const context = {
		header(name, value) {
			written.headers[name] = value;
		},
		status(value) {
			written.status = value;
		},
		body(value) {
			written.body = value;
			return written;
		},
	};
	const { $response } = await Request({
		method: "POST",
		url: "https://app.biliapi.net/bilibili.app.show.v1.Mixture/RegionShortcut",
		headers: { "Content-Type": "application/grpc" },
		body: gRPC.encode(RegionShortcutReq.toBinary({ uniqueId: ["13", "774"] })),
	});
	const result = HonoWorkerAdapter.writeResponse(context, $response);

	assert.equal(result.status, 200);
	assert.deepEqual(result.headers, {
		"Content-Type": "application/grpc",
		"grpc-status": "0",
		"grpc-message": "",
		"bili-status-code": "0",
	});
	assert.equal(result.body, null);
});

test("uses semantic IDs for top and bottom response filtering", async () => {
	HonoWorkerAdapter.buildArgument({
		url: "https://app.bilibili.com/x/resource/show/tab/v2",
		headers: {
			"biliverse-args": "Home.Switch=true&Home.Top=messages&Home.Top_more=categories,search&Bottom=home,dynamic,ogv,mall,mine&LogLevel=OFF",
		},
	});
	const response = {
		status: 200,
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ code: 0, message: "0", data: {} }),
	};
	const result = await Response({ url: "https://app.bilibili.com/x/resource/show/tab/v2" }, response);
	const body = JSON.parse(result.body);

	assert.deepEqual(
		body.data.top.map(item => item.id),
		["messages"],
	);
	assert.deepEqual(
		body.data.top_more.map(item => item.id),
		["categories", "search"],
	);
	assert.deepEqual(
		body.data.bottom.map(item => item.id),
		["home", "dynamic", "ogv", "mall", "mine"],
	);
});
