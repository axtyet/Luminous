/******************************

脚本功能：♥ProCCD——Vlog Star——FUT19%——手持弹幕制作器——Koloro 滤镜——PixPuppy——解锁VIP合集！🍿

下载地址：https://is.gd/PV2u0n
软件版本：2.6.2
脚本作者：彭于晏💞
更新时间：2023-2-25
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/proccd.js

[mitm] 

hostname = buy.itunes.apple.com


*******************************/


var objc = JSON.parse($response.body);

    objc = 
{
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "adam_id": 1610504736,
    "app_item_id": 1610504736,
    "bundle_id": "com.pocket.compress",
    "application_version": "1.0",
    "download_id": 501962897994829343,
    "version_external_identifier": 850805572,
    "receipt_creation_date": "2022-11-29 12:46:00 Etc/GMT",
    "receipt_creation_date_ms": "1669725960000",
    "receipt_creation_date_pst": "2022-11-29 04:46:00 America/Los_Angeles",
    "request_date": "2022-11-29 12:52:19 Etc/GMT",
    "request_date_ms": "1669726339046",
    "request_date_pst": "2022-11-29 04:52:19 America/Los_Angeles",
    "original_purchase_date": "2022-11-29 12:42:05 Etc/GMT",
    "original_purchase_date_ms": "1669725725000",
    "original_purchase_date_pst": "2022-11-29 04:42:05 America/Los_Angeles",
    "original_application_version": "1.0",
    "in_app": [
      {
        "quantity": "1",
        "product_id": "com.pocket.compress.week",
        "transaction_id": "570001068034835",
        "original_transaction_id": "570001068034835",
        "purchase_date": "2022-11-29 12:45:58 Etc/GMT",
        "purchase_date_ms": "1669725958000",
        "purchase_date_pst": "2022-11-29 04:45:58 America/Los_Angeles",
        "original_purchase_date": "2022-11-29 12:45:59 Etc/GMT",
        "original_purchase_date_ms": "1669725959000",
        "original_purchase_date_pst": "2022-11-29 04:45:59 America/Los_Angeles",
        "expires_date": "9999-12-02 12:45:58 Etc/GMT",
        "expires_date_ms": "253392455349000",
        "expires_date_pst": "9999-12-02 04:45:58 America/Los_Angeles",
        "web_order_line_item_id": "570000476898817",
        "is_trial_period": "true",
        "is_in_intro_offer_period": "false",
        "in_app_ownership_type": "PURCHASED"
      }
    ]
  },
  "latest_receipt_info": [
    {
      "quantity": "1",
      "product_id": "com.pocket.compress.week",
      "transaction_id": "570001068034835",
      "original_transaction_id": "570001068034835",
      "purchase_date": "2022-11-29 12:45:58 Etc/GMT",
      "purchase_date_ms": "1669725958000",
      "purchase_date_pst": "2022-11-29 04:45:58 America/Los_Angeles",
      "original_purchase_date": "2022-11-29 12:45:59 Etc/GMT",
      "original_purchase_date_ms": "1669725959000",
      "original_purchase_date_pst": "2022-11-29 04:45:59 America/Los_Angeles",
      "expires_date": "9999-12-02 12:45:58 Etc/GMT",
      "expires_date_ms": "253392455349000",
      "expires_date_pst": "9999-12-02 04:45:58 America/Los_Angeles",
      "web_order_line_item_id": "570000476898817",
      "is_trial_period": "true",
      "is_in_intro_offer_period": "false",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20926804"
    }
  ],
  "latest_receipt": "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",
  "pending_renewal_info": [
    {
      "auto_renew_product_id": "com.pocket.compress.week",
      "product_id": "com.pocket.compress.week",
      "original_transaction_id": "570001068034835",
      "auto_renew_status": "1"
    }
  ],
  "status": 0
}
$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
