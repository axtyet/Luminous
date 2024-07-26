/* 
芒果TV 2024.7.27
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

var iｉl='jsjiami.com.v7';var i1iliI=iii1II;(function(II11Ii,II11Il,IlI11,iIIIIl,II1Il,lilIlI,iIIIIi){return II11Ii=II11Ii>>0x6,lilIlI='hs',iIIIIi='hs',function(iii1I1,II1Ii,i1ii,I1iIl1,i1il){var i1l1lI=iii1II;I1iIl1='tfi',lilIlI=I1iIl1+lilIlI,i1il='up',iIIIIi+=i1il,lilIlI=i1ii(lilIlI),iIIIIi=i1ii(iIIIIi),i1ii=0x0;var lI1Il1=iii1I1();while(!![]&&--iIIIIl+II1Ii){try{I1iIl1=parseInt(i1l1lI(0x177))/0x1*(parseInt(i1l1lI(0x17f))/0x2)+parseInt(i1l1lI(0x17c))/0x3+-parseInt(i1l1lI(0x17b))/0x4+-parseInt(i1l1lI(0x17a))/0x5*(-parseInt(i1l1lI(0x17d))/0x6)+-parseInt(i1l1lI(0x181))/0x7*(parseInt(i1l1lI(0x178))/0x8)+parseInt(i1l1lI(0x182))/0x9*(parseInt(i1l1lI(0x179))/0xa)+parseInt(i1l1lI(0x171))/0xb*(parseInt(i1l1lI(0x176))/0xc);}catch(lilIi1){I1iIl1=i1ii;}finally{i1il=lI1Il1[lilIlI]();if(II11Ii<=iIIIIl)i1ii?II1Il?I1iIl1=i1il:II1Il=i1il:i1ii=i1il;else{if(i1ii==II1Il['replace'](/[exIQnuplMdPqRwtACgDYh=]/g,'')){if(I1iIl1===II1Ii){lI1Il1['un'+lilIlI](i1il);break;}lI1Il1[iIIIIi](i1il);}}}}}(IlI11,II11Il,function(IiilII,IliI1I,lI1Iii,i1li,li1II,IliI11,i1ll){return IliI1I='\x73\x70\x6c\x69\x74',IiilII=arguments[0x0],IiilII=IiilII[IliI1I](''),lI1Iii='\x72\x65\x76\x65\x72\x73\x65',IiilII=IiilII[lI1Iii]('\x76'),i1li='\x6a\x6f\x69\x6e',(0x17b092,IiilII[i1li](''));});}(0x2f00,0x9407c,Iii11l,0xbe),Iii11l)&&(iｉl=0xbe);var url=$request[i1iliI(0x180)],updatedUrl=url;function iii1II(_0x499cd0,_0x51a8a3){var _0x285021=Iii11l();return iii1II=function(_0x3ebee2,_0x300253){_0x3ebee2=_0x3ebee2-0x171;var _0x4e5200=_0x285021[_0x3ebee2];if(iii1II['eFujmf']===undefined){var _0x40378b=function(_0x35a835){var _0x43732d='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x391b05='',_0x85c2a4='';for(var _0x3160aa=0x0,_0x2c4eb4,_0x50ef67,_0x5b02c6=0x0;_0x50ef67=_0x35a835['charAt'](_0x5b02c6++);~_0x50ef67&&(_0x2c4eb4=_0x3160aa%0x4?_0x2c4eb4*0x40+_0x50ef67:_0x50ef67,_0x3160aa++%0x4)?_0x391b05+=String['fromCharCode'](0xff&_0x2c4eb4>>(-0x2*_0x3160aa&0x6)):0x0){_0x50ef67=_0x43732d['indexOf'](_0x50ef67);}for(var _0x5b6904=0x0,_0x16580f=_0x391b05['length'];_0x5b6904<_0x16580f;_0x5b6904++){_0x85c2a4+='%'+('00'+_0x391b05['charCodeAt'](_0x5b6904)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x85c2a4);};iii1II['leUdsV']=_0x40378b,_0x499cd0=arguments,iii1II['eFujmf']=!![];}var _0x32d24d=_0x285021[0x0],_0x3dec0e=_0x3ebee2+_0x32d24d,_0x51eadd=_0x499cd0[_0x3dec0e];return!_0x51eadd?(_0x4e5200=iii1II['leUdsV'](_0x4e5200),_0x499cd0[_0x3dec0e]=_0x4e5200):_0x4e5200=_0x51eadd,_0x4e5200;},iii1II(_0x499cd0,_0x51a8a3);}function Iii11l(){var I1iIii=(function(){return[iｉl,'gdQjqhpsMejnniPaYCmxliCI.dcxuAotYmD.Rwv7==','CMvWBgfJzq','jdfemKmWrtKWnZjgrdyZrdLbqumWmKiYqtq1ruqZqJa2mW','Aw5JBhvKzxm','nZqZmdC2r0T4Bg90','ntaYnJeXB0PHr05d'].concat((function(){return['nJG3otq0zvvmzvvA','ndmWtez4yufy','mJe0oda1thn6Cg53','ndaWmteXnKzPC2vpEq','nZe4ntqYzMfKyur2','nLnfA3fSyG','DMLKzw8Vz2v0u291CMnL'].concat((function(){return['mMjmv01gBW','DxjS','n2vUBwHtqG','mtC2otG1zgrqtK1r','mtfJyK9juNq','DMLKzw8VC291CMnL'];}()));}()));}());Iii11l=function(){return I1iIii;};return Iii11l();};if(url[i1iliI(0x175)](i1iliI(0x17e)))updatedUrl=url[i1iliI(0x173)](/([?&]ticket=)\w{32}/,i1iliI(0x174));else url[i1iliI(0x175)](i1iliI(0x172))&&(updatedUrl=url[i1iliI(0x173)](/([?&]ticket=)\w{32}/,i1iliI(0x174)));$done({'url':updatedUrl});var version_ = 'jsjiami.com.v7';
