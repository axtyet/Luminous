/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2014-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

// ruleset: irn-0

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = ["[]","[{\"selector\":\"article > .items-center .mr-auto > .mr-1 > svg[style$=\\\"fill: var(--color-ad);\\\"] .text-neutral-500::after\",\"action\":[\"style\",\"content: ' 🚫 (تبلیغ) 🚫 ' !important; color: red !important; font-weight: bold !important;  font-size: large !important;\"],\"cssable\":true},{\"selector\":\"div[class^=\\\"product-list_ProductList__item__\\\"][data-product-index] > .block > .h-full[data-testid=\\\"product-card\\\"] > article > .items-center:has(> .ml-1 > img[src=\\\"/statics/img/svg/productCard/topBadge/PromotedIncredibleOffer.svg\\\"])::after\",\"action\":[\"style\",\"content: ' 🚫 (تبلیغ) 🚫 ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true}]","[{\"selector\":\".c-forceToLogin__content\",\"action\":[\"style\",\"filter: none !important; -webkit-filter: none !important; opacity:1 !important;\"],\"cssable\":true},{\"selector\":\"body\",\"action\":[\"style\",\"cursor: unset !important;\"],\"cssable\":true}]","[{\"selector\":\"html::before\",\"action\":[\"style\",\"content: ' ⚠️ این وبسایت توسط جامعهٔ PersianBlocker یک وبسایت ضدکاربر تشخیص داده شده است؛ یعنی با جلوگیری از استفاده از افزونه‌های ضدتبلیغات، آزادی شماره صفرم شما (هر کاربر باید آزادی اینکه چه چیز را ببیند یا نبیند داشته باشد) را محدود کرده است. پیشنهاد می‌شود از وبسایت‌های جایگزین استفاده کنید. PersianBlocker 🄯 ⚠️ ' !important; color: #1E88E5 !important; font-weight: bold !important; font-size: x-large !important; overflow: visible !important; z-index: 856985698569 !important; position: fixed !important; background-color: white !important; border: 8px solid red !important; border-radius: 12px !important; padding: 1em !important;\"],\"cssable\":true}]","[{\"selector\":\".top-ads-wrap\",\"action\":[\"style\",\"width: 0px !important; height: 0px !important;\"],\"cssable\":true}]","[{\"selector\":\"a[href]:where([href*=\\\"doostihaa.com/\\\"], [href*=\\\"zardfilm.in/\\\"], [href*=\\\"cooldl.net/\\\"], [href*=\\\"dlrozaneh.ir/\\\"]) > h3::after\",\"action\":[\"style\",\"content: ' 🔞 (سانسور شده) 🔞 ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true},{\"selector\":\"a[href]:where([href*=\\\"par30games.net/\\\"]) > h3::after\",\"action\":[\"style\",\"content: ' 💰 (نیم بها) 💰 ' !important; color: yellow !important; font-weight: bold !important; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px  1px 0 black, 1px  1px 0 black;\"],\"cssable\":true},{\"selector\":\"a[href]:where([href*=\\\"soft98.ir/\\\"]) > h3::after\",\"action\":[\"style\",\"content: ' ⚠️ ضد کاربر | Anti-User ⚠️ ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true}]","[{\"selector\":\"a[href][href*=\\\"&mediaurl=\\\"][target=\\\"_blank\\\"][title][href^=\\\"/images/search?view=detail\\\"]:where([href*=\\\"doostihaa.com/\\\"], [href*=\\\"zardfilm.in/\\\"], [href*=\\\"cooldl.net/\\\"], [href*=\\\"dlrozaneh.ir/\\\"])::before\",\"action\":[\"style\",\"content: ' 🔞 (سانسور شده) 🔞 ' !important; color: red !important; font-weight: bold !important; font-size: large !important;\"],\"cssable\":true},{\"selector\":\"a[href][href*=\\\"&mediaurl=\\\"][target=\\\"_blank\\\"][title][href^=\\\"/images/search?view=detail\\\"]:where([href*=\\\"par30games.net/\\\"])::before\",\"action\":[\"style\",\"content: ' 💰 (نیم بها) 💰 ' !important; color: yellow !important; font-weight: bold !important; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px  1px 0 black, 1px  1px 0 black;\"],\"cssable\":true},{\"selector\":\"a[href][href*=\\\"&mediaurl=\\\"][target=\\\"_blank\\\"][title][href^=\\\"/images/search?view=detail\\\"]:where([href*=\\\"soft98.ir/\\\"])::before\",\"action\":[\"style\",\"content: ' ⚠️ ضد کاربر | Anti-User ⚠️ ' !important; color: red !important; font-weight: bold !important; font-size: large !important;\"],\"cssable\":true}]","[{\"selector\":\"a[href][data-testid=\\\"result-title-a\\\"]:where([href*=\\\"doostihaa.com/\\\"], [href*=\\\"zardfilm.in/\\\"], [href*=\\\"cooldl.net/\\\"], [href*=\\\"dlrozaneh.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' 🔞 (سانسور شده) 🔞 ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true},{\"selector\":\"a[href][data-testid=\\\"result-title-a\\\"]:where([href*=\\\"par30games.net/\\\"])::after\",\"action\":[\"style\",\"content: ' 💰 (نیم بها) 💰 ' !important; color: yellow !important; font-weight: bold !important; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px  1px 0 black, 1px  1px 0 black;\"],\"cssable\":true},{\"selector\":\"a[href][data-testid=\\\"result-title-a\\\"]:where([href*=\\\"soft98.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' ⚠️ ضد کاربر | Anti-User ⚠️ ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true}]","[{\"selector\":\"a[href][class$=\\\"heading-serpresult\\\"]:where([href*=\\\"doostihaa.com/\\\"], [href*=\\\"zardfilm.in/\\\"], [href*=\\\"cooldl.net/\\\"], [href*=\\\"dlrozaneh.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' 🔞 (سانسور شده) 🔞 ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true},{\"selector\":\"a[href][class$=\\\"heading-serpresult\\\"]:where([href*=\\\"par30games.net/\\\"])::after\",\"action\":[\"style\",\"content: ' 💰 (نیم بها) 💰 ' !important; color: yellow !important; font-weight: bold !important; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px  1px 0 black, 1px  1px 0 black;\"],\"cssable\":true},{\"selector\":\"a[href][class$=\\\"heading-serpresult\\\"]:where([href*=\\\"soft98.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' ⚠️ ضد کاربر | Anti-User ⚠️ ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true}]","[{\"selector\":\"a[href][class^=\\\"!text-link\\\"]:where([href*=\\\"doostihaa.com/\\\"], [href*=\\\"zardfilm.in/\\\"], [href*=\\\"cooldl.net/\\\"], [href*=\\\"dlrozaneh.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' 🔞 (سانسور شده) 🔞 ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true},{\"selector\":\"a[href][class^=\\\"!text-link\\\"]:where([href*=\\\"par30games.net/\\\"])::after\",\"action\":[\"style\",\"content: ' 💰 (نیم بها) 💰 ' !important; color: yellow !important; font-weight: bold !important; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px  1px 0 black, 1px  1px 0 black;\"],\"cssable\":true},{\"selector\":\"a[href][class^=\\\"!text-link\\\"]:where([href*=\\\"soft98.ir/\\\"])::after\",\"action\":[\"style\",\"content: ' ⚠️ ضد کاربر | Anti-User ⚠️ ' !important; color: red !important; font-weight: bold !important;\"],\"cssable\":true}]"];
const argsSeqs = [0,1,2,3,4,5,6,7,8,9];
const hostnamesMap = new Map([["www.digikala.com",1],["jobinja.ir",2],["soft98.ir",3],["~forum.soft98.ir",3],["yasdl.com",4],["www.google.com",5],["www.bing.com",6],["duckduckgo.com",7],["search.brave.com",8],["zarebin.ir",9]]);
const hasEntities = false;

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
