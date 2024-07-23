// 2024-07-23 18:39:44
const url = $request.url;
let header = $request.headers;
let obj = JSON.parse($response.body);
if (url.includes("/v1/activity")) {
    // 彩云推广
    if (["&type_id=A03&"]?.includes(url)) {
      // 彩云AI
      if (obj?.interval) {
        obj.interval = 2592000; // 30天===2592000秒
      }
      if (obj?.activities?.length > 0) {
        let newActs = [];
        for (let item of obj.activities) {
          if (item?.type === "tabbar" && item?.feature) {
            item.feature = false;
          } else {
            continue;
          }
          newActs.push(item);
        }
        obj.activities = newActs;
      }
    } else {
      // 其他请求
      obj = {
        status: "ok",
        interval: 2592000,
        id: "1",
        activities: [
          {
            items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
            type: "activity_icon",
            name: "",
            carousel: "5000"
          }
        ]
      };
    }
}
$done({ body: JSON.stringify(obj) });