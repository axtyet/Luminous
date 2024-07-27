/*
Wallcraft 

[rewrite_local]
^https:\/\/billing-ios\.wallpaperscraft\.com\/verify_receipt\/remove_ads$ url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/Yu9191/Rewrite/Wallcraft.js
[mitm]
hostname = billing-ios.wallpaperscraft.com

*/


let baby = JSON.parse($response.body);

function replaceFalseWithTrue(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'boolean' && obj[key] === false) {
            obj[key] = true;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceFalseWithTrue(obj[key]);
        }
    }
}

replaceFalseWithTrue(baby);

$done({ body: JSON.stringify(baby) });
