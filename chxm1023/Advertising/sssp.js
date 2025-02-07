/*************************************

项目名称：涩涩视频—去除所有广告
下载地址：https://21139.net
在线观看：https://30719.net
在线观看：https://files.honghufly.com
获取地址：kuaiboshipin8568@gmail.com 发送任意内容邮件获取最新下载地址
更新日期：2025-02-07
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(30719|files\.honghufly)\.(net|com) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Advertising/sssp.js

[mitm]
hostname = 30719.net, files.honghufly.com

*************************************/


var body = $response.body;

var replacements = [
  { regex: /广告合作[\s\S]*?(<\/p>)/g, replaceWith: '$1' },  // 删除多余内容
  { regex: /<a class="" href="https:\/\/[^"]+" target="_blank" data-str="[^"]*">[^<]+<\/a>/g, replaceWith: '<!--  -->' },  // 删除特定广告链接按钮
  { regex: /<a target="_blank" href="http[s]?:\/\/[^"]+" data-str="[^"]*">[\s\S]*?<\/a>/g, replaceWith: '<!--  -->' },  // 删除所有广告图标按钮
  { regex: /<div class="float-app">[\s\S]*?(<!--  -->)/g, replaceWith: '' },  // 删除底部横幅广告
  { regex: /<div class="swiper-slide">[\s\S]*?(<\/div>)/g, replaceWith: '' },  // 删除无用滑动
  { regex: /<div id="carousel" class="carousel slide" data-ride="carousel">[\s\S]*?(<div class="speaker" style="display: none;">)/g, replaceWith: '<div class="speaker" style="display: none;">' },  //删除滑动横幅
  { regex: /<h3 class="mt-4">猜你喜欢<\/h3>[\s\S]*?(<div class="mt-5 text-center">)/g, replaceWith: '$1' },  //删除“猜你喜欢”
  { regex: /<div id="popup">[\s\S]*?(<div class="header">)/g, replaceWith: '$1' }, 
  { regex: /<div id="launch">[\s\S]{0,500}(<\/div>)/g, replaceWith: '' },  // 删除开屏广告
  { regex: /(<!--\s*-->)(\s*\1)+/g, replaceWith: '$1' },  // 删除多余的注释
  { regex: /<div class="col-6 item">[\s\S]{0,10}?(<a[^>]*?target="_blank"[^>]*?>[\s\S]{0,300}<\/a>)\s*<\/div>/g, replaceWith: '' }  // 删除插图广告
];

replacements.forEach(({ regex, replaceWith }) => {
  body = body.replace(regex, replaceWith);
});

$done({ body });