// @key Update: 2023.05.07
const header = $request.headers;
if (header && header['accept'] && header['accept'].includes('text/html')) {
  var body = $response.body.replace(/<head>/,'<head><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">');
  $done({ body });
} else {
  $done($request);
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
