/* 
芒果TV 2024.7.16
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

[mitm] 
hostname = *.mgtv.com

*/




var _0xod4='jsjiami.com.v7';var _0x3e8dd2=_0x312b;function _0x56b9(){var _0x4857c6=(function(){return[_0xod4,'wxjksTIjfiAVKamiy.kcqowxmy.XvUy7HWGnVkRp==','mJC2nda1mLHcuxbdyW','DMLKzw8Vz2v0u291CMnL','Aw5JBhvKzxm','DxjS'].concat((function(){return['mJm3odu2odbYuwXHqw8','mtqYntC4nM1muKfJAW','DMLKzw8VC291CMnL','nJK0rKjfnJiXrKmWmZbcodLbodK5rta3n0q2ouvbndK','CMvWBgfJzq','nZq2mtjrvwDLsxu'].concat((function(){return['mZa2otC3nxDWs2TpvW','m1rMBwzstW','ode2mZyZme9LvuX5BW','muu3mtffrte0otq3mZGXmZHdrKy3rtLeq0fgqKfeqte','mti3mJqWnZvjv0DcDwW'];}()));}()));}());_0x56b9=function(){return _0x4857c6;};return _0x56b9();};function _0x312b(_0xf9f4d5,_0x5962cb){var _0x56b9a6=_0x56b9();return _0x312b=function(_0x312b5a,_0x487b0e){_0x312b5a=_0x312b5a-0xb6;var _0x10b559=_0x56b9a6[_0x312b5a];if(_0x312b['shhYEM']===undefined){var _0xe6a1cd=function(_0x4d79d5){var _0x460395='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x4b06d2='',_0x2c4f89='';for(var _0x3dca9f=0x0,_0xd37fb9,_0x1bcfe5,_0x1dc8da=0x0;_0x1bcfe5=_0x4d79d5['charAt'](_0x1dc8da++);~_0x1bcfe5&&(_0xd37fb9=_0x3dca9f%0x4?_0xd37fb9*0x40+_0x1bcfe5:_0x1bcfe5,_0x3dca9f++%0x4)?_0x4b06d2+=String['fromCharCode'](0xff&_0xd37fb9>>(-0x2*_0x3dca9f&0x6)):0x0){_0x1bcfe5=_0x460395['indexOf'](_0x1bcfe5);}for(var _0x2ef652=0x0,_0x4bbeb7=_0x4b06d2['length'];_0x2ef652<_0x4bbeb7;_0x2ef652++){_0x2c4f89+='%'+('00'+_0x4b06d2['charCodeAt'](_0x2ef652)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2c4f89);};_0x312b['vchIrC']=_0xe6a1cd,_0xf9f4d5=arguments,_0x312b['shhYEM']=!![];}var _0x24835a=_0x56b9a6[0x0],_0x205f04=_0x312b5a+_0x24835a,_0x15ee5e=_0xf9f4d5[_0x205f04];return!_0x15ee5e?(_0x10b559=_0x312b['vchIrC'](_0x10b559),_0xf9f4d5[_0x205f04]=_0x10b559):_0x10b559=_0x15ee5e,_0x10b559;},_0x312b(_0xf9f4d5,_0x5962cb);}if(function(_0x4a8c7f,_0xc599f2,_0x22ff52,_0x3dd09e,_0x90eb74,_0x27ef9c,_0x421953){return _0x4a8c7f=_0x4a8c7f>>0x7,_0x27ef9c='hs',_0x421953='hs',function(_0x2ec83b,_0x4ce726,_0x210be5,_0x1ef5bc,_0x18cd92){var _0x259dd9=_0x312b;_0x1ef5bc='tfi',_0x27ef9c=_0x1ef5bc+_0x27ef9c,_0x18cd92='up',_0x421953+=_0x18cd92,_0x27ef9c=_0x210be5(_0x27ef9c),_0x421953=_0x210be5(_0x421953),_0x210be5=0x0;var _0x501b87=_0x2ec83b();while(!![]&&--_0x3dd09e+_0x4ce726){try{_0x1ef5bc=parseInt(_0x259dd9(0xb9))/0x1+parseInt(_0x259dd9(0xc3))/0x2*(parseInt(_0x259dd9(0xbf))/0x3)+parseInt(_0x259dd9(0xbd))/0x4+parseInt(_0x259dd9(0xbe))/0x5+-parseInt(_0x259dd9(0xc0))/0x6+parseInt(_0x259dd9(0xc2))/0x7+-parseInt(_0x259dd9(0xb8))/0x8;}catch(_0x374263){_0x1ef5bc=_0x210be5;}finally{_0x18cd92=_0x501b87[_0x27ef9c]();if(_0x4a8c7f<=_0x3dd09e)_0x210be5?_0x90eb74?_0x1ef5bc=_0x18cd92:_0x90eb74=_0x18cd92:_0x210be5=_0x18cd92;else{if(_0x210be5==_0x90eb74['replace'](/[AfUIKwTxVqGyHWpRnkX=]/g,'')){if(_0x1ef5bc===_0x4ce726){_0x501b87['un'+_0x27ef9c](_0x18cd92);break;}_0x501b87[_0x421953](_0x18cd92);}}}}}(_0x22ff52,_0xc599f2,function(_0x1351a3,_0xed560c,_0x47502d,_0x28f9d8,_0x44b742,_0x511e71,_0x3b8626){return _0xed560c='\x73\x70\x6c\x69\x74',_0x1351a3=arguments[0x0],_0x1351a3=_0x1351a3[_0xed560c](''),_0x47502d='\x72\x65\x76\x65\x72\x73\x65',_0x1351a3=_0x1351a3[_0x47502d]('\x76'),_0x28f9d8='\x6a\x6f\x69\x6e',(0x1792ec,_0x1351a3[_0x28f9d8](''));});}(0x5f80,0xe1aaa,_0x56b9,0xc1),_0x56b9){}var url=$request[_0x3e8dd2(0xb7)];if(url[_0x3e8dd2(0xb6)](_0x3e8dd2(0xc4)))var updatedUrl=url[_0x3e8dd2(0xbc)](/(&ticket=)\w{32}/,'$1'+_0x3e8dd2(0xbb));else{if(url[_0x3e8dd2(0xb6)](_0x3e8dd2(0xba)))var updatedUrl=url[_0x3e8dd2(0xbc)](/(&ticket=)\w{32}/,'$1'+_0x3e8dd2(0xc1));else var updatedUrl=url;}$done({'url':updatedUrl});var version_ = 'jsjiami.com.v7';
