/*
 
Goodnotes6



[rewrite_local]
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/goodnotes6.js
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/Yu9191/Script/main/goodnotes6.js

[mitm]
hostname = isi.csan.goodnotes.com
*/

var version_='jsjiami.com.v7';function b(c,d){const e=a();return b=function(f,g){f=f-0x116;let h=e[f];if(b['PrPTRs']===undefined){var i=function(n){const o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let p='',q='';for(let r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(let v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};const m=function(n,o){let p=[],q=0x0,r,t='';n=i(n);let u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(let v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['xyDTAL']=m,c=arguments,b['PrPTRs']=!![];}const j=e[0x0],k=f+j,l=c[k];return!l?(b['SumRgD']===undefined&&(b['SumRgD']=!![]),h=b['xyDTAL'](h,g),c[k]=h):h=l,h;},b(c,d);}const V=b;function a(){const W=(function(){return[version_,'yrjOsqjuiLXGaVmbi.kBlcwBoqmJ.yuvt7yDQPqp==','mMagWRzO','W4SnCcGvW4/dPcCsW4uLfq','WQyhnsRdGWLBWOpcSSoma0pcTIBdNhTkW43dH1rF','5lQ45lYX5AYv5lUI776s56s25QYy6l6j6l6+5OQF5zAu5y20','cICgW6TN','W6imkdXOeg/dPs8','W7fKmSk0WRuqEmk5ACogFG','sCkDrCk1WQ3cJGJcHmkgW4JdThG','gmoeb8oRW6RdMX/cImkMW6FdJLe','fmk7jSk8Da','WP98WRPBcZK0W6xdG8kqg8kU','lSofW7dcPa','shzgWQOVA8oGeZhdGxpdLGPZWQifrbnvW5K','WRJdRmobWQxdO8kNW6u9dmovWOiI','WOjCW5tcRNZdLNK'].concat((function(){return['rZerD8oTW7HQmsRcS1vX','WO/dOmoczCkZW7ZdLCofbW','W4JdNCokwCkhW7NdNq','axa4A8kkW6xdJMqeWPNcS8ou','WR8XW4fWWRvUla','W63cQCkdW7VcTmobW6Gkn8oyWRSt','FKtcRehcS8kJC8o1A8knWRD/jSoMgfRdHq','W64xD0bSymkJtsm','WQRdH8opFCkClmoL','W5P3s8kuWRf+W43dUdRdJG','zSkmW6idBXJdGuBcRmo8','WPBcLCkEC08cjKVdSI3cJmk+','uwj4FSooW7xcMNvxWOVdTmoBW4q','WQboCXf7fwNdQaSWqxldIheqWQRcL1K','W47dR3pdVmkRWRldOCo6Fq','W5ldHSoUWOKUW7VcUCoXbW','gsKzWRzLnmk2wM/cL1pcG0bNW7vsshWdW61zW5/dMSkWkCojW4RdLgBdKsG2cSo/cuD4Fq'].concat((function(){return['W4hdKSkjo8kYrCoWW7NdPJpcTmoOW5b4afBcNmopWOxcOa','pwxdVJdcK3BcNcddMa4aW5W','af/cQJOJjZf/mNa','EmoJW67cIg7cMSof','W6/cSCklW7RdOmkUWRTA','W47cPmkcpSoWWQVcHCkotNTyamoDySkXW4TjgGmY','zWbVW4tdQajTnMiPjeXwBmkGWReCxCo7fW','WRHplZWf','iSoYWOtcNmknySomW6BdGSkoFmk+','zaBcUL0','WRePACo/W6uovSk5wmo8','fmoMWQOeWQ7cM8oBWQS','mg7dQZ3cGMJcIG','5lI25l6J5AYJ5lM777YG56w85Q+N6lYN6lYP5OQ75zwT5yYu','W6inkKy3qhldPXG1C0G','W6VdLexdMSkfWPRdNmoAxq'];}()));}()));}());a=function(){return W;};return a();};(function(c,d,e,f,g,h,i){return c=c>>0x8,h='hs',i='hs',function(j,k,l,m,n){const U=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;const o=j();while(!![]&&--f+k){try{m=parseInt(U(0x12e,'0e0b'))/0x1+-parseInt(U(0x134,'jA&g'))/0x2+parseInt(U(0x143,'EX*z'))/0x3*(-parseInt(U(0x117,'%qUz'))/0x4)+-parseInt(U(0x120,'2s1a'))/0x5+-parseInt(U(0x13b,'jA&g'))/0x6*(-parseInt(U(0x13c,'*S05'))/0x7)+parseInt(U(0x140,'9GXX'))/0x8+parseInt(U(0x145,'gsWG'))/0x9;}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[plwPOtQGruXBVqbykDLJ=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x139b37,j[m](''));});}(0xcd00,0x18f4d,a,0xcf),a)&&(version_=a);const chxm1023={},chxm1024=JSON[V(0x13f,'$zi]')](typeof $response!='undefined'&&$response[V(0x12f,'9(16')]||null),namea=V(0x11a,'EX*z'),nameb=V(0x126,'vBnu'),jsid=V(0x125,'0p*o');if(typeof $response==V(0x135,'#LdS'))delete $request[V(0x132,'nnl&')][V(0x11b,'9(16')],delete $request[V(0x11d,'dS5o')]['X-RevenueCat-ETag'],chxm1023[V(0x144,'DKCH')]=$request[V(0x119,'Pi[A')];else{if(chxm1024&&chxm1024[V(0x11e,'b9!r')]){const AYlrxG=V(0x121,'OcZ0')[V(0x136,'9ryz')]('|');let MvNEWY=0x0;while(!![]){switch(AYlrxG[MvNEWY++]){case'0':chxm1024['subscriber']['entitlements'][namea]=JSON[V(0x13a,'0p*o')](JSON['stringify'](data));continue;case'1':chxm1024[V(0x11f,'%E[!')][V(0x13e,'n51S')][nameb]=JSON[V(0x12d,'cV1x')](JSON[V(0x116,'%qUz')](data));continue;case'2':chxm1023[V(0x141,'Dw73')]=JSON[V(0x11c,'1jmS')](chxm1024);continue;case'3':chxm1024[V(0x128,'1ZNr')][V(0x127,'nnl&')][nameb]['product_identifier']=jsid;continue;case'4':chxm1024['subscriber']['subscriptions'][jsid]={'Author':V(0x12a,'EX*z'),'Telegram':'https://t.me/chxm1023','warning':V(0x139,'n51S'),'original_purchase_date':V(0x12b,'%qUz'),'purchase_date':V(0x142,'0p*o'),'store':V(0x124,'AZLr'),'ownership_type':V(0x123,'#LdS')};continue;case'5':data={'Author':V(0x131,']t]2'),'Telegram':V(0x138,'P*Ix'),'warning':V(0x133,'Cc$8'),'purchase_date':V(0x12c,'lt(k')};continue;case'6':chxm1024[V(0x130,'*S05')][V(0x118,'OcZ0')][namea][V(0x122,'jA&g')]=jsid;continue;}break;}}}$done(chxm1023);var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
