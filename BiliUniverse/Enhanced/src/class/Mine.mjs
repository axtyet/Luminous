import { Lodash as _, Console } from "@nsnanocat/util";

/**
 * 我的页响应转换器。
 * Mine page response transformer.
 */
export default class Mine {
	/**
	 * 我的页静态配置。
	 * Mine page static configuration.
	 */
	static #Config = {
		sections_v2: [
			{
				items: [
					{
						id: 396,
						title: "离线缓存",
						icon: "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png",
						common_op_item: {},
						uri: "bilibili://user_center/download",
					},
					{
						id: 397,
						title: "历史记录",
						icon: "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png",
						common_op_item: {},
						uri: "bilibili://user_center/history",
					},
					{
						id: 398,
						title: "我的收藏",
						icon: "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png",
						common_op_item: {},
						uri: "bilibili://user_center/favourite",
					},
					{
						id: 399,
						title: "稍后再看",
						icon: "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
						need_login: 1,
						uri: "bilibili://user_center/watch_later",
						common_op_item: {},
					},
				],
				style: 1,
				button: {},
			},
			{
				up_title: "创作中心",
				title: "创作中心",
				items: [
					{
						need_login: 1,
						display: 1,
						id: 171,
						title: "创作中心",
						global_red_dot: 1,
						uri: "bilibili://uper/homevc",
						icon: "http://i0.hdslb.com/bfs/archive/d3aad2d07538d2d43805f1fa14a412d7a45cc861.png",
					},
					{
						need_login: 1,
						display: 1,
						id: 172,
						title: "稿件管理",
						global_red_dot: 1,
						uri: "bilibili://uper/user_center/archive_list",
						icon: "http://i0.hdslb.com/bfs/archive/97acb2d8dec09b296a38f7f7093d651947d13b91.png",
					},
					{
						need_login: 1,
						display: 1,
						id: 174,
						title: "有奖活动",
						red_dot: 1,
						global_red_dot: 1,
						uri: "https://member.bilibili.com/york/hot-activity",
						icon: "http://i0.hdslb.com/bfs/archive/7f4fa86d99bf3814bf10f8ee5d6c8c9db6e931c8.png",
					},
					{
						need_login: 1,
						display: 1,
						id: 533,
						title: "任务中心",
						global_red_dot: 1,
						uri: "https://member.bilibili.com/york/mission-center?navhide=1",
						icon: "http://i0.hdslb.com/bfs/archive/ae18624fd2a7bdda6d95ca606d5e4cf2647bfa4d.png",
					},
					{
						id: 707,
						title: "主播中心",
						icon: "http://i0.hdslb.com/bfs/feed-admin/48e17ccd0ce0cfc9c7826422d5e47ce98f064c2a.png",
						need_login: 1,
						uri: "https://live.bilibili.com/p/html/live-app-anchor-center/index.html?is_live_webview=1#/",
						display: 1,
					},
					{
						id: 708,
						title: "主播活动",
						icon: "http://i0.hdslb.com/bfs/feed-admin/5bc5a1aa8dd4bc5d6f5222d29ebaca9ef9ce37de.png",
						need_login: 1,
						uri: "https://live.bilibili.com/activity/live-activity-full/activity_center/mobile.html?is_live_webview=1",
						display: 1,
					},
					{
						id: 709,
						title: "开播福利",
						icon: "https://i0.hdslb.com/bfs/legacy/97a52b64cbd8c099d6520c6be57006c954ec0f5c.png",
						need_login: 1,
						uri: "https://live.bilibili.com/p/html/live-anchor-galaxy/task_center/?source_event=16&week_live_btn=1&is_live_full_webview=1#/",
						display: 1,
					},
					{
						id: 710,
						title: "我的直播",
						icon: "http://i0.hdslb.com/bfs/feed-admin/a9be4fa50ea4772142c1fc7992cde28294d63021.png",
						need_login: 1,
						uri: "https://live.bilibili.com/p/html/live-app-center/index.html?is_live_webview=1&foreground=pink&background=white",
						display: 1,
					},
				],
				style: 1,
				button: {
					icon: "http://i0.hdslb.com/bfs/archive/205f47675eaaca7912111e0e9b1ac94cb985901f.png",
					style: 1,
					url: "bilibili://uper/user_center/archive_selection",
					text: "发布",
				},
				type: 1,
			},
			{
				title: "推荐服务",
				items: [
					{
						id: 400,
						title: "我的课程",
						icon: "http://i0.hdslb.com/bfs/archive/aa3a13c287e4d54a62b75917dd9970a3cde472e1.png",
						common_op_item: {},
						uri: "https://m.bilibili.com/cheese/mine?navhide=1&native.theme=1&night=0&spm_id_from=main.my-information.0.0.pv&csource=Me_myclass",
					},
					{
						id: 401,
						title: "看视频免流量",
						icon: "http://i0.hdslb.com/bfs/archive/393dd15a4f0a149e016cd81b55bd8bd6fe40882c.png",
						common_op_item: {},
						uri: "bilibili://user_center/free_traffic",
					},
					{
						id: 402,
						title: "个性装扮",
						icon: "http://i0.hdslb.com/bfs/archive/0bcad10661b50f583969b5a188c12e5f0731628c.png",
						common_op_item: {},
						uri: "https://www.bilibili.com/h5/mall/home?navhide=1&f_source=shop",
					},
					{
						id: 403,
						title: "游戏中心",
						icon: "http://i0.hdslb.com/bfs/archive/873e3c16783fe660b111c02ebc4c50279cb5db57.png",
						common_op_item: {},
						uri: "bilibili://game_center/user?sourceFrom=100003",
					},
					{
						id: 404,
						title: "我的钱包",
						icon: "http://i0.hdslb.com/bfs/archive/f416634e361824e74a855332b6ff14e2e7c2e082.png",
						need_login: 1,
						common_op_item: {},
						uri: "bilibili://bilipay/mine_wallet",
					},
					{
						id: 406,
						title: "直播中心",
						icon: "http://i0.hdslb.com/bfs/archive/1db5791746a0112890b77a0236baf263d71ecb27.png",
						common_op_item: {},
						uri: "bilibili://user_center/live_center",
					},
					{
						id: 423,
						title: "邀好友赚红包",
						icon: "http://i0.hdslb.com/bfs/archive/de39fc8899204a4e5abaab68fa4bd604068ce124.png",
						common_op_item: {},
						uri: "https://www.bilibili.com/blackboard/redpack/activity-8SX5lYqUj.html?from=wode",
						red_dot_for_new: true,
					},
					{
						id: 514,
						title: "社区中心",
						icon: "http://i0.hdslb.com/bfs/archive/551a39b7539e64d3b15775295c4b2e13e5513b43.png",
						need_login: 1,
						uri: "https://www.bilibili.com/blackboard/dynamic/169422",
						common_op_item: {},
					},
					{
						id: 544,
						title: "创作中心",
						icon: "http://i0.hdslb.com/bfs/archive/a879489af0406067c39940316396ae63aeefe088.png",
						need_login: 1,
						uri: "bilibili://upper/homevc",
						common_op_item: {},
					},
					{
						id: 622,
						title: "会员购中心",
						icon: "http://i0.hdslb.com/bfs/archive/19c794f01def1a267b894be84427d6a8f67081a9.png",
						common_op_item: {},
						uri: "bilibili://mall/mine?msource=mine",
					},
					{
						id: 924,
						title: "哔哩哔哩公益",
						icon: "http://i0.hdslb.com/bfs/feed-admin/a943016e8bef03222998b4760818894ba2bd5c80.png",
						common_op_item: {},
						uri: "https://love.bilibili.com/h5/?navhide=1&c=1",
					},
					{
						id: 990,
						title: "能量加油站",
						icon: "http://i0.hdslb.com/bfs/feed-admin/6acb0cb1f719703c62eb443ba6cf3abfc51164ab.png",
						common_op_item: {},
						uri: "https://www.bilibili.com/blackboard/dynamic/306424",
					},
				],
				style: 1,
				button: {},
			},
			{
				title: "更多服务",
				items: [
					{
						id: 407,
						title: "联系客服",
						icon: "http://i0.hdslb.com/bfs/archive/7ca840cf1d887a45ee1ef441ab57845bf26ef5fa.png",
						common_op_item: {},
						uri: "bilibili://user_center/feedback",
					},
					{
						id: 410,
						title: "设置",
						icon: "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
						common_op_item: {},
						uri: "bilibili://user_center/setting",
					},
					{
						id: 741,
						title: "我的钱包",
						icon: "http://i0.hdslb.com/bfs/archive/f416634e361824e74a855332b6ff14e2e7c2e082.png",
						need_login: 1,
						uri: "bilibili://bilipay/mine_wallet",
						common_op_item: {},
					},
					{
						id: 742,
						title: "稿件管理",
						icon: "http://i0.hdslb.com/bfs/archive/97acb2d8dec09b296a38f7f7093d651947d13b91.png",
						need_login: 1,
						uri: "bilibili://uper//user_center/manuscript-list/",
						common_op_item: {},
					},
					{
						id: 812,
						title: "听视频",
						icon: "http://i0.hdslb.com/bfs/feed-admin/97276c5df099e516946682edf4ef10dc6b18c7dc.png",
						common_op_item: {},
						uri: "bilibili://podcast",
						red_dot_for_new: true,
					},
					{
						id: 950,
						title: "青少年模式",
						icon: "http://i0.hdslb.com/bfs/archive/68acfd37a735411ad56b59b3253acc33f94f7046.png",
						common_op_item: {},
						uri: "bilibili://user_center/teenagersmode",
					},
					{
						id: 964,
						title: "青少年守护",
						icon: "http://i0.hdslb.com/bfs/feed-admin/90f5920ac351da19c6451757ad71704fcea8192b.png",
						common_op_item: {},
						uri: "https://www.bilibili.com/h5/teenagers/home?navhide=1",
					},
					{
						id: 1028,
						title: "我的NFT",
						icon: "http://i0.hdslb.com/bfs/feed-admin/569a9178aa707f2f2494e34bb6eb1d9d14bd9a7b.png",
						need_login: 1,
						uri: "https://www.bilibili.com/h5/pangu/gat?navhide=1",
						common_op_item: {},
					},
				],
				style: 2,
				button: {},
			},
		],
		ipad_upper_sections: [
			{ id: 785, title: "投稿", uri: "/uper/user_center/add_archive", icon: "http://i0.hdslb.com/bfs/feed-admin/d0ad3c04df2253bfe0261cadd7adca1f1433eb50.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 786, title: "创作首页", uri: "/uper/homevc", icon: "http://i0.hdslb.com/bfs/feed-admin/d20dfed3b403c895506b1c92ecd5874abb700c01.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 787, title: "稿件管理", uri: "/uper/user_center/archive_list", icon: "http://i0.hdslb.com/bfs/feed-admin/325609d2b6059f278683d773636bf48681da9d6c.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 788, title: "有奖活动", uri: "https://www.bilibili.com/blackboard/x/activity-tougao-h5/all", icon: "http://i0.hdslb.com/bfs/feed-admin/3ad73f45adfdeb999bb11a306dc8c8e169b426d9.png", mng_resource: { icon_id: 0, icon: "" } },
		],
		ipad_recommend_sections: [
			{ id: 789, title: "我的关注", uri: "bilibili://user_center/myfollows", icon: "http://i0.hdslb.com/bfs/feed-admin/fdd7f676030c6996d36763a078442a210fc5a8c0.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 790, title: "我的消息", uri: "bilibili://link/im_home", icon: "http://i0.hdslb.com/bfs/feed-admin/e1471740130a08a48b02a4ab29ed9d5f2281e3bf.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 791, title: "我的钱包", uri: "bilibili://bilipay/mine_wallet", icon: "http://i0.hdslb.com/bfs/feed-admin/180f089fd2debb522919b22e08546cf5bc279026.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 792, title: "直播中心", uri: "bilibili://user_center/live_center", icon: "http://i0.hdslb.com/bfs/feed-admin/d7255968066cef435370b18e87bdf3ac62d2bc14.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 793, title: "大会员", uri: "bilibili://user_center/vip", icon: "http://i0.hdslb.com/bfs/feed-admin/a7d52c532beaedbec7c40883788b5d9c8adf96be.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 794, title: "我的课程", uri: "bilibili://user_center/course", icon: "http://i0.hdslb.com/bfs/feed-admin/a2139eb7b1ac17c12fa26aff70efe5852195c53d.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 2542, title: "我的游戏", uri: "bilibili://hd/game/my_game", icon: "https://i0.hdslb.com/bfs/legacy/59bf32e258af044a47badb39f3093286d92eb6d3.png", mng_resource: { icon_id: 0, icon: "" } },
		],
		ipad_more_sections: [
			{ id: 797, title: "我的客服", uri: "bilibili://user_center/feedback", icon: "http://i0.hdslb.com/bfs/feed-admin/7801a6180fb67cf5f8ee05a66a4668e49fb38788.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 798, title: "设置", uri: "bilibili://user_center/setting", icon: "http://i0.hdslb.com/bfs/feed-admin/34e8faea00b3dd78977266b58d77398b0ac9410b.png", mng_resource: { icon_id: 0, icon: "" } },
			{ id: 1070, title: "青少年守护", uri: "https://www.bilibili.com/h5/teenagers/home?navhide=1", icon: "https://i0.hdslb.com/bfs/feed-admin/90f5920ac351da19c6451757ad71704fcea8192b.png", mng_resource: { icon_id: 0, icon: "" } },
		],
		BaseURI: "https://app.bilibili.com/settings/",
		SettingsURI: "bilibili://user_center/setting",
		URI: "bilibili://web/general?url=https%3A%2F%2Fapp.bilibili.com%2Fsettings%2F",
	};

	/**
	 * 用配置替换我的页服务分组。
	 * Replace Mine page service sections with configuration.
	 * @param {object} data - 我的页响应数据 / Mine page response data.
	 * @param {object} settings - 我的页设置 / Mine page settings.
	 * @param {boolean} debug - 是否输出开发调试信息 / Whether to emit development debug output.
	 * @returns {void} 无返回值 / No return value.
	 */
	static replaceSections(data, settings, debug = false) {
		_.set(
			data,
			"sections_v2",
			Mine.#Config.sections_v2.flatMap(template => {
				const section = { ...template, items: template.items.map(item => ({ ...item })) };
				if (debug) Console.debug(`e.title = ${section.title}`);
				switch (section.title) {
					case "创作中心":
						section.items = section.items.filter(item => _.get(settings, "CreatorCenter").includes(item.id));
						break;
					case "推荐服务":
						section.items = section.items.filter(item => _.get(settings, "Recommend").includes(item.id));
						break;
					case "更多服务":
						section.items = section.items.filter(item => _.get(settings, "More").includes(item.id));
						break;
				}
				return section.items.length ? [section] : [];
			}),
		);
	}

