import { defineConfig } from "@iringo/arguments-builder";
import { argsFull } from "./arguments-builder.full.config";

export default defineConfig({
	args: argsFull,
	output: {
		surge: { path: "./dist/BiliBili.Enhanced.dev.sgmodule", template: "./template/surge.dev.handlebars" },
		loon: { path: "./dist/BiliBili.Enhanced.dev.plugin", template: "./template/loon.dev.handlebars" },
		customItems: [
			{ path: "./dist/BiliBili.Enhanced.dev.snippet", template: "./template/quantumultx.dev.handlebars" },
			{ path: "./dist/BiliBili.Enhanced.dev.stoverride", template: "./template/stash.dev.handlebars" },
		],
		boxjsSettings: { path: "./dist/BiliBili.Enhanced.dev.boxjs.json", scope: "@BiliBili.Enhanced.Settings" },
	},
});
