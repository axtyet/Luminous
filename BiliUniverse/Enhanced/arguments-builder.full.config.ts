import { type ArgumentItem, defineConfig } from "@iringo/arguments-builder";

export const output = {
	surge: {
		path: "./dist/Biliverse.Enhanced.sgmodule",
		transformEgern: {
			enable: true,
			path: "./dist/Biliverse.Enhanced.yaml",
		},
	},
	loon: {
		path: "./dist/Biliverse.Enhanced.plugin",
	},
	customItems: [
		{
			path: "./dist/Biliverse.Enhanced.stoverride",
			template: "./template/stash.handlebars",
		},
		{
			path: "./dist/Biliverse.Enhanced.snippet",
			template: "./template/quantumultx.handlebars",
		},
		{
			path: "./dist/Biliverse.Enhanced.srmodule",
			template: "./template/shadowrocket.handlebars",
		},
	],
	dts: {
		isExported: true,
		path: "./src/types.d.ts",
	},
};

const homeTabOptions = [
	{ key: "2036", label: "直播" },
	{ key: "2037", label: "推荐" },
	{ key: "780", label: "热门" },
	{ key: "545", label: "番剧" },
	{ key: "774", label: "动画（港澳台）" },
	{ key: "151", label: "影视" },
	{ key: "801", label: "韩综（港澳台）" },
	{ key: "2280", label: "校园" },
];

export const homeSwitch: ArgumentItem = {
	key: "Home.Switch",
	name: "[首页] 启用自定义功能",
	type: "boolean",
	defaultValue: true,
	description: "启用后可自定义首页顶栏、标签页和底部导航栏内容。标签页由分区页的快捷访问决定。",
};

const homeTab: ArgumentItem = {
	key: "Home.Tab",
	name: "[首页] 标签页",
	defaultValue: ["2036", "2037", "780", "545", "151"],
	type: "array",
	boxJsType: "checkboxes",
	description: "这里只列出常用选项；分区页提供接近60个快捷访问选项，无法在模块参数中完整列出。请前往 BiliBili App 分区页，使用原生“快捷访问”功能自定义首页标签页。",
	options: homeTabOptions,
};

export const homeTabDefault: ArgumentItem = {
	key: "Home.Tab_default",
	name: "[首页] 默认标签页",
	defaultValue: "2037",
	type: "string",
	boxJsType: "selects",
	description: "请选择启动APP时默认展示的标签页，需先将该标签页加入分区页的快捷访问。",
	options: homeTabOptions,
};

export const homeTopLeft: ArgumentItem = {
	key: "Home.Top_left",
	name: "[首页] 顶栏（左侧）按钮（用户头像）",
	defaultValue: "mine",
	type: "string",
	boxJsType: "selects",
	description: "请选择顶栏（左侧）按钮（用户头像）的作用（在biliBili粉色版中无法修改）。",
	options: [
		{ key: "mine", label: "用户中心-我的" },
		{ key: "videoshortcut", label: "短视频" },
	],
};

export const homeTop: ArgumentItem = {
	key: "Home.Top",
	name: "[首页] 顶栏（右侧）按钮",
	defaultValue: ["messages"],
	type: "array",
	boxJsType: "checkboxes",
	description: "请选择启用的顶栏（右侧）按钮。",
	options: [
		{ key: "game_center", label: "游戏中心" },
		{ key: "mall", label: "会员购" },
		{ key: "messages", label: "消息" },
	],
};

export const homeTopMore: ArgumentItem = {
	key: "Home.Top_more",
	name: "[首页] 标签栏右侧按钮",
	defaultValue: ["categories", "search"],
	type: "array",
	boxJsType: "checkboxes",
	description: "请选择启用的首页标签栏右侧按钮。",
	options: [
		{ key: "categories", label: "更多分区" },
		{ key: "search", label: "搜索" },
	],
};

export const bottom: ArgumentItem = {
	key: "Bottom",
	name: "[底部] 导航栏按钮",
	defaultValue: ["home", "dynamic", "ogv", "mall", "mine"],
	type: "array",
	boxJsType: "checkboxes",
	description: "请选择启用的底部导航栏按钮，最多6个。",
	options: [
		{ key: "home", label: "首页" },
		{ key: "dynamic", label: "动态" },
		{ key: "publish", label: "发布" },
		{ key: "ogv", label: "节目（港澳台）" },
		{ key: "mall", label: "会员购" },
		{ key: "messages", label: "消息" },
		{ key: "mine", label: "我的" },
	],
};

