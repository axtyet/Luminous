// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_baidu.js

/*
let Oldone = '</style>'
let Newone = '.ec_ad_results{display:none!important}</style>';
let body = $response.body
.replace(Oldone, Newone);
$done({body});
*/

let rHead = "<head>";
let newStyle =
  '<head><link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/baidu.css" type="text/css">';
var rBody = "</body>";
var newJavaScript =
  '<script type="text/javascript" async="async" src="https://gitlab.com/RuCu6/QuanX/-/raw/main/Scripts/limbo/baidu.js"></script>';
let body = $response.body.replace(rHead, newStyle).replace(rBody, newJavaScript);
$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
