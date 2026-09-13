import assert from "node:assert/strict";
import test from "node:test";
import HonoWorkerAdapter from "../src/class/HonoWorkerAdapter.mjs";
import { Request } from "../src/process/Request.mjs";
import { Response } from "../src/process/Response.mjs";

test("rewrites Pages and Workers paths to the original upstream host", () => {
	const pages = HonoWorkerAdapter.routeRewrite(new URL("https://global-3xw.pages.dev/api.bilibili.com/x/v2/search"), "api.bilibili.com/x/v2/search");
	assert.equal(pages.toString(), "https://api.bilibili.com/x/v2/search");

	const workers = HonoWorkerAdapter.routeRewrite(new URL("https://global.nanocat.workers.dev/grpc.biliapi.net/bilibili.app.viewunite.v1.View/View"), "grpc.biliapi.net/bilibili.app.viewunite.v1.View/View");
	assert.equal(workers.toString(), "https://grpc.biliapi.net/bilibili.app.viewunite.v1.View/View");
});

test("parses transport arguments and removes module query settings", () => {
	const request = {
		url: "https://api.bilibili.com/x/unknown?Locales=CHN,HKG&ForceHost=1&foo=bar",
		headers: {},
	};
	HonoWorkerAdapter.buildArgument(request);
	assert.deepEqual(globalThis.$argument, { Locales: "CHN,HKG", ForceHost: "1", foo: "bar" });
	assert.equal(request.url, "https://api.bilibili.com/x/unknown?foo=bar");
});

test("keeps unmatched requests and responses unchanged", async () => {
	HonoWorkerAdapter.buildArgument({
		url: "https://api.bilibili.com/x/unknown",
		headers: { "biliverse-args": "Storage=Argument&LogLevel=OFF" },
	});
	const request = { method: "GET", url: "https://api.bilibili.com/x/unknown", headers: {} };
	const requestResult = await Request(request);
	assert.equal(requestResult.$request, request);
	assert.equal(requestResult.$response, undefined);

	const response = { status: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ code: 0, data: { sentinel: true } }) };
	const responseResult = await Response(request, response);
	assert.equal(responseResult, response);
	assert.deepEqual(JSON.parse(responseResult.body), { code: 0, data: { sentinel: true } });
});
