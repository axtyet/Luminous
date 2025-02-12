//全局AD净化处理
//理论上适配所有工具
//可以自行添加url重写
//匹配关键词删除对应内容
//更新日期: 2025-02-12
var ddm = JSON.parse($response.body);

if (/(top_notice|advert)/.test($request.url)) {
  // 修改响应为空
  ddm = {};
} else {
  // 数组关键词列表
  const keywords = {
    "layout": "advert_self",
    "acttype": "ad",
    "actcontent": "ad"
  };

  // 键值列表
  const kvlist = {
    "is_auth": 1,
    "try_see": 1,
    "is_subscribe": 1,
    "switch": 0,
    "google" : 0,
    "adtype": 0,
    "mian_ad": 0,
    "splash_img": "",
    "advert_sdk_app_id": "",
    "config_vip_advert": "0",
    "advert_sdk_open": "0",
    "startad": false,
    "slideshowad": false,
    "popad": false,
    "btnad": false,
    "excitationAd": "0",
    "is_top": 0,
    "Ad": "0",
    "ad": false,
    "ads": null,
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

  // 清空字段列表
  const fieldstoclear = ["upgradenew", "quad"];

  // 核心代码请勿删除
  function filterAndModify(obj){if(Array.isArray(obj)){return obj.map(filterAndModify).filter(item=>!containskeywords(item))}else if(typeof obj==='object'&&obj!==null){for(const key in obj){if(fieldstoclear.includes(key)){obj[key]={}}else if(containskeywords(obj[key])){delete obj[key]}else if(typeof obj[key]==='object'&&obj[key]!==null){obj[key]=filterAndModify(obj[key])}else if(key in kvlist){obj[key]=kvlist[key]}}return obj}return obj}
  function containskeywords(item){if(typeof item==='object'&&item!==null){return Object.keys(item).some(key=>{return Object.keys(keywords).some(adKey=>{return key===adKey&&item[key]===keywords[adKey]})})}return false}
  ddm=filterAndModify(ddm);
}

$done({ body: JSON.stringify(ddm) });