export const regionSwitch: ArgumentItem = {
	key: "Region.Switch",
	name: "[分区] 启用此标签页自定义功能",
	type: "boolean",
	defaultValue: true,
	description: "启用后可自定义分区标签页的内容。",
};

export const regionIndex: ArgumentItem = {
	key: "Region.Index",
	name: "[分区] 分区选择",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: [
		"1",
		"3",
		"4",
		"5",
		"11",
		"13",
		"23",
		"36",
		"119",
		"129",
		"155",
		"160",
		"167",
		"177",
		"181",
		"188",
		"202",
		"211",
		"217",
		"223",
		"234",
		"6544",
		"65537",
		"65539",
		"65541",
		"65545",
		"65549",
		"65550",
		"65551",
		"65552",
		"65553",
		"65555",
		"65556",
		"65557",
		"65559",
		"65560",
		"65561",
		"65563",
		"95636",
		"168312",
	],
	exclude: ["surge", "loon"],
	options: [
		{ key: "1", label: "动画" },
		{ key: "3", label: "音乐" },
		{ key: "4", label: "游戏" },
		{ key: "5", label: "娱乐" },
		{ key: "11", label: "电视剧" },
		{ key: "13", label: "番剧" },
		{ key: "23", label: "电影" },
		{ key: "36", label: "知识" },
		{ key: "119", label: "鬼畜" },
		{ key: "129", label: "舞蹈" },
		{ key: "155", label: "时尚" },
		{ key: "160", label: "生活" },
		{ key: "167", label: "国创" },
		{ key: "177", label: "纪录片" },
		{ key: "181", label: "影视" },
		{ key: "188", label: "科技" },
		{ key: "202", label: "资讯" },
		{ key: "211", label: "美食" },
		{ key: "217", label: "动物圈" },
		{ key: "223", label: "汽车" },
		{ key: "234", label: "运动" },
		{ key: "6544", label: "番劇(港澳台)" },
		{ key: "65537", label: "直播" },
		{ key: "65539", label: "游戏中心" },
		{ key: "65541", label: "专栏" },
		{ key: "65545", label: "放映厅" },
		{ key: "65549", label: "工房集市" },
		{ key: "65550", label: "游戏赛事" },
		{ key: "65551", label: "小黑屋" },
		{ key: "65552", label: "全区排行榜" },
		{ key: "65553", label: "活动中心" },
		{ key: "65555", label: "漫画" },
		{ key: "65556", label: "原創排行榜" },
		{ key: "65557", label: "公开课" },
		{ key: "65559", label: "VLOG" },
		{ key: "65560", label: "课堂" },
		{ key: "65561", label: "专题中心" },
		{ key: "65563", label: "新歌热榜" },
		{ key: "95636", label: "韩综(港澳台)" },
		{ key: "168312", label: "節目(港澳台)" },
	],
	description: "选择要显示的分区。",
};

export const mineSwitch: ArgumentItem = {
	key: "Mine.Switch",
	name: "[我的] 启用此标签页自定义功能",
	type: "boolean",
	defaultValue: true,
	description: "启用后可自定义我的标签页的服务内容。",
};

export const mineCreatorCenter: ArgumentItem = {
	key: "Mine.CreatorCenter",
	name: "[我的] 创作中心",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: [],
	exclude: ["surge", "loon"],
	options: [
		{ key: "171", label: "创作中心" },
		{ key: "172", label: "稿件管理" },
		{ key: "174", label: "有奖活动" },
		{ key: "533", label: "任务中心" },
		{ key: "707", label: "主播中心" },
		{ key: "708", label: "主播活动" },
		{ key: "709", label: "开播福利" },
		{ key: "710", label: "我的直播" },
	],
	description: "白色版本 APP 不存在此选项（未单独注明的选项皆为 iOS 版本）。",
};

