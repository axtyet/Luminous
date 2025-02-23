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

/* eslint-disable indent */

// ruleset: default

// Important!
// Isolate from global scope

// Start of local scope
(( ) => {

/******************************************************************************/

// Start of code to inject
const uBOL_noEvalIf = function() {

const scriptletGlobals = {}; // eslint-disable-line

const argsList = [["replace"],["ExoLoader"],["setInterval"],["tmohentai"],["ads"],["debugger"],["/fairAdblock|chp_adblock|adsbygoogle\\.js/"],["ppuQnty"],["adsBlocked"],["adb"],["chp_ad"],["adsbygoogle"],["show"],["AdBlock"],["popUnderStage"],["window.open"],["deblocker"],["adblock"],["popunder"],["/07c225f3\\.online|content-loader\\.com|css-load\\.com|html-load\\.com/"],["interactionCount"],["String.fromCharCode"],["blocker"],["UserCustomPop"],["AdBlocker"],["ppu"],["/popunder/i"],["shift"]];

const hostnamesMap = new Map([["orgyxxxhub.com",0],["junkyponk.com",0],["healthfirstweb.com",0],["vocalley.com",0],["yogablogfit.com",0],["howifx.com",0],["en.financerites.com",0],["mythvista.com",0],["livenewsflix.com",0],["cureclues.com",0],["apekite.com",0],["flash-firmware.blogspot.com",0],["uploady.io",0],["taodung.com",0],["mangaesp.co",0],["3movs.com",1],["mdbekjwqa.pw",2],["tmohentai.com",3],["tech5s.co",4],["top10cafe.se",4],["phpscripttr.com",4],["7misr4day.com",4],["descargaspcpro.net",4],["dotadostube.com",4],["taradinhos.com",4],["game-2u.com",4],["toramemoblog.com",4],["gplastra.com",4],["okleak.com",4],["afly.pro",4],["ithinkilikeyou.net",4],["milanreports.com",4],["towerofgod.me",4],["crotpedia.net",4],["158.220.106.212",4],["papahd.co",4],["drakescans.com",4],["watchfacebook.com",4],["web1s.asia",4],["bokugents.com",4],["newzjunky.com",4],["yourlifeupdated.net",4],["lscomic.com",4],["tv.durbinlive.com",4],["freeltc.online",4],["pornleaks.in",4],["dudestream.com",4],["areascans.net",4],["bonsaiprolink.shop",4],["exactlyhowlong.com",4],["kumapoi.info",4],["blogcreativos.com",4],["flixlatam.com",4],["samurai.ragnarokscanlation.org",4],["cgcosplay.org",4],["myhindigk.com",4],["aeonax.com",5],["embed.streamx.me",5],["hentaihaven.xxx",5],["myprivatejobs.com",6],["wikitraveltips.com",6],["amritadrino.com",6],["cmphost.com",6],["drinkspartner.com",6],["uploadsoon.com",6],["wp.uploadfiles.in",6],["viralxns.com",6],["posterify.net",6],["headlinerpost.com",6],["tmail.io",7],["tinys.click",8],["getintoway.com",8],["jpopsingles.eu",8],["techacode.com",9],["sideplusleaks.com",9],["azmath.info",10],["downfile.site",10],["downphanmem.com",10],["expertvn.com",10],["memangbau.com",10],["trangchu.news",10],["aztravels.net",10],["litonmods.com",11],["booksrack.net",11],["helicomicro.com",11],["klyker.com",11],["kontenterabox.com",11],["naruldonghua.com",11],["pienovels.com",11],["maccanismi.it",12],["gamesrepacks.com",12],["techhelpbd.com",12],["pokemundo.com",12],["lewebde.com",12],["app.covemarkets.com",12],["tabele-kalorii.pl",13],["hentaistream.com",14],["nudeselfiespics.com",14],["hentaivideos.net",14],["xdld.pages.dev",15],["xdld.lat",15],["ergasiakanea.eu",16],["surfsees.com",16],["conghuongtu.net",16],["downloadlyir.com",16],["ipamod.com",16],["techedubyte.com",16],["apkdrill.com",16],["gsmware.com",17],["arldeemix.com",17],["filemooon.top",[18,26]],["a-ha.io",19],["cboard.net",19],["joongdo.co.kr",19],["viva100.com",19],["gamingdeputy.com",19],["alle-tests.nl",19],["meconomynews.com",19],["brandbrief.co.kr",19],["motorgraph.com",19],["topstarnews.net",19],["autosport.com",20],["motorsport.com",20],["cdn.gledaitv.live",21],["claimlite.club",22],["kurakura21.space",23],["blackhatworld.com",24],["defienietlynotme.com",26],["fmembed.cc",26],["fmhd.bar",26],["fmoonembed.pro",26],["rgeyyddl.skin",26],["sbnmp.bar",26],["sulleiman.com",26],["vpcxz19p.xyz",26],["kickassanime.ch",27]]);

const entitiesMap = new Map([["shrink",0],["mlwbd",4],["katmoviefix",4],["layardrama21",4],["sdmoviespoint",4],["fc-lc",7],["azsoft",10],["pasteit",13],["xcloud",15],["file-upload",25],["embedme",26],["finfang",26],["hellnaw",26],["moonembed",26],["z12z0vla",26]]);

const exceptionsMap = new Map([["xcloud.eu",[15]],["xcloud.host",[15]]]);

/******************************************************************************/

function noEvalIf(
    needle = ''
) {
    if ( typeof needle !== 'string' ) { return; }
    const safe = safeSelf();
    const logPrefix = safe.makeLogPrefix('noeval-if', needle);
    const reNeedle = safe.patternToRegex(needle);
    window.eval = new Proxy(window.eval, {  // jshint ignore: line
        apply: function(target, thisArg, args) {
            const a = String(args[0]);
            if ( needle !== '' && reNeedle.test(a) ) {
                safe.uboLog(logPrefix, 'Prevented:\n', a);
                return;
            }
            if ( needle === '' || safe.logLevel > 1 ) {
                safe.uboLog(logPrefix, 'Not prevented:\n', a);
            }
            return Reflect.apply(target, thisArg, args);
        }
    });
}

function safeSelf() {
    if ( scriptletGlobals.safeSelf ) {
        return scriptletGlobals.safeSelf;
    }
    const self = globalThis;
    const safe = {
        'Array_from': Array.from,
        'Error': self.Error,
        'Function_toStringFn': self.Function.prototype.toString,
        'Function_toString': thisArg => safe.Function_toStringFn.call(thisArg),
        'Math_floor': Math.floor,
        'Math_max': Math.max,
        'Math_min': Math.min,
        'Math_random': Math.random,
        'Object': Object,
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'Object_defineProperties': Object.defineProperties.bind(Object),
        'Object_fromEntries': Object.fromEntries.bind(Object),
        'Object_getOwnPropertyDescriptor': Object.getOwnPropertyDescriptor.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'Request_clone': self.Request.prototype.clone,
        'String_fromCharCode': String.fromCharCode,
        'String_split': String.prototype.split,
        'XMLHttpRequest': self.XMLHttpRequest,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'fetch': self.fetch,
        'JSON': self.JSON,
        'JSON_parseFn': self.JSON.parse,
        'JSON_stringifyFn': self.JSON.stringify,
        'JSON_parse': (...args) => safe.JSON_parseFn.call(safe.JSON, ...args),
        'JSON_stringify': (...args) => safe.JSON_stringifyFn.call(safe.JSON, ...args),
        'log': console.log.bind(console),
        // Properties
        logLevel: 0,
        // Methods
        makeLogPrefix(...args) {
            return this.sendToLogger && `[${args.join(' \u205D ')}]` || '';
        },
        uboLog(...args) {
            if ( this.sendToLogger === undefined ) { return; }
            if ( args === undefined || args[0] === '' ) { return; }
            return this.sendToLogger('info', ...args);
            
        },
        uboErr(...args) {
            if ( this.sendToLogger === undefined ) { return; }
            if ( args === undefined || args[0] === '' ) { return; }
            return this.sendToLogger('error', ...args);
        },
        escapeRegexChars(s) {
            return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },
        initPattern(pattern, options = {}) {
            if ( pattern === '' ) {
                return { matchAll: true, expect: true };
            }
            const expect = (options.canNegate !== true || pattern.startsWith('!') === false);
            if ( expect === false ) {
                pattern = pattern.slice(1);
            }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match !== null ) {
                return {
                    re: new this.RegExp(
                        match[1],
                        match[2] || options.flags
                    ),
                    expect,
                };
            }
            if ( options.flags !== undefined ) {
                return {
                    re: new this.RegExp(this.escapeRegexChars(pattern),
                        options.flags
                    ),
                    expect,
                };
            }
            return { pattern, expect };
        },
        testPattern(details, haystack) {
            if ( details.matchAll ) { return true; }
            if ( details.re ) {
                return this.RegExp_test.call(details.re, haystack) === details.expect;
            }
            return haystack.includes(details.pattern) === details.expect;
        },
        patternToRegex(pattern, flags = undefined, verbatim = false) {
            if ( pattern === '' ) { return /^/; }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match === null ) {
                const reStr = this.escapeRegexChars(pattern);
                return new RegExp(verbatim ? `^${reStr}$` : reStr, flags);
            }
            try {
                return new RegExp(match[1], match[2] || undefined);
            }
            catch {
            }
            return /^/;
        },
        getExtraArgs(args, offset = 0) {
            const entries = args.slice(offset).reduce((out, v, i, a) => {
                if ( (i & 1) === 0 ) {
                    const rawValue = a[i+1];
                    const value = /^\d+$/.test(rawValue)
                        ? parseInt(rawValue, 10)
                        : rawValue;
                    out.push([ a[i], value ]);
                }
                return out;
            }, []);
            return this.Object_fromEntries(entries);
        },
        onIdle(fn, options) {
            if ( self.requestIdleCallback ) {
                return self.requestIdleCallback(fn, options);
            }
            return self.requestAnimationFrame(fn);
        },
        offIdle(id) {
            if ( self.requestIdleCallback ) {
                return self.cancelIdleCallback(id);
            }
            return self.cancelAnimationFrame(id);
        }
    };
    scriptletGlobals.safeSelf = safe;
    if ( scriptletGlobals.bcSecret === undefined ) { return safe; }
    // This is executed only when the logger is opened
    safe.logLevel = scriptletGlobals.logLevel || 1;
    let lastLogType = '';
    let lastLogText = '';
    let lastLogTime = 0;
    safe.toLogText = (type, ...args) => {
        if ( args.length === 0 ) { return; }
        const text = `[${document.location.hostname || document.location.href}]${args.join(' ')}`;
        if ( text === lastLogText && type === lastLogType ) {
            if ( (Date.now() - lastLogTime) < 5000 ) { return; }
        }
        lastLogType = type;
        lastLogText = text;
        lastLogTime = Date.now();
        return text;
    };
    try {
        const bc = new self.BroadcastChannel(scriptletGlobals.bcSecret);
        let bcBuffer = [];
        safe.sendToLogger = (type, ...args) => {
            const text = safe.toLogText(type, ...args);
            if ( text === undefined ) { return; }
            if ( bcBuffer === undefined ) {
                return bc.postMessage({ what: 'messageToLogger', type, text });
            }
            bcBuffer.push({ type, text });
        };
        bc.onmessage = ev => {
            const msg = ev.data;
            switch ( msg ) {
            case 'iamready!':
                if ( bcBuffer === undefined ) { break; }
                bcBuffer.forEach(({ type, text }) =>
                    bc.postMessage({ what: 'messageToLogger', type, text })
                );
                bcBuffer = undefined;
                break;
            case 'setScriptletLogLevelToOne':
                safe.logLevel = 1;
                break;
            case 'setScriptletLogLevelToTwo':
                safe.logLevel = 2;
                break;
            }
        };
        bc.postMessage('areyouready?');
    } catch {
        safe.sendToLogger = (type, ...args) => {
            const text = safe.toLogText(type, ...args);
            if ( text === undefined ) { return; }
            safe.log(`uBO ${text}`);
        };
    }
    return safe;
}

/******************************************************************************/

const hnParts = [];
try {
    let origin = document.location.origin;
    if ( origin === 'null' ) {
        const origins = document.location.ancestorOrigins;
        for ( let i = 0; i < origins.length; i++ ) {
            origin = origins[i];
            if ( origin !== 'null' ) { break; }
        }
    }
    const pos = origin.lastIndexOf('://');
    if ( pos === -1 ) { return; }
    hnParts.push(...origin.slice(pos+3).split('.'));
} catch {
}
const hnpartslen = hnParts.length;
if ( hnpartslen === 0 ) { return; }

const todoIndices = new Set();
const tonotdoIndices = [];

// Exceptions
if ( exceptionsMap.size !== 0 ) {
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = hnParts.slice(i).join('.');
        const excepted = exceptionsMap.get(hn);
        if ( excepted ) { tonotdoIndices.push(...excepted); }
    }
    exceptionsMap.clear();
}

