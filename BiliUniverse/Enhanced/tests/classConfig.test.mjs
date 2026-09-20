import assert from "node:assert/strict";
import test from "node:test";
import { mineCreatorCenter, mineIPadMore, mineIPadRecommend, mineIPadUpper, mineMore, mineRecommend, mineShortcuts, regionIndex } from "../arguments-builder.full.config.ts";
import Mine from "../src/class/Mine.mjs";
import Region from "../src/class/Region.mjs";
import Tab from "../src/class/Tab.mjs";
import database from "../src/function/database.mjs";

test("Tab writes every configured selection into empty response data", () => {
	const data = {};
	Tab.replace(data, database.Enhanced.Settings, database.Enhanced.Configs);

	assert.equal(data.top_left, database.Enhanced.Configs.Tab.top_left.mine);
	assert.deepEqual(
		data.top.map(({ id }) => id),
		database.Enhanced.Settings.Home.Top,
	);
	assert.deepEqual(
		data.top_more.map(({ id }) => id),
		database.Enhanced.Settings.Home.Top_more,
	);
	assert.deepEqual(
		data.tab.map(({ id }) => String(id)),
		database.Enhanced.Settings.Home.Tab,
	);
	assert.deepEqual(
		data.bottom.map(({ id }) => id),
		database.Enhanced.Settings.Bottom,
	);
});

test("Mine keeps configured services available after a request filters them out", () => {
	Mine.replaceSections({}, { Shortcuts: [], CreatorCenter: [], Recommend: [], More: [] });
	const data = {};
	Mine.replaceSections(data, { Shortcuts: [], CreatorCenter: [], Recommend: [], More: [410] });
	assert.ok(data.sections_v2.some(section => section.items?.some(item => item.id === 410)));
	Mine.addEntry(data);
	const next = {};
	Mine.replaceSections(next, { Shortcuts: [], CreatorCenter: [], Recommend: [], More: [410] });
	assert.ok(!next.sections_v2.some(section => section.items?.some(item => item.id === 129515498)));
});

test("Mine removes empty sections and keeps the Biliverse entry in more services", () => {
	const data = {};
	Mine.replaceSections(data, { Shortcuts: [], CreatorCenter: [], Recommend: [], More: [] });
	assert.ok(data.sections_v2.every(section => Array.isArray(section.items) && section.items.length > 0));
	Mine.addEntry(data);
	const more = data.sections_v2.find(({ title }) => title === "更多服务");
	assert.deepEqual(
		more.items.map(item => item.id),
		[129515498],
	);

	const ipad = {};
	Mine.replacePadSections(ipad, { Upper: [], Recommend: [], More: [] });
	Mine.addEntry(ipad, true);
	assert.deepEqual(
		ipad.ipad_more_sections.map(item => item.id),
		[129515498],
	);
});

test("Region channel responses do not change subsequent region index responses", () => {
	const settings = { Index: [1] };
	const initial = Region.replaceIndex([], "/x/v2/region/index", settings);
	const expected = structuredClone(initial);
	assert.equal(expected.length, 1);
	Region.replaceIndex([], "/x/v2/channel/region/list", settings);
	assert.deepEqual(Region.replaceIndex([], "/x/v2/region/index", settings), expected);
});

test("Region creates missing groups and icon arrays from local configuration", () => {
	const { RegionList } = database.Enhanced.Configs;
	const contents = Region.mergeLists([{ title: "默认分区" }], RegionList);
	assert.deepEqual(
		contents.map(({ title }) => title),
		RegionList.groups.map(({ title }) => title),
	);
	assert.deepEqual(
		contents.find(({ title }) => title === "默认分区").icons.map(({ uniqueId }) => uniqueId),
		RegionList.groups.find(({ title }) => title === "默认分区").ids,
	);
});

