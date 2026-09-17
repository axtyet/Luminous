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
		data.top_left = configs.Tab.top_left[settings.Home.Top_left];
		// 顶栏右侧。
		// Top bar right.
		data.top = configs.Tab.top
			.map(item => {
				if (settings.Home.Top.includes(item.id)) return item;
			})
			.filter(Boolean)
			.map((item, index) => ({ ...item, pos: index + 1 }));
		// 顶栏更多。
		// Top bar more.
		data.top_more = configs.Tab.top_more
			.map(item => {
				if (settings.Home.Top_more.includes(item.id)) return item;
			})
			.filter(Boolean)
			.map((item, index) => ({ ...item, pos: index + 1 }));
		// 标签栏。
		// Tab bar.
		data.tab = Tab.#build(settings.Home.Tab, configs.RegionList, settings.Home.Tab_default);
		// 底部导航栏。
		// Bottom navigation bar.
		data.bottom = configs.Tab.bottom
			.map(item => {
				if (settings.Bottom.includes(item.id)) return item;
			})
			.filter(Boolean)
			.map((item, index) => ({ ...item, pos: index + 1 }));
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
			.map((tab, index) => ({ ...tab, pos: index + 1 }));
	}
}
