

/******************************

脚本功能：gear浏览器插件+解锁订阅
下载地址：http://mtw.so/64tULY
软件版本：5.8.5
脚本作者：彭于晏
更新时间：2022-9-18
问题反馈：QQ+89996462
QQ会员群：779392027
TG反馈群：https://t.me/plus8889
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https?:\/\/api\.revenuecat\.com\/v1\/(receipts|subscribers\/\$RCAnonymousID%3A\w{32})$ url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/gear.js

[mitm] 

hostname = api.revenuecat.com

*******************************/


var _0x5ed4=['w6TDi8K4aTtHJsKPfsKrw5E+w7jDh8OFw7o2w4gQ','QVrDg8K+Ig==','AW5VXA==','ExIQYzTDpMOiw5kR','w5zCoXLDuzTCusOYMhNnbA==','dcOPTk7CqMKtwq7Csyl6WMKB','wrjCoFRyAMOWPMOtMsOJwr3DncOX'];(function(_0x1b6a15,_0x5ed497){var _0x3f84de=function(_0x199cd3){while(--_0x199cd3){_0x1b6a15['push'](_0x1b6a15['shift']());}};_0x3f84de(++_0x5ed497);}(_0x5ed4,0x6b));var _0x3f84=function(_0x1b6a15,_0x5ed497){_0x1b6a15=_0x1b6a15-0x0;var _0x3f84de=_0x5ed4[_0x1b6a15];if(_0x3f84['oOgAGf']===undefined){(function(){var _0x33dc99=function(){var _0x560d84;try{_0x560d84=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x23ea3c){_0x560d84=window;}return _0x560d84;};var _0x5a6df5=_0x33dc99();var _0x5e58b5='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x5a6df5['atob']||(_0x5a6df5['atob']=function(_0x57004d){var _0x63e9f9=String(_0x57004d)['replace'](/=+$/,'');var _0x1d5cf5='';for(var _0x4cc6d2=0x0,_0x724469,_0x2c93e7,_0x4ce202=0x0;_0x2c93e7=_0x63e9f9['charAt'](_0x4ce202++);~_0x2c93e7&&(_0x724469=_0x4cc6d2%0x4?_0x724469*0x40+_0x2c93e7:_0x2c93e7,_0x4cc6d2++%0x4)?_0x1d5cf5+=String['fromCharCode'](0xff&_0x724469>>(-0x2*_0x4cc6d2&0x6)):0x0){_0x2c93e7=_0x5e58b5['indexOf'](_0x2c93e7);}return _0x1d5cf5;});}());var _0x3cf1db=function(_0x5d36a8,_0x3328ca){var _0x5ce601=[],_0x477a51=0x0,_0x18dec2,_0x56aa30='',_0x5b5e7c='';_0x5d36a8=atob(_0x5d36a8);for(var _0x383af3=0x0,_0x598f64=_0x5d36a8['length'];_0x383af3<_0x598f64;_0x383af3++){_0x5b5e7c+='%'+('00'+_0x5d36a8['charCodeAt'](_0x383af3)['toString'](0x10))['slice'](-0x2);}_0x5d36a8=decodeURIComponent(_0x5b5e7c);var _0x5c5bef;for(_0x5c5bef=0x0;_0x5c5bef<0x100;_0x5c5bef++){_0x5ce601[_0x5c5bef]=_0x5c5bef;}for(_0x5c5bef=0x0;_0x5c5bef<0x100;_0x5c5bef++){_0x477a51=(_0x477a51+_0x5ce601[_0x5c5bef]+_0x3328ca['charCodeAt'](_0x5c5bef%_0x3328ca['length']))%0x100;_0x18dec2=_0x5ce601[_0x5c5bef];_0x5ce601[_0x5c5bef]=_0x5ce601[_0x477a51];_0x5ce601[_0x477a51]=_0x18dec2;}_0x5c5bef=0x0;_0x477a51=0x0;for(var _0x1e64de=0x0;_0x1e64de<_0x5d36a8['length'];_0x1e64de++){_0x5c5bef=(_0x5c5bef+0x1)%0x100;_0x477a51=(_0x477a51+_0x5ce601[_0x5c5bef])%0x100;_0x18dec2=_0x5ce601[_0x5c5bef];_0x5ce601[_0x5c5bef]=_0x5ce601[_0x477a51];_0x5ce601[_0x477a51]=_0x18dec2;_0x56aa30+=String['fromCharCode'](_0x5d36a8['charCodeAt'](_0x1e64de)^_0x5ce601[(_0x5ce601[_0x5c5bef]+_0x5ce601[_0x477a51])%0x100]);}return _0x56aa30;};_0x3f84['zllrju']=_0x3cf1db;_0x3f84['wbwZqF']={};_0x3f84['oOgAGf']=!![];}var _0x199cd3=_0x3f84['wbwZqF'][_0x1b6a15];if(_0x199cd3===undefined){if(_0x3f84['zddATi']===undefined){_0x3f84['zddATi']=!![];}_0x3f84de=_0x3f84['zllrju'](_0x3f84de,_0x5ed497);_0x3f84['wbwZqF'][_0x1b6a15]=_0x3f84de;}else{_0x3f84de=_0x199cd3;}return _0x3f84de;};var objc=JSON[_0x3f84('0x6','G$@Q')]($response[_0x3f84('0x0','T)Ft')]);objc={'current_offering_id':'subscription','offerings':[{'description':'Gear\x20Pro\x20subscription','identifier':_0x3f84('0x3','KjbL'),'packages':[{'identifier':_0x3f84('0x2','o%TU'),'platform_product_identifier':'com.gear.app.monthly'},{'identifier':_0x3f84('0x4','lgz9'),'platform_product_identifier':'com.gear.app.semiannually'},{'identifier':'$rc_annual','platform_product_identifier':_0x3f84('0x5','wE3O')}]}]};$done({'body':JSON[_0x3f84('0x1','u(Dp')](objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
