/******************************
🧚🏻‍♂️项目名称：央视频 
🧚🏻‍♂️脚本作者：ios151
🧚🏻‍♂️特别说明：公益项目请勿盗用
🧚🏻‍♂️软件版本: 20240809最新版本
🧚🏻‍♂️注意事项：仅供学习 请勿传播售卖
***************************

[rewrite_local]

^http:\/\/(liveinfo|bkliveinfo|playvv)\.ysp\.cctv\.cn\/(playvinfo\?.+|.*) url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/yangshipin.js

# 解锁[电视]内会员 如果登录提示错误的话 手动屏蔽下面这条
&guid=[\w-]+&app_version=[\d\.]+&spadseg=\d&userid=(\d*)? url 302 &guid=f066be2cdf1c4f4893eb818de454313a&app_version=3.0.0.23522&spadseg=3&userid=234090757

#^https:\/\/liveinfo\.ysp\.cctv\.cn\/ url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/yangshipin.js
#^https:\/\/m\.yangshipin\.cn\/static\/\w/\w+\/index\.html$ url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/yangshipin.js
# > 央视频 去广告
^https?:\/\/cdn\.cmgadx\.com\/sdk\/pool\/.+\.json url reject-dict


[mitm]
hostname = *.ysp.cctv.cn, cdn.cmgadx.com

*******************************/

