import gRPC from "@nsnanocat/grpc";
import { URL } from "@nsnanocat/url";
import { $app, Console, Storage } from "@nsnanocat/util";
import database from "../function/database.mjs";
import setENV from "../function/setENV.mjs";
import { RegionShortcutReq } from "../protobuf/bilibili/app/show/v1/mixture.js";
/***************** Processing *****************/
export async function Request($request) {
	let $response;
	// 解构URL
	const url = new URL($request.url);
	Console.info(`url: ${url.toJSON()}`);
	// 获取连接参数
	const PATHs = url.pathname.split("/").filter(Boolean);
	Console.info(`PATHs: ${PATHs}`);
	/**
	 * 设置
	 * @type {{Settings: import('../types').Settings}}
	 */
	const { Settings, Configs } = setENV("BiliBili", "Enhanced", database);
	Console.logLevel = Settings.LogLevel;
	// 方法判断
	switch ($request.method) {
		case "GET":
		case "HEAD":
		case "OPTIONS":
		default:
			// 主机判断
			switch (url.hostname) {
				case "grpc.biliapi.net":
				case "app.bilibili.com":
				case "app.biliapi.net":
					switch (url.pathname) {
						case "/bilibili.app.show.v1.Mixture/RegionShortcut": {
							const rawBody = $app === "Quantumult X" ? new Uint8Array($request.bodyBytes ?? []) : ($request.body ?? new Uint8Array());
							const request = RegionShortcutReq.fromBinary(gRPC.decode(rawBody));
							Settings.Home.Tab = request.uniqueId;
							Storage.setItem("@BiliBili.Enhanced.Settings", Settings);
							$response = {
								headers: { "Content-Type": "application/grpc" },
								body: gRPC.encode(),
							};
							break;
						}
						case "/x/resource/show/tab/v2": {
							// 首页-Tab
							if (!Settings.Home?.Switch) break;
							const body = {
								code: 0,
								config: { ...Configs.Tab.config },
								data: {},
								message: "0",
							};
							// 顶栏-左侧
							body.data.top_left = { ...Configs.Tab.top_left[Settings.Home.Top_left] };
							// 顶栏-右侧
							body.data.top = Configs.Tab.top
								.map(e => {
									if (Settings.Home.Top.includes(e.id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => ({ ...e, pos: i + 1 }));
							// 顶栏-更多
							body.data.top_more = Configs.Tab.top_more
								.map(e => {
									if (Settings.Home.Top_more.includes(e.id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => ({ ...e, pos: i + 1 }));
							// 标签栏
							body.data.tab = buildTabs(Settings.Home.Tab, Configs.RegionList, Settings.Home.Tab_default);
							// 底部导航栏
							body.data.bottom = Configs.Tab.bottom
								.map(e => {
									if (Settings.Bottom.includes(e.id)) return e;
								})
								.filter(Boolean)
								.map((e, i) => ({ ...e, pos: i + 1 }));
							$response = {
								headers: { "Content-Type": "application/json; charset=utf-8" },
								body: JSON.stringify(body),
							};
							break;
						}
					}
					break;
			}
			break;
	}
	return { $request, $response };
}

function buildTabs(uniqueIds, regionList, defaultTab) {
	return uniqueIds
		.map(uniqueId => {
			const item = regionList.items[uniqueId];
			if (!item) return;
			const tab = { id: Number(uniqueId), name: item.title, uri: item.url, tab_id: item.tab_id };
			if (item.color) tab.color = item.color;
			if (uniqueId === defaultTab) tab.default_selected = 1;
			return tab;
		})
		.filter(Boolean)
		.map((tab, index) => {
			tab.pos = index + 1;
			return tab;
		});
}
