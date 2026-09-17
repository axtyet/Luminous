import assert from "node:assert/strict";
import test from "node:test";
import Mine from "../src/class/Mine.mjs";
import Region from "../src/class/Region.mjs";

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
