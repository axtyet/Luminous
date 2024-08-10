// 2024-08-10 22:33:37
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/gw/mtop.taobao.idlehome.home.nextfresh")) {
    if (obj.data && obj.data.sections) {
        obj.data.sections = obj.data.sections.filter(section => {
            if (section.template && section.template.name === "fish_home_advertise_card_d4") {
                return false; // 删除该数组项
            }
            return true; // 保留该数组项
        });
    }
}

$done({ body: JSON.stringify(obj) });