// Hostname-based
if ( hostnamesMap.size !== 0 ) {
    const collectArgIndices = hn => {
        let argsIndices = hostnamesMap.get(hn);
        if ( argsIndices === undefined ) { return; }
        if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
        for ( const argsIndex of argsIndices ) {
            if ( tonotdoIndices.includes(argsIndex) ) { continue; }
            todoIndices.add(argsIndex);
        }
    };
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = hnParts.slice(i).join('.');
        collectArgIndices(hn);
    }
    collectArgIndices('*');
    hostnamesMap.clear();
}

// Entity-based
if ( entitiesMap.size !== 0 ) {
    const n = hnpartslen - 1;
    for ( let i = 0; i < n; i++ ) {
        for ( let j = n; j > i; j-- ) {
            const en = hnParts.slice(i,j).join('.');
            let argsIndices = entitiesMap.get(en);
            if ( argsIndices === undefined ) { continue; }
            if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
            for ( const argsIndex of argsIndices ) {
                if ( tonotdoIndices.includes(argsIndex) ) { continue; }
                todoIndices.add(argsIndex);
            }
        }
    }
    entitiesMap.clear();
}

// Apply scriplets
for ( const i of todoIndices ) {
    try { noEvalIf(...argsList[i]); }
    catch { }
}
argsList.length = 0;

/******************************************************************************/

};
// End of code to inject

/******************************************************************************/

uBOL_noEvalIf();

/******************************************************************************/

// End of local scope
})();

/******************************************************************************/

void 0;
