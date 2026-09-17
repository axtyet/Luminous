import { defineConfig } from "@iringo/arguments-builder";
import { args } from "./arguments-builder.full.config";

export default defineConfig({
	args,
	output: {
		surge: { path: "./dist/Biliverse.Enhanced.dev.sgmodule", template: "./template/surge.dev.handlebars" },
		loon: { path: "./dist/Biliverse.Enhanced.dev.plugin", template: "./template/loon.dev.handlebars" },
		customItems: [
			{ path: "./dist/Biliverse.Enhanced.dev.snippet", template: "./template/quantumultx.dev.handlebars" },
			{ path: "./dist/Biliverse.Enhanced.dev.stoverride", template: "./template/stash.dev.handlebars" },
		],
		boxjsSettings: { path: "./dist/Biliverse.Enhanced.dev.BoxJS.json", scope: "@Biliverse.Enhanced.Settings" },
	},
});
