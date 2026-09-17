import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { homeTab } from "../arguments-builder.PreferencePanes.config.ts";

export async function preparePreferencePanes(path) {
	const settings = JSON.parse(await readFile(path, "utf8"));
	const filteredSettings = settings.filter(({ id }) => id !== homeTab.id);
	const tabDefaultIndex = filteredSettings.findIndex(({ id }) => id === "@Biliverse.Enhanced.Settings.Home.Tab_default");
	if (tabDefaultIndex < 0) throw new Error(`Missing Home.Tab_default in ${path}`);
	filteredSettings.splice(tabDefaultIndex, 0, homeTab);
	await writeFile(path, JSON.stringify(filteredSettings));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await preparePreferencePanes(process.argv[2]);
