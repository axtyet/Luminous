import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../template/boxjs.settings.json", import.meta.url), "utf8"));
const store = new Map();
globalThis.$environment = { "surge-version": "preferences-test" };
globalThis.$argument = { Storage: "Argument", LogLevel: "OFF" };
globalThis.$persistentStore = {
	read: key => store.get(key),
	write: (value, key) => {
		store.set(key, value);
		return true;
	},
};
const { Request } = await import("../src/process/Request.mjs");

test("BoxJS paths match the persistence consumed by business requests", async () => {
	assert.ok(config.every(field => field.id.startsWith("@BiliBili.Enhanced.Settings.")));
	store.set("BiliBili", JSON.stringify({ Enhanced: { Settings: { Storage: "PersistentStore", Home: { Top: [] } } }, Global: { sentinel: true } }));
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	assert.deepEqual(JSON.parse(result.$response.body).data.top, []);
	assert.equal(JSON.parse(store.get("BiliBili")).Global.sentinel, true);
});

test("settings integration installs separate web and module API scripts", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.ok(template.includes("https://github.com/NSNanoCat/PreferencePanes/releases/latest/download/api.js"), name);
		assert.ok(template.includes("https://github.com/NSNanoCat/PreferencePanes/releases/latest/download/web.js"), name);
		assert.ok(template.includes("api\\/Enhanced(?:\\/(?:get|set|delete))?\\/?"), name);
		assert.ok(template.includes("settings\\/(?:Enhanced\\/?|assets\\/(?:app|navigation)\\.mjs)"), name);
		assert.doesNotMatch(template, /api\\\/\(\?:get\|set\|delete\)\|settings/);
		assert.doesNotMatch(template, /assets\\\/(?:app\|host|host\|app)\)\\\.mjs/);
		assert.doesNotMatch(template, /Enhanced\.request\.js|PreferencePanes\.request\.js|settings\/assets\/index\.html/);
		const line = template.split("\n").find(line => line.includes("configs") && line.includes("biliverse"));
		assert.ok(line, name);
		const pattern = line.startsWith("response if") ? line.match(/~= \/(.+)\/ then/)[1] : name.startsWith("shadowrocket") ? line.match(/pattern=([^,]+)/)[1] : name.startsWith("stash") ? line.trim().slice("- match: ".length) : line.split(" ")[0];
		const matcher = new RegExp(pattern);
		assert.ok(matcher.test("https://biliverse.github.io/configs/Enhanced"));
		assert.ok(matcher.test("https://app.bilibili.com/configs/Enhanced"));
		assert.equal(matcher.test("https://app.bilibili.com/x/v2/account/mine"), false);
		assert.ok(matcher.test("https://biliverse.github.io/configs/Enhanced?v=1"));
		for (const pathname of ["/api/Enhanced/", "/settings/", "/settings/Enhanced", "/configs/Global", "/settings/assets/Enhanced.boxjs.json", "/settings/assets/Enhanced.config.js"]) assert.equal(matcher.test(`https://biliverse.github.io${pathname}`), false, name);
		assert.doesNotMatch(template, /biliverse\.github\.io\/settings\/assets\/.*boxjs/);
		const development = name.includes(".dev.");
		const source = development ? "https://gist.githubusercontent.com/VirgilClyne/97d7611df1c0b29a254ce8f527137576/raw/" : "https://github.com/Biliverse/Enhanced/releases/download/v{{@package 'version'}}/";
		const file = /^(surge|loon)/.test(name) ? `BiliBili.Enhanced${development ? ".dev" : ""}.boxjs.json` : `config${development ? ".dev" : ""}.bundle.js`;
		assert.ok(template.includes(source + file), name);
	}
});

test("homepage and static mocks never overlap module pages, configs or storage APIs", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const source = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		const lines = source.split("\n");
		const native = /^(surge|loon)/.test(name);
		const candidates = native ? lines.filter(line => line.includes("https://biliverse.github.io/settings/")) : lines.filter(line => line.includes("^https:\\/\\/app\\.bilibili\\.com\\/settings"));
		const patterns = candidates.map(line => new RegExp(line.startsWith("response if") ? line.match(/~= \/(.+)\/ then/)[1] : name.startsWith("shadowrocket") ? line.match(/pattern=([^,]+)/)[1] : name.startsWith("stash") ? line.trim().slice("- match: ".length) : line.split(" ")[0]));
		assert.equal(patterns.length, native ? 7 : 1, name);
		for (const pathname of ["/settings/", "/settings/index.mjs", "/settings/assets/Enhanced_subject.png"]) assert.equal(patterns.filter(pattern => pattern.test(`https://app.bilibili.com${pathname}?v=1`)).length, 1, name);
		for (const pathname of ["/settings/assets/Enhanced_subject_dark.png", "/settings/assets/Enhanced_subject_light.png"])
			assert.equal(
				patterns.some(pattern => pattern.test(`https://app.bilibili.com${pathname}`)),
				false,
				name,
			);
		for (const pathname of ["/settings/home.js", "/settings/bilibili.mjs", "/settings/assets/navigation.mjs", "/settings/Enhanced", "/settings/assets/app.mjs", "/settings/assets/host.mjs", "/configs/Enhanced", "/api/get", "/x/v2/account/mine", "/settings/theme.css"])
			assert.equal(
				patterns.some(pattern => pattern.test(`https://app.bilibili.com${pathname}`)),
				false,
				name,
			);
	}
});
