// 2024-08-17 18:15:51
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/maimai/feed/v6/feed_detail_comment?")) {
    if (obj.lst && Array.isArray(obj.lst)) {
        obj.lst = obj.lst.filter(item => !item.hasOwnProperty("newAdStyle")); // 信息流和评论区广告
    }
} else if (url.includes("/maimai/gossip/v3/gossip_detail_comment?")) {
    if (obj.comments && obj.comments.lst && Array.isArray(obj.comments.lst)) {
        obj.comments.lst = obj.comments.lst.filter(item => !item.hasOwnProperty("newAdStyle")); // 信息流和评论区广告
    }
} else if (url.includes("/maimai/feed/v6/feed_detail_header?")) {
    if (obj.feed && obj.feed.style1 && Array.isArray(obj.feed.style1)) {
        obj.feed.style1 = obj.feed.style1.filter(item => !(item.link_card && (item.link_card.type === 0 || item.link_card.type === 3))); // 信息流和文章末尾卡片广告
    }
} else if (url.includes("/maimai/feed/v5/focus_feed?")) {
    if (obj.feeds && obj.feeds.style1 && Array.isArray(obj.feeds.style1)) {
        obj.feeds.style1 = obj.feeds.style1.filter(item => !(item.link_card && (item.link_card.type === 0 || item.link_card.type === 3))); // 信息流和文章末尾卡片广告
    }
}

$done({ body: JSON.stringify(obj) });