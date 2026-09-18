import { Lodash as _ } from "@nsnanocat/util";

/**
 * 首页标签页响应转换器。
 * Homepage tab response transformer.
 */
export default class Tab {
	/**
	 * 用配置替换首页标签页响应内容。
	 * Replace homepage tab response content with configuration.
	 * @param {object} data - 首页标签页响应数据 / Homepage tab response data.
	 * @param {object} settings - 首页配置 / Homepage settings.
	 * @param {object} configs - 首页数据配置 / Homepage data configuration.
	 * @returns {void} 无返回值 / No return value.
	 */
	static replace(data, settings, configs) {
		// 顶栏左侧。
		// Top bar left.
		_.set(data, "top_left", _.get(configs, ["Tab", "top_left", _.get(settings, "Home.Top_left")]));
		// 顶栏右侧。
		// Top bar right.
		_.set(
			data,
			"top",
			_.get(configs, "Tab.top")
				.map(item => {
					if (_.get(settings, "Home.Top").includes(item.id)) return item;
				})
				.filter(Boolean)
				.map((item, index) => ({ ...item, pos: index + 1 })),
		);
		// 顶栏更多。
		// Top bar more.
		_.set(
			data,
			"top_more",
			_.get(configs, "Tab.top_more")
				.map(item => {
					if (_.get(settings, "Home.Top_more").includes(item.id)) return item;
				})
				.filter(Boolean)
				.map((item, index) => ({ ...item, pos: index + 1 })),
		);
		// 标签栏。
		// Tab bar.
		_.set(data, "tab", Tab.#build(_.get(settings, "Home.Tab"), _.get(configs, "RegionList"), _.get(settings, "Home.Tab_default")));
		// 底部导航栏。
		// Bottom navigation bar.
		_.set(
			data,
			"bottom",
			_.get(configs, "Tab.bottom")
				.map(item => {
					if (_.get(settings, "Bottom").includes(item.id)) return item;
				})
				.filter(Boolean)
				.map((item, index) => ({ ...item, pos: index + 1 })),
		);
	}

	/**
	 * 构造已配置的首页标签栏项目。
	 * Build configured homepage tab bar items.
	 * @param {string[]} uniqueIds - 分区唯一标识列表 / Region unique identifier list.
	 * @param {object} regionList - 分区配置 / Region configuration.
	 * @param {string} defaultTab - 默认标签页唯一标识 / Default tab unique identifier.
	 * @returns {Array<object>} 首页标签栏项目 / Homepage tab bar items.
	 */
	static #build(uniqueIds, regionList, defaultTab) {
		if (uniqueIds.length === 1 && uniqueIds[0] === "0") return [];
		return uniqueIds
			.map(uniqueId => {
				const item = _.get(regionList, ["items", uniqueId]);
				const tab = { id: Number(uniqueId), name: item.title, uri: item.url, tab_id: item.tab_id };
				if (item.color) tab.color = item.color;
				if (uniqueId === defaultTab) tab.default_selected = 1;
				return tab;
			})
			.map((tab, index) => ({ ...tab, pos: index + 1 }));
	}
}
