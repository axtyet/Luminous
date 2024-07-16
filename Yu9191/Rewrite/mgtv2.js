var body = $response.body,
  url = $request.url;
url.includes("v1/video/source") && (body = body.replace(/"text":"[^"]+/g, "\"text\": \"尊敬的SVIP会员,您正在观看SVIP尊享内容").replace(/尊敬的V\d会员/g, "尊敬的SVIP会员"));
var obj = JSON.parse(body);
url.includes("/GetUserInfo") && (obj.data.isVip = 1, obj.data.vipExpiretime = 324938345490000, obj.data.vipinfo.vip_end_time = "2088-08-08 00:00:00", obj.data.vipinfo.vipdetail.type = "2", obj.data.vipinfo.vipdetail.vip_end_time = "2088-08-08 00:00:00", obj.data.vipinfo.vipdetail.vip_id = "1", obj.data.vipinfo.growth.level = 9, body = JSON.stringify(obj));
$done({
  "body": body,
  "url": url
});