/**

脚本名称：ihabit
仅测试Surge

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/iHabit.js

[mitm] 

hostname = api.revenuecat.com

*/

let obj = {
  "request_date_ms": 1704664060864,
  "request_date": "2024-01-07T21:47:40Z",
  "subscriber": {
    "last_seen": "2024-01-07T21:42:02Z",
    "first_seen": "2024-01-07T21:42:02Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "ihabit_quarter_payment_subscribe": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "ihabit_forever_upgrade_vip": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "ihabit_forever_payment_vip": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "ihabit_year_payment_subscribe": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      }
    },
    "entitlements": {
      "ihabit_upgradeable_pro": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "ihabit_year_payment_subscribe",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "ihabit_year_subscription": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "ihabit_year_payment_subscribe",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "ihabit_tMonth_subscription": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "ihabit_quarter_payment_subscribe",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "ihabit_lTime_subscription": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "ihabit_forever_upgrade_vip",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "ihabit_subscription_pro": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "ihabit_year_payment_subscribe",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      }
    },
    "original_purchase_date": "2024-01-07T21:38:41Z",
    "original_app_user_id": "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "non_subscriptions": {
    }
  }
}


$done({ body: JSON.stringify(obj), status: 200 });

