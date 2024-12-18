/*************************************

项目名称：通用去广告模块
更新日期：2024-12-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*************************************/


var chxm1023 = JSON.parse($response.body);

const Params = {
  "excitationAd": "0",
  "Ad": "0",   
  "ad": false, 
  "ads": [],   
  "AdId": "",  
  "adid": "",  
  "videoAdId": "",
  "listAdId": "",
  "interstitialAdId": "",
  "detailAd": 0,
  "fr_videp_if": "0",
  "isbuy": 0,
  "islock": 0,
  "price": 0,
  "download_price": 0,
  "showAd": 0,
  "adRead": false,
  "adSwitch": false,
  "jiliAd": ""
};

searchAndModify(chxm1023, Params);

function searchAndModify(obj, Params) {for (const prop in obj) {if (typeof obj[prop] === 'object' && obj[prop] !== null) {searchAndModify(obj[prop], Params);} else if (prop in Params) {obj[prop] = Params[prop];}}}

$done({body : JSON.stringify(chxm1023)});