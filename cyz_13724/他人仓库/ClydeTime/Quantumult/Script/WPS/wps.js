/******************************
脚本功能：WPS Office+解锁VIP
软件版本：11.29.2
更新时间：2022-9-28
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]
^https?:\/\/(drive|account)\.wps\.cn\/api\/(users|v3\/(spaces|mine\/vips)) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wps.js
^https?:\/\/(client|userinfo)\.docer\.wps\.cn\/(android\/mb\/buy|user\/v1\/vip\_dl\_times) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer_times.js
^https?:\/\/.+\.(docer.)?wps.cn\/(download\/v1\/ios|user\/v1\/vip|android\/mb\/buy|partner\/invoke\/usable|(api|rank)\/v1(\/mobile\/mb)?\/detail) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer.js


[mitm]
hostname = *.docer.wps.cn, vipapi.wps.cn, account.wps.cn, drive.wps.cn

**************************/

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('q L=\'1d.1e.1f\',1g=[\'‮L\'],D=[L,\'1F+1G==\',\'1H=\',\'1I=\',\'1J\',\'1K\',\'1L+1M==\',\'1N\',\'1O/1P==\',\'1Q\',\'1R==\',\'1S\',\'1T==\',\'1U==\',\'1V==\',\'1W=\',\'1X==\',\'1Y+1Z=\',\'20\',\'21=\',\'22\',\'23/24+25\',\'26.27.28==\'];s(x(h,i,j){x 1h(a,b,c,d,e,f){b=b>>29,e=\'2a\';q g=\'2b\',U=\'2c\',f=\'‮\';s(b<a){2d(--a){d=h[g]();s(b===a&&f===\'‮\'&&f[\'F\']===z){b=d,c=h[e+\'p\']()}1i s(b&&c[\'1j\'](/[2e=]/g,\'\')===b){h[U](d)}}h[U](h[g]())}G 2f};G 1h(++i,j)>>i^j}(D,1k,2g),D){1g=D[\'F\']^1k};x l(g,h){g=~~\'2h\'[\'2i\'](g[\'1l\'](z));q i=D[g];s(l[\'1m\']===N){(x(){q d=P 1n!==\'N\'?1n:P 2j===\'1o\'&&P 2k===\'x\'&&P 1p===\'1o\'?1p:2l;q e=\'2m+/=\';d[\'V\']||(d[\'V\']=x(a){q b=W(a)[\'1j\'](/=+$/,\'\');H(q c=m,Q,y,1q=m,X=\'\';y=b[\'2n\'](1q++);~y&&(Q=c%1r?Q*2o+y:y,c++%1r)?X+=W[\'1s\'](2p&Q>>(-1t*c&2q)):m){y=e[\'2r\'](y)}G X})}());x 1u(a,b){q c=[],t=m,I,Y=\'\',Z=\'\';a=V(a);H(q d=m,1v=a[\'F\'];d<1v;d++){Z+=\'%\'+(\'2s\'+a[\'15\'](d)[\'2t\'](2u))[\'1l\'](-1t)}a=2v(Z);H(q e=m;e<A;e++){c[e]=e}H(e=m;e<A;e++){t=(t+c[e]+b[\'15\'](e%b[\'F\']))%A;I=c[e];c[e]=c[t];c[t]=I}e=m;t=m;H(q f=m;f<a[\'F\'];f++){e=(e+z)%A;t=(t+c[e])%A;I=c[e];c[e]=c[t];c[t]=I;Y+=W[\'1s\'](a[\'15\'](f)^c[(c[e]+c[t])%A])}G Y}l[\'1w\']=1u;l[\'16\']={};l[\'1m\']=!![]}q j=l[\'16\'][g];s(j===N){s(l[\'1x\']===N){l[\'1x\']=!![]}i=l[\'1w\'](i,h);l[\'16\'][g]=i}1i{i=j}G i};J R=$1y[l(\'‫0\',\'2w\')];J K=$1y[\'K\'];s(!$1z[\'u\']){2x[\'2y\'](\'u\\2z\\2A!\');$1A({})}2B u=1B[l(\'‫1\',\'%2C\')]($1z[\'u\']);J 17=\'/17\';J 18=\'/18\';J 1C=l(\'‫2\',\'1D\');s(R[l(\'‮3\',\']h&r\')](17)!=-z&&K==l(\'‫4\',\'2D\')){u={\'2E\':m,\'2F\':2G,\'2H\':[{\'B\':l(\'‮5\',\'2I!k\'),\'C\':m,\'n\':o},{\'B\':l(\'‮6\',\'O$2J\'),\'C\':m,\'n\':o},{\'B\':l(\'‮7\',\'2K\'),\'C\':m,\'n\':o},{\'B\':l(\'‫8\',\'2L\'),\'C\':m,\'n\':o},{\'B\':l(\'‫9\',\'19\'),\'C\':m,\'n\':o},{\'B\':\'2M\',\'C\':m,\'n\':o}],\'2N\':\'2O\',\'2P\':m,\'2Q\':-2R,\'2S\':u[l(\'‮a\',\'19\')],\'2T\':{\'v\':l(\'‫b\',\'(2U\'),\'1a\':m,\'w\':T,\'n\':o,\'1b\':[{\'w\':T,\'v\':l(\'‮c\',\'2V%E\'),\'n\':o},{\'w\':1E,\'v\':l(\'‫d\',\'19\'),\'n\':o},{\'w\':1c,\'v\':\'稻壳会员\',\'n\':o}]},\'2W\':m,\'n\':o}}s(R[l(\'‫e\',\'%@3)\')](18)!=-z&&K==\'2X\'){u[l(\'‮f\',\'2Y\')]=[{\'v\':\'超级会员\',\'1a\':m,\'w\':T,\'n\':o,\'1b\':[{\'w\':T,\'v\':l(\'‮10\',\'2Z\'),\'n\':o},{\'w\':1E,\'v\':\'30会员\',\'n\':o},{\'w\':1c,\'v\':l(\'‮11\',\'31\'),\'n\':o}]},{\'v\':\'稻壳会员\',\'1a\':m,\'w\':1c,\'n\':o,\'1b\':32}]}s(R[l(\'‫12\',\'M^(S\')](1C)!=-z&&K==l(\'‫13\',\'!&33\')){u[l(\'‫14\',\'1D\')]=34}$1A({\'u\':1B[\'35\'](u)});L=\'1d.1e.1f\';',62,192,'|||||||||||||||||||||_0x455a|0x0|expire_time|0xf485e67f||var||if|_0x58157c|body|name|memberid|function|_0x4cbc11|0x1|0x100|spid|times|_0x3a22||length|return|for|_0x1d33e|const|method|_0xodK||undefined||typeof|_0x2ad2ff|url||0x28|_0x35a60a|atob|String|_0x51f58a|_0x4086cd|_0x4880bf||||||charCodeAt|erAJLW|users|vips|M6Tc|has_ad|enabled|0xc|jsjiami|com|v6|_0xodK_|_0x29e515|else|replace|0x182|slice|MsAaSp|window|object|global|_0x425aa0|0x4|fromCharCode|0x2|_0x4e130a|_0x11bf85|SBmlRr|fiqebj|request|response|done|JSON|spaces|nNO5|0x14|NsKydeS9u|WQhg|MUEVJcOccgQ|NEDDnkg|6LSf57qK5L6C5ZGB|56uW5aKg5L2H5ZCw|CsO|wozCiiUbKw|R1wn|wr4|wp8vHw|w4zChMKv|QhbDrjXCkg|w6UjwpsvEE49|w7zCpMKLw7jDuADCpw|EwvCng|Hl4kPHfClHUXwprDtjXDrg|w4PDgmg|WsOaVsKpWMKFWg|P8K|NcKPwqosRMKwwoA|EcKGQD4tw5jDscO3|FMKRQxM3w5U|6LWA57id5L2X5ZKK|6LS|57uu5L|Q5ZGX|EBCjswjXiaKmi|ZzlrcopmNQS|Nv6dK|0x8|po|shift|push|while|EBCwXKZzlrpNQSNdK|0x105980|0x18200|0x|concat|process|require|this|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|charAt|0x40|0xff|0x6|indexOf|00|toString|0x10|decodeURIComponent|3kkt|console|log|x20is|x20undefined|let|EGy|k9Rc|exp|level|0x3|privilege|O4|QE|rCtE|1GrD|pdf_split|result|ok|total_buy|total_cost|0x1e|userid|vip|70Q|z9|wealth|GET|hSUU|2jH4|WPS|GiCn|null|Ti|0x5b40000000|stringify'.split('|'),0,{}))











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
