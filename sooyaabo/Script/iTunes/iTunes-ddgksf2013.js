// 引用链接: https://ddgksf2013.top/scripts/buyitunes.vip.js
/***********************************

> ScriptName        BuyiTunes多合一脚本[墨鱼版]
> Author            @ddgksf2013
> WechatID          墨鱼手记
> TgChannel         https://t.me/ddgksf2021
> Contribute        https://t.me/ddgksf2013_bot
> Feedback          📮 ddgksf2013@163.com 📮
> UpdateTime        2024-01-24
> Suitable          自行观看“# > ”注释内容，解锁是暂时的，购买也不是永久的[订阅、跑路]
> Attention         如需引用请注明出处，谢谢合作！
> Attention         使用此脚本，会导致AppleStore无法切换账户，解决方法[关闭QX切换账户，或关闭MITM，或删除脚本，或去设置媒体与购买项目处切换ID]
> ScriptURL         https://ddgksf2013.top/scripts/buyitunes.vip.js

# ========解锁列表======== #
Cuttlefishの果果包 
https://appraven.net/collection/77331175


[rewrite_local]

# ～ BuyiTunes@ddgksf2013
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://ddgksf2013.top/scripts/buyitunes.vip.js

[mitm]

hostname = buy.itunes.apple.com

***********************************/



var ddgksf2013 = JSON.parse($response.body);

// ========= 动态ID ========= //
var productidmap={
	'default':['ddgksf2013','https://t.me/ddgksf2021',0],
	'com.sugarmo.ScrollClip':['picsewV3.9.4','com.sugarmo.ScrollClip.pro',1],
	'com.zijayrate.analogcam':['oldroll','com.zijayrate.analogcam.vipforever10',0],
	'com.loveyouchenapps.knockout':['proknockout','com.knockout.7daysplus',0],
	'net.shinyfrog.bear-iOS':['bear','net.shinyfrog.bear_iOS.pro_yearly_subscription_bis',0],
	'com.yengshine.proccd':['proccd','com.yengshine.proccd.year',0],
	'com.lifubing.lbs.stepOfLife':['ss','com.lifubing.lbs.stepOfLife.plus.year',0],
	'com.yumiteam.Kuki.ID':['PicsLeap','com.yumiteam.Kuki.ID.4',1],
	'com.calc.iphone':['Calculator','calc_Unlock_1',0],
	'me.imgbase.intolive':['intolive','me.imgbase.intolive.proSubYearly',0],
	'MVH6DNU2ZP.input':['logcg','com.logcg.loginput',1],
	'com.waterminder.waterminder':['waterminder','waterminder.premiumYearly',0],
	'wtf.riedel.one-sec':['onesec','wtf.riedel.one_sec.pro.annual.individual',0],
	'com.aaaalab.nepacket':['http','com.li.blur.pro.month',0],
	'com.inturnex.Sticker-Maker':['Sticker','com.inturnex.Sticker_Maker.full_access',1],
	'FuYuan.inkDiary':['Secai','FuYuan.inkDiary.YearB.Pro',0],
	'me.imgbase.imgplay':['imgplay','me.imgbase.imgplay.subscriptionYearly',0],
	'com.mediaeditor.video':['PrettyUp','yearautorenew',0],
	'com.anycasesolutions.SexTracker':['SexTracker','com.anycasesolutions.SexTracker.3mon',0],
	'com.jianili.pawff':['pawff','com.jianili.pawff.pro.monthly',0],
	'icar.ren.smk':['smk','smoke19870727',0],
	'com.meditation.heartratehrv':['meditation','lifetimeusa',1],
	'livintis.com.wallpapermonster':['wallpaper','wallpaperworld.subscription.yearly.12.notrial',0],
	'com.tianlang.gifmaker':['gifmaker','com.tianlang.gifmaker.forever',1],
	'me.imgbase.videoday':['videoday','me.imgbase.videoday.profeaturesYearly',0],
	'com.icandiapps.nightsky':['nightsky','com.icandiapps.ns4.annual',0],
	'com.lixkit.diary':['diary','com.lixkit.diary.permanent_68',0],
	'com.touchbits.subscriptions':['dyt','com.touchbits.subscriptions.iap.pro.yearly',0],
	'dev.sanjin.WasteCat':['cat','dev.sanjin.WasteCat.PermanentVip',1],
	'com.zerone.hidesktop':['iscreen','com.zerone.hidesktop.forever',0],
	'co.bazaart.app':['bazaart','Bazaart_Premium_Monthly_v9',0],
	'com.pollykann.app':['pollykann','vip.forever.pollykann',1],
	'org.zrey.money':['costmemo','org.zrey.money.lifetime',1],
	'com.sfun.snapedit':['weikeMusic','com.moiseum.dailyart.subscription.Patron',0],
	'com.polygitapp.polygit':['polygit','com.polygitapp.polygit.pro.yearly',0],
	'com.sm.widget':['colorwidget','com.sm.widget.Pro',0]
	
}

