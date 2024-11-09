/*************************************

项目名称：adapty-合集
下载地址：https://t.cn/A6NiBJqw
更新日期：2024-11-09
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.adapty\.io\/api\/v\d\/sdk\/(analytics\/profiles|in-apps\/(apple\/receipt\/validate|purchase-containers)|purchase\/app-store) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/adapty.js

[mitm]
hostname = api.adapty.io

*************************************/


let chxm1023 = JSON.parse($response.body);
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const profileid = headers['adapty-sdk-profile-id'] || headers['ADAPTY-SDK-PROFILE-ID'];
const time = Date.now(); // 当前时间戳

const list = {
  'KeyboardGPT': { dy: 'dypda', id: "smart.keyboard.yearly.01", bundle_id: "com.smart.keyboard" },  //AiChatbot
  'SketchAR': { dy: 'dypda', id: "tech.sketchar.subscription.yearly", bundle_id: "tech.sketchar.ios" },  //Sketchar-AR画图应用
  'universal': { dy: 'dypda', id: "remotetv.yearly.01", bundle_id: "com.universal.remotetv", },  //TVRemote万能遥控器
  'Lingvist': { dy: 'dypda', id: "com.lingvist.unlimited_12_months.v11.full_1md_ft", bundle_id: "ee.keel24.Lingvist" },  //Lingvist-学习英语
  'ChatAI': { dy: 'dypda', id: "chatai_yearly_ios", bundle_id: "com.scaleup.chatai" },  //Nova-chat机器人
  'FacePlus': { dy: 'dypda', id: "faceplus_yearly_subs_3dft_ios", bundle_id: "com.scaleup.faceplus" },  //Retouch: Al FaceEditor
  'Batched': { dy: 'dypdba', id: "com.advasoft.batched.premium_year", bundle_id: "com.advasoft.batched" }  //Batched-多量图片编辑器
};

const premiumTemplate = {"id":"premium","is_lifetime":false,"store":"app_store","starts_at":"2024-01-23T09:09:09.000000+0000","expires_at":"2099-09-09T09:09:09.000000+0000","will_renew":true,"is_active":true,"is_in_grace_period":false,"activated_at":"2024-01-23T09:09:09.000000+0000","renewed_at":"2024-01-23T09:09:09.000000+0000","is_refund":false,"vendor_transaction_id":"490001234567890","vendor_original_transaction_id":"490001234567890","is_sandbox":false,"active_introductory_offer_type":"trial"};

const receiptTemplate = {"quantity":"1","purchase_date_ms":"1706000949000","expires_date":"2099-09-09 09:09:09 Etc/GMT","expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles","is_in_intro_offer_period":"false","transaction_id":"490001234567890","is_trial_period":"true","original_transaction_id":"490001271881589","purchase_date":"2024-01-23 09:09:09 Etc/GMT","original_purchase_date_pst":"2024-01-23 01:09:09 America/Los_Angeles","in_app_ownership_type":"PURCHASED","original_purchase_date_ms":"1706000949000","web_order_line_item_id":"490001234567890","expires_date_ms":"4092628149000","purchase_date_pst":"2024-01-23 01:09:09 America/Los_Angeles","original_purchase_date":"2024-01-23 09:09:09 Etc/GMT"};

const buildSubscriptionData = function(appConfig) {
  const subscriptions = {};
  const receiptData = [];
  subscriptions[appConfig.id] = Object.assign({}, premiumTemplate, { "vendor_product_id": appConfig.id });
  receiptData.push(Object.assign({}, receiptTemplate, { "product_id": appConfig.id }));
  if (appConfig.dy === "dypdb" && appConfig.ids) {
    subscriptions[appConfig.ids] = Object.assign({}, premiumTemplate, { "vendor_product_id": appConfig.ids });
    receiptData.push(Object.assign({}, receiptTemplate, { "product_id": appConfig.ids }));
  }
  return { subscriptions, receiptData };
}

const buildResponseData = function(appConfig) {
  const { subscriptions, receiptData } = buildSubscriptionData(appConfig);
  const appleValidationResult = {"environment":"Production","receipt":{"receipt_type":"Production","app_item_id":1560806510,"bundle_id":appConfig.bundle_id,"in_app":receiptData,"original_purchase_date":"2024-01-23 09:09:09 Etc/GMT"},"status":0,"pending_renewal_info":[{"expiration_intent":"1","product_id":appConfig.id,"is_in_billing_retry_period":"0","auto_renew_product_id":appConfig.id,"auto_renew_status":"0"}],"latest_receipt_info":receiptData,"latest_receipt":"chxm1023"};
  return {"data":{"type":"adapty_inapps_apple_receipt_validation_result","id":profileid,"attributes":{"app_id":"56eb457c-6ad4-40aa-9b29-ea29e10e3505","profile_id":profileid,"segment_hash":"8245f974014fdf4c","subscriptions":subscriptions,"total_revenue_usd":0,"paid_access_levels":{"premium":Object.assign({},premiumTemplate,{"vendor_product_id":appConfig.id})},"apple_validation_result":appleValidationResult}}};
}

for (const appName in list) {
  if (new RegExp(`^${appName}`, 'i').test(ua)) {
    const appConfig = list[appName];
    if (/receipt\/validate|purchase-containers/.test($request.url)) {
      chxm1023 = buildResponseData(appConfig);
    } else if (/analytics\/profiles|purchase\/app-store/.test($request.url)) {
      chxm1023.data = Object.assign({}, chxm1023.data,{"type":"adapty_purchase_app_store_original_transaction_id_validation_result","id":profileid,"attributes":{"app_id":"56eb457c-6ad4-40aa-9b29-ea29e10e3505","profile_id":profileid,"is_test_user":false,"segment_hash":"8245f974014fdf4c","timestamp":time,"apple_validation_result":{"environment":"Production","revision":"1726387136000_490001234567890_4","appAppleId":1560806510,"transactions":[{"productId":appConfig.id,"storefront":"US","transactionId":"490001234567890","originalTransactionId":"490001234567890","expiresDate":"2099-09-09T09:09:09Z","purchaseDate":"2024-01-23 09:09:09Z"}],"bundleId":appConfig.bundle_id},"subscriptions":buildSubscriptionData(appConfig).subscriptions,"paid_access_levels":{"premium":Object.assign({},premiumTemplate,{"vendor_product_id":appConfig.id})}}});
    }
    console.log("操作成功 🎉\n叮当猫分享频道: https://t.me/chxm1023");
    break;
  }
}

$done({ body: JSON.stringify(chxm1023) });