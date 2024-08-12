// 2024-08-12 22:41:30
const url = $request.url;
if (url.includes("/site/icons")) {
    let obj = JSON.parse($response.body);
    if (obj.info && obj.info.icons && Array.isArray(obj.info.icons)) {
        obj.info.icons = obj.info.icons.filter(icon => icon.title !== "直播" && icon.title !== "周边商城");
    }
    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}
