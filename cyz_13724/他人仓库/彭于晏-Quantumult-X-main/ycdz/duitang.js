/******************************

脚本功能：堆糖-爱豆壁纸美图社区+解锁VIP
下载地址：https://is.gd/EN3F3A
软件版本：8.12.0
脚本作者：彭于晏💞
更新时间：2022-10-7
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️


*******************************

[rewrite_local]

^https:\/\/api\.duitang\.com\/napi url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/duitang.js

[mitm] 

hostname = api.duitang.com

*******************************/

var _0x5820=['\x77\x36\x31\x30\x77\x36\x62\x43\x74\x69\x6b\x36\x52\x67\x3d\x3d','\x77\x37\x49\x6c\x77\x71\x64\x42\x77\x35\x4d\x6d\x77\x34\x73\x54\x77\x37\x38\x4a\x62\x78\x68\x6d\x77\x34\x73\x6d\x77\x34\x38\x33\x49\x6d\x42\x5a\x77\x6f\x6b\x3d','\x46\x67\x4a\x73\x77\x36\x2f\x44\x69\x6a\x44\x44\x73\x73\x4f\x77\x77\x6f\x5a\x79\x77\x72\x39\x79\x4c\x4d\x4b\x77\x53\x55\x33\x44\x75\x55\x56\x6f\x77\x6f\x72\x44\x69\x6a\x77\x3d','\x66\x67\x62\x43\x6c\x73\x4f\x6e\x5a\x73\x4b\x56\x63\x67\x3d\x3d','\x5a\x4d\x4f\x46\x77\x34\x50\x44\x73\x43\x2f\x44\x70\x4d\x4f\x64','\x77\x72\x58\x44\x76\x33\x6f\x61\x42\x4d\x4f\x57\x43\x6a\x37\x44\x6e\x38\x4b\x49\x77\x36\x37\x43\x6f\x52\x78\x30\x77\x36\x2f\x44\x75\x38\x4f\x59\x77\x71\x5a\x75\x52\x4d\x4b\x4a\x55\x63\x4f\x77\x4a\x7a\x30\x3d','\x77\x70\x49\x34\x77\x70\x59\x62\x61\x38\x4f\x5a\x77\x70\x77\x3d','\x77\x37\x67\x76\x77\x34\x54\x44\x6b\x63\x4b\x68\x77\x36\x76\x43\x6d\x51\x3d\x3d','\x77\x70\x7a\x44\x6b\x54\x54\x43\x73\x6a\x62\x44\x6a\x63\x4b\x4c','\x77\x36\x42\x6d\x77\x35\x45\x4d\x77\x72\x41\x76\x56\x38\x4f\x6c\x77\x70\x30\x6c\x63\x78\x4c\x44\x68\x4d\x4b\x37\x77\x35\x6e\x43\x75\x63\x4b\x64\x77\x70\x49\x3d','\x77\x37\x52\x45\x50\x73\x4f\x7a\x77\x72\x49\x64\x77\x70\x72\x43\x72\x63\x4b\x7a\x77\x35\x77\x6d\x77\x37\x73\x79\x65\x51\x58\x43\x70\x51\x6a\x43\x6b\x63\x4b\x4f\x63\x63\x4b\x6b\x77\x35\x4a\x61\x52\x73\x4b\x62\x77\x71\x4e\x4d\x77\x6f\x44\x44\x69\x73\x4f\x4e\x77\x72\x6a\x43\x69\x7a\x59\x3d','\x77\x70\x63\x55\x56\x47\x56\x7a\x77\x34\x50\x43\x76\x51\x3d\x3d','\x77\x34\x58\x43\x69\x58\x52\x31\x77\x70\x33\x43\x70\x6b\x34\x3d','\x77\x35\x6c\x46\x45\x38\x4b\x76','\x4f\x6c\x6c\x71\x64\x79\x51\x6c\x77\x71\x38\x3d','\x45\x43\x48\x43\x6e\x4d\x4f\x47\x46\x77\x3d\x3d','\x62\x4d\x4b\x75\x51\x78\x55\x77\x50\x4d\x4f\x48\x4f\x55\x76\x43\x76\x63\x4f\x75\x77\x36\x58\x44\x76\x63\x4f\x38\x77\x72\x6a\x43\x76\x4d\x4b\x48\x77\x37\x33\x44\x6f\x4d\x4f\x45\x41\x38\x4b\x73\x57\x44\x59\x3d','\x77\x36\x42\x38\x77\x34\x6f\x38\x77\x71\x45\x2b\x65\x73\x4f\x6e\x77\x70\x30\x6e\x62\x79\x4c\x43\x6b\x38\x4f\x79\x77\x34\x6a\x43\x75\x63\x4f\x4b\x77\x34\x33\x44\x76\x4d\x4b\x6d\x57\x63\x4b\x52','\x61\x6b\x70\x7a\x61\x78\x6f\x71\x77\x71\x2f\x43\x74\x4d\x4b\x4c\x4d\x53\x4c\x44\x6a\x6a\x76\x43\x69\x41\x3d\x3d','\x77\x35\x58\x43\x6e\x4d\x4f\x61\x77\x37\x76\x44\x67\x4d\x4b\x49\x77\x70\x76\x44\x67\x33\x45\x6a','\x55\x4d\x4f\x70\x66\x44\x49\x3d','\x77\x72\x38\x38\x77\x71\x31\x44\x54\x38\x4f\x58\x77\x72\x66\x43\x6f\x38\x4f\x33\x43\x6c\x35\x6d\x77\x6f\x54\x43\x76\x42\x4c\x43\x76\x42\x78\x62\x51\x63\x4b\x54\x61\x67\x3d\x3d','\x55\x43\x6a\x43\x6e\x33\x4c\x43\x6e\x4d\x4b\x49\x77\x35\x56\x6d\x4a\x73\x4b\x6b\x49\x38\x4f\x76\x45\x69\x39\x68','\x77\x71\x76\x44\x6b\x4d\x4b\x4b\x52\x4d\x4b\x65\x77\x72\x44\x44\x6b\x77\x3d\x3d'];(function(_0x393ca5,_0x5820f6){var _0x16e93c=function(_0x3a3276){while(--_0x3a3276){_0x393ca5['push'](_0x393ca5['shift']());}};var _0x41b721=function(){var _0x7707c7={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x3edaf4,_0x65ee3f,_0x521f2e,_0x23dcd3){_0x23dcd3=_0x23dcd3||{};var _0x35e4f1=_0x65ee3f+'='+_0x521f2e;var _0x2a18a6=0x0;for(var _0x1ce7e6=0x0,_0x222b9b=_0x3edaf4['length'];_0x1ce7e6<_0x222b9b;_0x1ce7e6++){var _0x359b90=_0x3edaf4[_0x1ce7e6];_0x35e4f1+=';\x20'+_0x359b90;var _0x1d1e6=_0x3edaf4[_0x359b90];_0x3edaf4['push'](_0x1d1e6);_0x222b9b=_0x3edaf4['length'];if(_0x1d1e6!==!![]){_0x35e4f1+='='+_0x1d1e6;}}_0x23dcd3['cookie']=_0x35e4f1;},'removeCookie':function(){return'dev';},'getCookie':function(_0x2792f9,_0x376866){_0x2792f9=_0x2792f9||function(_0x5aa607){return _0x5aa607;};var _0x28a830=_0x2792f9(new RegExp('(?:^|;\x20)'+_0x376866['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x42e9cf=function(_0x4792f1,_0x3ba2c7){_0x4792f1(++_0x3ba2c7);};_0x42e9cf(_0x16e93c,_0x5820f6);return _0x28a830?decodeURIComponent(_0x28a830[0x1]):undefined;}};var _0x5a402a=function(){var _0x25fed9=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x25fed9['test'](_0x7707c7['removeCookie']['toString']());};_0x7707c7['updateCookie']=_0x5a402a;var _0x41168b='';var _0x5495a3=_0x7707c7['updateCookie']();if(!_0x5495a3){_0x7707c7['setCookie'](['*'],'counter',0x1);}else if(_0x5495a3){_0x41168b=_0x7707c7['getCookie'](null,'counter');}else{_0x7707c7['removeCookie']();}};_0x41b721();}(_0x5820,0x154));var _0x16e9=function(_0x393ca5,_0x5820f6){_0x393ca5=_0x393ca5-0x0;var _0x16e93c=_0x5820[_0x393ca5];if(_0x16e9['FyMxjp']===undefined){(function(){var _0x7707c7=function(){var _0x5495a3;try{_0x5495a3=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x3edaf4){_0x5495a3=window;}return _0x5495a3;};var _0x5a402a=_0x7707c7();var _0x41168b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x5a402a['atob']||(_0x5a402a['atob']=function(_0x65ee3f){var _0x521f2e=String(_0x65ee3f)['replace'](/=+$/,'');var _0x23dcd3='';for(var _0x35e4f1=0x0,_0x2a18a6,_0x1ce7e6,_0x222b9b=0x0;_0x1ce7e6=_0x521f2e['charAt'](_0x222b9b++);~_0x1ce7e6&&(_0x2a18a6=_0x35e4f1%0x4?_0x2a18a6*0x40+_0x1ce7e6:_0x1ce7e6,_0x35e4f1++%0x4)?_0x23dcd3+=String['fromCharCode'](0xff&_0x2a18a6>>(-0x2*_0x35e4f1&0x6)):0x0){_0x1ce7e6=_0x41168b['indexOf'](_0x1ce7e6);}return _0x23dcd3;});}());var _0x3a3276=function(_0x359b90,_0x1d1e6){var _0x2792f9=[],_0x376866=0x0,_0x28a830,_0x42e9cf='',_0x5aa607='';_0x359b90=atob(_0x359b90);for(var _0x3ba2c7=0x0,_0x25fed9=_0x359b90['length'];_0x3ba2c7<_0x25fed9;_0x3ba2c7++){_0x5aa607+='%'+('00'+_0x359b90['charCodeAt'](_0x3ba2c7)['toString'](0x10))['slice'](-0x2);}_0x359b90=decodeURIComponent(_0x5aa607);var _0x4792f1;for(_0x4792f1=0x0;_0x4792f1<0x100;_0x4792f1++){_0x2792f9[_0x4792f1]=_0x4792f1;}for(_0x4792f1=0x0;_0x4792f1<0x100;_0x4792f1++){_0x376866=(_0x376866+_0x2792f9[_0x4792f1]+_0x1d1e6['charCodeAt'](_0x4792f1%_0x1d1e6['length']))%0x100;_0x28a830=_0x2792f9[_0x4792f1];_0x2792f9[_0x4792f1]=_0x2792f9[_0x376866];_0x2792f9[_0x376866]=_0x28a830;}_0x4792f1=0x0;_0x376866=0x0;for(var _0x9aca90=0x0;_0x9aca90<_0x359b90['length'];_0x9aca90++){_0x4792f1=(_0x4792f1+0x1)%0x100;_0x376866=(_0x376866+_0x2792f9[_0x4792f1])%0x100;_0x28a830=_0x2792f9[_0x4792f1];_0x2792f9[_0x4792f1]=_0x2792f9[_0x376866];_0x2792f9[_0x376866]=_0x28a830;_0x42e9cf+=String['fromCharCode'](_0x359b90['charCodeAt'](_0x9aca90)^_0x2792f9[(_0x2792f9[_0x4792f1]+_0x2792f9[_0x376866])%0x100]);}return _0x42e9cf;};_0x16e9['NnmGaD']=_0x3a3276;_0x16e9['YZoYsZ']={};_0x16e9['FyMxjp']=!![];}var _0x41b721=_0x16e9['YZoYsZ'][_0x393ca5];if(_0x41b721===undefined){if(_0x16e9['uaLZvD']===undefined){var _0x58e75b=function(_0x144921){this['nBMBux']=_0x144921;this['EIgYjx']=[0x1,0x0,0x0];this['VVXUUL']=function(){return'newState';};this['CXhOGK']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['UbDIxU']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x58e75b['prototype']['ZVHAdJ']=function(){var _0xbcc96d=new RegExp(this['CXhOGK']+this['UbDIxU']);var _0x2cef04=_0xbcc96d['test'](this['VVXUUL']['toString']())?--this['EIgYjx'][0x1]:--this['EIgYjx'][0x0];return this['lcwQqj'](_0x2cef04);};_0x58e75b['prototype']['lcwQqj']=function(_0x1babe8){if(!Boolean(~_0x1babe8)){return _0x1babe8;}return this['IvzvsR'](this['nBMBux']);};_0x58e75b['prototype']['IvzvsR']=function(_0x460708){for(var _0x2bcf06=0x0,_0x5968d8=this['EIgYjx']['length'];_0x2bcf06<_0x5968d8;_0x2bcf06++){this['EIgYjx']['push'](Math['round'](Math['random']()));_0x5968d8=this['EIgYjx']['length'];}return _0x460708(this['EIgYjx'][0x0]);};new _0x58e75b(_0x16e9)['ZVHAdJ']();_0x16e9['uaLZvD']=!![];}_0x16e93c=_0x16e9['NnmGaD'](_0x16e93c,_0x5820f6);_0x16e9['YZoYsZ'][_0x393ca5]=_0x16e93c;}else{_0x16e93c=_0x41b721;}return _0x16e93c;};var _0x3c255f=function(){var _0x45ed36=!![];return function(_0x192e5d,_0x15bd92){var _0x4d5b61=_0x45ed36?function(){if(_0x15bd92){var _0x2cfed8=_0x15bd92[_0x16e9('\x30\x78\x62','\x44\x29\x42\x52')](_0x192e5d,arguments);_0x15bd92=null;return _0x2cfed8;}}:function(){};_0x45ed36=![];return _0x4d5b61;};}();var _0x233c3f=_0x3c255f(this,function(){var _0x3906ba=function(){var _0xba37da=_0x3906ba['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72'](_0x16e9('\x30\x78\x31\x31','\x59\x47\x47\x32'))()['\x63\x6f\x6d\x70\x69\x6c\x65'](_0x16e9('\x30\x78\x63','\x62\x49\x31\x33'));return!_0xba37da[_0x16e9('\x30\x78\x39','\x41\x76\x66\x65')](_0x233c3f);};return _0x3906ba();});_0x233c3f();body=$response[_0x16e9('\x30\x78\x31\x30','\x62\x49\x31\x33')][_0x16e9('\x30\x78\x61','\x58\x28\x29\x69')](/\"vip":\w+/g,_0x16e9('\x30\x78\x66','\x6c\x36\x43\x48'))[_0x16e9('\x30\x78\x33','\x31\x23\x44\x4d')](/\"is_life_artist":\w+/g,_0x16e9('\x30\x78\x31\x35','\x49\x66\x29\x57'))[_0x16e9('\x30\x78\x34','\x26\x66\x30\x45')](/\"isnew":\w+/g,'\x22\x69\x73\x6e\x65\x77\x22\x3a\x74\x72\x75\x65')[_0x16e9('\x30\x78\x32','\x55\x29\x6d\x73')](/\"short_video":\w+/g,_0x16e9('\x30\x78\x35','\x69\x53\x74\x68'))[_0x16e9('\x30\x78\x30','\x57\x4d\x41\x46')](/\"vip_end_at_mills":\d+/g,_0x16e9('\x30\x78\x36','\x65\x40\x34\x47'))[_0x16e9('\x30\x78\x31\x34','\x34\x62\x28\x34')](/\"vip_level":\d+/g,_0x16e9('\x30\x78\x65','\x58\x28\x29\x69'))[_0x16e9('\x30\x78\x37','\x37\x78\x40\x33')](/\"is_certify_user":\w+/g,_0x16e9('\x30\x78\x64','\x69\x53\x74\x68'))[_0x16e9('\x30\x78\x31\x33','\x7a\x70\x4c\x33')](/\"be_follow_count":\d+/g,_0x16e9('\x30\x78\x31','\x5b\x57\x25\x43'))[_0x16e9('\x30\x78\x31\x37','\x56\x64\x63\x71')](/\"follow_count":\d+/g,_0x16e9('\x30\x78\x31\x36','\x59\x41\x33\x5a'))['\x72\x65\x70\x6c\x61\x63\x65'](/\"score":\d+/g,_0x16e9('\x30\x78\x31\x32','\x4c\x58\x70\x52'))[_0x16e9('\x30\x78\x38','\x53\x50\x25\x56')](/\"username":".*?"/g,'\x22\x75\x73\x65\x72\x6e\x61\x6d\x65\x22\x3a\x22\u5f6d\u4e8e\u664f\u89e3\u9501\x22');$done({'\x62\x6f\x64\x79':body});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
