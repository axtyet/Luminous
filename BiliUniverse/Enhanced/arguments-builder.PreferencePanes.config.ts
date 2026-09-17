import { defineConfig } from "@iringo/arguments-builder";
import { bottom, homeSwitch, homeTabDefault, homeTop, homeTopLeft, homeTopMore, logLevel, mineIPadSwitch, mineSwitch, regionSwitch } from "./arguments-builder.full.config.ts";

export const homeTab = {
	id: "@Biliverse.Enhanced.Settings.Home.Tab",
	name: "[首页] 标签页",
	type: "url",
	val: "bilibili://main/regionv2",
	desc: "点击打开 Bilibili 分区页，配置首页标签页。",
};

export default defineConfig({
	args: [homeSwitch, homeTabDefault, homeTopLeft, homeTop, homeTopMore, bottom, regionSwitch, mineSwitch, mineIPadSwitch, logLevel],
	output: { boxjsSettings: { path: "./template/Biliverse.Enhanced.PreferencePanes.json", scope: "@Biliverse.Enhanced.Settings" } },
});
