// @timestamp thenkey 2023-11-22 22:39:44
// @key Neurogram loon
const e=$persistentStore.read("字幕位置"),t={"仅输出译文":"d","译文位于外文之上":"one","译文位于外文之下":"two"};let d=t[e]||"d",a=$request.url,n=$request.headers;a.match(/\.m3u8/)&&$done({});let r=$response.body;r||$done({}),$httpClient.get({url:`${a}&tlang=zh-Hans`,headers:n},(function(e,t,n){"d"==d&&$done({body:n});let $=r.match(/<p t="\d+" d="\d+">/g);for(var o in a.match(/&kind=asr/)&&(r=r.replace(/<\/?s[^>]*>/g,""),n=n.replace(/<\/?s[^>]*>/g,""),$=r.match(/<p t="\d+" d="\d+"[^>]+>/g)),$){let e=new RegExp(`${$[o]}([^<]+)<\\/p>`);r.match(e)&&n.match(e)&&("two"==d&&(r=r.replace(e,`${$[o]}$1\n${n.match(e)[1]}</p>`)),"one"==d&&(r=r.replace(e,`${$[o]}${n.match(e)[1]}\n$1</p>`)))}$done({body:r})}));











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
