// 2024-07-14 01:02:36
var json = JSON.parse($response.body);

// 需要删除的路径
var pathsToDelete = [
    "values.me_config.common_service_list[0]", // 我的云笔记
    "values.me_config.common_service_list[1]", // 迅雷浏览器
    "values.me_config.common_service_list[2]", // 迅雷TV
    "values.me_config.common_service_list[3]", // 金融专区
    "values.me_config.common_service_list[4]", // 迅雷快鸟
    "values.me_config.entrance_list[6]", // 迅雷小说
    "values.me_config.banner_service_list" // 云盘横幅
];

// 删除指定路径
pathsToDelete.forEach(function(path) {
    var parts = path.split('.');
    var current = json;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (i === parts.length - 1) {
            if (current.hasOwnProperty(part)) {
                delete current[part];
            }
        } else {
            if (current.hasOwnProperty(part)) {
                current = current[part];
            } else {
                break;
            }
        }
    }
});

$done({ body: JSON.stringify(json) });