/************************
 通用 AD 净化框架 + 正则扩展
 支持：
 ✓ URL 全量清空
 ✓ 字段值匹配删除
 ✓ 多值数组匹配
 ✓ 正则匹配值
 ✓ 字段改值
 ✓ 清空字段内容
*************************/

var ddm = JSON.parse($response.body);

/******** URL 全量清空规则 ********/
const fullClearRules = /(top_notice|version)/;

if (fullClearRules.test($request.url)) {
  ddm = {};
  $done({ body: JSON.stringify(ddm) });
  return;
}

/******** 精确匹配/数组匹配 ********/
const keywords = {
  // ——— 单值匹配 ———
  "sub_title": "",

  // ——— 多值数组 ———
  "keyName": [
    "config.main.dialog",
    "config.ad.setting",
    "config.ad.popup"
  ],

  "type": [
    "ads",
    "ad",
    "advert"
  ],

  "layout": [
    "advert_self",
    "banner_ad",
    "feed_ad"
  ]
};

/*********** 正则匹配值 ***********/
// ⚠ 仅当需要时添加规则，避免误杀

const regexRules = {
  // 示例：匹配包含 ad / advert / 广告标识的字段值
  "type": /ad|advert|推广|广告/i,

  // 示例：匹配所有带 ad_xxx 的模块名
  "module": /^ad_/i,

  // 示例：匹配含 splash / 开屏
  "slot": /(splash|开屏)/i
};

/****** 字段值改写（禁用广告） ******/
const kvlist = {
  "is_auth": 1,
  "try_see": 1,
  "is_subscribe": 1,
  "switch": 0,
  "google": 0,
  "adtype": 0,
  "mian_ad": 0,
  "main_ad": 0,
  "splash_img": "",
  "config_vip_advert": "0",
  "advert_sdk_open": "0",
  "config_support_reward_id": "",
  "config_video_start_day_num": "0",
  "advert_sdk_app_id": "",
  "config_index_alert": "0",
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
  "fr_video_if": "0",
  "isbuy": 0,
  "islock": 0,
  "price": 0,
  "download_price": 0,
  "showAd": 0,
  "adRead": false,
  "adSwitch": false,
  "jiliAd": ""
};

/******** 保留字段/清空内容 ********/
const fieldsToClear = [
  "quad",
  "upgradenew"
];


/************ 匹配函数 ************/
// 判断是否命中 keywords（字符串 + 数组）
function matchKeywordRule(item) {
  if (typeof item !== "object" || item === null) return false;
  return Object.keys(item).some(key => {
    if (!(key in keywords)) return false;
    const rule = keywords[key];
    // 多值数组
    if (Array.isArray(rule)) {
      return rule.includes(item[key]);
    }
    // 单值匹配
    return item[key] === rule;
  });
}


// 判断是否命中正则规则
function matchRegexRule(item) {
  if (typeof item !== "object" || item === null) return false;
  return Object.keys(item).some(key => {
    if (!(key in regexRules)) return false;
    const reg = regexRules[key];
    // 只对 字符串 / 数字 进行正则匹配
    if (typeof item[key] === "string" || typeof item[key] === "number") {
      return reg.test(String(item[key]));
    }
    return false;
  });
}

/*********** 主过滤逻辑 ***********/
function filterAndModify(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(filterAndModify)
      .filter(item => !(matchKeywordRule(item) || matchRegexRule(item)));
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      // 清空字段内容
      if (fieldsToClear.includes(key)) {
        obj[key] = {};
        continue;
      }
      // 命中 精确匹配 / 正则匹配 → 删除对象
      if (matchKeywordRule(obj[key]) || matchRegexRule(obj[key])) {
        delete obj[key];
        continue;
      }
      // 递归处理
      if (typeof obj[key] === "object" && obj[key] !== null) {
        obj[key] = filterAndModify(obj[key]);
        continue;
      }
      // 命中强制改值字段
      if (key in kvlist) {
        obj[key] = kvlist[key];
      }
    }
  }
  return obj;
}

ddm = filterAndModify(ddm);

$done({ body: JSON.stringify(ddm) });