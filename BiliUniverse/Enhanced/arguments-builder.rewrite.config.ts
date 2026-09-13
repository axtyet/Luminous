import { defineConfig } from "@iringo/arguments-builder";

const endpoint = {
	key: "endpoint",
	name: "[重写] 服务端点",
	defaultValue: "enhanced-cdt.pages.dev",
	type: "string" as const,
	options: [
		{ key: "enhanced-cdt.pages.dev", label: "首选；直连；无需代理" },
		{ key: "dev.enhanced-cdt.pages.dev", label: "开发版" },
		{ key: "enhanced.nanocat.workers.dev", label: "Worker 版；需要代理" },
	],
};

export default defineConfig({
	args: [endpoint],
	output: {
		surge: { path: "./dist/BiliBili.Enhanced.Rewrite.sgmodule", template: "./template/surge.rewrite.handlebars", transformEgern: { enable: true, path: "./dist/BiliBili.Enhanced.Rewrite.yaml" } },
		loon: { path: "./dist/BiliBili.Enhanced.Rewrite.plugin", template: "./template/loon.rewrite.handlebars" },
		customItems: [
			{ path: "./dist/BiliBili.Enhanced.Rewrite.srmodule", template: "./template/shadowrocket.rewrite.handlebars" },
			{ path: "./dist/BiliBili.Enhanced.Rewrite.stoverride", template: "./template/stash.rewrite.handlebars" },
		],
	},
});