export const mineRecommend: ArgumentItem = {
	key: "Mine.Recommend",
	name: "[我的] 推荐服务",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: ["400", "402", "404", "403"],
	exclude: ["surge", "loon"],
	options: [
		{ key: "400", label: "我的课程" },
		{ key: "401", label: "看视频免流量" },
		{ key: "402", label: "个性装扮" },
		{ key: "403", label: "游戏中心" },
		{ key: "404", label: "我的钱包" },
		{ key: "406", label: "直播中心" },
		{ key: "423", label: "邀好友赚红包" },
		{ key: "514", label: "社区中心" },
		{ key: "544", label: "创作中心" },
		{ key: "622", label: "会员购中心" },
		{ key: "924", label: "哔哩哔哩公益" },
		{ key: "990", label: "能量加油站" },
	],
	description: "白色版本 APP 不存在此选项。",
};

export const mineMore: ArgumentItem = {
	key: "Mine.More",
	name: "[我的] 更多服务",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: ["407", "410", "1028"],
	exclude: ["surge", "loon"],
	options: [
		{ key: "407", label: "联系客服" },
		{ key: "410", label: "设置" },
		{ key: "741", label: "我的钱包（白色版）" },
		{ key: "742", label: "稿件管理（白色版）" },
		{ key: "812", label: "听视频" },
		{ key: "950", label: "青少年模式（概念版）" },
		{ key: "964", label: "青少年守护" },
		{ key: "1028", label: "我的NFT" },
	],
};

export const mineIPadSwitch: ArgumentItem = {
	key: "Mine.iPad.Switch",
	name: "[我的 iPad版] 启用此标签页自定义功能",
	type: "boolean",
	defaultValue: true,
	description: "启用后可自定义iPad版我的标签页的服务内容。",
};

export const mineIPadUpper: ArgumentItem = {
	key: "Mine.iPad.Upper",
	name: "[我的 iPad版] 创作中心",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: [],
	exclude: ["surge", "loon"],
	options: [
		{ key: "785", label: "投稿" },
		{ key: "786", label: "创作首页" },
		{ key: "787", label: "稿件管理" },
		{ key: "788", label: "有奖活动" },
	],
	description: "白色版本 APP 不存在此选项。",
};

export const mineIPadRecommend: ArgumentItem = {
	key: "Mine.iPad.Recommend",
	name: "[我的 iPad版] 推荐服务",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: ["789", "790", "791", "793", "794", "2542"],
	exclude: ["surge", "loon"],
	options: [
		{ key: "789", label: "我的关注" },
		{ key: "790", label: "我的消息" },
		{ key: "791", label: "我的钱包" },
		{ key: "792", label: "直播中心" },
		{ key: "793", label: "大会员" },
		{ key: "794", label: "我的课程" },
		{ key: "2542", label: "我的游戏" },
	],
	description: "白色版本 APP 不存在此选项。",
};

export const mineIPadMore: ArgumentItem = {
	key: "Mine.iPad.More",
	name: "[我的 iPad版] 更多服务",
	type: "array",
	boxJsType: "checkboxes",
	defaultValue: ["797", "798"],
	exclude: ["surge", "loon"],
	options: [
		{ key: "797", label: "我的客服" },
		{ key: "798", label: "设置" },
		{ key: "1070", label: "青少年守护" },
	],
};

export const storage: ArgumentItem = {
	key: "Storage",
	name: "[储存] 配置类型",
	defaultValue: "PersistentStore",
	type: "string",
	exclude: ["boxjs"],
	options: [
		{ key: "Argument", label: "优先使用 $argument，其次使用 PersistentStore (BoxJs)，最后使用 database.mjs 的默认配置" },
		{ key: "PersistentStore", label: "优先使用 PersistentStore (BoxJs)，其次使用 $argument，最后使用 database.mjs 的默认配置" },
		{ key: "database", label: "只使用由作者的 database.mjs 文件提供的默认配置，其他任何自定义配置不再起作用" },
	],
	description: "默认使用 PersistentStore，配置优先级为 database -> $argument -> PersistentStore (BoxJs)；选择 Argument 时为 database -> PersistentStore (BoxJs) -> $argument。",
};

export const logLevel: ArgumentItem = {
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
};

export const args: ArgumentItem[] = [homeSwitch, homeTab, homeTabDefault, homeTopLeft, homeTop, homeTopMore, bottom, regionSwitch, regionIndex, mineSwitch, mineCreatorCenter, mineRecommend, mineMore, mineIPadSwitch, mineIPadUpper, mineIPadRecommend, mineIPadMore, storage, logLevel];

export default defineConfig({ output, args });
