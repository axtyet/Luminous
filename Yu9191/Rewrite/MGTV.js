/* 
芒果TV 2024.7.22
适配了Mac版本iPad版本 
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用Walala的净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/cnftp.snippet
感谢@RuCu6
[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/mgtv1.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/MGTV.js
https://nuc.api.mgtv.com/GetUserInfo url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/mgtv.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/mgtv.js
#港区
^https://mobile.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/MGTV.js
#播放页开通提示移除
http://vip.bz.mgtv.com/client/dynamic_entry url reject
https://pcc.api.mgtv.com/video/getSource url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/MGTV.js
https://pad.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/MGTV.js
[mitm] 
hostname = *.mgtv.com, pad.api.mgtv.com, pcc.api.mgtv.com

*/



var _0xodv='jsjiami.com.v7';var _0x370c48=_0x3c61;(function(_0x5b26f4,_0x462797,_0x3fa0f9,_0x18a95f,_0x5b704b,_0x255733,_0x666e82){return _0x5b26f4=_0x5b26f4>>0x9,_0x255733='hs',_0x666e82='hs',function(_0xfc0b85,_0x14d92c,_0x5934ff,_0x5d5cf8,_0x41d214){var _0x4d88d2=_0x3c61;_0x5d5cf8='tfi',_0x255733=_0x5d5cf8+_0x255733,_0x41d214='up',_0x666e82+=_0x41d214,_0x255733=_0x5934ff(_0x255733),_0x666e82=_0x5934ff(_0x666e82),_0x5934ff=0x0;var _0xb8353e=_0xfc0b85();while(!![]&&--_0x18a95f+_0x14d92c){try{_0x5d5cf8=-parseInt(_0x4d88d2(0x1a1))/0x1+parseInt(_0x4d88d2(0x19e))/0x2*(parseInt(_0x4d88d2(0x194))/0x3)+-parseInt(_0x4d88d2(0x199))/0x4+parseInt(_0x4d88d2(0x1a3))/0x5*(parseInt(_0x4d88d2(0x19a))/0x6)+-parseInt(_0x4d88d2(0x197))/0x7*(parseInt(_0x4d88d2(0x1a2))/0x8)+-parseInt(_0x4d88d2(0x198))/0x9+parseInt(_0x4d88d2(0x19d))/0xa;}catch(_0x137d8d){_0x5d5cf8=_0x5934ff;}finally{_0x41d214=_0xb8353e[_0x255733]();if(_0x5b26f4<=_0x18a95f)_0x5934ff?_0x5b704b?_0x5d5cf8=_0x41d214:_0x5b704b=_0x41d214:_0x5934ff=_0x41d214;else{if(_0x5934ff==_0x5b704b['replace'](/[IYuLHpywegPEbGNTAWntJ=]/g,'')){if(_0x5d5cf8===_0x14d92c){_0xb8353e['un'+_0x255733](_0x41d214);break;}_0xb8353e[_0x666e82](_0x41d214);}}}}}(_0x3fa0f9,_0x462797,function(_0x518aba,_0x50d2a8,_0x2763e9,_0x16a436,_0x3f4d79,_0x1aceb5,_0x3ac738){return _0x50d2a8='\x73\x70\x6c\x69\x74',_0x518aba=arguments[0x0],_0x518aba=_0x518aba[_0x50d2a8](''),_0x2763e9='\x72\x65\x76\x65\x72\x73\x65',_0x518aba=_0x518aba[_0x2763e9]('\x76'),_0x16a436='\x6a\x6f\x69\x6e',(0x17a41e,_0x518aba[_0x16a436](''));});}(0x18200,0xe2a37,_0xc5ac,0xc3),_0xc5ac)&&(_0xodv=`\xd6c`);function _0x3c61(_0x1f7332,_0x18e8bc){var _0xc5ac1e=_0xc5ac();return _0x3c61=function(_0x3c6150,_0x3bd5c0){_0x3c6150=_0x3c6150-0x193;var _0x10bf27=_0xc5ac1e[_0x3c6150];if(_0x3c61['nACbeH']===undefined){var _0x57b583=function(_0x4b2333){var _0x3c760f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x3744e3='',_0x3164e0='';for(var _0x30d692=0x0,_0x37703b,_0x26d08f,_0x258c70=0x0;_0x26d08f=_0x4b2333['charAt'](_0x258c70++);~_0x26d08f&&(_0x37703b=_0x30d692%0x4?_0x37703b*0x40+_0x26d08f:_0x26d08f,_0x30d692++%0x4)?_0x3744e3+=String['fromCharCode'](0xff&_0x37703b>>(-0x2*_0x30d692&0x6)):0x0){_0x26d08f=_0x3c760f['indexOf'](_0x26d08f);}for(var _0x1f3bf6=0x0,_0x2373c5=_0x3744e3['length'];_0x1f3bf6<_0x2373c5;_0x1f3bf6++){_0x3164e0+='%'+('00'+_0x3744e3['charCodeAt'](_0x1f3bf6)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3164e0);};_0x3c61['QUnaot']=_0x57b583,_0x1f7332=arguments,_0x3c61['nACbeH']=!![];}var _0x398ffa=_0xc5ac1e[0x0],_0x24fb08=_0x3c6150+_0x398ffa,_0xfe22dd=_0x1f7332[_0x24fb08];return!_0xfe22dd?(_0x10bf27=_0x3c61['QUnaot'](_0x10bf27),_0x1f7332[_0x24fb08]=_0x10bf27):_0x10bf27=_0xfe22dd,_0x10bf27;},_0x3c61(_0x1f7332,_0x18e8bc);}function _0xc5ac(){var _0x2d18b5=(function(){return[_0xodv,'INTjepsjWiwbaWHmiEH.pYLcom.vn7tJPgyAuEGL==','DxjS','DMLKzw8Vz2v0u291CMnL','nZC3ndmZrw5qyMT4','nte0mtyWohver1z5rG','mtbYBxHXA3G'].concat((function(){return['DMLKzw8VC291CMnL','mJK3nZvns1HNvhK','Aw5JBhvKzxm','jdeXrtCXmuvfmtq5ndCZodeZoengrJDfourdquzcqurbmq','mtryr0Pur3G','mte4mJaWmtvVy3zUD2C','nZm3ntuZmKnHENjIvG'].concat((function(){return['mtK3odK4q21lD1fi','jde2otrgqKu2mJfgqZaZmei4oue4otLfmdC3rdy5rue0oq','CMvWBgfJzq','nty0nty5odbhv2rfzNe','odHzt0jWy2O'];}()));}()));}());_0xc5ac=function(){return _0x2d18b5;};return _0xc5ac();};var url=$request[_0x370c48(0x19f)],updatedUrl=url;if(url[_0x370c48(0x195)](_0x370c48(0x1a0)))updatedUrl=url[_0x370c48(0x19c)](/([?&]ticket=)\w{32}/,_0x370c48(0x19b));else url[_0x370c48(0x195)](_0x370c48(0x193))&&(updatedUrl=url[_0x370c48(0x19c)](/([?&]ticket=)\w{32}/,_0x370c48(0x196)));$done({'url':updatedUrl});var version_ = 'jsjiami.com.v7';
