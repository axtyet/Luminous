// 2024-08-17 01:20:01
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/maimai/feed/v6/feed_detail_comment?")) {
    if (obj.lst && Array.isArray(obj.lst)) {
        obj.lst = obj.lst.filter(item => !item.hasOwnProperty("newAdStyle")); // 信息流广告
    }
} else if (url.includes("/maimai/feed/v6/feed_detail_header?")) {
    if (obj.feed && obj.feed.style1 && Array.isArray(obj.feed.style1.link_card)) {
        obj.feed.style1.link_card = obj.feed.style1.link_card.filter(item => !item.hasOwnProperty("link_card")); // 信息流推广卡片
    }
} else if (url.includes("/maimai/feed/v5/focus_feed?")) {
    if (obj.feeds && obj.feeds.style1 && Array.isArray(obj.feeds.style1.link_card)) {
        obj.feeds.style1.link_card = obj.feeds.style1.link_card.filter(item => !item.hasOwnProperty("link_card")); // 信息流推广卡片
    }
}

$done({ body: JSON.stringify(obj) });