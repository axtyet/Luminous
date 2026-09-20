import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../template/Biliverse.Enhanced.PreferencePanes.json", import.meta.url), "utf8"));
const store = new Map();
globalThis.$environment = { "surge-version": "preferences-test" };
globalThis.$argument = { Storage: "PersistentStore", LogLevel: "OFF" };
globalThis.$persistentStore = {
	read: key => store.get(key),
	write: (value, key) => {
		store.set(key, value);
		return true;
	},
};
const { Request } = await import("../src/process/Request.mjs");

function extractTemplatePattern(name, line) {
	if (line.startsWith("response if")) return line.match(/~= \/(.+)\/[a-z]* then/)[1];
	if (line.includes("pattern=")) return line.match(/pattern=([^,]+)/)[1];
	if (name.startsWith("stash") && line.trimStart().startsWith("- ^")) return line.trim().split(" ")[1];
	if (name.startsWith("stash")) return line.trim().slice("- match: ".length);
	return line.match(/(?:http-request )?(\^https[^ ]+)/)[1];
}

test("BoxJS paths match the persistence consumed by business requests", async () => {
	assert.ok(config.every(field => field.id.startsWith("@Biliverse.Enhanced.Settings.")));
	const storage = config.find(field => field.id === "@Biliverse.Enhanced.Settings.Storage");
	assert.equal(storage, undefined);
	store.set("Biliverse", JSON.stringify({ Enhanced: { Settings: { Home: { Top: [] } } }, Global: { sentinel: true } }));
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	assert.deepEqual(JSON.parse(result.$response.body).data.top, []);
	assert.equal(JSON.parse(store.get("Biliverse")).Global.sentinel, true);
});

test("BoxJs checkbox values use current page IDs directly", async () => {
	globalThis.$argument = { Storage: "PersistentStore", LogLevel: "OFF" };
	store.set(
		"Biliverse",
		JSON.stringify({
			Enhanced: {
				Settings: {
					Home: { Tab: ["2036", "2037", "545"], Tab_default: "2037", Top: ["game_center", "messages"] },
					Bottom: ["home", "channel", "mall", "mine"],
				},
			},
		}),
	);
	const result = await Request({ url: "https://app.bilibili.com/x/resource/show/tab/v2", method: "GET", headers: {} });
	const data = JSON.parse(result.$response.body).data;
	assert.deepEqual(
		data.tab.map(tab => tab.id),
		[2036, 2037, 545],
	);
	assert.equal(data.tab.find(tab => tab.id === 2037).default_selected, 1);
	assert.deepEqual(
		data.top.map(item => item.id),
		["game_center", "messages"],
	);
	assert.deepEqual(
		data.bottom.map(item => item.id),
		["home", "channel", "mall", "mine"],
	);
});

