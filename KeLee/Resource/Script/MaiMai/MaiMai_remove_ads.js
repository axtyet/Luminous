// 2024-08-17 23:35:34
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/maimai/feed/v6/feed_detail_comment?")) {
    if (obj.lst && Array.isArray(obj.lst)) {
        obj.lst = obj.lst.filter(item => !item.hasOwnProperty("newAdStyle"));
    }
} else if (url.includes("/maimai/gossip/v3/gossip_detail_comment?")) {
    if (obj.comments && obj.comments.lst && Array.isArray(obj.comments.lst)) {
        obj.comments.lst = obj.comments.lst.filter(item => !item.hasOwnProperty("newAdStyle"));
    }
} else if (url.includes("/maimai/feed/v6/feed_detail_header?")) {
    if (obj.feed && obj.feed.style1 && obj.feed.style1.link_card && obj.feed.style1.link_card.type === 0) {
        delete obj.feed.style1.link_card;
    }
    if (obj.feed && obj.feed.style44 && obj.feed.style44.link_card && obj.feed.style44.link_card.type === 3) {
        delete obj.feed.style44.link_card;
    }
} else if (url.includes("/maimai/feed/v5/focus_feed?")) {
    if (obj.feeds && obj.feeds.style1 && obj.feeds.style1.link_card && obj.feeds.style1.link_card.type === 0) {
        delete obj.feeds.style1.link_card;
    }
    if (obj.feeds && obj.feeds.style44 && obj.feeds.style44.link_card && obj.feeds.style44.link_card.type === 3) {
        delete obj.feeds.style44.link_card;
    }
}

$done({ body: JSON.stringify(obj) });
