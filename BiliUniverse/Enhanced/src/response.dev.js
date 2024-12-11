import { $app, Console, done, Lodash as _ } from "@nsnanocat/util";
import { URL } from "@nsnanocat/url";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`);
(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("BiliBili", "Enhanced", database);
	Console.logLevel = Settings.LogLevel;
	// 创建空数据
	let body = { code: 0, message: "0", data: {} };
	// 格式判断
	switch (FORMAT) {
		case undefined: // 视为无body
			break;
		case "application/x-www-form-urlencoded":
		case "text/plain":
		default:
			break;
		case "application/x-mpegURL":
		case "application/x-mpegurl":
		case "application/vnd.apple.mpegurl":
		case "audio/mpegurl":
			//body = M3U8.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = M3U8.stringify(body);
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist":
			//body = XML.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = XML.stringify(body);
			break;
		case "text/vtt":
		case "application/vtt":
			//body = VTT.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = VTT.stringify(body);
			break;
		case "text/json":
		case "application/json":
			body = JSON.parse($response.body ?? "{}");
			// 解析链接
			switch (url.hostname) {
				case "www.bilibili.com":
					break;
				case "app.bilibili.com":
				case "app.biliapi.net":
					// 先保存一下AccessKey
					/*
					if (url.searchParams.has("access_key")) {
						let newCaches = Storage.getItem("@BiliBili.Global.Caches", {});
						newCaches.AccessKey = url.searchParams.get("access_key"); // 总是刷新
						Console.debug(`newCaches = ${JSON.stringify(newCaches)}`);
						let isSave = Storage.setItem(newCaches, "@BiliBili.Global.Caches");
						Console.debug(`Storage.setItem ? ${isSave}`);
					};
					*/
					switch (url.pathname) {
						case "/x/resource/show/tab/v2": // 首页-Tab
							// 顶栏-左侧
							body.data.top_left = Configs.Tab.top_left[Settings.Home.Top_left];
							// 顶栏-右侧
							body.data.top = Configs.Tab.top
								.map(e => {
									if (Settings.Home.Top.includes(e.tab_id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => {
									e.pos = i + 1;
									return e;
								});
							// 标签栏
							body.data.tab = Configs.Tab.tab
								.map(e => {
									if (Settings.Home.Tab.includes(e.tab_id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => {
									if (Settings.Home.Tab_default === e.tab_id) e.default_selected = 1;
									e.pos = i + 1;
									return e;
								});
							// 底部导航栏
							body.data.bottom = Configs.Tab.bottom
								.map(e => {
									if (Settings.Bottom.includes(e.tab_id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => {
									e.pos = i + 1;
									return e;
								});
							break;
						case "/x/resource/show/tab/bubble": // 首页-Tab-?
							break;
						case "/x/v2/account/mine": // 账户信息-我的
							body.data.sections_v2 = Configs.Mine.sections_v2.map(e => {
								Console.debug(`e.title = ${e.title}`);
								//Console.debug(`e.items = ${JSON.stringify(e.items)}`);
								switch (e.title) {
									case "创作中心":
										e.items = e.items
											.map(item => {
												//Console.debug(`item.id = ${item.id}`);
												if (Settings.Mine.CreatorCenter.includes(item.id)) return item;
											})
											.filter(Boolean);
										break;
									case "推荐服务":
										e.items = e.items
											.map(item => {
												//Console.debug(`item.id = ${item.id}`);
												if (Settings.Mine.Recommend.includes(item.id)) return item;
											})
											.filter(Boolean);
										break;
									case "更多服务":
										e.items = e.items
											.map(item => {
												//Console.debug(`item.id = ${item.id}`);
												if (Settings.Mine.More.includes(item.id)) return item;
											})
											.filter(Boolean);
										break;
								}
								if (!e.items.some(() => true)) e = {};
								return e;
							});
							break;
						case "/x/v2/account/mine/ipad": // 账户信息-我的(pad)
							body.data.ipad_upper_sections = Configs.Mine.ipad_upper_sections
								.map(item => {
									if (Settings.Mine.iPad.Upper.includes(item.id)) return item;
								})
								.filter(Boolean);
							body.data.ipad_recommend_sections = Configs.Mine.ipad_recommend_sections
								.map(item => {
									if (Settings.Mine.iPad.Recommend.includes(item.id)) return item;
								})
								.filter(Boolean);
							body.data.ipad_more_sections = Configs.Mine.ipad_more_sections
								.map(item => {
									if (Settings.Mine.iPad.More.includes(item.id)) return item;
								})
								.filter(Boolean);
							break;
						case "/x/v2/region/index":
						case "/x/v2/channel/region/list": {
							// 分区页面-索引
							body.data.push(...Configs.Region.index, ...Configs.Region.modify); // 末尾插入全部分区
							//Console.debug(JSON.stringify(body.data));
							body.data = uniqueFunc(body.data, "tid"); // 去重
							//Console.debug(JSON.stringify(body.data));
							body.data = body.data.sort(compareFn("tid")); // 排序
							//Console.debug(JSON.stringify(body.data));
							body.data = body.data
								.map(e => {
									// 过滤
									if (Settings.Region.Index.includes(e.tid)) return e;
								})
								.filter(Boolean);
							//Console.debug(JSON.stringify(data));
							// 特殊处理
							switch (url.pathname) {
								case "/x/v2/region/index":
									break;
								case "/x/v2/channel/region/list":
									body.data = body.data.map(e => {
										if (e.goto === "0") e.goto = "";
										e.children = undefined;
										e.config = undefined;
										return e;
									});
									break;
							}

							function uniqueFunc(array, property) {
								// 数组去重
								const res = new Map();
								return array.filter(item => !res.has(item[property]) && res.set(item[property], 1));
							}

							function compareFn(property) {
								// 比较函数
								return (m, n) => {
									const a = m[property];
									const b = n[property];
									return a - b; // 升序
								};
							}
							break;
						}
					}
					break;
				case "api.bilibili.com":
				case "api.biliapi.net":
					break;
			}
			$response.body = JSON.stringify(body);
			break;
		case "application/protobuf":
		case "application/x-protobuf":
		case "application/vnd.google.protobuf":
		case "application/grpc":
		case "application/grpc+proto":
		case "application/octet-stream": {
			//Console.debug(`$response.body: ${JSON.stringify($response.body)}`);
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			//Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
			/******************  initialization start  *******************/
			/******************  initialization finish  *******************/
			// 写入二进制数据
			$response.body = rawBody;
			break;
		}
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));
