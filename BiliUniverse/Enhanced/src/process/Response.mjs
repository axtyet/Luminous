import { RegionListReply } from "@biliverse/protobuf/bilibili/app/show/v1/mixture.js";
import gRPC from "@nsnanocat/grpc";
import { URL } from "@nsnanocat/url";
import { Lodash as _, $app, Console } from "@nsnanocat/util";
import Mine from "../class/Mine.mjs";
import Region from "../class/Region.mjs";
import Tab from "../class/Tab.mjs";
import database from "../function/database.mjs";
import fixHeaders from "../function/fixHeaders.mjs";
import setENV from "../function/setENV.mjs";
/**
 * 处理拦截响应。
 * Process an intercepted response.
 * @param {object} $request - 原始请求 / Original request.
 * @param {object} $response - 原始响应 / Original response.
 * @returns {Promise<object>} 处理后的响应 / Processed response.
 */
export async function Response($request, $response) {
	// 解构 URL。
	// Destructure the URL.
	const url = new URL($request.url);
	Console.info(`url: ${url.toJSON()}`);
	// 获取连接参数。
	// Get connection parameters.
	const PATHs = url.pathname.split("/").filter(Boolean);
	Console.info(`PATHs: ${PATHs}`);
	// 解析格式。
	// Parse the format.
	const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
	Console.info(`FORMAT: ${FORMAT}`);
	/**
	 * 当前模块设置。
	 * Current module settings.
	 * @type {{Settings: import('../types').Settings}}
	 */
	const { Settings, Configs } = setENV("Biliverse", "Enhanced", database);
	Console.logLevel = Settings.LogLevel;
	// 创建空数据。
	// Create empty data.
	let body = { code: 0, message: "0", data: {} };
	// 格式判断。
	// Format handling.
	switch (FORMAT) {
		case undefined:
			// 视为无 body。
			// Treat as no body.
			break;
		case "application/x-www-form-urlencoded":
		case "text/plain":
		default:
			break;
		case "application/x-mpegURL":
		case "application/x-mpegurl":
		case "application/vnd.apple.mpegurl":
		case "audio/mpegurl":
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist":
			break;
		case "text/vtt":
		case "application/vtt":
			break;
		case "text/json":
		case "application/json":
			body = JSON.parse($response.body ?? "{}");
			// 解析链接。
			// Parse the URL.
			switch (url.hostname) {
				case "www.bilibili.com":
					break;
				case "app.bilibili.com":
				case "app.biliapi.net":
					switch (url.pathname) {
						case "/x/resource/show/tab/v2":
							// 首页标签页。
							// Homepage tabs.
							if (Settings.Home?.Switch) {
								const data = _.get(body, "data", {});
								Tab.replace(data, Settings, Configs);
								_.set(body, "data", data);
							}
							break;
						case "/x/resource/show/tab/bubble":
							// 首页标签页气泡。
							// Homepage tab bubble.
							break;
						case "/x/v2/account/mine":
							// 我的账户信息。
							// Mine account information.
							{
								const data = _.get(body, "data", {});
								if (Settings.Mine?.Switch) {
									Mine.replaceSections(data, Settings.Mine);
								}
								if (body.code === 0) Mine.addEntry(data);
								_.set(body, "data", data);
							}
							break;
						case "/x/v2/account/mine/ipad":
							// iPad 我的账户信息。
							// iPad Mine account information.
							{
								const data = _.get(body, "data", {});
								if (Settings.Mine?.iPad?.Switch) {
									Mine.replacePadSections(data, Settings.Mine.iPad);
								}
								if (body.code === 0) Mine.addEntry(data, true);
								_.set(body, "data", data);
							}
							break;
						case "/x/v2/region/index":
						case "/x/v2/channel/region/list": {
							if (Settings.Region?.Switch) {
								_.set(body, "data", Region.replaceIndex(_.get(body, "data", []), url.pathname, Settings.Region));
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
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			switch (FORMAT) {
				case "application/grpc":
				case "application/grpc+proto":
					$response.headers = fixHeaders($request.headers, $response.headers);
					rawBody = gRPC.decode(rawBody);
					switch (url.hostname) {
						case "grpc.biliapi.net":
						case "app.biliapi.net":
						case "app.bilibili.com":
							switch (url.pathname) {
								case "/bilibili.app.show.v1.Mixture/RegionList": {
									body = RegionListReply.fromBinary(rawBody);
									_.set(body, "contents", Region.mergeLists(_.get(body, "contents", []), Configs.RegionList));
									_.set(body, "shortcut", { title: "自定义标签页", icons: Region.buildShortcutIcons(Settings.Home.Tab, Configs.RegionList) });
									rawBody = RegionListReply.toBinary(body);
									break;
								}
							}
							break;
					}
					rawBody = gRPC.encode(rawBody);
					break;
			}
			// 写入二进制数据。
			// Write binary data.
			$response.body = rawBody;
			break;
		}
	}
	return $response;
}