test("settings integration installs the only generic web and API scripts", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.ok(template.includes("https://github.com/NSNanoCat/PreferencePanes/releases/latest/download/api.js"), name);
		assert.equal((template.match(/https:\/\/github\.com\/NSNanoCat\/PreferencePanes\/releases\/latest\/download\/web\.js/g) ?? []).length, 1, name);
		assert.ok(template.includes("api\\/(?:get|set|delete)"), name);
		assert.ok(template.includes("settings\\/(?:[a-zA-Z0-9_-]+\\/?|assets\\/(?:index|navigation)\\.mjs)"), name);
		assert.doesNotMatch(template, /settings\/mock\.js|Biliverse\.Website/, name);
		assert.doesNotMatch(template, /api\\\/\(\?:get\|set\|delete\)\|settings/);
		assert.doesNotMatch(template, /assets\\\/(?:index\|host|host\|index)\)\\\.mjs/);
		assert.doesNotMatch(template, /Enhanced\.request\.js|PreferencePanes\.request\.js|settings\/assets\/index\.html/);
		const line = template.split("\n").find(line => line.includes("api") && line.includes("Enhanced") && line.includes("biliverse"));
		assert.ok(line, name);
		const pattern = extractTemplatePattern(name, line);
		const matcher = new RegExp(pattern);
		assert.ok(matcher.test("https://biliverse.github.io/api/Enhanced"));
		assert.ok(matcher.test("https://app.bilibili.com/api/Enhanced"));
		assert.equal(matcher.test("https://app.bilibili.com/x/v2/account/mine"), false);
		assert.ok(matcher.test("https://biliverse.github.io/api/Enhanced?v=1"));
		for (const pathname of ["/api/Enhanced/", "/api/Enhanced/get", "/settings/", "/settings/Enhanced", "/configs/Enhanced", "/api/Global", "/settings/assets/Enhanced.boxjs.json", "/settings/assets/Enhanced.config.js"]) assert.equal(matcher.test(`https://biliverse.github.io${pathname}`), false, name);
		assert.doesNotMatch(template, /biliverse\.github\.io\/settings\/assets\/.*boxjs/);
		const webLine = template.split("\n").find(line => line.includes("settings\\/(?:[a-zA-Z0-9_-]+"));
		assert.ok(webLine, name);
		const webPattern = extractTemplatePattern(name, webLine);
		const webMatcher = new RegExp(webPattern);
		for (const pathname of ["/settings/Enhanced", "/settings/Global", "/settings/Redirect", "/settings/ADBlock", "/settings/assets/index.mjs", "/settings/assets/navigation.mjs"]) assert.ok(webMatcher.test(`https://app.bilibili.com${pathname}`), `${name}: ${pathname}`);
		for (const pathname of ["/settings/", "/settings/index.mjs", "/settings/assets/app.mjs", "/configs/Enhanced", "/api/Enhanced"]) assert.equal(webMatcher.test(`https://app.bilibili.com${pathname}`), false, `${name}: ${pathname}`);
		const apiLine = template.split("\n").find(line => line.includes("api\\/(?:get|set|delete)"));
		assert.ok(apiLine, name);
		const apiPattern = extractTemplatePattern(name, apiLine);
		const apiMatcher = new RegExp(apiPattern);
		for (const pathname of ["/api/get", "/api/set", "/api/delete"]) assert.ok(apiMatcher.test(`https://app.bilibili.com${pathname}`), `${name}: ${pathname}`);
		for (const pathname of ["/api/Enhanced", "/api/Global", "/api/Redirect", "/api/ADBlock", "/api/get/", "/api/Enhanced/get", "/configs/Enhanced", "/settings/Enhanced"]) assert.equal(apiMatcher.test(`https://app.bilibili.com${pathname}`), false, `${name}: ${pathname}`);
		const development = name.includes(".dev.");
		const source = development ? "https://gist.githubusercontent.com/VirgilClyne/97d7611df1c0b29a254ce8f527137576/raw/" : "https://github.com/Biliverse/Enhanced/releases/download/v{{@package 'version'}}/";
		const file = /^(surge|loon|quantumultx)/.test(name) ? `Biliverse.Enhanced${development ? ".dev" : ""}.PreferencePanes.json` : `config${development ? ".dev" : ""}.bundle.js`;
		assert.ok(template.includes(source + file), name);
	}
});

test("homepage and static mocks never overlap module pages, configs or storage APIs", async () => {
	for (const name of await readdir(new URL("../template/", import.meta.url))) {
		if (!name.endsWith(".handlebars") || name.includes("rewrite")) continue;
		const source = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		const lines = source.split("\n");
		const native = /^(surge|loon)/.test(name);
		const candidates = lines.filter(
			line =>
				(line.includes("app\\.bilibili\\.com\\/settings\\/") || line.includes("biliverse\\.github\\.io\\/settings\\/theme\\.css")) &&
				!line.includes("response-header-") &&
				(line.trimStart().startsWith("^https") || line.startsWith("http-request ") || line.startsWith("response if") || line.trimStart().startsWith("- match:") || line.trimStart().startsWith("- ^https") || line.includes("pattern=")),
		);
		const patterns = candidates.map(line => new RegExp(extractTemplatePattern(name, line)));
		assert.equal(patterns.length, native || name.startsWith("quantumultx") ? 8 : 7, name);
		for (const pathname of ["/settings/", "/settings/index.mjs", "/settings/assets/Enhanced_subject.png"]) assert.equal(patterns.filter(pattern => pattern.test(`https://app.bilibili.com${pathname}?v=1`)).length, 1, name);
		assert.equal(patterns.filter(pattern => pattern.test("https://biliverse.github.io/settings/theme.css?v=0.9.10")).length, native || name.startsWith("quantumultx") ? 1 : 0, name);
		for (const pathname of ["/settings/assets/Enhanced_subject_dark.png", "/settings/assets/Enhanced_subject_light.png"])
			assert.equal(
				patterns.some(pattern => pattern.test(`https://app.bilibili.com${pathname}`)),
				false,
				name,
			);
		for (const pathname of ["/settings/home.js", "/settings/bilibili.mjs", "/settings/assets/navigation.mjs", "/settings/Enhanced", "/settings/assets/index.mjs", "/settings/assets/host.mjs", "/configs/Enhanced", "/api/Enhanced", "/api/get", "/x/v2/account/mine", "/settings/theme.css"])
			assert.equal(
				patterns.some(pattern => pattern.test(`https://app.bilibili.com${pathname}`)),
				false,
				name,
			);
	}
});

