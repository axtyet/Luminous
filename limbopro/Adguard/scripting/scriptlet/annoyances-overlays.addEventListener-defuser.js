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

// ruleset: annoyances-overlays

// Important!
// Isolate from global scope

// Start of local scope
(function uBOL_addEventListenerDefuser() {

/******************************************************************************/

function addEventListenerDefuser(
    type = '',
    pattern = ''
) {
    const safe = safeSelf();
    const extraArgs = safe.getExtraArgs(Array.from(arguments), 2);
    const logPrefix = safe.makeLogPrefix('prevent-addEventListener', type, pattern);
    const reType = safe.patternToRegex(type, undefined, true);
    const rePattern = safe.patternToRegex(pattern);
    const debug = shouldDebug(extraArgs);
    const targetSelector = extraArgs.elements || undefined;
    const elementMatches = elem => {
        if ( targetSelector === 'window' ) { return elem === window; }
        if ( targetSelector === 'document' ) { return elem === document; }
        if ( elem && elem.matches && elem.matches(targetSelector) ) { return true; }
        const elems = Array.from(document.querySelectorAll(targetSelector));
        return elems.includes(elem);
    };
    const elementDetails = elem => {
        if ( elem instanceof Window ) { return 'window'; }
        if ( elem instanceof Document ) { return 'document'; }
        if ( elem instanceof Element === false ) { return '?'; }
        const parts = [];
        // https://github.com/uBlockOrigin/uAssets/discussions/17907#discussioncomment-9871079
        const id = String(elem.id);
        if ( id !== '' ) { parts.push(`#${CSS.escape(id)}`); }
        for ( let i = 0; i < elem.classList.length; i++ ) {
            parts.push(`.${CSS.escape(elem.classList.item(i))}`);
        }
        for ( let i = 0; i < elem.attributes.length; i++ ) {
            const attr = elem.attributes.item(i);
            if ( attr.name === 'id' ) { continue; }
            if ( attr.name === 'class' ) { continue; }
            parts.push(`[${CSS.escape(attr.name)}="${attr.value}"]`);
        }
        return parts.join('');
    };
    const shouldPrevent = (thisArg, type, handler) => {
        const matchesType = safe.RegExp_test.call(reType, type);
        const matchesHandler = safe.RegExp_test.call(rePattern, handler);
        const matchesEither = matchesType || matchesHandler;
        const matchesBoth = matchesType && matchesHandler;
        if ( debug === 1 && matchesBoth || debug === 2 && matchesEither ) {
            debugger; // eslint-disable-line no-debugger
        }
        if ( matchesBoth && targetSelector !== undefined ) {
            if ( elementMatches(thisArg) === false ) { return false; }
        }
        return matchesBoth;
    };
    const proxyFn = function(context) {
        const { callArgs, thisArg } = context;
        let t, h;
        try {
            t = String(callArgs[0]);
            if ( typeof callArgs[1] === 'function' ) {
                h = String(safe.Function_toString(callArgs[1]));
            } else if ( typeof callArgs[1] === 'object' && callArgs[1] !== null ) {
                if ( typeof callArgs[1].handleEvent === 'function' ) {
                    h = String(safe.Function_toString(callArgs[1].handleEvent));
                }
            } else {
                h = String(callArgs[1]);
            }
        } catch {
        }
        if ( type === '' && pattern === '' ) {
            safe.uboLog(logPrefix, `Called: ${t}\n${h}\n${elementDetails(thisArg)}`);
        } else if ( shouldPrevent(thisArg, t, h) ) {
            return safe.uboLog(logPrefix, `Prevented: ${t}\n${h}\n${elementDetails(thisArg)}`);
        }
        return context.reflect();
    };
    runAt(( ) => {
        proxyApplyFn('EventTarget.prototype.addEventListener', proxyFn);
        proxyApplyFn('document.addEventListener', proxyFn);
    }, extraArgs.runAt);
}

function proxyApplyFn(
    target = '',
    handler = ''
) {
    let context = globalThis;
    let prop = target;
    for (;;) {
        const pos = prop.indexOf('.');
        if ( pos === -1 ) { break; }
        context = context[prop.slice(0, pos)];
        if ( context instanceof Object === false ) { return; }
        prop = prop.slice(pos+1);
    }
    const fn = context[prop];
    if ( typeof fn !== 'function' ) { return; }
    if ( proxyApplyFn.CtorContext === undefined ) {
        proxyApplyFn.ctorContexts = [];
        proxyApplyFn.CtorContext = class {
            constructor(...args) {
                this.init(...args);
            }
            init(callFn, callArgs) {
                this.callFn = callFn;
                this.callArgs = callArgs;
                return this;
            }
            reflect() {
                const r = Reflect.construct(this.callFn, this.callArgs);
                this.callFn = this.callArgs = this.private = undefined;
                proxyApplyFn.ctorContexts.push(this);
                return r;
            }
            static factory(...args) {
                return proxyApplyFn.ctorContexts.length !== 0
                    ? proxyApplyFn.ctorContexts.pop().init(...args)
                    : new proxyApplyFn.CtorContext(...args);
            }
        };
        proxyApplyFn.applyContexts = [];
        proxyApplyFn.ApplyContext = class {
            constructor(...args) {
                this.init(...args);
            }
            init(callFn, thisArg, callArgs) {
                this.callFn = callFn;
                this.thisArg = thisArg;
                this.callArgs = callArgs;
                return this;
            }
            reflect() {
                const r = Reflect.apply(this.callFn, this.thisArg, this.callArgs);
                this.callFn = this.thisArg = this.callArgs = this.private = undefined;
                proxyApplyFn.applyContexts.push(this);
                return r;
            }
            static factory(...args) {
                return proxyApplyFn.applyContexts.length !== 0
                    ? proxyApplyFn.applyContexts.pop().init(...args)
                    : new proxyApplyFn.ApplyContext(...args);
            }
        };
    }
    const fnStr = fn.toString();
    const toString = (function toString() { return fnStr; }).bind(null);
    const proxyDetails = {
        apply(target, thisArg, args) {
            return handler(proxyApplyFn.ApplyContext.factory(target, thisArg, args));
        },
        get(target, prop) {
            if ( prop === 'toString' ) { return toString; }
            return Reflect.get(target, prop);
        },
    };
    if ( fn.prototype?.constructor === fn ) {
        proxyDetails.construct = function(target, args) {
            return handler(proxyApplyFn.CtorContext.factory(target, args));
        };
    }
    context[prop] = new Proxy(fn, proxyDetails);
}

function runAt(fn, when) {
    const intFromReadyState = state => {
        const targets = {
            'loading': 1, 'asap': 1,
            'interactive': 2, 'end': 2, '2': 2,
            'complete': 3, 'idle': 3, '3': 3,
        };
        const tokens = Array.isArray(state) ? state : [ state ];
        for ( const token of tokens ) {
            const prop = `${token}`;
            if ( Object.hasOwn(targets, prop) === false ) { continue; }
            return targets[prop];
        }
        return 0;
    };
    const runAt = intFromReadyState(when);
    if ( intFromReadyState(document.readyState) >= runAt ) {
        fn(); return;
    }
    const onStateChange = ( ) => {
        if ( intFromReadyState(document.readyState) < runAt ) { return; }
        fn();
        safe.removeEventListener.apply(document, args);
    };
    const safe = safeSelf();
    const args = [ 'readystatechange', onStateChange, { capture: true } ];
    safe.addEventListener.apply(document, args);
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
        'Object_hasOwn': Object.hasOwn.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'Request_clone': self.Request.prototype.clone,
        'String': self.String,
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

function shouldDebug(details) {
    if ( details instanceof Object === false ) { return false; }
    return scriptletGlobals.canDebug && details.debug;
}

/******************************************************************************/

const scriptletGlobals = {}; // eslint-disable-line
const argsList = [["scroll"],["/^(mouseout|mouseleave)$/"],["/^(contextmenu|copy)$/"],["DOMContentLoaded",".js-popup-adblock"],["contextmenu"],["","ads"],["","adtoniq"],["","AdB"],["load","adLazy"],["mouseleave","scribd_ad"],["DOMContentLoaded","ads"],["load","ad-wrap"],["blur"],["copy"],["/^(?:contextmenu|copy|selectstart)$/"],["/^(?:contextmenu|copy)$/","preventDefault"],["/^(?:contextmenu|keydown)$/"],["/^(?:contextmenu|copy|keydown)$/"],["mouseout","pop"],["/^(?:keyup|keydown)$/"],["keydown"],["keydown","disable_in_input"],["keydown","preventDefault"],["/contextmenu|keydown|keyup|copy/"],["visibilitychange","/bgmobile|\\{\\w\\.\\w+\\(\\)\\}/"],["copy","getSelection"],["","t.preventDefault"],["copy","replaceCopiedText"],["/^(contextmenu|copy|dragstart|selectstart)$/"],["/contextmenu|selectstart|copy/"],["/contextmenu|copy|keydown/"],["/contextmenu|select|copy/"],["/^(contextmenu|keydown)$/"],["contextmenu","a"],["mouseleave"],["/contextmenu|selectstart/"],["dragstart|keydown/"],["/contextmenu|keydown|dragstart/"],["","_0x"],["contextmenu","preventDefault"],["copy","preventDefault"],["/^(?:contextmenu|copy|keydown|mousedown)$/"],["/contextmenu|keydown/"],["devtoolschange"],["/contextmenu|copy/"],["","mdp"],["/contextmenu|cut|copy|paste/"],["/contextmenu|mousedown/"],["mouseout"],["/contextmenu|copy|selectstart/"],["","0x"],["/^(?:contextmenu|dragstart|selectstart)$/"],["/^(?:contextmenu|copy)$/"],["/dragstart|keyup|keydown/"],["/keyup|keydown/","wpcc"],["/contextmenu|cut|copy|keydown/"],["","undefined"],["/contextmenu|selectstart|copy|dragstart/"],["/copy|dragstart/"],["/copy|contextmenu/"],["error"],["dragstart"],["selectionchange","quill.emitter"],["/contextmenu|selectstart|select|copy|dragstart/"],["copy","jQuery!==\"undefined\""],["copy","throw"],["selectstart"],["/^(?:copy|paste)$/","undefined"],["/copy|keydown/"],["/copy|cut|selectstart/"],["/keydown|keyup/","keyCode"],["keydown","disabledEvent"],["","Key"],["/copy|cut|paste|selectstart/"],["/contextmenu|dragstart|keydown/","event.dispatch.apply"],["beforepaste"],["","keyCode"],["DOMContentLoaded","rprw"],["","key"],["","ctrlKey"],["copy","pagelink"],["/keydown|mousedown/"],["copy","Source"],["/contextmenu|copy|drag|dragstart/"],["/contextmenu|keydown|keypress|copy/"],["","blockFuckingEverything"],["mouseout","openLayer"],["/contextmenu|keydown/","preventDefault"],["mousedown","dispatch"],["/contextmenu|mousedown/","return\"undefined\""],["DOMContentLoaded","ready"],["keydown","disabledKeys"],["DOMContentLoaded","load"],["contextmenu","_0x"],["keydown","keyCode"],["contextmenu","undefined"],["contextmenu","[native code]"],["/contextmenu|keyup|keydown/"],["mouseout","cookie"],["rocket-DOMContentLoaded","bind(document)"],["mouseout","innerHeight"],["/^(contextmenu|mousedown|keydown)$/","preventDefault"],["error","browser-plugin"],["/select|copy|contextmenu/"],["/cut|copy|paste|contextmenu/"],["keydown","123"],["mousedown","undefined","elements","body"],["afterKeydown"],["keydown","void"],["copy","void"],["/contextmenu|selectstart|dragstart/"],["copy","","elements","#__next"],["DOMContentLoaded","style.display"],["copy","clipboardData"],["visibilitychange","dispatch"],["copy","linkPrefixMessage"],["selectionchange",".html"],["contextmenu","return\"undefined\""],["keydown","e1"]];
const hostnamesMap = new Map([["nationalgeographic.com",[0,4]],["artsy.net",0],["boards.net",0],["freeforums.net",0],["proboards.com",0],["todaysparent.com",1],["straitstimes.com",1],["dlnews.com",1],["zaui.com",1],["worldpopulationreview.com",1],["scribd.com",1],["s0urce.io",2],["tastycookery.com",3],["economictimes.indiatimes.com",4],["peliculas24.me",4],["roztoczanskipn.pl",4],["dzwignice.info",4],["script-stack.com",[4,45]],["mio.to",4],["husseinezzat.com",[4,20]],["taxo-acc.pl",4],["portalwrc.pl",4],["lublin.eu",4],["mangaku.*",4],["dddance.party",4],["kapiert.de",4],["hitcena.pl",4],["tv-asahi.co.jp",4],["digitalfernsehen.de",4],["suzylu.co.uk",4],["music.apple.com",4],["skidrowcodex.net",4],["dood.*",4],["ds2play.com",4],["ds2video.com",4],["d0o0d.com",4],["vsco.co",4],["festival-cannes.com",4],["strcloud.in",4],["streamtape.*",4],["ufret.jp",4],["thenekodark.com",4],["artesacro.org",4],["poli-vsp.ru",4],["polyvsp.ru",4],["ananweb.jp",4],["daimangajiten.com",4],["digital.lasegunda.com",4],["hibiki-radio.jp",4],["garyfeinbergphotography.com",4],["clubulbebelusilor.ro",4],["gplinks.co",4],["ifdreamscametrue.com",4],["marksandspencer.com",4],["asiatv.*",4],["stowarzyszenie-impuls.eu",4],["viveretenerife.com",4],["oferty.dsautomobiles.pl",4],["wzamrani.com",4],["citroen.pl",4],["peugeot.pl",4],["wirtualnyspac3r.pl",4],["antena3.com",4],["lasexta.com",4],["pashplus.jp",4],["upvideo.to",4],["kpopsea.com",4],["cnki.net",4],["wpchen.net",4],["hongxiu.com",4],["readnovel.com",4],["uihtm.com",4],["uslsoftware.com",4],["rule34hentai.net",4],["cloudemb.com",4],["news24.jp",4],["gaminplay.com",4],["njjzxl.net",4],["voe.sx",[4,70]],["voe-unblock.com",[4,70]],["scrolller.com",4],["cocomanga.com",4],["nusantararom.org",[4,76]],["virpe.cc",4],["pobre.tv",[4,76]],["ukrainashop.com",4],["celtadigital.com",4],["matzoo.pl",4],["asia2tv.cn",4],["labs.j-novel.club",4],["turbo1.co",4],["futbollatam.com",4],["read.amazon.com",4],["box-manga.com",4],["the-masters-voice.com",4],["hemas.pl",4],["accgroup.vn",4],["btvnovinite.bg",4],["allcryptoz.net",4],["crewbase.net",4],["crewus.net",4],["shinbhu.net",4],["shinchu.net",4],["thumb8.net",4],["thumb9.net",4],["topcryptoz.net",4],["uniqueten.net",4],["ultraten.net",4],["cloudcomputingtopics.net",4],["bianity.net",4],["coinsparty.com",4],["postype.com",4],["lofter.com",4],["hentaihaven.xxx",4],["espn.com",4],["4media.com",4],["przegladpiaseczynski.pl",4],["freewaysintl.com",4],["cool-etv.net",4],["j91.asia",4],["sgd.de",4],["bg-gledai.*",4],["dicasfinanceirasbr.com",4],["dicasdevalor.net",4],["dicasdefinancas.net",4],["guiasaude.info",4],["felizemforma.com",4],["financasdeouro.com",4],["mangaschan.net",4],["sssscanlator.com",4],["nightscans.net",4],["cypherscans.xyz",4],["twitchemotes.com",4],["smartkhabrinews.com",4],["streamvid.net",4],["mkv-pastes.com",4],["ipphone-warehouse.com",[4,107,108,109]],["freewatchtv.top",4],["gdplayertv.*",4],["mixstreams.top",4],["tvfreemium.top",4],["duracell.de",4],["venea.net",5],["thegatewaypundit.com",6],["nicematin.com",7],["fimfiction.net",8],["slideshare.net",9],["alfred.camera",10],["timeanddate.com",11],["filefox.cc",12],["uol.com.br",13],["gazetadopovo.com.br",13],["indiatimes.com",13],["odiario.com",13],["otempo.com.br",13],["estadao.com.br",13],["ofuxico.com.br",13],["pentruea.com",13],["ciberduvidas.iscte-iul.pt",13],["globo.com",13],["citas.in",13],["blitzrechner.de",13],["emailfake.com",13],["lyrical-nonsense.com",13],["mediafax.ro",13],["economica.net",13],["polsatnews.pl",13],["novagente.pt",13],["arlinadzgn.com",13],["bilibili.com",[13,62]],["nowcoder.com",13],["libertatea.ro",13],["erinsakura.com",13],["yuque.com",13],["deepl.com",13],["digi24.ro",13],["onna.kr",13],["ziare.com",13],["agrointel.ro",13],["skyozora.com",13],["milenio.com",13],["veneto.info",13],["edurev.in",13],["transinfo.pl",13],["news.17173.com",13],["chowhound.com",13],["explore.com",13],["foodie.com",13],["foodrepublic.com",13],["glam.com",13],["grunge.com",13],["healthdigest.com",13],["housedigest.com",13],["looper.com",13],["mashed.com",13],["moneydigest.com",13],["nickiswift.com",13],["outdoorguide.com",13],["slashfilm.com",13],["slashgear.com",13],["tastingtable.com",13],["thedailymeal.com",13],["thelist.com",13],["women.com",13],["wrestlinginc.com",13],["abril.com.br",13],["sarthaks.com",13],["delfi.lt",13],["pendulumedu.com",13],["bloomberglinea.com",13],["bloomberglinea.com.br",13],["knshow.com",14],["jusbrasil.com.br",15],["descarga-animex.*",16],["techsupportall.com",17],["lugarcerto.com.br",18],["satcesc.com",19],["animatedshows.to",19],["miraculous.to",[19,39]],["jootc.com",20],["operatorsekolahdbn.com",20],["wawlist.com",20],["teachoo.com",20],["statelibrary.us",21],["tabonitobrasil.*",22],["anisubindo.*",22],["bigulnews.tv",23],["m.youtube.com",24],["news.chosun.com",25],["androidweblog.com",26],["cronista.com",27],["fcportables.com",28],["uta-net.com",29],["downloadtutorials.net",[29,45]],["blog.naver.com",29],["myschool-eng.com",30],["orangespotlight.com",31],["th-world.com",[31,50]],["tepat.id",32],["itvn.pl",33],["itvnextra.pl",33],["kuchniaplus.pl",33],["miniminiplus.pl",33],["player.pl",33],["ttv.pl",33],["tvn.pl",33],["tvn24.pl",33],["tvn24bis.pl",33],["tvn7.pl",33],["tvnfabula.pl",33],["tvnstyle.pl",33],["tvnturbo.pl",33],["x-link.pl",33],["x-news.pl",33],["kickante.com.br",34],["thestar.com.my",34],["corriereadriatico.it",34],["ilsole24ore.com",34],["thehouseofportable.com",35],["ntvspor.net",35],["book.zhulang.com",35],["tadu.com",35],["selfstudyhistory.com",36],["lokercirebon.com",37],["avdelphi.com",38],["maxstream.video",39],["wstream.*",39],["wpb.shueisha.co.jp",39],["tiktok.com",39],["vedantu.com",39],["zsti.zsti.civ.pl",39],["kathleenmemberhistory.com",[39,71]],["nonesnanking.com",[39,71]],["prefulfilloverdoor.com",[39,71]],["phenomenalityuniform.com",[39,71]],["nectareousoverelate.com",[39,71]],["timberwoodanotia.com",[39,71]],["strawberriesporail.com",[39,71]],["valeronevijao.com",[39,71]],["cigarlessarefy.com",[39,71]],["figeterpiazine.com",[39,71]],["yodelswartlike.com",[39,71]],["generatesnitrosate.com",[39,71]],["crownmakermacaronicism.com",[39,71]],["chromotypic.com",[39,71]],["gamoneinterrupted.com",[39,71]],["metagnathtuggers.com",[39,71]],["wolfdyslectic.com",[39,71]],["rationalityaloelike.com",[39,71]],["sizyreelingly.com",[39,71]],["simpulumlamerop.com",[39,71]],["urochsunloath.com",[39,71]],["monorhinouscassaba.com",[39,71]],["counterclockwisejacky.com",[39,71]],["35volitantplimsoles5.com",[39,71]],["scatch176duplicities.com",[39,71]],["antecoxalbobbing1010.com",[39,71]],["boonlessbestselling244.com",[39,71]],["cyamidpulverulence530.com",[39,71]],["guidon40hyporadius9.com",[39,71]],["449unceremoniousnasoseptal.com",[39,71]],["19turanosephantasia.com",[39,71]],["30sensualizeexpression.com",[39,71]],["321naturelikefurfuroid.com",[39,71]],["745mingiestblissfully.com",[39,71]],["availedsmallest.com",[39,71]],["greaseball6eventual20.com",[39,71]],["toxitabellaeatrebates306.com",[39,71]],["20demidistance9elongations.com",[39,71]],["audaciousdefaulthouse.com",[39,71]],["fittingcentermondaysunday.com",[39,71]],["fraudclatterflyingcar.com",[39,71]],["launchreliantcleaverriver.com",[39,71]],["matriculant401merited.com",[39,71]],["realfinanceblogcenter.com",[39,71]],["reputationsheriffkennethsand.com",[39,71]],["telyn610zoanthropy.com",[39,71]],["tubelessceliolymph.com",[39,71]],["tummulerviolableness.com",[39,71]],["un-block-voe.net",[39,71]],["v-o-e-unblock.com",[39,71]],["voe-un-block.com",[39,71]],["voe-unblock.*",[39,71]],["voeun-block.net",[39,71]],["voeunbl0ck.com",[39,71]],["voeunblck.com",[39,71]],["voeunblk.com",[39,71]],["voeunblock3.com",[39,71]],["audiotools.pro",39],["magesy.blog",39],["magesypro.pro",39],["audioztools.com",39],["www.ntv.co.jp",39],["faptiti.com",39],["wormate.io",39],["pobre.*",[39,85]],["selfstudys.com",39],["adslink.pw",39],["jpopsingles.eu",39],["vinstartheme.com",[39,91]],["leakedzone.com",[39,94]],["fjordd.com",39],["seriesperu.com",39],["zippyupload.com",39],["3xyaoi.com",39],["hotleak.vip",[39,105]],["hotleaks.tv",[39,105]],["topfaps.com",[39,105]],["foxteller.com",[39,116]],["alphapolis.co.jp",40],["blog.csdn.net",40],["juejin.cn",40],["sweetslyrics.com",40],["thegearhunt.com",41],["jfdb.jp",42],["loginhit.com.ng",42],["charbelnemnom.com",42],["bphimmoi.net",42],["goodhub.xyz",42],["thotsbay.tv",42],["topperlearning.com",42],["bmovies.*",43],["edailybuzz.com",44],["zhihu.com",44],["qidian.com",44],["invado.pl",44],["webnovel.com",44],["skuola.net",44],["bajecnavareska.sk",45],["lunas.pro",45],["onlinefreecourse.net",45],["pisr.org",45],["uplod.net",45],["thewpclub.net",45],["thememazing.com",45],["themebanks.com",45],["mesquitaonline.com",45],["skandynawiainfo.pl",45],["onlinecoursebay.com",45],["dreamsfriend.com",46],["trakteer.id",47],["699pic.com",47],["promobit.com.br",48],["techjunkie.com",48],["zerohedge.com",48],["1mg.com",48],["khou.com",48],["10tv.com",48],["kutub3lpdf.com",49],["sklep-agroland.pl",51],["polagriparts.pl",52],["nordkorea-info.de",53],["geotips.net",54],["hardcoregames.ca",55],["lataifas.ro",56],["daotranslate.*",56],["toppremiumpro.com",57],["wattpad.com",58],["starbene.it",59],["fauxid.com",60],["androidtvbox.eu",61],["yamibo.com",63],["moegirl.org.cn",64],["bbs.mihoyo.com",65],["peekme.cc",66],["ihbarweb.org.tr",67],["baixedetudo.net.br",68],["gardenia.net",69],["wpking.in",72],["hollywoodmask.com",73],["mbalib.com",73],["wenku.baidu.com",74],["mooc.chaoxing.com",75],["www-daftarharga.blogspot.com",76],["realpython.com",77],["linkmate.xyz",78],["cristelageorgescu.ro",79],["privivkainfo.ru",80],["frameboxxindore.com",80],["descargatepelis.com",81],["vercalendario.info",82],["zipcode.com.ng",82],["poipiku.com",83],["postcourier.com.pg",84],["gmx.co.uk",86],["gmx.com",86],["likey.me",87],["broflix.cc",87],["bestcam.tv",87],["wallpaperaccess.com",88],["shortform.com",89],["joysound.com",90],["colors.sonicthehedgehog.com",92],["senpa.io",93],["txori.com",93],["mangareader.to",93],["comikey.com",95],["saikaiscans.net",96],["translate.goog",97],["oreilly.com",98],["wrosinski.pl",99],["wtsp.com",100],["starzunion.com",101],["lowcygier.pl",102],["studiestoday.com",103],["studyrankers.com",104],["bharatavani.in",104],["vidsrc.*",105],["embed.su",105],["bitcine.app",105],["cineby.app",105],["tv.verizon.com",105],["sussytoons.*",105],["bongdaplus.vn",106],["naver.com",110],["leetcode.cn",111],["unknowncheats.me",112],["cnblogs.com",113],["cnn.com",114],["kentucky.com",115],["francis-bacon.com",117],["animekai.to",118]]);
const exceptionsMap = new Map([]);
const hasEntities = true;
const hasAncestors = false;

const collectArgIndices = (hn, map, out) => {
    let argsIndices = map.get(hn);
    if ( argsIndices === undefined ) { return; }
    if ( typeof argsIndices !== 'number' ) {
        for ( const argsIndex of argsIndices ) {
            out.add(argsIndex);
        }
    } else {
        out.add(argsIndices);
    }
};

const indicesFromHostname = (hostname, suffix = '') => {
    const hnParts = hostname.split('.');
    const hnpartslen = hnParts.length;
    if ( hnpartslen === 0 ) { return; }
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = `${hnParts.slice(i).join('.')}${suffix}`;
        collectArgIndices(hn, hostnamesMap, todoIndices);
        collectArgIndices(hn, exceptionsMap, tonotdoIndices);
    }
    if ( hasEntities ) {
        const n = hnpartslen - 1;
        for ( let i = 0; i < n; i++ ) {
            for ( let j = n; j > i; j-- ) {
                const en = `${hnParts.slice(i,j).join('.')}.*${suffix}`;
                collectArgIndices(en, hostnamesMap, todoIndices);
                collectArgIndices(en, exceptionsMap, tonotdoIndices);
            }
        }
    }
};

const entries = (( ) => {
    const docloc = document.location;
    const origins = [ docloc.origin ];
    if ( docloc.ancestorOrigins ) {
        origins.push(...docloc.ancestorOrigins);
    }
    return origins.map((origin, i) => {
        const beg = origin.lastIndexOf('://');
        if ( beg === -1 ) { return; }
        const hn = origin.slice(beg+3)
        const end = hn.indexOf(':');
        return { hn: end === -1 ? hn : hn.slice(0, end), i };
    }).filter(a => a !== undefined);
})();
if ( entries.length === 0 ) { return; }

const todoIndices = new Set();
const tonotdoIndices = new Set();

indicesFromHostname(entries[0].hn);
if ( hasAncestors ) {
    for ( const entry of entries ) {
        if ( entry.i === 0 ) { continue; }
        indicesFromHostname(entry.hn, '>>');
    }
}

// Apply scriplets
for ( const i of todoIndices ) {
    if ( tonotdoIndices.has(i) ) { continue; }
    try { addEventListenerDefuser(...argsList[i]); }
    catch { }
}

/******************************************************************************/

// End of local scope
})();

void 0;
