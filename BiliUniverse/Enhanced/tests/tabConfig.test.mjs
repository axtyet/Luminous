import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import database from "../src/function/database.mjs";

const tabConfig = database.Enhanced.Configs.Tab;
const regionList = database.Enhanced.Configs.RegionList;
const regionPages = Object.entries(regionList.items).map(([id, item]) => ({ id, uri: item.url }));
const readableTabPages = ["top", "bottom", "top_more"].flatMap(group => tabConfig[group]);
const tabPages = [...regionPages, ...readableTabPages];
const tabEntries = [...readableTabPages, ...tabConfig.bottom.flatMap(item => item.dialog_items ?? [])];

test("Tab page IDs are readable and uniquely assigned by URI", () => {
	const uriById = new Map();
	const idByUri = new Map();

	for (const page of tabEntries) {
		assert.match(page.id, /^[a-z][a-z0-9_]*$/, `${page.uri} must use a readable ID`);

		if (uriById.has(page.id)) assert.equal(uriById.get(page.id), page.uri, `ID ${page.id} cannot identify multiple URIs`);
		else uriById.set(page.id, page.uri);

		if (idByUri.has(page.uri)) assert.equal(idByUri.get(page.uri), page.id, `${page.uri} must always use one ID`);
		else idByUri.set(page.uri, page.id);
	}

	assert.equal(uriById.size, idByUri.size);
});

test("Tab configuration contains every URI shared by domestic and international clients", () => {
	const configuredURIs = new Set(tabPages.map(page => page.uri));
	const sharedURIs = ["bilibili://live/home", "bilibili://pegasus/promo", "bilibili://pegasus/hottopic", "bilibili://pgc/home", "bilibili://main/home/", "bilibili://pegasus/channel/", "bilibili://following/home/", "bilibili://user_center/", "bilibili://link/im_home", "bilibili://main/top_category"];

	for (const uri of sharedURIs) assert.ok(configuredURIs.has(uri), `${uri} must be configurable`);
});

test("Default settings reference configured page IDs", () => {
	const { Settings, Configs } = database.Enhanced;
	const ids = {
		tab: new Set(Object.keys(Configs.RegionList.items)),
		top: new Set(Configs.Tab.top.map(item => item.id)),
		top_more: new Set(Configs.Tab.top_more.map(item => item.id)),
		bottom: new Set(Configs.Tab.bottom.map(item => item.id)),
	};

	for (const uniqueId of Settings.Home.Tab) assert.ok(Configs.RegionList.items[uniqueId]);
	assert.deepEqual(Settings.Home.Tab, Configs.RegionList.defaultShortcut);
	for (const id of Settings.Home.Top) assert.ok(ids.top.has(id));
	for (const id of Settings.Home.Top_more) assert.ok(ids.top_more.has(id));
	for (const id of Settings.Bottom) assert.ok(ids.bottom.has(id));
	assert.ok(ids.tab.has(Settings.Home.Tab_default));
});

test("Every RegionList ID maps directly to one configured Tab", () => {
	const { RegionList, Tab } = database.Enhanced.Configs;
	const regionIds = RegionList.groups.flatMap(group => group.ids);
	const itemIds = Object.keys(RegionList.items);

	assert.deepEqual(new Set(itemIds), new Set(regionIds));
	assert.ok(!("tab" in Tab));
});

test("Tab endpoint uses response scripts in every platform template", () => {
	const templates = ["surge.handlebars", "surge.dev.handlebars", "loon.handlebars", "loon.dev.handlebars", "quantumultx.handlebars", "quantumultx.dev.handlebars", "shadowrocket.handlebars", "stash.handlebars", "stash.dev.handlebars"];

	for (const template of templates) {
		const content = readFileSync(new URL(`../template/${template}`, import.meta.url), "utf8");
		const lines = content.split("\n");
		const index = lines.findIndex(line => line.includes("/x\\/resource\\/show\\/tab\\/v2"));
		assert.notEqual(index, -1, `${template} must contain the Tab endpoint`);
		const block = lines.slice(index, template.startsWith("stash") ? index + 4 : index + 1).join("\n");
		if (template.startsWith("quantumultx")) assert.match(block, /script-response-body/);
		else assert.match(block, /http-response|type: response/);
		assert.match(template.startsWith("stash") ? content : block, /response\.bundle|response\.dev\.bundle/);
		assert.doesNotMatch(block, /request\.bundle|request\.dev\.bundle|script-echo-response|http-request|type: request/);
	}
});

test("RegionShortcut uses only the request script while RegionList stays response-only", () => {
	const templates = ["surge.handlebars", "surge.dev.handlebars", "loon.handlebars", "loon.dev.handlebars", "quantumultx.handlebars", "quantumultx.dev.handlebars", "shadowrocket.handlebars", "stash.handlebars", "stash.dev.handlebars"];

	for (const template of templates) {
		const content = readFileSync(new URL(`../template/${template}`, import.meta.url), "utf8");
		const lines = content.split("\n");
		const responseIndex = lines.findIndex(line => line.includes("Mixture") && line.includes("RegionList$"));
		const requestIndex = lines.findIndex(line => line.includes("Mixture") && line.includes("RegionShortcut$") && !line.includes("RegionList$"));
		assert.notEqual(responseIndex, -1, `${template} must contain the Mixture response endpoints`);
		assert.notEqual(requestIndex, -1, `${template} must contain the RegionShortcut request endpoint`);
		const responseBlock = lines.slice(responseIndex, responseIndex + 6).join("\n");
		const requestBlock = lines.slice(requestIndex, requestIndex + 6).join("\n");
		assert.match(responseBlock, /response/, `${template} must use the response script`);
		assert.match(requestBlock, /request/, `${template} must use the request script for RegionShortcut`);
		assert.match(template.startsWith("stash") ? content : requestBlock, /request(\.dev)?\.bundle/, `${template} must reference the Enhanced request bundle`);
		assert.match(requestBlock, /\(grpc\|app\)/, `${template} must intercept both RegionShortcut hosts`);
		assert.ok(!lines.some(line => line.includes("Mixture") && line.includes("(RegionList|RegionShortcut)")), `${template} must not combine RegionList and RegionShortcut response matching`);
		assert.match(content, /grpc\.biliapi\.net/);
	}

	for (const script of ["Response.mjs", "Response.dev.mjs"]) {
		const content = readFileSync(new URL(`../src/process/${script}`, import.meta.url), "utf8");
		assert.match(content, /case "\/bilibili\.app\.show\.v1\.Mixture\/RegionList"/);
		assert.doesNotMatch(content, /case "\/bilibili\.app\.show\.v1\.Mixture\/RegionShortcut"/);
	}

	for (const script of ["Request.mjs", "Request.dev.mjs"]) {
		const content = readFileSync(new URL(`../src/process/${script}`, import.meta.url), "utf8");
		assert.match(content, /case "\/bilibili\.app\.show\.v1\.Mixture\/RegionShortcut"/);
		assert.doesNotMatch(content, /case "\/bilibili\.app\.show\.v1\.Mixture\/RegionList"/);
	}
});

test("BoxJS no longer exposes the Home.Tab checkbox", () => {
	const settings = JSON.parse(readFileSync(new URL("../template/boxjs.settings.json", import.meta.url), "utf8"));
	assert.ok(!settings.some(setting => setting.id === "@BiliBili.Enhanced.Settings.Home.Tab"));
	assert.ok(settings.some(setting => setting.id === "@BiliBili.Enhanced.Settings.Home.Tab_default"));
});
