// 2024-09-05 17:31:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/rest/n/feed/selectionFast")) {
    if (obj.feeds && Array.isArray(obj.feeds)) {
        obj.feeds = obj.feeds.filter(item => !item.hasOwnProperty('ad'));
    }
}

$done({ body: JSON.stringify(obj) });
