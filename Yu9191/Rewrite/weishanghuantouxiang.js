/*
微商换头像
小歪微商最新版

[rewrite_local]

http://htx.jietuguanjia.com/api/app/userInfo url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/weishanghuantouxiang.js

[mitm] 

hostname = htx.jietuguanjia.com

*/

var Q = JSON.parse($response.body);
Q.data.isVip = true;//
Q.data.vipExpiredTim = "2099-11-01 20:58:21";
$done({body : JSON.stringify(Q)});