import assert from "node:assert/strict";
import test from "node:test";
import { addSettingsEntry } from "../src/function/settingsEntry.mjs";

const uri = "bilibili://web/general?url=https%3A%2F%2Fapp.bilibili.com%2Fsettings%2F";
const settings = { id: 410, title: "设置", uri: "bilibili://user_center/setting" };

test("migrates old entries below settings using the explicit iOS common container route", () => {
	const data = {
		sections_v2: [
			{ title: "推荐服务", items: [{ uri: "https://biliverse.github.io/settings/" }, { uri: "https://app.bilibili.com/settings/?navhide=1" }] },
			{ title: "更多服务", items: [settings, { id: 411 }] },
		],
	};
	addSettingsEntry(data);
	assert.deepEqual(data.sections_v2[0].items, []);
	const entry = data.sections_v2[1].items[1];
	assert.equal(entry.title, "Biliverse 哔哩万象");
	assert.equal(entry.uri, uri);
	const target = new URL(entry.uri);
	assert.equal(target.host + target.pathname, "web/general");
	assert.equal(target.searchParams.get("url"), "https://app.bilibili.com/settings/");
	assert.deepEqual([...target.searchParams.keys()], ["url"]);
});

test("moves an existing entry below settings without changing the shortcut row", () => {
	const shortcuts = [{ id: 396 }, { id: 397 }, { id: 398 }, { id: 399 }];
	const data = { sections_v2: [{ items: structuredClone(shortcuts) }, { title: "推荐服务", style: 1, items: [{ uri }] }, { title: "更多服务", items: [settings, { id: 411 }] }] };
	addSettingsEntry(data);
	addSettingsEntry(data);
	assert.deepEqual(data.sections_v2[0].items, shortcuts);
	assert.deepEqual(data.sections_v2[1].items, []);
	assert.equal(data.sections_v2[2].items[0], settings);
	assert.equal(data.sections_v2[2].items[1].uri, uri);
	assert.equal(data.sections_v2[2].items[2].id, 411);
});

test("does not invent another placement when settings is absent", () => {
	const data = {
		sections_v2: [
			{ title: "推荐服务", items: [{ uri }] },
			{ title: "更多服务", items: [{ id: 411 }] },
		],
	};
	addSettingsEntry(data);
	assert.deepEqual(data.sections_v2, [
		{ title: "推荐服务", items: [] },
		{ title: "更多服务", items: [{ id: 411 }] },
	]);
});

test("iPad moves the entry below settings in the more-services list", () => {
	const ipadSettings = { ...settings, id: 798 };
	const data = { ipad_recommend_sections: [{ uri }], ipad_more_sections: [ipadSettings, { id: 1070 }] };
	addSettingsEntry(data, true);
	addSettingsEntry(data, true);
	assert.deepEqual(data.ipad_recommend_sections, []);
	assert.equal(data.ipad_more_sections[0], ipadSettings);
	assert.equal(data.ipad_more_sections[1].title, "Biliverse 哔哩万象");
	assert.equal(data.ipad_more_sections[1].uri, uri);
	assert.equal(data.ipad_more_sections[2].id, 1070);
});

test("leaves other common-container entries intact", () => {
	const other = { uri: "bilibili://web/general?url=https%3A%2F%2Fwww.bilibili.com%2Fh5%2Fcustomer-service" };
	const data = { sections_v2: [{ title: "更多服务", items: [settings, other] }] };
	addSettingsEntry(data);
	addSettingsEntry(data);
	assert.equal(data.sections_v2[0].items[1].uri, uri);
	assert.equal(data.sections_v2[0].items[2], other);
	assert.equal(data.sections_v2[0].items.length, 3);
});
