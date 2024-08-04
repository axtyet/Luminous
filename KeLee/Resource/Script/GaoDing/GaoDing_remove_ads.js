// 2024-08-05 02:40:28
const url = $request.url;
// 移除功能入口角标
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/oc/exhibitions/templates/resources") || url.includes("/oc/exhibitions/all_editor_tools/resources")) {
    if (obj.pits && Array.isArray(obj.pits)) {
        obj.pits.forEach(pit => {
            if (pit.materials && Array.isArray(pit.materials)) {
                pit.materials.forEach(material => {
                    if (material.material && material.material.badge_img_url) {
                        material.material.badge_img_url = "";
                    }
                });
            }
        });
    }
}

$done({ body: JSON.stringify(obj) });