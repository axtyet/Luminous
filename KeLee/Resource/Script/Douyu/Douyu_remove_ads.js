// 2024-07-28 21:37:36
const url = $request.url;
let obj = JSON.parse($response.body);

function removeAdsFromRecCont(data) {
    if (data && data.rec_cont) {
        data.rec_cont.forEach(item => {
            if (item.hasOwnProperty("ad")) {
                delete item.ad;
            }
        });
    }
}

function removePendantAndEntrance(data) {
    if (data) {
        delete data.pendant_a;
        delete data.entrance_d;
    }
}

function setKeysToZero(data, keys) {
    keys.forEach(key => {
        if (data.hasOwnProperty(key)) {
            data[key] = 0;
        }
    });
}

// 首页轮播图和视频流广告
if (url.includes("/mgapi/livenc/home/getRecV3")) {
    removeAdsFromRecCont(obj.data);
}

// 首页直播间悬浮窗
if (url.includes("/japi/entrance/roomRes/nc/m/list")) {
    removePendantAndEntrance(obj.data);
}

if (/^\/venus\/config\/static\/update\?aid=ios&client_sys=ios&keyCodeSet=flow_config/.test(url)) {
    const keysToZero = [
        "greatGodGameSitterSwitch", // 大神游戏陪玩
        "followMoreAnchorEntrance", // 关注更多主播入口
        "sdklivebanner", // 直播横幅
        "homeActFloatSwitch", // 首页活动悬浮窗
        "bringGoodsSwitch", // 带货开关
        "qqGameSwitch" // QQ游戏
    ];
    setKeysToZero(obj, keysToZero);
}

$done({ body: JSON.stringify(obj) });