/*************************************

项目名称：MOZE-记账
下载地址：https://t.cn/A60ABDWL
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/Revenuecat/MOZE.js
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/Revenuecat/MOZE.js

[mitm]
hostname = api.revenuecat.com

*************************************/


const chxm1023 = {};
const chxm1024 = JSON.parse(typeof $response != "undefined" && $response.body || null);
if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  chxm1023.headers = $request.headers;
} else if (chxm1024 && chxm1024.subscriber) {
  chxm1024.subscriber.subscriptions = chxm1024.subscriber.subscriptions || {};
  chxm1024.subscriber.entitlement = chxm1024.subscriber.entitlement || {};
  const app = 'cm';const list = {'cm':{name: 'MOZE_PREMIUM_SUBSCRIPTION', id: 'MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC'}};
  const data = {
   "Author": "chxm1023",
   "Telegram" : "https://t.me/chxm1023",
   "warning": "仅供学习，禁止转载或售卖",
   "original_purchase_date": "2022-09-09T09:09:09Z",
   "purchase_date": "2022-09-09T09:09:09Z",
   "ownership_type": "PURCHASED"};
for (const i in list) { if (new RegExp(`^${i}`, `i`).test(app)) {
  chxm1024.subscriber.subscriptions[list[i].id] = data;
  chxm1024.subscriber.entitlements[list[i].name] = JSON.parse(JSON.stringify(data));
  chxm1024.subscriber.entitlements[list[i].name].product_identifier = list[i].id;
                break;
          }
    }
    chxm1023.body = JSON.stringify(chxm1024);
}

$done(chxm1023);
