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
const uBOL_setLocalStorageItem = function() {

const scriptletGlobals = {}; // eslint-disable-line

const argsList = [["lastRedirect","true"],["PageCount","$remove$"],["a_render","true"],["adf_plays","2"],["email","true"],["adDisplayed","$remove$"],["forcefeaturetoggle.enable_ad_block_detect","false"],["adWatched","true"],["adblock_warning_pages_count","$remove$"],["adshield-analytics-uuid","$remove$"],["/_fa_bGFzdF9iZmFfYXQ=$/","$remove$"],["/_fa_dXVpZA==$/","$remove$"],["/_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWNjZXB0YWJsZV9hZHM=$/","$remove$"],["/_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWRz$/","$remove$"],["/_fa_Y2FjaGVfYWRibG9ja19jaXJjdW12ZW50X3Njb3Jl$/","$remove$"],["segmentDeviceId","$remove$"],["/optimizely_data|tealium_timing/","$remove$"],["IIElevenLabsDubbingResult","$remove$"],["didomi_token","$remove$"],["browser-ids","$remove$"],["fdx_enable_new_detail_page","true"],["plausible_ignore","true"]];

const hostnamesMap = new Map([["exambd.net",0],["jetpunk.com",1],["bravedown.com",2],["adultdeepfakes.com",3],["freewsad.com",4],["hdfilmcehennemi2.cx",5],["tradingview.com",6],["gputrends.net",7],["colnect.com",8],["loawa.com",[9,10,11,12,13,14]],["ygosu.com",[9,10,11,12,13,14]],["sportalkorea.com",[9,10,11,12,13,14]],["edaily.co.kr",[9,10,11,12,13,14]],["economist.co.kr",[9,10,11,12,13,14]],["etoday.co.kr",[9,10,11,12,13,14]],["isplus.com",[9,10,11,12,13,14]],["hometownstation.com",[9,10,11,12,13,14]],["honkailab.com",[9,10,11,12,13,14]],["thestockmarketwatch.com",[9,10,11,12,13,14]],["issuya.com",[9,10,11,12,13,14]],["worldhistory.org",[9,10,11,12,13,14]],["etnews.com",[9,10,11,12,13,14]],["iusm.co.kr",[9,10,11,12,13,14]],["dogdrip.net",[9,10,11,12,13,14]],["etoland.co.kr",[9,10,11,12,13,14]],["picrew.me",[9,10,11,12,13,14]],["text-compare.com",[9,10,11,12,13,14]],["fntimes.com",[9,10,11,12,13,14]],["javatpoint.com",[9,10,11,12,13,14]],["jawapos.com",[9,10,11,12,13,14]],["lamire.jp",[9,10,11,12,13,14]],["bamgosu.site",[9,10,11,12,13,14]],["allthekingz.com",[9,10,11,12,13,14]],["automobile-catalog.com",[9,10,11,12,13,14]],["maketecheasier.com",[9,10,11,12,13,14]],["thesaurus.net",[9,10,11,12,13,14]],["wfmz.com",[9,10,11,12,13,14]],["mydaily.co.kr",[9,10,11,12,13,14]],["raenonx.cc",[9,10,11,12,13,14]],["badmouth1.com",[9,10,11,12,13,14]],["logicieleducatif.fr",[9,10,11,12,13,14]],["islamicfinder.org",[9,10,11,12,13,14]],["aikatu.jp",[9,10,11,12,13,14]],["globalrph.com",[9,10,11,12,13,14]],["sportsrec.com",[9,10,11,12,13,14]],["reportera.co.kr",[9,10,11,12,13,14]],["flatpanelshd.com",[9,10,11,12,13,14]],["adintrend.tv",[9,10,11,12,13,14]],["cool-style.com.tw",[9,10,11,12,13,14]],["dziennik.pl",[9,10,11,12,13,14]],["eurointegration.com.ua",[9,10,11,12,13,14]],["winfuture.de",[9,10,11,12,13,14]],["freemcserver.net",[9,10,11,12,13,14]],["pravda.com.ua",[9,10,11,12,13,14]],["infinityfree.com",[9,10,11,12,13,14]],["wort-suchen.de",[9,10,11,12,13,14]],["word-grabber.com",[9,10,11,12,13,14]],["palabr.as",[9,10,11,12,13,14]],["motscroises.fr",[9,10,11,12,13,14]],["cruciverba.it",[9,10,11,12,13,14]],["dramabeans.com",[9,10,11,12,13,14]],["mynet.com",[9,10,11,12,13,14]],["sportsseoul.com",[9,10,11,12,13,14]],["smsonline.cloud",[9,10,11,12,13,14]],["heureka.cz",[9,10,11,12,13,14]],["slobodnadalmacija.hr",[9,10,11,12,13,14]],["ap7am.com",[9,10,11,12,13,14]],["autoby.jp",[9,10,11,12,13,14]],["bg-mania.jp",[9,10,11,12,13,14]],["bleepingcomputer.com",[9,10,11,12,13,14]],["cinema.com.my",[9,10,11,12,13,14]],["crosswordsolver.com",[9,10,11,12,13,14]],["daily.co.jp",[9,10,11,12,13,14]],["dailydot.com",[9,10,11,12,13,14]],["dnevno.hr",[9,10,11,12,13,14]],["dolldivine.com",[9,10,11,12,13,14]],["economictimes.com",[9,10,11,12,13,14]],["forsal.pl",[9,10,11,12,13,14]],["gazetaprawna.pl",[9,10,11,12,13,14]],["giornalone.it",[9,10,11,12,13,14]],["gloria.hr",[9,10,11,12,13,14]],["iplocation.net",[9,10,11,12,13,14]],["j-cast.com",[9,10,11,12,13,14]],["j-town.net",[9,10,11,12,13,14]],["jablickar.cz",[9,10,11,12,13,14]],["jamaicaobserver.com",[9,10,11,12,13,14]],["jmty.jp",[9,10,11,12,13,14]],["joemonster.org",[9,10,11,12,13,14]],["jutarnji.hr",[9,10,11,12,13,14]],["knowt.com",[9,10,11,12,13,14]],["kompasiana.com",[9,10,11,12,13,14]],["kurashiru.com",[9,10,11,12,13,14]],["lacuarta.com",[9,10,11,12,13,14]],["laleggepertutti.it",[9,10,11,12,13,14]],["livenewschat.eu",[9,10,11,12,13,14]],["lovelive-petitsoku.com",[9,10,11,12,13,14]],["mamastar.jp",[9,10,11,12,13,14]],["manta.com",[9,10,11,12,13,14]],["mariowiki.com",[9,10,11,12,13,14]],["mediaindonesia.com",[9,10,11,12,13,14]],["mirrored.to",[9,10,11,12,13,14]],["missyusa.com",[9,10,11,12,13,14]],["mistrzowie.org",[9,10,11,12,13,14]],["mlbpark.donga.com",[9,10,11,12,13,14]],["netzwelt.de",[9,10,11,12,13,14]],["nmplus.hk",[9,10,11,12,13,14]],["oeffnungszeitenbuch.de",[9,10,11,12,13,14]],["ondemandkorea.com",[9,10,11,12,13,14]],["oradesibiu.ro",[9,10,11,12,13,14]],["oraridiapertura24.it",[9,10,11,12,13,14]],["persoenlich.com",[9,10,11,12,13,14]],["petitfute.com",[9,10,11,12,13,14]],["powerpyx.com",[9,10,11,12,13,14]],["quefaire.be",[9,10,11,12,13,14]],["rostercon.com",[9,10,11,12,13,14]],["samsungmagazine.eu",[9,10,11,12,13,14]],["slashdot.org",[9,10,11,12,13,14]],["sourceforge.net",[9,10,11,12,13,14]],["talkwithstranger.com",[9,10,11,12,13,14]],["the-crossword-solver.com",[9,10,11,12,13,14]],["tportal.hr",[9,10,11,12,13,14]],["tvtv.ca",[9,10,11,12,13,14]],["tvtv.us",[9,10,11,12,13,14]],["upmedia.mg",[9,10,11,12,13,14]],["watchdocumentaries.com",[9,10,11,12,13,14]],["webdesignledger.com",[9,10,11,12,13,14]],["wouldurather.io",[9,10,11,12,13,14]],["yutura.net",[9,10,11,12,13,14]],["zagreb.info",[9,10,11,12,13,14]],["golf-live.at",[9,10,11,12,13,14]],["motherlyvisions.com",[9,10,11,12,13,14]],["w.grapps.me",[9,10,11,12,13,14]],["pressian.com",[9,10,11,12,13,14]],["kreuzwortraetsel.de",[9,10,11,12,13,14]],["verkaufsoffener-sonntag.com",[9,10,11,12,13,14]],["raetsel-hilfe.de",[9,10,11,12,13,14]],["horairesdouverture24.fr",[9,10,11,12,13,14]],["nyitvatartas24.hu",[9,10,11,12,13,14]],["convertcase.net",[9,10,11,12,13,14]],["nana-press.com",[9,10,11,12,13,14]],["kyoteibiyori.com",[9,10,11,12,13,14]],["computerfrage.net",[9,10,11,12,13,14]],["transparentnevada.com",[9,10,11,12,13,14]],["transparentcalifornia.com",[9,10,11,12,13,14]],["autofrage.net",[9,10,11,12,13,14]],["roleplayer.me",[9,10,11,12,13,14]],["aniroleplay.com",[9,10,11,12,13,14]],["2chblog.jp",[9,10,11,12,13,14]],["2monkeys.jp",[9,10,11,12,13,14]],["blog.jp",[9,10,11,12,13,14]],["all-nationz.com",[9,10,11,12,13,14]],["doorblog.jp",[9,10,11,12,13,14]],["gekiyaku.com",[9,10,11,12,13,14]],["eikan.liblo.jp",[9,10,11,12,13,14]],["fesoku.net",[9,10,11,12,13,14]],["fiveslot777.com",[9,10,11,12,13,14]],["gamejksokuhou.com",[9,10,11,12,13,14]],["girlsreport.net",[9,10,11,12,13,14]],["girlsvip-matome.com",[9,10,11,12,13,14]],["grasoku.com",[9,10,11,12,13,14]],["gundamlog.com",[9,10,11,12,13,14]],["imas-cg.net",[9,10,11,12,13,14]],["jnews1.com",[9,10,11,12,13,14]],["keyakizaka46matomemory.net",[9,10,11,12,13,14]],["kidan-m.com",[9,10,11,12,13,14]],["kijolifehack.com",[9,10,11,12,13,14]],["kijomatomelog.com",[9,10,11,12,13,14]],["kijyomatome.com",[9,10,11,12,13,14]],["kijyomatome-ch.com",[9,10,11,12,13,14]],["konoyubitomare.jp",[9,10,11,12,13,14]],["livedoor.biz",[9,10,11,12,13,14]],["matome-tarou.ldblog.jp",[9,10,11,12,13,14]],["matomelotte.com",[9,10,11,12,13,14]],["matometemitatta.com",[9,10,11,12,13,14]],["netatama.net",[9,10,11,12,13,14]],["norisoku.com",[9,10,11,12,13,14]],["ocsoku.com",[9,10,11,12,13,14]],["okusama-kijyo.com",[9,10,11,12,13,14]],["otoko-honne.com",[9,10,11,12,13,14]],["oumaga-times.com",[9,10,11,12,13,14]],["pachinkopachisro.com",[9,10,11,12,13,14]],["paranormal-ch.com",[9,10,11,12,13,14]],["recosoku.com",[9,10,11,12,13,14]],["saikyo-jump.com",[9,10,11,12,13,14]],["shuraba-matome.com",[9,10,11,12,13,14]],["ske48matome.net",[9,10,11,12,13,14]],["uwakich.com",[9,10,11,12,13,14]],["uwakitaiken.com",[9,10,11,12,13,14]],["mindbodygreen.com",15],["1und1.de",16],["elevenlabs.io",17],["tv5mondeplus.com",18],["visible.com",19],["fedex.com",20],["coomer.su",21],["kemono.su",21]]);

const entitiesMap = new Map([["woxikon",[9,10,11,12,13,14]]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function setLocalStorageItem(key = '', value = '') {
    setLocalStorageItemFn('local', false, key, value);
}

function setLocalStorageItemFn(
    which = 'local',
    trusted = false,
    key = '',
    value = '',
) {
    if ( key === '' ) { return; }

    // For increased compatibility with AdGuard
    if ( value === 'emptyArr' ) {
        value = '[]';
    } else if ( value === 'emptyObj' ) {
        value = '{}';
    }

    const trustedValues = [
        '',
        'undefined', 'null',
        '{}', '[]', '""',
        '$remove$',
        ...getSafeCookieValuesFn(),
    ];

    if ( trusted ) {
        if ( value.includes('$now$') ) {
            value = value.replaceAll('$now$', Date.now());
        }
        if ( value.includes('$currentDate$') ) {
            value = value.replaceAll('$currentDate$', `${Date()}`);
        }
        if ( value.includes('$currentISODate$') ) {
            value = value.replaceAll('$currentISODate$', (new Date()).toISOString());
        }
    } else {
        const normalized = value.toLowerCase();
        const match = /^("?)(.+)\1$/.exec(normalized);
        const unquoted = match && match[2] || normalized;
        if ( trustedValues.includes(unquoted) === false ) {
            if ( /^-?\d+$/.test(unquoted) === false ) { return; }
            const n = parseInt(unquoted, 10) || 0;
            if ( n < -32767 || n > 32767 ) { return; }
        }
    }

    try {
        const storage = self[`${which}Storage`];
        if ( value === '$remove$' ) {
            const safe = safeSelf();
            const pattern = safe.patternToRegex(key, undefined, true );
            const toRemove = [];
            for ( let i = 0, n = storage.length; i < n; i++ ) {
                const key = storage.key(i);
                if ( pattern.test(key) ) { toRemove.push(key); }
            }
            for ( const key of toRemove ) {
                storage.removeItem(key);
            }
        } else {
            storage.setItem(key, `${value}`);
        }
    } catch {
    }
}

function getSafeCookieValuesFn() {
    return [
        'accept', 'reject',
        'accepted', 'rejected', 'notaccepted',
        'allow', 'disallow', 'deny',
        'allowed', 'denied',
        'approved', 'disapproved',
        'checked', 'unchecked',
        'dismiss', 'dismissed',
        'enable', 'disable',
        'enabled', 'disabled',
        'essential', 'nonessential',
        'forbidden', 'forever',
        'hide', 'hidden',
        'necessary', 'required',
        'ok',
        'on', 'off',
        'true', 't', 'false', 'f',
        'yes', 'y', 'no', 'n',
        'all', 'none', 'functional',
        'granted', 'done',
        'decline', 'declined',
        'closed', 'next', 'mandatory',
        'disagree', 'agree',
    ];
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
    try { setLocalStorageItem(...argsList[i]); }
    catch { }
}
argsList.length = 0;

/******************************************************************************/

};
// End of code to inject

/******************************************************************************/

uBOL_setLocalStorageItem();

/******************************************************************************/

// End of local scope
})();

/******************************************************************************/

void 0;