	/**
	 * 用配置替换 iPad 我的页服务分组。
	 * Replace iPad Mine page service sections with configuration.
	 * @param {object} data - iPad 我的页响应数据 / iPad Mine page response data.
	 * @param {object} settings - iPad 我的页设置 / iPad Mine page settings.
	 * @returns {void} 无返回值 / No return value.
	 */
	static replacePadSections(data, settings) {
		_.set(
			data,
			"ipad_upper_sections",
			Mine.#Config.ipad_upper_sections.filter(item => _.get(settings, "Upper").includes(item.id)),
		);
		_.set(
			data,
			"ipad_recommend_sections",
			Mine.#Config.ipad_recommend_sections.filter(item => _.get(settings, "Recommend").includes(item.id)),
		);
		_.set(
			data,
			"ipad_more_sections",
			Mine.#Config.ipad_more_sections.filter(item => _.get(settings, "More").includes(item.id)),
		);
	}

	/**
	 * 始终在更多服务中写入 Biliverse 哔哩万象入口。
	 * Always insert the Biliverse entry into More Services.
	 * @param {object} data - 我的页响应数据 / Mine page response data.
	 * @param {boolean} ipad - 是否为 iPad 响应 / Whether this is an iPad response.
	 * @returns {void} 无返回值 / No return value.
	 */
	static addEntry(data, ipad = false) {
		const sections = _.get(data, "sections_v2", []);
		const paths = ipad ? ["ipad_upper_sections", "ipad_recommend_sections", "ipad_more_sections"] : sections.map((_item, index) => ["sections_v2", index, "items"]);
		for (const path of paths) {
			const items = _.get(data, path, []);
			for (let index = items.length - 1; index >= 0; index--) {
				if (items[index].id === 129515498 || items[index].uri === Mine.#Config.URI || [Mine.#Config.BaseURI, "https://biliverse.github.io/settings/"].includes(items[index].uri?.split(/[?#]/)[0])) items.splice(index, 1);
			}
		}
		let targetPath = "ipad_more_sections";
		if (!ipad) {
			let index = sections.findIndex(item => item.title === "更多服务");
			if (index < 0) {
				const template = Mine.#Config.sections_v2.find(item => item.title === "更多服务");
				index = sections.length;
				_.set(data, ["sections_v2", index], { ...template, items: [] });
			}
			targetPath = ["sections_v2", index, "items"];
		}
		const items = _.get(data, targetPath, []);
		const settingsIndex = items.findIndex(item => item.uri === Mine.#Config.SettingsURI);
		items.splice(settingsIndex < 0 ? items.length : settingsIndex + 1, 0, {
			id: 129515498,
			title: "Biliverse 哔哩万象",
			icon: "https://biliverse.github.io/settings/assets/Biliverse_subject.png",
			uri: Mine.#Config.URI,
			common_op_item: {},
		});
		_.set(data, targetPath, items);
	}
}
