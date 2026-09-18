import assert from "node:assert/strict";
import test from "node:test";
import { mineCreatorCenter, mineIPadMore, mineIPadRecommend, mineIPadUpper, mineMore, mineRecommend, regionIndex } from "../arguments-builder.full.config.ts";
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
	Mine.replaceSections({}, { CreatorCenter: [], Recommend: [], More: [] });
	const data = {};
	Mine.replaceSections(data, { CreatorCenter: [], Recommend: [], More: [410] });
	assert.ok(data.sections_v2.some(section => section.items?.some(item => item.id === 410)));
	Mine.addEntry(data);
	const next = {};
	Mine.replaceSections(next, { CreatorCenter: [], Recommend: [], More: [410] });
	assert.ok(!next.sections_v2.some(section => section.items?.some(item => item.id === 129515498)));
});

test("Mine removes empty sections and keeps the Biliverse entry in more services", () => {
	const data = {};
	Mine.replaceSections(data, { CreatorCenter: [], Recommend: [], More: [] });
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
	assert.deepEqual(mineCreatorCenter.defaultValue, database.Enhanced.Settings.Mine.CreatorCenter);
	assert.deepEqual(mineRecommend.defaultValue, database.Enhanced.Settings.Mine.Recommend);
	assert.deepEqual(mineMore.defaultValue, database.Enhanced.Settings.Mine.More);
	assert.deepEqual(mineIPadUpper.defaultValue, database.Enhanced.Settings.Mine.iPad.Upper);
	assert.deepEqual(mineIPadRecommend.defaultValue, database.Enhanced.Settings.Mine.iPad.Recommend);
	assert.deepEqual(mineIPadMore.defaultValue, database.Enhanced.Settings.Mine.iPad.More);

	const all = { includes: () => true };
	const phone = {};
	Mine.replaceSections(phone, { CreatorCenter: all, Recommend: all, More: all });
	const ipad = {};
	Mine.replacePadSections(ipad, { Upper: all, Recommend: all, More: all });
	assert.deepEqual(
		regionIndex.options.map(({ key }) => key),
		Region.replaceIndex([], "/x/v2/region/index", { Index: all }).map(({ tid }) => String(tid)),
	);
	assert.deepEqual(
		mineCreatorCenter.options.map(({ key }) => key),
		phone.sections_v2.find(({ title }) => title === "创作中心").items.map(({ id }) => String(id)),
	);
	assert.deepEqual(
		mineRecommend.options.map(({ key }) => key),
		phone.sections_v2.find(({ title }) => title === "推荐服务").items.map(({ id }) => String(id)),
	);
	assert.deepEqual(
		mineMore.options.map(({ key }) => key),
		phone.sections_v2.find(({ title }) => title === "更多服务").items.map(({ id }) => String(id)),
	);
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
	assert.equal(mineMore.options.find(({ key }) => key === "741").label, "我的钱包（白色版）");
	assert.equal(mineMore.options.find(({ key }) => key === "742").label, "稿件管理（白色版）");
	assert.equal(mineMore.options.find(({ key }) => key === "950").label, "青少年模式（概念版）");
});
