const baseUri = "https://app.bilibili.com/settings/";
const settingsUri = "bilibili://user_center/setting";
// iOS 的 web/general 路由直接创建 common WebView，url 参数保存页面的真实地址。
// The iOS web/general route creates the common WebView directly; url retains the actual page address.
const uri = `bilibili://web/general?url=${encodeURIComponent(baseUri)}`;

export function addSettingsEntry(data, ipad = false) {
	const groups = ipad ? [data.ipad_upper_sections, data.ipad_recommend_sections, data.ipad_more_sections] : (data.sections_v2?.map(section => section.items) ?? []);
	for (const items of groups) {
		if (!Array.isArray(items)) continue;
		for (let index = items.length - 1; index >= 0; index--) {
			if (items[index].id === 129515498 || items[index].uri === uri || [baseUri, "https://biliverse.github.io/settings/"].includes(items[index].uri?.split(/[?#]/)[0])) items.splice(index, 1);
		}
	}
	const items = groups.find(items => Array.isArray(items) && items.some(item => item.uri === settingsUri));
	if (!items) return;
	const settingsIndex = items.findIndex(item => item.uri === settingsUri);
	items.splice(settingsIndex + 1, 0, {
		id: 129515498,
		title: "Biliverse 哔哩万象",
		icon: "https://biliverse.github.io/settings/assets/Biliverse_subject.png",
		uri,
		common_op_item: {},
	});
}
