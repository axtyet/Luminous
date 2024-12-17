/*************************************

项目名称：佩奇影视-净化
下载地址：www.peiqi.tv
更新日期：2024-12-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/162\.209\.166\.196:6080\/pqys\.php\/v\d\/(app_config|top_notice) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Advertising/peiqitv.js

*************************************/


var chxm1023 = JSON.parse($response.body);

if(/app_config/.test($request.url)){
  chxm1023.data.img_config = {
    "portrait_img_loading_default" : "",
    "splash_img" : "",
    "landscape_img_loading_default" : ""
  };
}

if(/top_notice/.test($request.url)){
  chxm1023 = {};
}

$done({body : JSON.stringify(chxm1023)});