// ========= 固定部分 ========= //
var _0xodP='jsjiami.com.v7';var _0x3dd319=_0x4d70;if(function(_0x462626,_0x9118cf,_0x1db040,_0x187755,_0x223d35,_0x37ad97,_0x22a695){return _0x462626=_0x462626>>0x1,_0x37ad97='hs',_0x22a695='hs',function(_0x182457,_0x3ce3a5,_0x47ccf0,_0x9d4ce2,_0x5b54d0){var _0xa98e8d=_0x4d70;_0x9d4ce2='tfi',_0x37ad97=_0x9d4ce2+_0x37ad97,_0x5b54d0='up',_0x22a695+=_0x5b54d0,_0x37ad97=_0x47ccf0(_0x37ad97),_0x22a695=_0x47ccf0(_0x22a695),_0x47ccf0=0x0;var _0x3a7e61=_0x182457();while(!![]&&--_0x187755+_0x3ce3a5){try{_0x9d4ce2=-parseInt(_0xa98e8d(0x158,'RqyR'))/0x1+-parseInt(_0xa98e8d(0x12e,'TLcn'))/0x2*(-parseInt(_0xa98e8d(0x145,'qqC6'))/0x3)+parseInt(_0xa98e8d(0x144,'HLcI'))/0x4*(parseInt(_0xa98e8d(0x155,']heC'))/0x5)+-parseInt(_0xa98e8d(0x135,'aj!['))/0x6*(parseInt(_0xa98e8d(0x142,'VAT6'))/0x7)+-parseInt(_0xa98e8d(0x152,'iL*2'))/0x8+parseInt(_0xa98e8d(0x132,'W8W7'))/0x9*(parseInt(_0xa98e8d(0x131,'#[Ne'))/0xa)+-parseInt(_0xa98e8d(0x149,'M0Rq'))/0xb*(-parseInt(_0xa98e8d(0x130,'VAT6'))/0xc);}catch(_0xb000f3){_0x9d4ce2=_0x47ccf0;}finally{_0x5b54d0=_0x3a7e61[_0x37ad97]();if(_0x462626<=_0x187755)_0x47ccf0?_0x223d35?_0x9d4ce2=_0x5b54d0:_0x223d35=_0x5b54d0:_0x47ccf0=_0x5b54d0;else{if(_0x47ccf0==_0x223d35['replace'](/[GTDlngCYdhprUxtFf=]/g,'')){if(_0x9d4ce2===_0x3ce3a5){_0x3a7e61['un'+_0x37ad97](_0x5b54d0);break;}_0x3a7e61[_0x22a695](_0x5b54d0);}}}}}(_0x1db040,_0x9118cf,function(_0x2130b0,_0x58c60b,_0x559f9f,_0x58f9c5,_0x1e1786,_0x3a678c,_0x234876){return _0x58c60b='\x73\x70\x6c\x69\x74',_0x2130b0=arguments[0x0],_0x2130b0=_0x2130b0[_0x58c60b](''),_0x559f9f='\x72\x65\x76\x65\x72\x73\x65',_0x2130b0=_0x2130b0[_0x559f9f]('\x76'),_0x58f9c5='\x6a\x6f\x69\x6e',(0x1b8b35,_0x2130b0[_0x58f9c5](''));});}(0x186,0x645a6,_0x3b1a,0xc5),_0x3b1a){}!(typeof $task!==_0x3dd319(0x134,'5Q2f')&&typeof $task[_0x3dd319(0x157,'dcoy')]===_0x3dd319(0x147,'9n%A')||typeof $httpClient!==_0x3dd319(0x139,'iL*2')||typeof $rocket!==_0x3dd319(0x137,'VY5@'))&&$done({});function _0x4d70(_0x18d72a,_0x778aa2){var _0x3b1afe=_0x3b1a();return _0x4d70=function(_0x4d70da,_0x1a67b8){_0x4d70da=_0x4d70da-0x12e;var _0x35bd67=_0x3b1afe[_0x4d70da];if(_0x4d70['oxZBGY']===undefined){var _0x54f9de=function(_0x33ee1a){var _0x1a1543='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x20f742='',_0x1bc97d='';for(var _0x4429b1=0x0,_0x50b359,_0x116c01,_0x307dff=0x0;_0x116c01=_0x33ee1a['charAt'](_0x307dff++);~_0x116c01&&(_0x50b359=_0x4429b1%0x4?_0x50b359*0x40+_0x116c01:_0x116c01,_0x4429b1++%0x4)?_0x20f742+=String['fromCharCode'](0xff&_0x50b359>>(-0x2*_0x4429b1&0x6)):0x0){_0x116c01=_0x1a1543['indexOf'](_0x116c01);}for(var _0x3b787e=0x0,_0x2a77b1=_0x20f742['length'];_0x3b787e<_0x2a77b1;_0x3b787e++){_0x1bc97d+='%'+('00'+_0x20f742['charCodeAt'](_0x3b787e)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1bc97d);};var _0x1f86b8=function(_0x402f1e,_0xc3be3){var _0x3437e7=[],_0x434d91=0x0,_0x300de9,_0x2c7bea='';_0x402f1e=_0x54f9de(_0x402f1e);var _0xd7abeb;for(_0xd7abeb=0x0;_0xd7abeb<0x100;_0xd7abeb++){_0x3437e7[_0xd7abeb]=_0xd7abeb;}for(_0xd7abeb=0x0;_0xd7abeb<0x100;_0xd7abeb++){_0x434d91=(_0x434d91+_0x3437e7[_0xd7abeb]+_0xc3be3['charCodeAt'](_0xd7abeb%_0xc3be3['length']))%0x100,_0x300de9=_0x3437e7[_0xd7abeb],_0x3437e7[_0xd7abeb]=_0x3437e7[_0x434d91],_0x3437e7[_0x434d91]=_0x300de9;}_0xd7abeb=0x0,_0x434d91=0x0;for(var _0x2fdcb7=0x0;_0x2fdcb7<_0x402f1e['length'];_0x2fdcb7++){_0xd7abeb=(_0xd7abeb+0x1)%0x100,_0x434d91=(_0x434d91+_0x3437e7[_0xd7abeb])%0x100,_0x300de9=_0x3437e7[_0xd7abeb],_0x3437e7[_0xd7abeb]=_0x3437e7[_0x434d91],_0x3437e7[_0x434d91]=_0x300de9,_0x2c7bea+=String['fromCharCode'](_0x402f1e['charCodeAt'](_0x2fdcb7)^_0x3437e7[(_0x3437e7[_0xd7abeb]+_0x3437e7[_0x434d91])%0x100]);}return _0x2c7bea;};_0x4d70['lrvMmG']=_0x1f86b8,_0x18d72a=arguments,_0x4d70['oxZBGY']=!![];}var _0x4df9be=_0x3b1afe[0x0],_0x4e697e=_0x4d70da+_0x4df9be,_0x1121a5=_0x18d72a[_0x4e697e];return!_0x1121a5?(_0x4d70['pExgXr']===undefined&&(_0x4d70['pExgXr']=!![]),_0x35bd67=_0x4d70['lrvMmG'](_0x35bd67,_0x1a67b8),_0x18d72a[_0x4e697e]=_0x35bd67):_0x35bd67=_0x1121a5,_0x35bd67;},_0x4d70(_0x18d72a,_0x778aa2);}ddgksf2013[_0x3dd319(0x154,'^9Sk')]='恭喜你抓到元数据！由墨鱼分享，请勿售卖或分享他人！';var mapid=ddgksf2013['receipt'][_0x3dd319(0x13b,'Gifg')],mapping=productidmap[mapid]||productidmap['default'],inapp={'product_id':mapping[0x1],'quantity':'1','expires_date':_0x3dd319(0x140,'Gifg'),'expires_date_pst':'2099-12-18\x2023:59:59\x20America/Los_Angeles','expires_date_ms':_0x3dd319(0x133,'PZ^D'),'is_in_intro_offer_period':_0x3dd319(0x136,'lNVF'),'transaction_id':_0x3dd319(0x14d,'S&Ma'),'is_trial_period':'false','original_transaction_id':_0x3dd319(0x150,'RqyR'),'purchase_date_ms':_0x3dd319(0x15a,'HLcI'),'purchase_date':_0x3dd319(0x14c,'9n%A'),'purchase_date_pst':'2023-12-04\x2023:59:59\x20America/Los_Angeles','original_purchase_date':'2023-12-04\x2023:59:59\x20Etc/GMT','original_purchase_date_pst':'2023-12-04\x2023:59:59\x20America/Los_Angeles','original_purchase_date_ms':_0x3dd319(0x13d,'6sgx'),'in_app_ownership_type':'PURCHASED','web_order_line_item_id':_0x3dd319(0x12f,'#W)t')},renew={'product_id':mapping[0x1],'original_transaction_id':_0x3dd319(0x14a,'GuiF'),'auto_renew_product_id':mapping[0x1],'auto_renew_status':'1'};function _0x3b1a(){var _0x46a286=(function(){return[_0xodP,'djnshtjliTaDmddiG.xrcoCnm.gvD7dTgTfpFUhY==','WR0Uvmo1W6/cU8ofWRDnWOTEAd4','WRddISk/ffZdVSo3W4/dR8oGyZ/cGCk6ruu','WRtdGSkoW7Wns3a','W5/dOmoQgmoSWQNcMX3cL1S5WO1UW7NcTqJdTHZcKGOZrxZcM8kSbCoT','vSo+WOC','d8kNW5lcIHxdNfW4fSojWPyNW5u','BSk8W6XjDSouoa','WO5WWRucWRr4W68wAq','pWRcLYdcHCkUW7q','ow/dV8kTW5tcN19yCYuPrW','WRpdH8kHhLRdSSoRW74','b19pvGCaWRhdHmoZbmoE','WRicW5uRxmk5E8oSfxxdQ8otAL0','qmoCp8ojE0VdVqTtWQC5W5KQFSoB','WQRdVaddRSkNq1a+WQK'].concat((function(){return['W6FcGSo9tGpcQSk2WR3cU8k1n2JdRCoWaWH8uSo8WPNdHCklW47dIW1HW4W','aCo5WR/cIgCmwNNdUSoJpcxdPSoBWPS','oZDSWQreW6ZcTvSOfSkJhv3dJMa','hCoaW6FdH8kqW4pcK1VcQCkaW6xcNW','W4i/W6H/WQPDoG4lx8kUWPJdRSk2W4G','uajMrrldK8ojWR/cPG','A8oBWRyCimklt8oJD8khu2C1','W5CYW7uNWOqkWQL/CCkDBL0PW4ldPcGXDCk9bG/dMq0','WO0CW5xdImk9W6i9k3O','WO7dLaPryKRdIrhdUv9Q','W6uTWQvwWRD4xmktWOlcJWfb','pSkFyeTB','W4a7W6T+WQ5yBeT1cCoyW4C','WPifxgD+WPtcMs/dH0GZWRS','WO5XWRfMW4aaWRnLpmkkmWG2','qSk6WQKpW6KIWQFdJGpcKcWSWPDvyw05W4mF','W6aPdmk7WOjTmCoGbWJcGXe'].concat((function(){return['WPpcHGFdTvlcKg0LfvZdJKOVl8kc','c8kJWQ7dKf/cPH0Y','W67cPSk6dW4IWQVcLW','dMz+WQHaWQSLeM7cH8k9W7W','WPKFaHfnWPJcTCkHlSoYW590WPm','kCopW77dPmk5sCkOqmkG','rSo8qfz/WRxcPG','W6xdJJaiW6y','zhGJDmkxWPTQWPfl','WQ8yWQOMWO3cTmko','kmkeW6rjDSoseCo/zq','FxCZDmkcWOzBWOzkW7ddPmoXWRCa','WO/cPCk9rCkTW73dTLNdGG','W7X8cSkGWRhdPCkxW50gW5CapxLkos0cx8oofa'];}()));}()));}());_0x3b1a=function(){return _0x46a286;};return _0x3b1a();};mapping[0x2]?(delete inapp[_0x3dd319(0x14f,'I!Ch')],delete inapp[_0x3dd319(0x14e,'q7n@')],delete inapp[_0x3dd319(0x13e,'9n%A')]):(ddgksf2013[_0x3dd319(0x15b,'B1HO')]=[inapp],ddgksf2013[_0x3dd319(0x13a,'VY5@')]=_0x3dd319(0x153,'HLcI'),ddgksf2013[_0x3dd319(0x13c,'6sgx')]=[renew]),ddgksf2013[_0x3dd319(0x13f,']mh*')]['in_app']=[inapp],console[_0x3dd319(0x141,'VAT6')]('操作成功🎉🎉🎉\x0aCuttlefishの自留地:\x20https://t.me/ddgksf2021'),$done({'body':JSON[_0x3dd319(0x14b,'5Cte')](ddgksf2013)});var version_ = 'jsjiami.com.v7';