test("Loon uses URL-backed response mocks", async () => {
	for (const name of ["loon.handlebars", "loon.dev.handlebars"]) {
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		const mocks = template.split("\n").filter(line => line.includes("response.body.mock_file"));
		assert.equal(mocks.length, 9, name);
		for (const line of mocks) {
			assert.match(line, /^response if \$\{url\} ~= \/\^https:/, name);
			assert.match(line, /, 200\)/, name);
		}
		assert.equal((template.match(/response\.header\.add\("Cache-Control", "no-store"\)/g) ?? []).length, 8, name);
		assert.ok(
			mocks.some(line => line.includes('response.body.mock_file("css", "https://biliverse.github.io/settings/theme.css", 200)')),
			name,
		);
		assert.match(template, /response\.header\.add\(\["X-PreferencePanes-Version", "Cache-Control"\], \["\{\{version\}\}", "no-store"\]\)/, name);
	}
});

test("static resources use platform file mappings without a website script", async () => {
	const files = ["index.html", "index.mjs", ...["Biliverse", "Enhanced", "Global", "Redirect", "ADBlock"].map(name => `assets/${name}_subject.png`)];
	for (const name of ["surge.handlebars", "surge.dev.handlebars"]) {
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		assert.match(template, /data-type=file data="https:\/\/biliverse\.github\.io\/settings\/theme\.css" status-code=200 header="Content-Type:text\/css\|Cache-Control:no-store"/, name);
	}
	for (const name of ["stash.handlebars", "stash.dev.handlebars"]) {
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		const rewrites = template.split("\n").filter(line => line.trimStart().startsWith("- ^https"));
		assert.equal(rewrites.length, files.length, name);
		for (const file of files)
			assert.ok(
				rewrites.some(line => line.endsWith(`https://biliverse.github.io/settings/${file} transparent`)),
				`${name}: ${file}`,
			);
	}
	const shadowrocket = await readFile(new URL("../template/shadowrocket.handlebars", import.meta.url), "utf8");
	const mappings = shadowrocket.split("\n").filter(line => line.includes("data-type=file"));
	assert.equal(mappings.length, files.length);
	for (const file of files)
		assert.ok(
			mappings.some(line => line.includes(`data="https://biliverse.github.io/settings/${file}"`)),
			file,
		);
});

test("Quantumult X maps every static asset to its matching response file", async () => {
	for (const name of ["quantumultx.handlebars", "quantumultx.dev.handlebars"]) {
		const template = await readFile(new URL(`../template/${name}`, import.meta.url), "utf8");
		const mocks = template.split("\n").filter(line => line.includes(" url echo-response "));
		assert.equal(mocks.length, 9, name);
		for (const [request, type, file] of [
			["https://app.bilibili.com/settings/?v=1", "text/html", "index.html"],
			["https://biliverse.github.io/settings/theme.css?v=1", "text/css", "theme.css"],
			["https://app.bilibili.com/settings/index.mjs?v=1", "text/javascript", "index.mjs"],
			["https://app.bilibili.com/settings/assets/Biliverse_subject.png?v=1", "image/png", "assets/Biliverse_subject.png"],
			["https://app.bilibili.com/settings/assets/Enhanced_subject.png?v=1", "image/png", "assets/Enhanced_subject.png"],
			["https://app.bilibili.com/settings/assets/Global_subject.png?v=1", "image/png", "assets/Global_subject.png"],
			["https://app.bilibili.com/settings/assets/Redirect_subject.png?v=1", "image/png", "assets/Redirect_subject.png"],
			["https://app.bilibili.com/settings/assets/ADBlock_subject.png?v=1", "image/png", "assets/ADBlock_subject.png"],
		]) {
			const line = mocks.find(line => line.includes(`url echo-response ${type}\\r\\nCache-Control: no-store echo-response https://biliverse.github.io/settings/${file}`));
			assert.ok(line, `${name}: ${file}`);
			assert.match(request, new RegExp(extractTemplatePattern(name, line)), `${name}: ${request}`);
		}
		assert.match(mocks.at(-1), /url echo-response application\/json\\r\\nX-PreferencePanes-Version: \{\{version\}\}\\r\\nCache-Control: no-store echo-response https:\/\//, name);
		assert.doesNotMatch(template, /url script-echo-response https:\/\/biliverse\.github\.io\/settings\/mock\.js/, name);
		assert.doesNotMatch(mocks.at(-1), /config(?:\.dev)?\.bundle\.js/, name);
	}
});
