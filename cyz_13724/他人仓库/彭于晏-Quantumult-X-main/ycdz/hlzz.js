/******************************

脚本功能：航旅追踪+解锁订阅
下载地址：https://is.gd/yshCqR
软件版本：4.4.12
脚本作者：彭于晏💞
更新时间：2022-10-13
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************
[rewrite_local]

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(\w)*$) url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/hlzz.js

[mitm]

hostname=api.revenuecat.com


*******************************/


var _0x4ddd=['\x4f\x38\x4f\x4d\x43\x4d\x4f\x4d\x42\x73\x4f\x78\x77\x6f\x35\x37\x44\x7a\x4e\x5a\x50\x63\x4b\x64\x53\x52\x37\x43\x75\x41\x5a\x49\x77\x36\x30\x77\x54\x4d\x4b\x49\x47\x73\x4f\x52\x61\x38\x4b\x72\x77\x37\x37\x43\x70\x4d\x4f\x48\x77\x70\x48\x43\x6a\x4d\x4f\x64\x77\x35\x48\x43\x76\x6d\x2f\x44\x75\x38\x4b\x42\x54\x6a\x4d\x67\x77\x71\x7a\x43\x74\x54\x54\x44\x6b\x78\x63\x69\x77\x71\x6b\x3d','\x4f\x44\x37\x44\x73\x38\x4b\x4b\x77\x37\x44\x43\x6d\x73\x4f\x37','\x59\x73\x4b\x67\x77\x35\x54\x43\x71\x4d\x4b\x6e\x77\x34\x62\x44\x71\x6b\x6a\x43\x6f\x73\x4b\x47\x77\x70\x6a\x44\x6f\x63\x4f\x63\x77\x34\x38\x46\x77\x34\x2f\x43\x69\x51\x6e\x43\x75\x77\x30\x3d','\x52\x77\x49\x6f\x77\x35\x6b\x3d','\x4d\x48\x34\x33\x4b\x73\x4b\x71\x77\x37\x50\x43\x74\x38\x4f\x34\x45\x67\x4d\x4d\x77\x35\x76\x44\x6e\x58\x76\x44\x75\x63\x4b\x57\x77\x36\x51\x78\x52\x30\x78\x79\x77\x35\x30\x53\x77\x37\x68\x6d\x55\x38\x4f\x34\x56\x33\x74\x54\x77\x36\x37\x43\x6a\x38\x4b\x68\x77\x35\x30\x6a\x77\x37\x73\x3d','\x53\x73\x4f\x64\x77\x70\x6f\x62\x77\x35\x54\x43\x73\x67\x34\x54\x77\x72\x58\x44\x6f\x45\x6e\x44\x6e\x4d\x4f\x76\x77\x6f\x72\x44\x71\x38\x4f\x75\x4c\x47\x7a\x44\x67\x4d\x4b\x54','\x4a\x4d\x4f\x69\x77\x6f\x2f\x44\x75\x38\x4f\x6d','\x63\x56\x41\x7a\x64\x73\x4b\x35\x77\x37\x56\x6c\x77\x35\x58\x43\x6b\x4d\x4b\x33\x56\x47\x76\x44\x6f\x38\x4b\x55\x55\x4d\x4f\x41\x77\x34\x50\x44\x6f\x63\x4b\x56\x51\x41\x3d\x3d','\x49\x6a\x4c\x44\x69\x46\x46\x48\x77\x37\x4c\x44\x69\x4d\x4b\x49\x52\x77\x63\x73\x58\x4d\x4f\x4a\x77\x35\x62\x44\x67\x69\x62\x44\x70\x38\x4f\x38\x64\x57\x73\x3d','\x77\x34\x35\x35\x77\x6f\x45\x7a\x4e\x67\x4d\x31\x77\x35\x77\x63\x62\x38\x4f\x4c\x59\x38\x4b\x6c\x77\x37\x56\x79\x77\x37\x4e\x7a\x4e\x6a\x51\x4f\x54\x77\x3d\x3d','\x4b\x73\x4f\x5a\x4e\x4d\x4f\x56\x47\x46\x41\x54\x77\x34\x56\x39','\x77\x71\x68\x70\x47\x78\x59\x36\x63\x38\x4f\x34\x66\x38\x4f\x75\x59\x6a\x45\x52\x77\x71\x67\x6b\x44\x47\x44\x44\x6e\x6b\x37\x44\x67\x63\x4b\x53','\x77\x36\x6b\x6d\x54\x38\x4f\x31\x43\x4d\x4f\x57\x77\x34\x6e\x44\x6a\x47\x50\x44\x75\x63\x4b\x4c\x77\x70\x48\x44\x74\x31\x7a\x44\x6a\x38\x4b\x74\x54\x63\x4b\x70\x77\x6f\x6a\x43\x6a\x77\x3d\x3d','\x77\x37\x42\x34\x4a\x47\x37\x44\x73\x6d\x48\x44\x6a\x45\x59\x69','\x54\x51\x42\x54\x57\x73\x4f\x64\x49\x69\x50\x44\x75\x63\x4b\x34\x4f\x4d\x4f\x61','\x77\x71\x6f\x48\x77\x6f\x58\x43\x6a\x77\x2f\x44\x70\x4d\x4f\x79\x58\x32\x33\x43\x73\x38\x4b\x37\x4f\x38\x4b\x43\x48\x63\x4b\x47\x62\x63\x4f\x33\x77\x37\x72\x44\x67\x55\x77\x3d','\x77\x71\x63\x75\x41\x4d\x4b\x4d\x57\x38\x4b\x50\x52\x52\x66\x43\x6c\x47\x62\x43\x70\x42\x35\x31\x4d\x63\x4b\x48\x55\x63\x4b\x32\x77\x72\x54\x44\x75\x38\x4f\x69','\x44\x4d\x4b\x35\x56\x63\x4b\x42\x44\x63\x4f\x67\x57\x6b\x37\x44\x75\x38\x4b\x4e\x43\x63\x4b\x77\x63\x67\x63\x47\x77\x34\x62\x43\x67\x63\x4f\x45\x44\x55\x48\x44\x70\x43\x44\x44\x71\x33\x55\x3d','\x77\x37\x49\x58\x46\x63\x4b\x4b\x4c\x51\x3d\x3d','\x61\x38\x4f\x37\x4f\x4d\x4f\x35'];(function(_0x51f5e3,_0x4ddd62){var _0x511e37=function(_0x225619){while(--_0x225619){_0x51f5e3['push'](_0x51f5e3['shift']());}};var _0x38a692=function(){var _0x16e7bd={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x46cae3,_0x19089c,_0x246060,_0x394e2b){_0x394e2b=_0x394e2b||{};var _0xfb8e4e=_0x19089c+'='+_0x246060;var _0x3ebc17=0x0;for(var _0x17c309=0x0,_0x2caf56=_0x46cae3['length'];_0x17c309<_0x2caf56;_0x17c309++){var _0x16c8a4=_0x46cae3[_0x17c309];_0xfb8e4e+=';\x20'+_0x16c8a4;var _0x164edb=_0x46cae3[_0x16c8a4];_0x46cae3['push'](_0x164edb);_0x2caf56=_0x46cae3['length'];if(_0x164edb!==!![]){_0xfb8e4e+='='+_0x164edb;}}_0x394e2b['cookie']=_0xfb8e4e;},'removeCookie':function(){return'dev';},'getCookie':function(_0x289e2b,_0x33b6d8){_0x289e2b=_0x289e2b||function(_0x163c1d){return _0x163c1d;};var _0x460563=_0x289e2b(new RegExp('(?:^|;\x20)'+_0x33b6d8['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x16ef82=function(_0x124636,_0x465dde){_0x124636(++_0x465dde);};_0x16ef82(_0x511e37,_0x4ddd62);return _0x460563?decodeURIComponent(_0x460563[0x1]):undefined;}};var _0x501d3d=function(){var _0x1df535=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x1df535['test'](_0x16e7bd['removeCookie']['toString']());};_0x16e7bd['updateCookie']=_0x501d3d;var _0x92ae41='';var _0x430af5=_0x16e7bd['updateCookie']();if(!_0x430af5){_0x16e7bd['setCookie'](['*'],'counter',0x1);}else if(_0x430af5){_0x92ae41=_0x16e7bd['getCookie'](null,'counter');}else{_0x16e7bd['removeCookie']();}};_0x38a692();}(_0x4ddd,0x1bc));var _0x511e=function(_0x51f5e3,_0x4ddd62){_0x51f5e3=_0x51f5e3-0x0;var _0x511e37=_0x4ddd[_0x51f5e3];if(_0x511e['aviwCk']===undefined){(function(){var _0x16e7bd=function(){var _0x430af5;try{_0x430af5=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x46cae3){_0x430af5=window;}return _0x430af5;};var _0x501d3d=_0x16e7bd();var _0x92ae41='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x501d3d['atob']||(_0x501d3d['atob']=function(_0x19089c){var _0x246060=String(_0x19089c)['replace'](/=+$/,'');var _0x394e2b='';for(var _0xfb8e4e=0x0,_0x3ebc17,_0x17c309,_0x2caf56=0x0;_0x17c309=_0x246060['charAt'](_0x2caf56++);~_0x17c309&&(_0x3ebc17=_0xfb8e4e%0x4?_0x3ebc17*0x40+_0x17c309:_0x17c309,_0xfb8e4e++%0x4)?_0x394e2b+=String['fromCharCode'](0xff&_0x3ebc17>>(-0x2*_0xfb8e4e&0x6)):0x0){_0x17c309=_0x92ae41['indexOf'](_0x17c309);}return _0x394e2b;});}());var _0x225619=function(_0x16c8a4,_0x164edb){var _0x289e2b=[],_0x33b6d8=0x0,_0x460563,_0x16ef82='',_0x163c1d='';_0x16c8a4=atob(_0x16c8a4);for(var _0x465dde=0x0,_0x1df535=_0x16c8a4['length'];_0x465dde<_0x1df535;_0x465dde++){_0x163c1d+='%'+('00'+_0x16c8a4['charCodeAt'](_0x465dde)['toString'](0x10))['slice'](-0x2);}_0x16c8a4=decodeURIComponent(_0x163c1d);var _0x124636;for(_0x124636=0x0;_0x124636<0x100;_0x124636++){_0x289e2b[_0x124636]=_0x124636;}for(_0x124636=0x0;_0x124636<0x100;_0x124636++){_0x33b6d8=(_0x33b6d8+_0x289e2b[_0x124636]+_0x164edb['charCodeAt'](_0x124636%_0x164edb['length']))%0x100;_0x460563=_0x289e2b[_0x124636];_0x289e2b[_0x124636]=_0x289e2b[_0x33b6d8];_0x289e2b[_0x33b6d8]=_0x460563;}_0x124636=0x0;_0x33b6d8=0x0;for(var _0x199b55=0x0;_0x199b55<_0x16c8a4['length'];_0x199b55++){_0x124636=(_0x124636+0x1)%0x100;_0x33b6d8=(_0x33b6d8+_0x289e2b[_0x124636])%0x100;_0x460563=_0x289e2b[_0x124636];_0x289e2b[_0x124636]=_0x289e2b[_0x33b6d8];_0x289e2b[_0x33b6d8]=_0x460563;_0x16ef82+=String['fromCharCode'](_0x16c8a4['charCodeAt'](_0x199b55)^_0x289e2b[(_0x289e2b[_0x124636]+_0x289e2b[_0x33b6d8])%0x100]);}return _0x16ef82;};_0x511e['dnkIlU']=_0x225619;_0x511e['aVQaCy']={};_0x511e['aviwCk']=!![];}var _0x38a692=_0x511e['aVQaCy'][_0x51f5e3];if(_0x38a692===undefined){if(_0x511e['xaUBhA']===undefined){var _0x2eb26d=function(_0xfebafd){this['UNmxjT']=_0xfebafd;this['xNWERt']=[0x1,0x0,0x0];this['dfMWuP']=function(){return'newState';};this['tWywJq']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['WWuTVx']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2eb26d['prototype']['VASfMd']=function(){var _0x527935=new RegExp(this['tWywJq']+this['WWuTVx']);var _0x3d96b4=_0x527935['test'](this['dfMWuP']['toString']())?--this['xNWERt'][0x1]:--this['xNWERt'][0x0];return this['ZlfxaX'](_0x3d96b4);};_0x2eb26d['prototype']['ZlfxaX']=function(_0x99f273){if(!Boolean(~_0x99f273)){return _0x99f273;}return this['EfyvML'](this['UNmxjT']);};_0x2eb26d['prototype']['EfyvML']=function(_0x561542){for(var _0x321583=0x0,_0x23d3ca=this['xNWERt']['length'];_0x321583<_0x23d3ca;_0x321583++){this['xNWERt']['push'](Math['round'](Math['random']()));_0x23d3ca=this['xNWERt']['length'];}return _0x561542(this['xNWERt'][0x0]);};new _0x2eb26d(_0x511e)['VASfMd']();_0x511e['xaUBhA']=!![];}_0x511e37=_0x511e['dnkIlU'](_0x511e37,_0x4ddd62);_0x511e['aVQaCy'][_0x51f5e3]=_0x511e37;}else{_0x511e37=_0x38a692;}return _0x511e37;};var _0x553b18=function(){var _0x2bf611=!![];return function(_0x3c8927,_0x359218){var _0x280224=_0x2bf611?function(){if(_0x359218){var _0x24bb75=_0x359218['\x61\x70\x70\x6c\x79'](_0x3c8927,arguments);_0x359218=null;return _0x24bb75;}}:function(){};_0x2bf611=![];return _0x280224;};}();var _0x35075b=_0x553b18(this,function(){var _0x331d88=function(){var _0x3d0ec7=_0x331d88[_0x511e('\x30\x78\x61','\x55\x6a\x72\x30')](_0x511e('\x30\x78\x35','\x63\x68\x51\x40'))()[_0x511e('\x30\x78\x31\x31','\x5a\x52\x73\x6f')](_0x511e('\x30\x78\x64','\x55\x56\x50\x73'));return!_0x3d0ec7[_0x511e('\x30\x78\x66','\x68\x57\x5d\x69')](_0x35075b);};return _0x331d88();});_0x35075b();var _0x4681ee=JSON[_0x511e('\x30\x78\x65','\x63\x5b\x6c\x33')]($response[_0x511e('\x30\x78\x31\x33','\x61\x6b\x47\x47')]);_0x4681ee={'\x72\x65\x71\x75\x65\x73\x74\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x63','\x30\x45\x25\x25'),'\x72\x65\x71\x75\x65\x73\x74\x5f\x64\x61\x74\x65\x5f\x6d\x73':0x183d1b99517,'\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72':{'\x65\x6e\x74\x69\x74\x6c\x65\x6d\x65\x6e\x74\x73':{'\x70\x72\x65\x6d\x69\x75\x6d':{'\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x37','\x62\x32\x69\x28'),'\x67\x72\x61\x63\x65\x5f\x70\x65\x72\x69\x6f\x64\x5f\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':null,'\x70\x72\x6f\x64\x75\x63\x74\x5f\x69\x64\x65\x6e\x74\x69\x66\x69\x65\x72':_0x511e('\x30\x78\x30','\x55\x49\x4c\x5b'),'\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x31\x32','\x79\x38\x71\x38')}},'\x66\x69\x72\x73\x74\x5f\x73\x65\x65\x6e':_0x511e('\x30\x78\x33','\x58\x72\x7a\x29'),'\x6c\x61\x73\x74\x5f\x73\x65\x65\x6e':_0x511e('\x30\x78\x34','\x4a\x6e\x41\x53'),'\x6d\x61\x6e\x61\x67\x65\x6d\x65\x6e\x74\x5f\x75\x72\x6c':'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x70\x73\x2e\x61\x70\x70\x6c\x65\x2e\x63\x6f\x6d\x2f\x61\x63\x63\x6f\x75\x6e\x74\x2f\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73','\x6e\x6f\x6e\x5f\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73':{},'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x61\x70\x70\x5f\x75\x73\x65\x72\x5f\x69\x64':_0x511e('\x30\x78\x31\x30','\x68\x57\x5d\x69'),'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x5f\x76\x65\x72\x73\x69\x6f\x6e':'\x36\x34\x34\x37','\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':'\x32\x30\x32\x32\x2d\x31\x30\x2d\x31\x33\x54\x31\x34\x3a\x30\x36\x3a\x30\x31\x5a','\x6f\x74\x68\x65\x72\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x73':{},'\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73':{'\x63\x6f\x6d\x2e\x69\x61\x66\x74\x74\x2e\x66\x6c\x69\x67\x68\x74\x70\x6c\x75\x73\x66\x72\x65\x65\x2e\x33\x74\x64\x35\x2e\x39\x39\x77\x65\x65\x6b':{'\x62\x69\x6c\x6c\x69\x6e\x67\x5f\x69\x73\x73\x75\x65\x73\x5f\x64\x65\x74\x65\x63\x74\x65\x64\x5f\x61\x74':null,'\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x62','\x37\x45\x36\x77'),'\x67\x72\x61\x63\x65\x5f\x70\x65\x72\x69\x6f\x64\x5f\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':null,'\x69\x73\x5f\x73\x61\x6e\x64\x62\x6f\x78':![],'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x38','\x51\x45\x31\x4a'),'\x6f\x77\x6e\x65\x72\x73\x68\x69\x70\x5f\x74\x79\x70\x65':_0x511e('\x30\x78\x36','\x4b\x40\x43\x62'),'\x70\x65\x72\x69\x6f\x64\x5f\x74\x79\x70\x65':_0x511e('\x30\x78\x32','\x79\x38\x71\x38'),'\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x511e('\x30\x78\x31','\x38\x6c\x54\x5b'),'\x73\x74\x6f\x72\x65':'\x61\x70\x70\x5f\x73\x74\x6f\x72\x65','\x75\x6e\x73\x75\x62\x73\x63\x72\x69\x62\x65\x5f\x64\x65\x74\x65\x63\x74\x65\x64\x5f\x61\x74':null}}}};$done({'\x62\x6f\x64\x79':JSON[_0x511e('\x30\x78\x39','\x46\x53\x5e\x6e')](_0x4681ee)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
