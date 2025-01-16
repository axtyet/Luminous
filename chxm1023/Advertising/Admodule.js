/*************************************

项目名称：通用去广告模块
更新日期：2025-01-16
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*************************************/


var ddm = JSON.parse($response.body);

if (/(top_notice|advert)/.test($request.url)) {
  //清空AD内容修改成空响应
  ddm = {};
} else {
  // 定义AD对象关键词
  const ADKeywords = {
    "layout": "advert_self",
    "acttype": "ad",
    "actcontent": "ad"
  };
  // 定义AD相关键值
  const ADlist = {
    "is_auth": 1,
    "try_see": 1,
    "is_subscribe": 1,
    "switch": 0,
    "adtype": 0,
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
  //核心内容
  function filterAndModify(obj) {
    if (Array.isArray(obj)) {
      return obj.map(filterAndModify).filter(item => !containsAdKeywords(item));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (containsAdKeywords(obj[key])) {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          obj[key] = filterAndModify(obj[key]);
        } else if (key in ADlist) {
          obj[key] = ADlist[key];
        }
      }
      return obj;
    }
    return obj;
  }
  function containsAdKeywords(item) {
    if (typeof item === 'object' && item !== null) {
      return Object.keys(item).some(key => {
        return Object.keys(ADKeywords).some(adKey => {
          return key === adKey && item[key] === ADKeywords[adKey];
        });
      });
    }
    return false;
  }

  ddm = filterAndModify(ddm);
}

$done({ body: JSON.stringify(ddm) });