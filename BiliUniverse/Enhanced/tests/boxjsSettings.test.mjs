import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { preparePreferencePanes } from "../scripts/prepare-preference-panes.mjs";

test("PreferencePanes replaces the Home.Tab setting with a URL", async () => {
	const root = await mkdtemp(path.join(tmpdir(), "enhanced-preference-panes-"));
	const file = path.join(root, "PreferencePanes.json");
	await writeFile(
		file,
		JSON.stringify([
			{ id: "@Biliverse.Enhanced.Settings.Home.Switch", type: "boolean", val: true },
			{ id: "@Biliverse.Enhanced.Settings.Home.Tab_default", type: "selects", val: "2037" },
		]),
	);

	try {
		await preparePreferencePanes(file);
		await preparePreferencePanes(file);
		const settings = JSON.parse(await readFile(file, "utf8"));
		const tabSettings = settings.filter(({ id }) => id === "@Biliverse.Enhanced.Settings.Home.Tab");
		assert.deepEqual(tabSettings, [
			{
				id: "@Biliverse.Enhanced.Settings.Home.Tab",
				name: "[首页] 标签页",
				type: "url",
				val: "bilibili://main/regionv2",
				desc: "点击打开 Bilibili 分区页，配置首页标签页。",
			},
		]);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});
