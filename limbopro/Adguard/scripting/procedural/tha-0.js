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

// ruleset: tha-0

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = [["{\"selector\":\".col_del\",\"tasks\":[[\"has-text\",\"ปิดป้ายนี้\"]]}","{\"selector\":\"div.panel-primary.panel\",\"tasks\":[[\"has-text\",\"Text Link Ads\"]]}"],["{\"selector\":\"#above_comments\",\"tasks\":[[\"has\",{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"/Blognone Workplace/\"]]}]]}"],["{\"selector\":\".code-block a[onclick*=\\\"'banner'\\\"]\",\"tasks\":[[\"upward\",2]]}","{\"selector\":\".elementor-widget-container div[data-advadstrackid]\",\"tasks\":[[\"upward\",2]]}"],["{\"selector\":\".news-detail p\",\"tasks\":[[\"has-text\",\"/Advertisement/\"]]}"],["{\"selector\":\"#postlist li[id^=\\\"post_\\\"]\",\"tasks\":[[\"has\",{\"selector\":\".posthead:has(span a[href*=\\\"/advertisement/\\\"])\"}]]}"],["{\"selector\":\".panel-default\",\"tasks\":[[\"has\",{\"selector\":\"ul li div:has(a[href*=\\\"/game/page/\\\"])\"}]]}"],["{\"selector\":\".card.game_page\",\"tasks\":[[\"has\",{\"selector\":\".box:has(.box-banner)\"}]]}","{\"selector\":\"div[class^=\\\"card\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"h4\",\"tasks\":[[\"has-text\",\"/RECOMMEND APPS/\"]]}]]}"],["{\"selector\":\".news_view div div\",\"tasks\":[[\"has-text\",\"/Advertisement/\"]]}"],["{\"selector\":\".top_banner\",\"tasks\":[[\"has\",{\"selector\":\"div span:has(iframe[src*=\\\"ads.siamphone.com\\\"])\"}]]}"],["{\"selector\":\".theiaStickySidebar .widget\",\"tasks\":[[\"has\",{\"selector\":\".widget-container p:has(a[rel=\\\"noopener\\\"])\"}]]}"],["{\"selector\":\".content center\",\"tasks\":[[\"has-text\",\"/Advertisement/\"]]}"]];

const hostnamesMap = new Map([["animedd.xyz",0],["blognone.com",1],["gamingdose.com",2],["jarm.com",3],["jokergameth.com",4],["mustplay.in.th",5],["playulti.com",6],["popcornfor2.com",7],["siamphone.com",8],["techtalkthai.com",9],["thaijobsgov.com",10]]);

const entitiesMap = new Map(undefined);

const exceptionsMap = new Map(undefined);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap, entitiesMap, exceptionsMap });

/******************************************************************************/

})();

/******************************************************************************/
