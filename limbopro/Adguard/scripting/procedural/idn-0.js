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

// ruleset: idn-0

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = ["",["{\"selector\":\".product-card\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"/^Ad$/\"]]}]]}","{\"selector\":\"div[data-testid=\\\"divCarouselProduct\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"/^Ad$/\"]]}]]}","{\"selector\":\"div[data-testid=\\\"lazy-frame\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"/^Ad$/\"]]}]]}","{\"selector\":\"div[data-testid^=\\\"divProductRecommendation\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"/^Ad$/\"]]}]]}"],["{\"selector\":\"[data-src^=\\\"https://neonime.net/wp-content/\\\"]\",\"tasks\":[[\"xpath\",\"..\"]]}"],["{\"selector\":\"body\",\"action\":[\"remove-class\",\"pad-apps\"]}"],["{\"selector\":\"center\",\"tasks\":[[\"has-text\",\"ADVERTISEMENT\"]]}"],["{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Advertisement\"]]}"]];
const argsSeqs = [0,1,2,3,4,5];
const hostnamesMap = new Map([["tokopedia.com",1],["neonime.net",2],["tempo.co",3],["cari.com.my",4],["cloud.majalahhewan.com",5],["info.vebma.com",5]]);
const hasEntities = false;

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