var iｉl='jsjiami.com.v7';function iii1II(_0x4c9fb2,_0x2f4d3a){const _0x52d60f=Iii11l();return iii1II=function(_0x1bb987,_0x346261){_0x1bb987=_0x1bb987-0xf0;let _0x4eec13=_0x52d60f[_0x1bb987];if(iii1II['yZPfXZ']===undefined){var _0x4fb2e1=function(_0x26efe0){const _0x52713c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x1d9ae1='',_0x18e1f3='';for(let _0x46d56f=0x0,_0x2c9bc9,_0x21e8e3,_0xea432c=0x0;_0x21e8e3=_0x26efe0['charAt'](_0xea432c++);~_0x21e8e3&&(_0x2c9bc9=_0x46d56f%0x4?_0x2c9bc9*0x40+_0x21e8e3:_0x21e8e3,_0x46d56f++%0x4)?_0x1d9ae1+=String['fromCharCode'](0xff&_0x2c9bc9>>(-0x2*_0x46d56f&0x6)):0x0){_0x21e8e3=_0x52713c['indexOf'](_0x21e8e3);}for(let _0x2d5d33=0x0,_0x11c994=_0x1d9ae1['length'];_0x2d5d33<_0x11c994;_0x2d5d33++){_0x18e1f3+='%'+('00'+_0x1d9ae1['charCodeAt'](_0x2d5d33)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x18e1f3);};iii1II['RUTmYd']=_0x4fb2e1,_0x4c9fb2=arguments,iii1II['yZPfXZ']=!![];}const _0x117302=_0x52d60f[0x0],_0xdd80ce=_0x1bb987+_0x117302,_0x47b846=_0x4c9fb2[_0xdd80ce];return!_0x47b846?(_0x4eec13=iii1II['RUTmYd'](_0x4eec13),_0x4c9fb2[_0xdd80ce]=_0x4eec13):_0x4eec13=_0x47b846,_0x4eec13;},iii1II(_0x4c9fb2,_0x2f4d3a);}const i1ll=iii1II;(function(i1l1l1,IlI1I,II11Ii,II11Il,IlI11,iIIIIl,II1Il){return i1l1l1=i1l1l1>>0x1,iIIIIl='hs',II1Il='hs',function(lilIlI,iIIIIi,iii1I1,II1Ii,i1ii){const IliI11=iii1II;II1Ii='tfi',iIIIIl=II1Ii+iIIIIl,i1ii='up',II1Il+=i1ii,iIIIIl=iii1I1(iIIIIl),II1Il=iii1I1(II1Il),iii1I1=0x0;const I1iIl1=lilIlI();while(!![]&&--II11Il+iIIIIi){try{II1Ii=parseInt(IliI11(0xf4))/0x1+-parseInt(IliI11(0xfc))/0x2+-parseInt(IliI11(0xf3))/0x3+parseInt(IliI11(0xf9))/0x4*(parseInt(IliI11(0xf7))/0x5)+parseInt(IliI11(0xf0))/0x6*(-parseInt(IliI11(0xf5))/0x7)+-parseInt(IliI11(0xf1))/0x8+-parseInt(IliI11(0xf8))/0x9*(-parseInt(IliI11(0xfa))/0xa);}catch(i1il){II1Ii=iii1I1;}finally{i1ii=I1iIl1[iIIIIl]();if(i1l1l1<=II11Il)iii1I1?IlI11?II1Ii=i1ii:IlI11=i1ii:iii1I1=i1ii;else{if(iii1I1==IlI11['replace'](/[dGOBYkAQVHxDtKWlMSnU=]/g,'')){if(II1Ii===iIIIIi){I1iIl1['un'+iIIIIl](i1ii);break;}I1iIl1[II1Il](i1ii);}}}}}(II11Ii,IlI1I,function(lI1Il1,lilIi1,IiilII,IliI1I,lI1Iii,i1li,li1II){return lilIi1='\x73\x70\x6c\x69\x74',lI1Il1=arguments[0x0],lI1Il1=lI1Il1[lilIi1](''),IiilII='\x72\x65\x76\x65\x72\x73\x65',lI1Il1=lI1Il1[IiilII]('\x76'),IliI1I='\x6a\x6f\x69\x6e',(0x17d067,lI1Il1[IliI1I](''));});}(0x198,0x1dffe,Iii11l,0xce),Iii11l)&&(iｉl=`\x16b`);let headers=$request[i1ll(0xfb)];function Iii11l(){const i1l1lI=(function(){return[iｉl,'dADjOWsjYiaMmknBiG.YKKcVxonmS.Htdv7lSQUS==','q29VA2LL','mZuYnJuZqKXTBuT4','mtC5mtm1u1blv0fI','mtC1tMjnshjM'].concat((function(){return['x3zPzgvVx3fXx3zLCNnPB249ms4Wo192AwrLB19XCv92zxjZAw9UpteUmdTFDMLKzw9FCxfFDMvYC2LVBJ0XlJa7x3zPzgvVx3fXx3zLCNnPB249ms4Wo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nPzgvdB2rLpsHUDwXSktTZAwrLq29Kzt0OBNvSBcK7C2LKzunVzgu9kg51BgWPo3nPzgvdB2rLpsHUDwXSktTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTYzwzYzxnOvg9Rzw49rtyWruzdm0u0nJKWnKqXrdGZney1rJa0otbgrtC5mee7CMvMCMvZAfrVA2vUpuu2mevgqZnfndy5mdzemuq4mZrgnuyWndKWrKu3otbbo3jLzNjLC2HuB2TLBJ1fnJbfrKmZrtq2ota2rdfeodm0rJvgmdq5mezfnZKWqtTYzwzYzxnOvg9Rzw49rtyWruzdm0u0nJKWnKqXrdGZney1rJa0otbgrtC5mee7B3bLBKLKpuu0mtiZqtyZqJiWquzeqtbboey5nJK2mKiYodzcrdDfo29Wzw5jzd1fndeYm0e2m0iYmefgreeWqtHgoty5nJjcmJG2qKq3rtTVCgvUswq9rtqXmJnbnJncmJbbrKrbmee4rJK2otyYqJi4nKjen0u7B3bLBKLKpuu0mtiZqtyZqJiWquzeqtbboey5nJK2mKiYodzcrdDfo3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vZC2LVBJ1nrwnhm2P5tvjcn2PxDJi1n3LLALzAELLPCdaWwxzAt1jhswDAzMnUrwPNo3z1C2vZC2LVBJ1nrwnhm2P5tvjcn2PxDJi1n3LLALzAELLPCdaWwxzAt1jhswDAzMnUrwPNo3z1C2vZC2LVBJ1nrwnhm2P5tvjcn2PxDJi1n3LLALzAELLPCdaWwxzAt1jhswDAzMnUrwPNo3z1C2vZC2LVBJ1nrwnhm2P5tvjcn2PxDJi1n3LLALzAELLPCdaWwxzAt1jhswDAzMnUrwPNo3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5','ntbuy3H0D3i','mZy2m3fJvNfbuG','ndC3mJbHueriEM0','mZaWmg1by1v5EG','AgvHzgvYCW'].concat((function(){return['mtG2ndiWBufQBLnJ','mZGXmgXkv1vIEG','nty4mty4yLfeBufj'];}()));}()));}());Iii11l=function(){return i1l1lI;};return Iii11l();};headers[i1ll(0xf2)]=i1ll(0xf6),$done({'headers':headers});var version_ = 'jsjiami.com.v7';
