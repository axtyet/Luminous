import assert from "node:assert/strict";
import test from "node:test";
import HonoWorkerAdapter from "../src/class/HonoWorkerAdapter.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";

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
