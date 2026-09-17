import assert from "node:assert/strict";
import test from "node:test";
import { mineCreatorCenter, mineIPadMore, mineIPadRecommend, mineIPadUpper, mineMore, mineRecommend, regionIndex } from "../arguments-builder.full.config.ts";
import Mine from "../src/class/Mine.mjs";
import Region from "../src/class/Region.mjs";
import database from "../src/function/database.mjs";

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

test("Region channel responses do not change subsequent region index responses", () => {
	const settings = { Index: [1] };
	const initial = Region.replaceIndex([], "/x/v2/region/index", settings);
	const expected = structuredClone(initial);
	assert.equal(expected.length, 1);
	Region.replaceIndex([], "/x/v2/channel/region/list", settings);
	assert.deepEqual(Region.replaceIndex([], "/x/v2/region/index", settings), expected);
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
