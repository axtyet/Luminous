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

// badware

// Important!
// Isolate from global scope
(function uBOL_cssGenericImport() {

/******************************************************************************/

const toImport = [[1401633,"html[lang] > body.ishome > div.adult + main.main"],[5305805,".buttonautocl"],[15121070,"html[lang] > body:not([class]):not([id]):not([style]) > div.background-container > div.container > div.captcha-box"],[7244200,"html[lang] > body.startnew > div#sections > section#section_uname"],[15121154,"html[lang] > body:not([style]) > div.captchaBody"],[1119424,"html[lang] > body#body > * > div.cv-xwrapper > div.cvc > div.cv-inner"],[11542656,"html[lang] > body#body > * > div.cvh.BlockClicksActivityBusy"],[12270650,"html#html[sti][vic][lang] > body#allbody"],[4186807,"html > body > div.container.m-p > #checkbox-window.checkbox-window,html > body > div.container > form#unsubscribe-form[onsubmit=\"submitUnsubscribeForm(event)\"]"],[10657530,"html[lang] > body:not([class]):not([id]):not([style]) > div.container > div.recaptcha-box"],[10348986,"html > body.hold-transition.theme-primary.bg-img[style^=\"background-image\"][style*=\"wallpaperaccess.com\"][style*=\"background-repeat\"][style*=\"background-size\"]"],[5732160,"html > body > div.content > dl > dd.dd1 > div.min_sider > form#form1[action=\"unsubscribe.php\"]"],[1367482,"html > body.body > div.container > div.content > form > table.optoutForm"]];

const genericSelectorMap = self.genericSelectorMap || new Map();

if ( genericSelectorMap.size === 0 ) {
    self.genericSelectorMap = new Map(toImport);
    return;
}

for ( const toImportEntry of toImport ) {
    const existing = genericSelectorMap.get(toImportEntry[0]);
    genericSelectorMap.set(
        toImportEntry[0],
        existing === undefined
            ? toImportEntry[1]
            : `${existing},${toImportEntry[1]}`
    );
}

self.genericSelectorMap = genericSelectorMap;

/******************************************************************************/

})();

/******************************************************************************/
