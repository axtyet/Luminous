/******************************

脚本功能：字体册——解锁订阅
下载地址：https://is.gd/Ka495L
软件版本：1.1
脚本作者：彭于晏💞
更新时间：2022-11-29
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/api\.yonekura\.cn\/3\.7\.0\/uicommon\/getuser url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/ztc.js

[mitm] 

hostname = api.yonekura.cn


*******************************/

var objc = JSON.parse($response.body);

    objc = 
{
  "errno": 0,
  "errmsg": "OK",
  "data": "QMA+KlsJ1sKVErCjySKlbYKqkDcGKMGxSBRJ4e9EqjehB51pq3hJNjtYDxtRw9GyPWJZ5647p1N8w+ed29LVZOkEG\/m8PbrUy8OgzcOadF7ClOTjUVog3FOISfA74mQMjLgodiX0WKIUHiml4dwfweDxcx+u1ueSXJrybyFfBCb9v9B6xXw5XIRLgBzN1UPzYvCLkDfd8+osUhJXrmjTC6GTNajy1dybs9kSFM9wTRzzqBBhjqcjY5POKrW9OQSI9dF0C8niTT5UPhwV5INmvA2o3LcmUoT9qCXMTJpL+JuFv9DRK\/pN5NpcmCt6cyAbDChUbz1MNkhN+jqGXYBG+cTuOs8+MUVNLkf6g9JwCEQ="
}
$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
