// 2024-08-12 22:31:22
const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

function filterIcons(obj) {
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
}

function filterInfo(obj) {
    const titlesToFilter = ["直播间", "广播剧", "免流服务"];
    if (obj.info && obj.info.title) {
        obj.info.title = obj.info.title.filter(title => !titlesToFilter.includes(title));
    }
}

if (url.includes("/site/icons")) {
    filterIcons(obj);
    filterInfo(obj);
}

$done({ body: JSON.stringify(obj) });
