/*************************************

项目名称：SmartGym
下载地址：https://t.cn/A6BfQvpH
更新日期：2025-03-14
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.smartgymapp\.com\/.+\/explore\/trialWorkouts url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/SmartGym.js
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/iTunes.js

[mitm]
hostname = api.smartgymapp.com, buy.itunes.apple.com

*************************************/


let body = $response.body;

body = body.replace(/"locked":\s*true/g, '"locked": false');

$done({ body });