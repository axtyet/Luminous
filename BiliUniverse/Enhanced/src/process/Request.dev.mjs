import { URL } from "@nsnanocat/url";
import { Console } from "@nsnanocat/util";
import Region from "../class/Region.mjs";
import Tab from "../class/Tab.mjs";
import database from "../function/database.mjs";
import setENV from "../function/setENV.mjs";
/**
 * 处理拦截请求。
 * Process an intercepted request.
 * @param {object} $request - 拦截请求 / Intercepted request.
 * @returns {Promise<{$request: object, $response?: object}>} 处理后的请求与可选本地响应 / Processed request and optional local response.
 */
export async function Request($request) {
	let $response;
	// 解构 URL。
	// Destructure the URL.
	const url = new URL($request.url);
	Console.info(`url: ${url.toJSON()}`);
	// 获取连接参数。
	// Get connection parameters.
	const PATHs = url.pathname.split("/").filter(Boolean);
	Console.info(`PATHs: ${PATHs}`);
	/**
	 * 当前模块设置。
	 * Current module settings.
	 * @type {{Settings: import('../types').Settings}}
	 */
	const { Settings, Configs } = setENV("Biliverse", "Enhanced", database);
	Console.logLevel = Settings.LogLevel;
	// 方法判断。
	// Method handling.
	switch ($request.method) {
		case "GET":
		case "HEAD":
		case "OPTIONS":
		default:
			// 主机判断。
			// Host handling.
			switch (url.hostname) {
				case "grpc.biliapi.net":
				case "app.bilibili.com":
				case "app.biliapi.net":
					switch (url.pathname) {
						case "/bilibili.app.show.v1.Mixture/RegionShortcut": {
							Region.saveShortcuts($request, Settings);
							$response = {
								status: 200,
								headers: {
									"Content-Type": "application/grpc",
									"grpc-status": "0",
									"grpc-message": "",
									"bili-status-code": "0",
								},
							};
							break;
						}
						case "/x/resource/show/tab/v2": {
							// 首页标签页。
							// Homepage tabs.
							if (Settings.Home?.Switch) {
								const body = {
									code: 0,
									config: { ...Configs.Tab.config },
									data: {},
									message: "0",
								};
								Tab.replace(body.data, Settings, Configs);
								$response = {
									headers: { "Content-Type": "application/json; charset=utf-8" },
									body: JSON.stringify(body),
								};
							}
							break;
						}
					}
					break;
			}
			break;
	}
	return { $request, $response };
}
