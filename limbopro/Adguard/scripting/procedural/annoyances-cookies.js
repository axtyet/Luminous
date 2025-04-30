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

// ruleset: annoyances-cookies

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = ["",["{\"selector\":\".MuiBox-root\",\"tasks\":[[\"has-text\",\"Welcome,\"]]}"],["{\"selector\":\".MuiStack-root\",\"tasks\":[[\"has-text\",\"Personalised ads\"]]}"],["{\"selector\":\".Wrapper--1lbmq00\",\"tasks\":[[\"has-text\",\"This website uses cookies\"]]}"],["{\"selector\":\".bom-form-alert--info.bom-form-alert\",\"tasks\":[[\"has-text\",\"We use cookies\"]]}"],["{\"selector\":\".cdk-overlay-pane\",\"tasks\":[[\"has-text\",\"We use cookies\"]]}"],["{\"selector\":\".css-175oi2r.r-12vffkv[style^=\\\"position: absolute; bottom: 0px; width: 100%;\\\"]\",\"tasks\":[[\"has-text\",\"data protection\"]]}"],["{\"selector\":\".dialog-lightbox-message\",\"tasks\":[[\"has-text\",\"/Cookies/i\"]]}"],["{\"selector\":\".e91i7z92.css-c9oklo\",\"tasks\":[[\"has-text\",\"We use technologies that provide information\"]]}"],["{\"selector\":\".ejn6mx64.emotion-8zds09\",\"tasks\":[[\"has-text\",\"cookies\"]]}"],["{\"selector\":\".fixed\",\"tasks\":[[\"has-text\",\"cookies\"]]}"],["{\"selector\":\".footer\",\"tasks\":[[\"has-text\",\"By using our platform\"]]}"],["{\"selector\":\".gb_g\",\"tasks\":[[\"has-text\",\"cookie\"]]}"],["{\"selector\":\".hLgTAv\",\"tasks\":[[\"has-text\",\"Terms of Sale\"]]}"],["{\"selector\":\".md\\\\:right-\\\\[40px\\\\]\",\"tasks\":[[\"has-text\",\"By continuing to use our site\"]]}"],["{\"selector\":\".t8b87\",\"tasks\":[[\"has-text\",\"Privacy Policy Notice\"]]}"],["{\"selector\":\".toast\",\"tasks\":[[\"has-text\",\"We use cookies\"]]}"],["{\"selector\":\".top-0.z-9999.fixed.bg-opacity-30\",\"tasks\":[[\"has-text\",\"Website Cookies\"]]}"],["{\"selector\":\".z-50\",\"tasks\":[[\"has-text\",\"This site uses cookies\"]]}"],["{\"selector\":\"[role=\\\"dialog\\\"]\",\"tasks\":[[\"has-text\",\"/cookie/i\"]]}"],["{\"selector\":\"[role=\\\"dialog\\\"]\",\"tasks\":[[\"has-text\",\"cookies\"]]}"],["{\"selector\":\"div[class^=\\\"_toastContainer_\\\"]\",\"tasks\":[[\"has-text\",\"We care about your privacy\"]]}"],["{\"selector\":\"body\",\"action\":[\"remove-class\",\"has-cookie-consent\"]}"],["{\"selector\":\"button\",\"tasks\":[[\"has-text\",\"Accept\"],[\"upward\",\"section\"]]}"],["{\"selector\":\"#ask-consent\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\".sanoma-logo-container ~ .message-component.privacy-manager-tcfv2 .tcfv2-stack:not([title=\\\"Sanoman sisällönjakelukumppanit\\\"]) button.pm-switch.checked\",\"action\":[\"remove-class\",\"checked\"]}"],["{\"selector\":\".videop em:not([data-video-src])\",\"action\":[\"remove\",\"\"]}"]];
const argsSeqs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
const hostnamesMap = new Map([["news.abs-cbn.com",1],["memefi.club",2],["honeygain.com",3],["beta.bom.gov.au",4],["betsson.com",5],["x.com",6],["cun.edu.co",7],["join.chat",7],["milkinkstudio.com",7],["worklouder.cc",7],["elle.com",8],["elledecor.com",8],["esquire.com",8],["goodhousekeeping.com",8],["harpersbazaar.com",8],["housebeautiful.com",8],["menshealth.com",8],["popularmechanics.com",8],["prevention.com",8],["redbookmag.com",8],["roadandtrack.com",8],["runnersworld.com",8],["seventeen.com",8],["townandcountrymag.com",8],["veranda.com",8],["womansday.com",8],["womenshealthmag.com",8],["eda.ru",9],["bc.co",10],["blog.smithsecurity.biz",10],["diatribe.org",10],["sniffies.com",11],["play.google.com",12],["twitch.tv",13],["alohaprofile.com",14],["clickscope.org",15],["privatekeys.pw",16],["coopmobile.ch",17],["app.filen.io",18],["canva.com",19],["chat.mistral.ai",20],["aainflight.com",21],["juken-mikata.net",22],["xe.com",23],["e-comas.com",24],["cdn.privacy-mgmt.com",25],["winfuture.de",26]]);
const hasEntities = false;

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
