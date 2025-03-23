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

// ruleset: nld-0

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = ["",["{\"selector\":\".product-item\",\"tasks\":[[\"has-text\",\"Gesponsord\"]]}"],["{\"selector\":\"div[class^=\\\"Flex-styled__StyledFlex-\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"h3\",\"tasks\":[[\"has-text\",\"Gesponsorde producten\"]]}]]}"],["{\"selector\":\".hz-Listing--list-item\",\"tasks\":[[\"has-text\",\"Topadvertentie\"]]}","{\"selector\":\"ul.mp-Listings > li.mp-Listing\",\"tasks\":[[\"has\",{\"selector\":\"> .mp-Listing-coverLink > .mp-Listing-group > .mp-Listing-group--price-date-feature > span.mp-Listing-priority > span\",\"tasks\":[[\"has-text\",\"/^Topadvertentie$/\"]]}]]}"],["{\"selector\":\".hz-Listing--list-item\",\"tasks\":[[\"has\",{\"selector\":\".hz-Listing-priority\",\"tasks\":[[\"has-text\",\"Topadvertentie\"]]}]]}"],["{\"selector\":\".wpb_wrapper\",\"tasks\":[[\"has\",{\"selector\":\".section-heading\",\"tasks\":[[\"has-text\",\"partners\"]]}]]}"],["{\"selector\":\".component__plugin\",\"tasks\":[[\"has\",{\"selector\":\"h6\",\"tasks\":[[\"has-text\",\"advertentie\"]]}]]}"],["{\"selector\":\".linklist\",\"tasks\":[[\"has\",{\"selector\":\"h1\",\"tasks\":[[\"has-text\",\"Lekker Dichtbij Deals\"]]}]]}"],["{\"selector\":\".widget_custom_html\",\"tasks\":[[\"has\",{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"Beter Beleggen\"]]}]]}"],["{\"selector\":\".avia_codeblock_section\",\"tasks\":[[\"has-text\",\"Duurzaamnieuws wordt mede mogelijk gemaakt door:\"]]}"],["{\"selector\":\"[data-cy=\\\"plp-tile-container\\\"]\",\"tasks\":[[\"has-text\",\"Gesponsord\"]]}","{\"selector\":\"li\",\"tasks\":[[\"has-text\",\"Gesponsord\"]]}"],["{\"selector\":\".article.row.no-image\",\"tasks\":[[\"has\",{\"selector\":\".row.compost-warn\",\"tasks\":[[\"has-text\",\"- ingezonden mededeling -\"]]}]]}"],["{\"selector\":\".Article__inner\",\"tasks\":[[\"has\",{\"selector\":\".Article__title\",\"tasks\":[[\"has-text\",\"Advertentie\"]]}]]}"],["{\"selector\":\".article-column_article\",\"tasks\":[[\"has\",{\"selector\":\".category-label_label\",\"tasks\":[[\"has-text\",\"Advertorial\"]]}]]}","{\"selector\":\".article-row_article\",\"tasks\":[[\"has\",{\"selector\":\".article-row_category.category-label_label\",\"tasks\":[[\"has-text\",\"Advertorial\"]]}]]}"],["{\"selector\":\"[data-index-number]\",\"tasks\":[[\"has-text\",\"Gesponsord\"]]}"],["{\"selector\":\".grid-item.grid-item-pebble\",\"tasks\":[[\"has\",{\"selector\":\"#pebble-label\",\"tasks\":[[\"has-text\",\"Advertentie\"]]}]]}"],["{\"selector\":\".footer-artikelen\",\"tasks\":[[\"has\",{\"selector\":\".footer-h6\",\"tasks\":[[\"has-text\",\"Partners\"]]}]]}"],["{\"selector\":\".td_module_wrap\",\"tasks\":[[\"has\",{\"selector\":\".td-post-category\",\"tasks\":[[\"has-text\",\"Gesponsord\"]]}]]}"],["{\"selector\":\".td_block_template_1\",\"tasks\":[[\"has\",{\"selector\":\".block-title\",\"tasks\":[[\"has-text\",\"Partners\"]]}]]}"],["{\"selector\":\".o-hpgrid__row-tijdconnect\",\"tasks\":[[\"has\",{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"Gesponsorde inhoud\"]]}]]}"],["{\"selector\":\"section.network\",\"tasks\":[[\"has\",{\"selector\":\".contentheader.contentheader--network\",\"tasks\":[[\"has-text\",\"Gesponsorde links\"]]}]]}"],["{\"selector\":\".side\",\"tasks\":[[\"has-text\",\"Aanbiedingen\"]]}"],["{\"selector\":\".c-articles-list__item.c-articles-list__item--highlight\",\"tasks\":[[\"has\",{\"selector\":\".c-tag.c-articles-list__label\",\"tasks\":[[\"has-text\",\"Advertorial\"]]}]]}"],["{\"selector\":\".blok\",\"tasks\":[[\"has\",{\"selector\":\"h3\",\"tasks\":[[\"has-text\",\"Partners\"]]}]]}"],["{\"selector\":\".widget-container\",\"tasks\":[[\"has\",{\"selector\":\".h3.mb-4\",\"tasks\":[[\"has-text\",\"Wielerdeals\"]]}]]}","{\"selector\":\"li.list-item.list-item-aside\",\"tasks\":[[\"has\",{\"selector\":\".badge\",\"tasks\":[[\"has-text\",\"Ad\"]]}]]}","{\"selector\":\"li.list-item.list-item-default\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Ad\"]]}]]}"],["{\"selector\":\".wpb_wrapper\",\"tasks\":[[\"has\",{\"selector\":\"div\",\"tasks\":[[\"has-text\",\"#advertentie\"]]}]]}"],["{\"selector\":\".widebnr > *\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\"div\",\"tasks\":[[\"has\",{\"selector\":\"> span:first-child\",\"tasks\":[[\"has-text\",\"Advert\"]]}]]}"],["{\"selector\":\"div[class^=\\\"col\\\"] > div.center\",\"tasks\":[[\"has\",{\"selector\":\"> div.g > div.g-single > center > i\",\"tasks\":[[\"has-text\",\"Advertentie\"]]}]]}"],["{\"selector\":\".theiaStickySidebar > aside.penci_latest_news_widget > h4.widget-title\",\"tasks\":[[\"has-text\",\"Advertentie\"]]}"],["{\"selector\":\".ct-sidebar > div.widget\",\"tasks\":[[\"has\",{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"Partners\"]]}]]}"],["{\"selector\":\".content-start > * > div[style]\",\"tasks\":[[\"has-text\",\"/Externe links|Externe websites/i\"]]}"],["{\"selector\":\"div[class=\\\"sidebar_item\\\"][style=\\\"padding-bottom: 16px;\\\"]:has(> a > img[width=\\\"276\\\"])\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\".pd-results-container > .results-inner > .pd-advisor-offer-container:first-child\",\"tasks\":[[\"has\",{\"selector\":\"> .pd-advisor-offer > .result-badge\",\"tasks\":[[\"has-text\",\"Adv.\"]]}]]}"],["{\"selector\":\"div[id^=\\\"ster-ad-bnnvara-\\\"]\",\"tasks\":[[\"upward\",1]]}"]];
const argsSeqs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
const hostnamesMap = new Map([["delhaize.be",1],["krefel.be",2],["marktplaats.nl",3],["2dehands.be",4],["almere-nieuws.nl",5],["amstelveensnieuwsblad.nl",6],["baarnschecourant.nl",6],["barneveldsekrant.nl",6],["bennekomsnieuwsblad.nl",6],["biltschecourant.nl",6],["deputtenaer.nl",6],["derijnpost.nl",6],["destadamersfoort.nl",6],["destadgorinchem.nl",6],["dewoudenberger.nl",6],["edestad.nl",6],["ermelosweekblad.nl",6],["harderwijkercourant.nl",6],["hcnieuws.nl",6],["hetkompashardinxveld-giessendam.nl",6],["hetkompassliedrecht.nl",6],["houtensnieuws.nl",6],["huisaanhuiselburg.nl",6],["huisaanhuisoldebroek.nl",6],["leusderkrant.nl",6],["nieuwsbladdekaap.nl",6],["nunspeethuisaanhuis.nl",6],["recreatiekrantveluwe.nl",6],["regiosportveenendaal.nl",6],["rijnenveluwe.nl",6],["scherpenzeelsekrant.nl",6],["soestercourant.nl",6],["stadnijkerk.nl",6],["stadwageningen.nl",6],["weekbladvoorouderamstel.nl",6],["wijksnieuws.nl",6],["buienradar.nl",7],["businessinsider.nl",8],["duurzaamnieuws.nl",9],["fonq.nl",10],["geenstijl.nl",11],["glutenvrij.nl",12],["linda.nl",13],["mediamarkt.be",14],["mediamarkt.nl",14],["mnm.be",15],["moviemeter.nl",16],["nieuwsopbeeld.nl",17],["psvinside.nl",18],["tijd.be",19],["tostrams.nl",20],["tvvisie.be",21],["tvvisie.nl",21],["vi.nl",22],["voetbalcentraal.nl",23],["wielerflits.nl",24],["wkdarts.nl",25],["tweakers.net",26],["hartvannederland.nl",27],["centraalplus.nl",28],["ans-online.nl",29],["apparata.nl",30],["arenalokaal.nl",31],["turksemedia.nl",32],["androidplanet.nl",33],["bnnvara.nl",34]]);
const hasEntities = false;

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
