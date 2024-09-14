/*************************************

项目名称：Flow-修图/海报/相册等
下载地址：https://t.cn/A6Rd6Fu4
更新日期：2024-09-14
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/core-api\.vlognow\.me\/flow-pay\/api\/v\d\/(user\/subscriptions|public\/iap\/receipt\/status) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/Flow.js

[mitm]
hostname = core-api.vlognow.me

*************************************/


var chxm1023 = JSON.parse($response.body);

if(/user\/subscriptions/.test($request.url)){
  chxm1023 = {
    "msg" : "success",
    "data" : [
      {
        "active" : true,
        "billing_date_ms" : 1726881611000,
        "expires_date_ms" : 4092599349000,
        "group_identifier" : "20945147",
        "is_free_trial" : false,
        "platform" : "iOS",
        "product_identifier" : "Product_Auto_Renew_Annual_2022_11_30",
        "original_purchase_date_ms" : 1726276812000,
        "start_date_ms" : 1726276811000,
        "status" : 1,
        "enanled_auto_renew" : true
      }
    ],
    "code" : 1
  };
}

if(/public\/iap\/receipt\/status/.test($request.url)){
  chxm1023 = {
    "msg" : "success",
    "data" : [
      {
        "username" : "131466",
        "group_identifier" : "20945147",
        "active" : true,
        "user_id" : 131466,
        "is_trialed" : true
      }
    ],
    "code" : 1
  };
}

$done({body : JSON.stringify(chxm1023)});
