// 2024-08-13 15:50:56
const url = $request.url;
if (url.includes("/site/icons")) {
    let obj = JSON.parse($response.body);
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
    $done({ body: JSON.stringify(obj) });
} else if (url.includes("/discovery/list")) {
    let obj = JSON.parse($response.body);
    for (var info of obj.info) {
        info = info.filter(item => {
            return item.title === '直播间' || item.title === '广播剧' || item.title === '免流服务'
        })
    }
    $done({body:obj})
} else {
    $done({});
}