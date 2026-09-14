import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const tabSetting = {
	id: "@BiliBili.Enhanced.Settings.Home.Tab",
	name: "[首页] 标签页",
	type: "url",
	val: "bilibili://main/top_category",
	desc: "点击打开 Bilibili 分区页，配置首页标签页。",
};

export async function prepareBoxJs(path) {
	const settings = JSON.parse(await readFile(path, "utf8"));
	const filteredSettings = settings.filter(({ id }) => id !== tabSetting.id);
	const tabDefaultIndex = filteredSettings.findIndex(({ id }) => id === "@BiliBili.Enhanced.Settings.Home.Tab_default");
	if (tabDefaultIndex < 0) throw new Error(`Missing Home.Tab_default in ${path}`);
	filteredSettings.splice(tabDefaultIndex, 0, tabSetting);
	await writeFile(path, JSON.stringify(filteredSettings));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await prepareBoxJs(process.argv[2]);
