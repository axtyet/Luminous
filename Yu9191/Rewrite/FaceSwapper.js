
/*

FaceSwapper解锁VIP
原@chxm1023

[rewrite_local]
^https?:\/\/api-.*\.facereplacerext\.com\/api\/rest\/commerce\/integrate\/vip\/perform url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/FaceSwapper.js

[mitm]
hostname = api-sgp.facereplacerext.com

*/


var obj = JSON.parse($response.body);

obj.data.list = [{
  "startTime" : 1703477754000,
  "orderId" : "340001399999999",
  "isTrialPeriod" : true,
  "endTime" : 4092599349000,
  "productId" : "73_premium_normal_yearly",
  "productType" : 3,
  "orderStatus" : 1,
  "autoRenewStatus" : true,
  "originalOrderId" : "340001399999999",
  "sign" : "c5e5450b552ac10149dcd7d4625b1ad2"
}];

$done({body : JSON.stringify(obj)});
