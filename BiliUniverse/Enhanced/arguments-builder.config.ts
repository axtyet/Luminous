import { defineConfig } from "@iringo/arguments-builder";
import { args, output } from "./arguments-builder.full.config";

export default defineConfig({
	args,
	output: {
		...output,
		boxjsSettings: {
			path: "./template/Biliverse.Enhanced.BoxJS.json",
			scope: "@Biliverse.Enhanced.Settings",
		},
	},
});
