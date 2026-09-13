import { type ArgumentItem, defineConfig } from "@iringo/arguments-builder";

export const output = {
	surge: {
		path: "./dist/BiliBili.Enhanced.sgmodule",
		transformEgern: {
			enable: true,
			path: "./dist/BiliBili.Enhanced.yaml",
		},
	},
	loon: {
		path: "./dist/BiliBili.Enhanced.plugin",
	},
	customItems: [
		{
			path: "./dist/BiliBili.Enhanced.stoverride",
			template: "./template/stash.handlebars",
		},
		{
			path: "./dist/BiliBili.Enhanced.snippet",
			template: "./template/quantumultx.handlebars",
		},
		{
			path: "./dist/BiliBili.Enhanced.srmodule",
			template: "./template/shadowrocket.handlebars",
		},
	],
	dts: {
		isExported: true,
		path: "./src/types.d.ts",
	},
	boxjsSettings: {
		path: "./template/boxjs.settings.json",
		scope: "@BiliBili.Enhanced.Settings",
	},
};

export const args: ArgumentItem[] = [
	{
		key: "Home.Switch",
		name: "[首页] 启用自定义功能",
		type: "boolean",
		defaultValue: true,
		description: "启用后可自定义首页顶栏、标签页和底部导航栏内容。标签页由分区页的快捷访问决定。",
	},
	{
		key: "Home.Tab_default",
		name: "[首页] 默认标签页",
		defaultValue: "2037",
		type: "string",
		boxJsType: "selects",
		description: "请选择启动APP时默认展示的标签页，需先将该标签页加入分区页的快捷访问。",
		options: [
			{
				key: "2036",
				label: "直播",
			},
			{
				key: "2037",
				label: "推荐",
			},
			{
				key: "780",
				label: "热门",
			},
			{
				key: "545",
				label: "番剧",
			},
			{
				key: "774",
				label: "动画（港澳台）",
			},
			{
				key: "151",
				label: "影视",
			},
			{
				key: "801",
				label: "韩综（港澳台）",
			},
			{
				key: "2280",
				label: "校园",
			},
		],
	},
	{
		key: "Home.Top_left",
		name: "[首页] 顶栏（左侧）按钮（用户头像）",
		defaultValue: "mine",
		type: "string",
		boxJsType: "selects",
		description: "请选择顶栏（左侧）按钮（用户头像）的作用（在biliBili粉色版中无法修改）。",
		options: [
			{
				key: "mine",
				label: "用户中心-我的",
			},
			{
				key: "videoshortcut",
				label: "短视频",
			},
		],
	},
	{
		key: "Home.Top",
		name: "[首页] 顶栏（右侧）按钮",
		defaultValue: ["messages"],
		type: "array",
		boxJsType: "checkboxes",
		description: "请选择启用的顶栏（右侧）按钮。",
		options: [
			{
				key: "game_center",
				label: "游戏中心",
			},
			{
				key: "mall",
				label: "会员购",
			},
			{
				key: "messages",
				label: "消息",
			},
		],
	},
	{
		key: "Home.Top_more",
		name: "[首页] 顶栏（更多）按钮",
		defaultValue: ["categories", "search"],
		type: "array",
		boxJsType: "checkboxes",
		description: "请选择启用的首页顶栏更多按钮。",
		options: [
			{
				key: "categories",
				label: "更多分区",
			},
			{
				key: "search",
				label: "搜索",
			},
		],
	},
	{
		key: "Bottom",
		name: "[底部] 导航栏按钮",
		defaultValue: ["home", "dynamic", "ogv", "mall", "mine"],
		type: "array",
		boxJsType: "checkboxes",
		description: "请选择启用的底部导航栏按钮，最多6个。",
		options: [
			{
				key: "home",
				label: "首页",
			},
			{
				key: "dynamic",
				label: "动态",
			},
			{
				key: "publish",
				label: "发布",
			},
			{
				key: "ogv",
				label: "节目（港澳台）",
			},
			{
				key: "mall",
				label: "会员购",
			},
			{
				key: "messages",
				label: "消息",
			},
			{
				key: "mine",
				label: "我的",
			},
		],
	},
	{
		key: "Region.Switch",
		name: "[分区] 启用此标签页自定义功能",
		type: "boolean",
		defaultValue: true,
		description: "启用后可自定义分区标签页的内容。",
	},
	{
		key: "Mine.Switch",
		name: "[我的] 启用此标签页自定义功能",
		type: "boolean",
		defaultValue: true,
		description: "启用后可自定义我的标签页的服务内容。",
	},
	{
		key: "Mine.iPad.Switch",
		name: "[我的 iPad版] 启用此标签页自定义功能",
		type: "boolean",
		defaultValue: true,
		description: "启用后可自定义iPad版我的标签页的服务内容。",
	},
	{
		key: "Storage",
		name: "[储存] 配置类型",
		defaultValue: "Argument",
		type: "string",
		options: [
			{ key: "Argument", label: "优先使用来自 $argument 的配置，$argument 不包含的设置项由 PersistentStore (BoxJs) 提供" },
			{ key: "PersistentStore", label: "只使用 PersistentStore (BoxJs) 提供的配置" },
			{ key: "database", label: "只使用由作者的 database.mjs 文件提供的默认配置，其他任何自定义配置不再起作用" },
		],
		description: "选择要使用的配置类型。未设置此选项或不通过此选项的旧版本的配置顺序依旧是 PersistentStore (BoxJs) > $argument > database。",
	},
	{
		key: "LogLevel",
		name: "[调试] 日志等级",
		type: "string",
		defaultValue: "WARN",
		description: "选择脚本日志的输出等级，低于所选等级的日志将全部输出。",
		options: [
			{ key: "OFF", label: "关闭" },
			{ key: "ERROR", label: "❌ 错误" },
			{ key: "WARN", label: "⚠️ 警告" },
			{ key: "INFO", label: "ℹ️ 信息" },
			{ key: "DEBUG", label: "🅱️ 调试" },
			{ key: "ALL", label: "全部" },
		],
	},
];

export const argsFull: ArgumentItem[] = [...args];

export default defineConfig({ output, args: argsFull });