test("persistent settings definitions match database defaults and class configs", () => {
	assert.deepEqual(regionIndex.defaultValue, database.Enhanced.Settings.Region.Index);
	assert.deepEqual(mineShortcuts.defaultValue, database.Enhanced.Settings.Mine.Shortcuts);
	assert.deepEqual(mineCreatorCenter.defaultValue, database.Enhanced.Settings.Mine.CreatorCenter);
	assert.deepEqual(mineRecommend.defaultValue, database.Enhanced.Settings.Mine.Recommend);
	assert.deepEqual(mineMore.defaultValue, database.Enhanced.Settings.Mine.More);
	assert.deepEqual(mineIPadUpper.defaultValue, database.Enhanced.Settings.Mine.iPad.Upper);
	assert.deepEqual(mineIPadRecommend.defaultValue, database.Enhanced.Settings.Mine.iPad.Recommend);
	assert.deepEqual(mineIPadMore.defaultValue, database.Enhanced.Settings.Mine.iPad.More);
	assert.deepEqual(database.Enhanced.Settings.Mine.Shortcuts, ["494", "495", "4001", "3084"]);
	assert.deepEqual(database.Enhanced.Settings.Mine.CreatorCenter, []);
	assert.deepEqual(database.Enhanced.Settings.Mine.Recommend, ["400", "402", "3994", "403"]);
	assert.deepEqual(database.Enhanced.Settings.Mine.More, ["4021", "4022", "1028"]);
	assert.deepEqual(
		mineCreatorCenter.options.map(({ key }) => key),
		["171", "172", "533", "174", "707", "708", "709", "710"],
	);

	const all = { includes: () => true };
	const phone = {};
	Mine.replaceSections(phone, { Shortcuts: all, CreatorCenter: all, Recommend: all, More: all });
	const ipad = {};
	Mine.replacePadSections(ipad, { Upper: all, Recommend: all, More: all });
	assert.deepEqual(
		regionIndex.options.map(({ key }) => key),
		Region.replaceIndex([], "/x/v2/region/index", { Index: all }).map(({ tid }) => String(tid)),
	);
	const phoneOptions = [
		[mineShortcuts, phone.sections_v2.find(({ title }) => title === undefined)],
		[mineCreatorCenter, phone.sections_v2.find(({ title }) => title === "创作中心")],
		[mineRecommend, phone.sections_v2.find(({ title }) => title === "推荐服务")],
		[mineMore, phone.sections_v2.find(({ title }) => title === "更多服务")],
	];
	for (const [definition, section] of phoneOptions) {
		const internalIds = section.items.map(({ id }) => String(id));
		assert.ok(definition.options.every(({ key }) => internalIds.includes(key)));
	}
	assert.deepEqual(
		mineIPadUpper.options.map(({ key }) => key),
		ipad.ipad_upper_sections.map(({ id }) => String(id)),
	);
	assert.deepEqual(
		mineIPadRecommend.options.map(({ key }) => key),
		ipad.ipad_recommend_sections.map(({ id }) => String(id)),
	);
	assert.deepEqual(
		mineIPadMore.options.map(({ key }) => key),
		ipad.ipad_more_sections.map(({ id }) => String(id)),
	);
	const publicPhoneIds = new Set(phoneOptions.flatMap(([definition]) => definition.options.map(({ key }) => key)));
	const internalPhoneIds = new Set(phone.sections_v2.flatMap(({ items }) => items.map(({ id }) => String(id))));
	for (const id of ["396", "397", "398", "399", "3991", "3992", "533original", "404", "741", "407", "410"]) {
		assert.ok(internalPhoneIds.has(id), `${id} must remain available for stored settings`);
		assert.equal(publicPhoneIds.has(id), false, `${id} must stay hidden from new settings`);
	}
	const creatorCenter = phone.sections_v2.find(({ title }) => title === "创作中心");
	assert.deepEqual(
		creatorCenter.items.slice(0, 4).map(({ id }) => id),
		[171, 172, 533, 174],
	);
	assert.deepEqual(
		creatorCenter.items.find(({ id }) => id === 533),
		{
			id: 533,
			title: "数据中心",
			uri: "https://member.bilibili.com/york/data-center?navhide=1&from=profile",
			icon: "http://i0.hdslb.com/bfs/feed-admin/367204ba56004b1a78211ba27eefbf5b4cc53a35.png",
			need_login: 1,
			global_red_dot: 1,
			display: 1,
			corner_pixel: 0,
			biz_type: 0,
		},
	);
	assert.deepEqual(
		creatorCenter.items.find(({ id }) => id === "533original"),
		{
			id: "533original",
			title: "任务中心",
			uri: "https://member.bilibili.com/york/mission-center?navhide=1",
			icon: "http://i0.hdslb.com/bfs/archive/ae18624fd2a7bdda6d95ca606d5e4cf2647bfa4d.png",
			need_login: 1,
			global_red_dot: 1,
			display: 1,
		},
	);
});
