/*

Nicegram 1.4.7

[rewrite_local]
https://nicegram.cloud/api/v6/user/info url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Nicegram.js

[mitm] 
hostname = nicegram.cloud

**/

var Q = JSON.parse($response.body);
Q.data.user.lifetime_subscription = true;
Q.data.user.store_subscription = true;
Q.data.user.subscription = true;
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
