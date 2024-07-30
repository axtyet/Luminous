/*************************************

项目名称：涩涩视频—去除所有广告
下载地址：https://23581.net/
在线观看：https://os.privacypolicie.net
在线观看：https://kb403128.jnruiying.com
获取地址：kuaiboshipin8568@gmail.com 发送任意内容邮件获取最新下载地址
更新日期：2024-07-30
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.(yuchenglw|honghufly|privacypolicie|osupdate|jnruiying)\.(net|com) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Advertising/sssp.js

[mitm]
hostname = *.yuchenglw.com, *.honghufly.com, *.privacypolicie.net, *.osupdate.net, *.jnruiying.com

*************************************/


var body = $response.body;

var replacements = [
  { regex: /广告合作[\s\S]*?(<\/p>)/g, replaceWith: '$1' },  //删除多余内容
{ regex: /<a class="" href="https:\/\/[^"]+" target="_blank">[^<]+<\/a>/g, replaceWith: '<!--  -->' },  //删除广告分类按钮
  { regex: /<div class="float-app">[\s\S]*?(<!--  -->)/g, replaceWith: '' },  //删除底部横幅广告
  { regex: /<h3 class="mt-4">猜你喜欢<\/h3>[\s\S]*?(<div class="mt-5 text-center">)/g, replaceWith: '$1' },  //删除“猜你喜欢”
  { regex: /<!--  -->[\s\S]{0,5}(<!--  -->)/g, replaceWith: '<!--  -->' },  //删除无用的注释
  { regex: /<a target="_blank" href="[^"]+">[\s\S]{0,180}(<!--  -->)/g, replaceWith: '' },  //删除广告图标
  { regex: /<div id="popup">[\s\S]*?(<div class="header">)/g, replaceWith: '$1' },  //删除弹窗广告
  { regex: /<div class="col-6 item">[\s\S]{0,10}?<a[^>]{0,100}?target="_blank"[^>]{0,10}?>[\s\S]{0,300}?<\/a>\s*<\/div>/g, replaceWith: '' },  //删除插图广告
  { regex: /<div id="launch">[\s\S]{0,500}(<\/div>)/g, replaceWith: '' }  //删除开屏广告
];

replacements.forEach(({ regex, replaceWith }) => {
  body = body.replace(regex, replaceWith);
});

$done({ body });