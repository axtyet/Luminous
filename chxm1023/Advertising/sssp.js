/*************************************

项目名称：涩涩视频 —— 去除所有广告
在线观看：https://ssapple.lianfa1.com/
获取地址：kuaiboshipin8568@gmail.com 发送任意内容邮件获取最新下载地址
更新日期：2026-01-11
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/ssapple\.lianfa1\.com\/(?!index\/fire|api|static).* url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Advertising/sssp.js

[mitm]
hostname = ssapple.lianfa1.com

*************************************/


var body = $response.body;

// 优化后的替换规则
var replacements = [
  // 删除广告合作段落
  { regex: /广告合作[\s\S]*?(<\/p>)/g, replaceWith: '$1' },

  // 删除特定广告链接按钮
  { regex: /<a class="" href="https:\/\/[^"]+" target="_blank" data-str="[^"]*">[^<]+<\/a>/g, replaceWith: '' },

  // 删除所有广告图标按钮
  { regex: /<a target="_blank" href="https?:\/\/[^"]+" data-str="[^"]*">[\s\S]*?<\/a>/g, replaceWith: '' },

  // 删除滑动无用轮播
  { regex: /<div class="swiper-slide">[\s\S]*?<\/div>/g, replaceWith: '' },

  // 删除滑动横幅并保留 speaker
  { regex: /<div id="carousel" class="carousel slide" data-ride="carousel">[\s\S]*?(<div class="speaker" style="display: none;">)/g, replaceWith: '$1' },

  // 播放页面置顶广告
  { regex: /<div id="tops">[\s\S]*?(<nav class="navbar navbar-expand navbar-dark bg-dark">)/g, replaceWith: '$1' },

  // 删除“猜你喜欢”
  { regex: /<h3 class="mt-4">猜你喜欢<\/h3>[\s\S]*?(<script type="text\/javascript">)/g, replaceWith: '$1' },

  // 删除悬浮窗口
  { regex: /<div id="float-square"[\s\S]*?(<script>)/g, replaceWith: '$1' },

  // 去除倒计时
  { regex: /<span id="countdown">\d+<\/span> 秒后播放/g, replaceWith: '' },

  // 删除弹窗广告
  { regex: /<div id="popup">[\s\S]*?(<div class="header">)/g, replaceWith: '$1' },

  // 删除开屏广告
  { regex: /<div id="launch">[\s\S]{0,500}<\/div>/g, replaceWith: '' },

  // 删除多余注释
  { regex: /(<!--\s*-->)(\s*\1)+/g, replaceWith: '$1' },

  // 删除插图广告
  { regex: /<div class="col-6 item">[\s\S]{0,10}?<a[^>]*?target="_blank"[^>]*?>[\s\S]{0,300}<\/a>\s*<\/div>/g, replaceWith: '' }
];

// 批量替换
body = replacements.reduce((acc, { regex, replaceWith }) => acc.replace(regex, replaceWith), body);

$done({ body });