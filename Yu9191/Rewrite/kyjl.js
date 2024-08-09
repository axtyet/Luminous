/*
口语精灵
开脚本登录
退出登录重新登录
[rewrite_local]

https://api-sprite.notehot.cn/api/user url script-request-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/kyjl.js

hostname = api-sprite.notehot.cn

*/
var body = JSON.parse($response.body);
body.data.vipInfo.isVip = true;
body.data.vipInfo.isPermanentVip = true;
$done({ body: JSON.stringify(body) });
