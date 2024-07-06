/*************************************

项目名称：SNOW-相机
下载地址：https://t.cn/A6QSe5Tf
更新日期：2024-07-07
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/user-snow-api\.snow\.me\/v\d\/purchase\/subscription\/subscriber\/status url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/snow.js

[mitm]
hostname = user-snow-api.snow.me

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /purchase\/subscription\/subscriber\/status/;

if(user.test($request.url)){
  chxm1023.result = {
    "products" : [
      {
        "managed" : true,
        "status" : "ACTIVE",
        "startDate" : 1720288875000,
        "productId" : "com.campmobile.snow.subscribe.oneyear",
        "expireDate" : 4092599349000
      }
    ],
    "tickets" : [
      {
        "managed" : true,
        "status" : "ACTIVE",
        "startDate" : 1720288875000,
        "productId" : "com.campmobile.snow.subscribe.oneyear",
        "expireDate" : 4092599349000
      }
    ],
    "activated" : true
  };
}

$done({body : JSON.stringify(chxm1023)});
