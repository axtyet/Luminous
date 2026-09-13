import { defineConfig } from "@iringo/arguments-builder";

const endpoint = {
	key: "endpoint",
	name: "[重写] 服务端点",
	defaultValue: "global-3xw.pages.dev",
	type: "string" as const,
	options: [
		{ key: "global-3xw.pages.dev", label: "首选；直连；无需代理" },
		{ key: "dev.global-3xw.pages.dev", label: "开发版" },
		{ key: "global.nanocat.workers.dev", label: "Worker 版；需要代理" },
	],
};

export default defineConfig({
	args: [endpoint],
	output: {
		surge: { path: "./dist/BiliBili.Global.Rewrite.sgmodule", template: "./template/surge.rewrite.handlebars", transformEgern: { enable: true, path: "./dist/BiliBili.Global.Rewrite.yaml" } },
		loon: { path: "./dist/BiliBili.Global.Rewrite.plugin", template: "./template/loon.rewrite.handlebars" },
		customItems: [
			{ path: "./dist/BiliBili.Global.Rewrite.srmodule", template: "./template/shadowrocket.rewrite.handlebars" },
			{ path: "./dist/BiliBili.Global.Rewrite.stoverride", template: "./template/stash.rewrite.handlebars" },
		],
	},
});
