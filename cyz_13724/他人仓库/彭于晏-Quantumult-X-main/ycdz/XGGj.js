/******************************

脚本功能：习惯管家-HabitMinder——解锁订阅
下载地址：https://is.gd/9kOWff
软件版本：2.8.0
脚本作者：彭于晏💞
更新时间：2023-3-4
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/XGGj.js

[mitm] 

hostname = buy.itunes.apple.com


*******************************/


var objc = JSON.parse($response.body);

    objc = 
{"environment":"Production", 
"receipt":{"receipt_type":"Production", "adam_id":1253577148, "app_item_id":1253577148, "bundle_id":"com.funnmedia.habitminder", "application_version":"442", "download_id":501800147728314574, "version_external_identifier":848002022, "receipt_creation_date":"2022-10-03 01:06:19 Etc/GMT", "receipt_creation_date_ms":"1664759179000", "receipt_creation_date_pst":"2022-10-02 18:06:19 America/Los_Angeles", "request_date":"2022-10-03 01:07:54 Etc/GMT", "request_date_ms":"1664759274889", "request_date_pst":"2022-10-02 18:07:54 America/Los_Angeles", "original_purchase_date":"2022-10-03 01:04:05 Etc/GMT", "original_purchase_date_ms":"1664759045000", "original_purchase_date_pst":"2022-10-02 18:04:05 America/Los_Angeles", "original_application_version":"442", 
"in_app":[
{"quantity":"1", "product_id":"habitminder.yearlysubscription", "transaction_id":"430001236977054", "original_transaction_id":"430001236977054", "purchase_date":"2022-10-03 01:05:45 Etc/GMT", "purchase_date_ms":"1664759145000", "purchase_date_pst":"2022-10-02 18:05:45 America/Los_Angeles", "original_purchase_date":"2022-10-03 01:05:46 Etc/GMT", "original_purchase_date_ms":"1664759146000", "original_purchase_date_pst":"2022-10-02 18:05:46 America/Los_Angeles", "expires_date":"2099-10-10 01:05:45 Etc/GMT", "expires_date_ms":"4094672992000", "expires_date_pst":"2022-10-09 18:05:45 America/Los_Angeles", "web_order_line_item_id":"430000584727555", "is_trial_period":"true", "is_in_intro_offer_period":"false", "in_app_ownership_type":"PURCHASED"}]}, 
"latest_receipt_info":[
{"quantity":"1", "product_id":"habitminder.yearlysubscription", "transaction_id":"430001236977054", "original_transaction_id":"430001236977054", "purchase_date":"2022-10-03 01:05:45 Etc/GMT", "purchase_date_ms":"1664759145000", "purchase_date_pst":"2022-10-02 18:05:45 America/Los_Angeles", "original_purchase_date":"2022-10-03 01:05:46 Etc/GMT", "original_purchase_date_ms":"1664759146000", "original_purchase_date_pst":"2022-10-02 18:05:46 America/Los_Angeles", "expires_date":"2099-10-10 01:05:45 Etc/GMT", "expires_date_ms":"4094672992000", "expires_date_pst":"2099-10-09 18:05:45 America/Los_Angeles", "web_order_line_item_id":"430000584727555", "is_trial_period":"true", "is_in_intro_offer_period":"false", "in_app_ownership_type":"PURCHASED", "subscription_group_identifier":"20416733"}], 
"latest_receipt":"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", 
"pending_renewal_info":[
{"auto_renew_product_id":"habitminder.yearlysubscription", "product_id":"habitminder.yearlysubscription", "original_transaction_id":"430001236977054", "auto_renew_status":"0"}], "status":0}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
