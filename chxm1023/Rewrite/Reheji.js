/*************************************

项目名称：Revenuecat 系列解锁合集
下载地址：https://too.st/CollectionsAPP
更新日期：2024-11-13
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/Reheji.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/Reheji.js

[mitm]
hostname = api.revenuecat.com

*************************************/


let chxm1024 = {}, chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || "{}");
const headers = $request.headers, ua = headers['User-Agent'] || headers['user-agent'], bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

//排除已禁止MITM的APP
const forbiddenApps = ['Fileball', 'APTV'];
const forbiddenAppFound = forbiddenApps.find(appName => (ua && ua.includes(appName)) || ($request.body && $request.body.includes(appName)));
if (forbiddenAppFound) {
  console.log(`发现禁止MITM的APP: ${forbiddenAppFound}，已停止运行脚本！`);
  $done({});
}

const bundle = {
  'TeleprompterX': { name: 'Pro Upgrade', id: 'TPXOTP', cm: 'sjb' },  //Teleprompter
  'moonbox.co.il.grow': { name: 'pro', id: 'moonbox.co.il.grow.lifetime.offer', cm: 'sjb' },  //植物识别-PlantID
  'tech.miidii.MDClock': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //谜底时钟
  'com.voicedream.Voic': { name: 'standard', id: 'vd_annual_79_3daytrial', cm: 'sja' },  //声之梦
  'com.laser-focused.focus-ios': { name: 'subscribed', id: 'iap.io.masterbuilders.focus.pro_one_year', cm: 'sja' },  //Focus-专注时间管理
  'com.roehl': { name: 'Pro', id: 'habitkit_3499_lt', cm: 'sjb' },  //HabitKit/WinDiary-双件套
  'net.tengl.powertimer': { name: 'plus', id: 'powertimer.plus', cm: 'sjb' },  //元气计时-PowerTimer
  'com.reader.book': { name: 'pro', id: 'reader.lifetimeFamily.pro', cm: 'sja' },  //PureLibro
  'app.imone.OneWidget': { name: 'pro', id: 'app.imone.OneWidget.Lifetime', cm: 'sjb' },  //OneWidget-小组件
  'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },  //言外笔记
  'com.valo.reader': { name: 'com.valo.reader.vip1.forever', id: 'com.valo.reader.vip1.forever', nameb: 'com.valo.reader.vip2.year', idb: 'com.valo.reader.vip2.year', cm: 'sja' },  //读不舍手
  'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }  //图片消除
};

const listua = {
  'ChatPub': { name: 'Unlimited Access', id: 'conversationai.annual', cm: 'sja' },  //ChatPub
  'Jellycuts': { name: 'pro', id: 'premium', cm: 'sja' },  //Jellycuts
  'quitnow': { name: 'pro_features', id: 'com.eaginsoftware.QuitNow.unlock_all_pro_features', cm: 'sjb' },  //Quitnow
  'Forward': { name: 'pro', id: 'forward.vip.forever.vvebo', cm: 'sja' },  //Forward
  'Ricoh%20Recipes': { name: 'Patron', id: 'Ricoh_Patron', cm: 'sja' },  //RicohRecipes
  'PixImagine': { id: 'com.efsoft.piximagine_nc_lifetime', cm: 'sjc' },  //PixImagine
  'PicLoom': { id: 'com.efsoft.picloom_nc_lifetime', cm: 'sjc' },  //PicLoom
  'Translate%20-%20Talk%20Translator': { name: 'Premium', id: 'premiumAnnually', cm: 'sja' },  //AITranslator-翻译器
  'Authenticator': { name: 'premium', id: '2fa_standalone_lifetime', cm: 'sja' },  //Authenticator-密码管理
  'ChatBot': { name: 'chatbot_annual', id: 'chatbot_annual', cm: 'sja' },  //ChatBot-AIChat
  'Chatme': { name: 'premium', id: 'chatme_premium_year_discount', cm: 'sja' },  //ChatMe
  'Mockview': { name: 'Pro', id: 'kavsoft.dev.yearly', cm: 'sja' },  //Mockview
  'ChatLLM': { name: 'Pro', id: 'com.curiouscreatorsco.ChatLLM.pro.lifetime.notrial.150_00', cm: 'sjb' },  //AItText
  'Binsoo': { name: 'vibe', id: 'annual', cm: 'sja' },  //Binsoo-照片滤镜/编辑
  'Photoooo': { name: 'lifetime', id: 'canoe_28_rnb_forever', cm: 'sjb' },  //Phorase-专业AI消除助手
  'VibeCamera': { name: 'forever', id: 'vibe_pro_forever', cm: 'sjb' },  //VIBECAM-相机
  'No%20Fusion': { name: 'LivePhoto', id: 'com.grey.nofusion.livephoto', cm: 'sjb' },  //NoFusion-相机
  'Themy': { name: 'fonts_premium', id: 'lifetime', cm: 'sjb' },  //Fonts-微信字体
  'BabyCare': { name: 'pro', id: 'KiddoKeeper_38_LifeTime', cm: 'sjb' },  //小守护
  'ElonAI': { name: 'premium', id: 'elongpt.yearly_1', cm: 'sja' },  //ElonAI
  'Dumb%20Phone': { name: 'Pro', id: 'dp.lifetime_19.99', cm: 'sjb' },  //DumbPhone(°)
  'maple_mobile': { name: 'premium', id: 'mc_3000_12m', cm: 'sja' },  //Maple Calculator-计算器
  'FujiLifeStyle': { name: 'FUJIStyle Pro(Year)', id: 'FujiStyle2024003', cm: 'sja' },  //FUJISTYLE-富士色彩配方
  'Gentler': { name: 'premium', id: 'app.gentler.activity.nonconsumable.onetime1', cm: 'sjb' },  //Gentler Streak-健康助手
  'TuneTally': { name: 'Pro', id: 'tunetally_pro', cm: 'sjb' },  //TuneTally-综合音乐排行
  'Readle': { name: 'Premium', id: 'com.hello.german.yearly', cm: 'sja' },  //Readle-德语学习
  'Utiful': { name: 'All Access', id: 'All_Access_YR_12M_Free', cm: 'sja' },  //Utiful-相册管家
  'CharingCrossRoad': { name: 'ready_pro', id: 'ready_pro_50_1y', cm: 'sja' },  //读否-稍后阅读
  'ig-bookmarker': { name: 'entitlement', id: 'lifetimeID', cm: 'sjb' },  //instDown-ins下载工具
  'PhotoMapper': { name: 'premium', id: 'photomapper_lifetime_1.99', cm: 'sjb' },  //PhotoMapper-照片位置追改
  'CallAnnie': { name: 'ai.animato.callannie.entitlement.pro0', id: 'ai.animato.callannie.proyearly1', cm: 'sja' },  //CallAnnie
  'Liftbear': { name: 'Pro', id: 'liftbear_2399_1y', cm: 'sja' },  //Liftbear
  'OneMockup': { name: 'pro', id: 'online.ohwe.onescreen.Lifetime', cm: 'sja' },  //OneMockup-带壳截屏
  'DataCalc': { name: 'datacalc.pro', id: 'datacalc.yearly.12', cm: 'sja' },  //DataCalc-素材容量计算
  'moss-ios': { name: 'prouser', id: 'dpbox_yearly_68', cm: 'sja' },  //DPBOX-摄影机与电影参数参数查询
  'Law': { name: 'vip', id: 'LawVIPOneYear', cm: 'sja' },  //中国法律
  'SleepSounds': { name: 'vip', id: 'VIPOneMonth', cm: 'sja' },  //睡眠音乐
  'multitimer_app': { name: 'premium', id: 'timus_lt_base', cm: 'sjb' },  //Timus-计时/定时
  'pdfai_app': { name: 'premium', id: 'special_lifetime', cm: 'sjb' },  //ChatPDF
  'Linearity%20Curve': { name: 'pro', id: 'linearity_curve_pro_yearly_free_trial', cm: 'sja' },  //LinearityCurve-插画/图形处理
  'TQBrowser': { name: 'pro_lt', id: 'com.tk.client.lifetime', cm: 'sjb' },  //Teak浏览器
  'AI%C2%A0Chat': { name: 'AI Plus', id: 'ai_plus_gpt_yearly', cm: 'sja' },  //AIChat
  'Yosum': { name: 'Premium', id: 'yosum_999_1year', cm: 'sja' },  //Yosum
  '%E8%B5%84%E6%BA%90%E6%90%AC%E8%BF%90%E5%A4%A7%E5%B8%88': { name: 'SaveTikYoutu_common', id: 'LifetimeSubscription', cm: 'sjb' },//资源搬运大师
  'DHWaterMarkManager': { name: 'WaterManager_common', id: 'lifetimeVIP_001', cm: 'sjb' },//水印熊
  'iplayTV':{ name: 'com.ll.btplayer.12', id: 'com.ll.btplayer.12', cm: 'sjb'},//ntPlayer
  'MaxWallpaper': { name: 'maxwallpaper_common', id: 'super_forever_vip', cm: 'sjb' },  //新鲜壁纸
  'intervalFlow': { name: 'All Access', id: 'wodtimer_lf', cm: 'sjb' },  //intervalFlow
  'BORD': { name: 'pro_membership', id: 'bord_plus_2499_lifetime', cm: 'sjb' },  //BORD-照片拓展方形
  'FRMD': { name: 'all_access', id: 'frmd_plus_999_lifetime', cm: 'sjb' },  //FRMD相机
  'HRZN': { name: 'pro', id: 'plus_999_lifetime', cm: 'sjb' },  //HRZN-胶片相机
  'Assembly': { name: 'premium_access', id: 'com.pixite.assembly.1yearlyq', cm: 'sja' },  //Assembly
  'Flourish': { name: 'Pro', id: 'flourish_9800_1yr_1m0', cm: 'sja' },  //如是记录
  'metaslip': { name: 'Pro', id: 'ms_lifetime', cm: 'sjb' },  //元思笔记
  'Pins': { name: 'customer', id: 'do.anh.Pins.Unlock.Standard', cm: 'sja' },  //Pins
  'Loora': { name: 'Yearly', id: 'yearly_free_ref_10usd_off', cm: 'sja' },  //Loora
  'PwDrawingPad': { name: 'pro', id: 'com.s132.app.supaintexchange.year', cm: 'sja' },  //全能画板2
  'OneGrow': { name: 'pro', id: 'com.onenicetech.OneGrow.Lifetime', cm: 'sjb' },  //OneGrow-儿童身高成长测量
  '%E6%97%B6%E9%97%B4%E8%AE%B0%E5%BD%95': { name: 'pro', id: 'com.bapaws.Hours.lifetime', cm: 'sjb' },  //时间记录
  'PianoTrainer': { name: 'pro_subscription', id: 'pianotrainer.sub.yearly.pro', cm: 'sja' },  //Pianolytics-学习钢琴
  'FretTrainer': { name: 'pro_subscription', id: 'frettrainer.sub.yearly.pro', cm: 'sja' },  //Fretonomy-学习指板
  'Currency': { name: 'plus', id: 'com.jeffreygrossman.currencyapp.iap.plus', cm: 'sja' },  //Currency-汇率查询
  'TripMemo': { name: 'pro', id: 'com.ningle.dailytracker.lifetime', cm: 'sjb' },  //旅行迹
  'ShellBean': { name: 'pro', id: 'com.ningle.shellbean.iap.forever', cm: 'sjb' },  //ShellBean-SSH终端服/Linux监控
  'nPtt': { name: 'vip.yearly', id: 'app.nextptt.vip1.yearly', cm: 'sja' },  //nPtt
  'MagicTiles3': { name: 'VIP', id: 'com.pianoidols.vipsub.year.06', cm: 'sja' },  //MagicTiles3-音乐游戏
  'Airmail': { name: 'Airmail Premium', id: 'Airmail_iOS_Yearly_P', cm: 'sja' },  //Airmail-邮箱管理
  'ScreenRecordCase': { name: 'Premium', id: 'me.fandong.ScreenRecordCase.Ultra', cm: 'sjb' },  //屏幕套壳
  'opusvpn': { name: 'pro', id: 'yearly_discount', cm: 'sja' },  //Opus-VPN
  'ip_tv_react_native': { name: 'Single', id: 'opus.lifetime', cm: 'sjb' },  //Opus-IPTV
  'Atomic': { name: 'pro', id: 'ht_lifetime1', cm: 'sjb' },  //Atomic
  'QingLong': { name: 'Premium', id: 'qinglong_premium', cm: 'sjb' },  //青龙面板
  'timetrack.io': { name: 'atimelogger-premium-plus', id: 'ttio_premium_plus', cm: 'sjb' },  //aTimeloggerPro-时间记录
  'Video%20Teleprompter': { name: 'videoPremium', id: 'com.joeallenpro.videoteleprompter.upgrade.yearly_a', cm: 'sja' },  //Video Teleprompter
  'FoJiCam': { name: 'ProVersionLifeTime', id: 'com.uzero.cn.fojicam.life2', cm: 'sjb' },  //LimiCam-胶片相机
  'FruitMinder': { name: 'Premium', id: 'com.bartozo.FruitMinder.lifetime', cm: 'sjb' },  //FruitMinder-水果提醒
  'PDF_convertor': { name: 'VIP', id: 'com.pdf.convertor.forever', cm: 'sjb' },  //PDF转换器
  'rewritingText': { name: 'AIGrammercheckerProAccess', id: 'sv.aigrammerchecker.com.lifetime', cm: 'sjb' },  //AI Grammar
  'ShellBoxKit': { name: 'ssh_pro', id: 'ShellBoxKit.Year', cm: 'sja' },  //CareServer-服务器监控
  'IDM': { name: 'premium', id: 'sub_yearly_idm', cm: 'sja' },  //IDM-下载
  'Whisper': { name: 'all_features', id: 'whisperai_80_y', cm: 'sja' },  //Whisper
  'Shapy': { name: 'premium', id: 'com.blake.femalefitness.subscription.yearly', cm: 'sja' },  //Shapy-健身
  'Carbon-iOS': { name: 'pro', id: 'carbon.unlockall', cm: 'sjb' },  //Carbon-碳
  '%E6%89%8B%E6%8C%81%E5%BC%B9%E5%B9%95': { name: 'Pro access', id: 'com.tech.LedScreen.VIPALL', cm: 'sjb' },  //手持弹幕
  '%E8%AF%AD%E9%9F%B3%E8%AE%A1%E7%AE%97%E5%99%A8': { name: 'Pro access', id: 'com.tech.counter.All', cm: 'sjb' },  //语音计算器
  '%E7%BE%8E%E5%A6%86%E6%97%A5%E5%8E%86': { name: 'Pro access', id: 'com.tech.Aula.VIPALL', cm: 'sjb' },  //美妆日历
  'LiveWallpaper': { name: 'Pro access', id: 'com.tech.LiveWallpaper.ALL', cm: 'sjb' },  //动态壁纸
  'Chat%E7%BB%83%E5%8F%A3%E8%AF%AD': { name: 'Pro access', id: 'com.tech.AiSpeak.All', cm: 'sjb' },  //Chat练口语
  'Calflow': { name: 'pro', id: 'kike.calflow.pro.lifetime', cm: 'sjb' },  //Calflow
  'dtdvibe': { name: 'pro', id: 'com.dtd.aroundu.life', cm: 'sjb' },  //Dtd Sounds-睡眠白噪音
  'Clipboard': { name: 'Premium', id: 'Premium_0_99_1M_1MFree', cm: 'sja' },  //Clipboard-剪贴板
  'Hi%E8%AE%BA%E5%9D%9B/69': { name: 'plus', id: 'plus_yearly', cm: 'sja' },  //Hi论坛
  'AnimeArt': { name: 'AnimeArt.Gold', id: 'WaifuArt.Lifetime', cm: 'sjb' },  //Anime Waifu-AI
  'LiveCaption': { name: 'Plus', id: 'rc_0400_1m', cm: 'sja' },  //iTranscreen-屏幕/游戏翻译
  'EraseIt': { name: 'ProVersionLifeTime', id: 'com.uzero.cn.eraseit.premium1.fromyear', cm: 'sjb' },  //Smoothrase-AI擦除照片中任何物体
  'MusicPutty': { name: 'pro_version', id: 'mp_3599_1y', cm: 'sja' },  //MusicPutty-音乐黏土
  'SleepDown': { name: 'Pro', id: 'pro_student_0926', cm: 'sjb' },  //StaySleep-熬夜助手
  'PhotoRoom': { name: 'pro', id: 'com.background.pro.yearly', cm: 'sja' },  //PhotoRoom
  'Bg%20Remover': { name: 'Premium', id: 'net.kaleidoscope.cutout.premium1', cm: 'sja' },  //Bg Remover+
  'Sex%20Actions': { name: 'Premium Plus', id: 'ru.sexactions.subscriptionPromo1', cm: 'sja' },  //情侣性爱游戏-Sex Actions
  'StarFocus': { name: 'pro', id: 'com.gsdyx.StarFocus.nonConsumable.forever', cm: 'sjb' },  //星垂专注
  'StarDiary': { name: 'pro', id: 'com.gsdyx.StarDiary.nonConsumable.forever', cm: 'sjb' },  //星垂日记
  'CountDuck': { name: 'premium', id: 'Lifetime', cm: 'sjb' },  //倒数鸭
  'wordswag': { name: 'pro', id: 'Pro_Launch_Monthly', cm: 'sja' },  //WordSwag
  'LockFlow': { name: 'unlimited_access', id: 'lf_00.00_lifetime', cm: 'sjb' },  //LockFlow-锁屏启动
  'TextMask': { name: 'pro', id: 'tm_lifetime', cm: 'sjb' },  //TextMask
  '%E5%96%B5%E7%BB%84%E4%BB%B6': { name: 'MiaoWidgetPro', id: 'MiaoLifeTime', cm: 'sjb' },  //喵组件
  'Chatty': { name: 'pro', id: 'chatty.yearly.1', cm: 'sja' },  //Chatty.AI
  'ImagineAI': { name: 'plus', id: 'artistai.lifetime.1', cm: 'sjb' },  //Artist.AI
  'Langster': { name: 'Premium', id: 'com.langster.universal.lifetime', cm: 'sjb' },  //Langster-学习外语
  'VoiceAI': { name: 'Special Offer', id: 'voiceannualspecial', cm: 'sjb' },  //VoiceAI-配音
  'Rootd': { name: 'pro', id: 'subscription_lifetime', cm: 'sjb' },  //Rootd-情绪引导
  'MusicMate': { name: 'premium', id: 'mm_lifetime_68_premium', cm: 'sjb' },  //MusicMate-音乐
  'AIKeyboard': { name: 'plus_keyboard', id: 'aiplus_keyboard_yearly', cm: 'sja' },  //AIKeyboard键盘
  'SmartAIChat': { name: 'Premium', id: 'sc_3999_1y', cm: 'sja' },  //SmartAI
  'AIChat': { name: 'AI Plus', id: 'ai_plus_yearly', cm: 'sja' },  //AIChat
  'LazyReply': { name: 'lazyReplyYearlySubscription', id: 'com.bokhary.lazyreply.yearlyprosubscription', cm: 'sja' },  //ReplyAssistant键盘
  'LazyBoard': { name: 'lazyboardPro', id: 'com.bokhary.magicboard.magicboardpro', cm: 'sjb' },  //LazyBoard键盘
  'PDF%20Viewer': { name: 'sub.pro', id: 'com.pspdfkit.viewer.sub.pro.yearly', cm: 'sja' },  //PDF Viewerr
  'Joy': { name: 'pro', id: 'com.indiegoodies.Agile.lifetime2', cm: 'sjb' },  //Joy AI
  'AnkiPro': { name: 'Premium', id: 'com.ankipro.app.lifetime', cm: 'sjb' },  //AnkiPro
  'SharkSMS': { name: 'VIP', id: 'com.gaapp.sms.permanently', cm: 'sjb' },  //鲨鱼短信
  'EncryptNote': { name: 'Pro', id: 'com.gaapp.2019note.noAds', cm: 'sjb' },  //iNotes私密备忘录
  'One4WallSwiftUI': { name: 'lifetime', id: 'lifetime_key', cm: 'sjb' },  //One4Wall
  'Pigment': { name: 'pro', id: 'com.pixite.pigment.1yearS', cm: 'sja' },  //色调-Pigment
  'GradientMusic': { name: 'Pro', id: 'com.gradient.vision.new.music.one.time.79', cm: 'sjb' },  //GradientMusic音乐
  'iBody': { name: 'Pro', id: 'com.tickettothemoon.bodyfilter.one.time.purchase', cm: 'sjb' },  //BodyFilter
  'Persona': { name: 'unlimited', id: 'com.tickettothemoon.video.persona.one.time.purchase', cm: 'sjb' },  //Persona-修饰脸部与相机
  'easy_chart': { name: 'unlock all', id: 'qgnjs_2', cm: 'sja' },  //快速图表
  'Snipd': { name: 'premium', id: 'snipd_premium_1y_7199_trial_2w_v2', cm: 'sja' },  //Snipd播客
  'Tide%20Guide': { name: 'Tides+', id: 'TideGuidePro_Lifetime_Family_149.99', cm: 'sjb' },  //Tide Guide潮汐
  'Gear': { name: 'subscription', id: 'com.gear.app.yearly', cm: 'sja' },  //Gear浏览器
  'Aisten': { name: 'pro', id: 'aisten_pro', cm: 'sjb' },  //Aisten-播客学英语
  'ASKAI': { name: 'pro', id: 'askai_pro', nameb: 'pro_plan', idb: 'token_pro_plan', cm: 'sjb' },  //ASKAI
  'Subtrack': { name: 'pro', id: 'com.mohitnandwani.subtrack.subtrackpro.family', cm: 'sjb' },  //Subtrack
  'shipian-ios': { name: 'vipOffering', id: 'shipian_25_forever', cm: 'sjb' },  //诗片
  'My%20Time': { name: 'Pro', id: 'ninja.fxc.mytime.pro.lifetime', cm: 'sjb' },  //我的时间
  'LUTCamera': { name: 'ProVersionLifeTime', id: 'com.uzero.funforcam.lifetimepurchase', cm: 'sjb' },  //方弗相机
  'Heal%20Clock': { name: 'pro', id: 'com.mad.HealClock.pro', cm: 'sjb' },  //自愈时钟
  'tiimo': { name: 'full_access', id: 'lifetime.iap', cm: 'sjb' },  //Tiimo-可视化日程
  'IPTVUltra': { name: 'premium', id: 'com.chxm1023.lifetime', cm: 'sjb' },  //IPTVUltra
  'Wozi': { name: 'wozi_pro_2023', id: 'wozi_pro_2023', cm: 'sjb' },  //喔知Wozi背单词
  'Color%20Widgets': { name: 'pro', id: 'cw_1999_1y_3d0', cm: 'sja' },  //Color Widgets小组件
  'server_bee': { name: 'Pro', id: 'pro_45_lifetime', cm: 'sjb' },  //serverbee终端监控管理
  'MyPianist': { name: 'pro', id: 'com.collaparte.mypianist.pro.yearly', cm: 'sja' },  //MyPianist乐谱
  'ProCam': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //ProCam相机
  'Drops': { name: 'premium', id: 'forever_unlimited_time_discounted_80_int', cm: 'sjb' },  //Drops外语
  'transmission_ui': { name: 'Premium', id: '200002', cm: 'sja' },  //Transmission服务器
  'fastdiet': { name: 'premium', id: 'com.happy.fastdiet.forever', cm: 'sjb' },  //小熊轻断食
  'money_manager': { name: 'premium', id: 'com.happy.money.forever', cm: 'sjb' },  //小熊记账
  'Overdue': { name: 'Pro', id: '1', cm: 'sjb' },  //我的物品
  'Ledger': { name: 'Pro', id: 'com.lifetimeFamily.pro', cm: 'sjb' },  //Pure账本
  'WeNote': { name: 'pro', id: 'Yearly', cm: 'sja' },  //Emote
  'Scelta': { name: 'pro', id: 'SceltaProLifetime', cm: 'sjb' },  //Scelta
  '%E5%87%B9%E5%87%B8%E5%95%A6%E6%9F%A5%E5%A6%86': { name: 'Pro access', id: 'com.smartitfarmer.MakeUpAssistant.UNLIMITED', cm: 'sjb' },  //upahead
  'PM4': { name: 'pro', id: 'pm4_pro_1y_2w0', cm: 'sja' },  //Obscura
  'Project%20Delta': { name: 'rc_entitlement_obscura_ultra', id: 'com.benricemccarthy.obscura4.obscura_ultra_sub_annual', cm: 'sja' },  //Obscura
  'Zettelbox': { name: 'Power Pack', id: 'powerpack_permanent_1', cm: 'sjb' },  //Zettelbox
  'Packr': { name: 'Pro', id: 'com.jeremieleroy.packr.premiumyearly', cm: 'sja' },  //派克
  'muoyu': { name: 'pro', id: 'com.metaorder.muoyu.prolifetime.12', cm: 'sjb' },  //摸鱼
  '%E7%BF%BB%E9%A1%B5%E6%97%B6%E9%92%9F': { name: 'Pro access', id: 'com.douwan.aiclock.ALL', cm: 'sjb' },  //翻页时钟
  '%E7%A7%A9%E5%BA%8F%E6%97%B6%E9%92%9F': { name: 'lifetime', id: 'com.metaorder.orderclocko.lifetime', cm: 'sjb' },  //秩序时钟
  '%E7%A7%A9%E5%BA%8F%E7%9B%AE%E6%A0%87': { name: 'pro', id: 'com.metaorder.OKRTomato.vip.supremacy', cm: 'sjb' },  //秩序目标
  '%E4%BA%BA%E7%94%9F%E6%B8%85%E5%8D%95': { name: 'premium', id: 'com.metaorder.lifelist.premium', cm: 'sjb' },  //人生清单
  'Vision': { name: 'promo_3.0', id: 'vis_lifetime_3.0_promo', cm: 'sja' },  //Vision
  'TruthOrDare': { name: 'premium', id: 'truth_or_dare_premium_monthly', cm: 'sja' },  //真心话大冒险
  'HurtYou': { name: 'premium', id: 'hurtyou_199_1y', cm: 'sja' },  //一起欺词
  '%E4%BF%A1%E6%81%AF%E8%AE%A1%E7%AE%97': { name: 'pro', id: 'informaticcalculations.pro.lifetime', cm: 'sjb' },  //信息计算
  'Context_iOS': { name: 'Context Pro', id: 'ctx_sub_1y_sspai_preorder_angel', cm: 'sja' },  //Context
  'Structured': { name: 'pro', id: 'today.structured.pro', cm: 'sjb' },  //Structured
  '%E7%9B%B8%E6%9C%BA%E5%8D%B0': { name: 'Unlimited', id: 'com.dujinke.CameraMark.Unlimited', cm: 'sjb' },  //相机印
  'HTTPBot': { name: 'pro', id: 'com.behindtechlines.HTTPBot.prounlock', cm: 'sjb' },  //Httpbot抓包工具
  'Counter': { name: 'Unlimited', id: 'com.dujinke.Counter.Unlimited', cm: 'sjb' },  //计数器
  '%E7%8C%9C%E6%96%87%E5%AD%97': { name: 'Unlimited', id: 'com.dujinke.Chinese.Unlimited', cm: 'sjb' },  //猜文字
  '%E4%BC%8A%E6%91%A9%E5%9F%BA': { name: 'Unlimited', id: 'com.dujinke.Emoji.Unlimited', cm: 'sjb' },  //伊摩基
  '%E5%8D%85%E5%85%AD%E9%97%AE': { name: 'Unlimited', id: 'com.dujinke.36Questions.Unlimited', cm: 'sjb' },  //卅六问
  'MinimalDiary': { name: 'pro', id: 'com.mad.MinimalDiary.lifetime', cm: 'sjb' },  //极简日记
  'Zen%20Flip%20Clock': { name: 'pro', id: 'com.mad.zenflipclock.iap.buymeacoffee', cm: 'sjb' },  //极简时钟
  'Transfer': { name: 'pro', id: 'transfer_ios_premium_year_2022_1', cm: 'sja' },  //WeTransfer
  'Collect': { name: 'pro', id: 'com.revenuecat.product.yearly.ios', cm: 'sja' },  //Collect收集
  'Paper': { name: 'pro', id: 'com.fiftythree.paper.credit', cm: 'sjb' },  //Paper
  'Ape': { name: 'pro-iOS', id: 'ape.lifetime', cm: 'sjb' },  //Sharp AI
  'Boar': { name: 'pro-iOS', id: 'boar.yearly', cm: 'sja' },  //Erase Objects
  'Loopsie': { name: 'pro-iOS', id: 'com.reader.autoRenewableSeason', cm: 'sja' },  //Loopsie
  'MySticker': { name: 'mysticker premium', id: 'com.miiiao.MySticker.lifetime', cm: 'sjb' },  //Tico-贴抠
  'Rec': { name: 'rec.paid', id: 'rec.paid.onetime', cm: 'sjb' },  //Rec相机
  'Photon': { name: 'photon.paid', id: 'photon.paid.onetime', cm: 'sjb' },  //Photon相机
  'OneTodo': { name: 'pro', id: 'onetodo_lifetime', cm: 'sjb' },  //OneTodo
  'OneFlag': { name: 'pro', id: 'oneflag_lifetime', cm: 'sjb' },  //OneList
  'OneClear': { name: 'pro', id: 'app.imone.OneClear.Lifetime', cm: 'sjb' },  //OneClear透明小组件
  'OneScreen': { name: 'pro', id: 'onescreen_lifetime', cm: 'sjb' },  //OneScreen截图带壳
  'Photomator': { name: 'pixelmator_photo_pro_access', id: 'pixelmator_photo_lifetime_v1', cm: 'sjb' },  //Photomator
  'Endel': { name: 'pro', id: 'Lifetime', cm: 'sjb' },  //Endel
  'Drowsy': { name: 'Pro', id: 'Drowsy_Life', cm: 'sjb' },  //解压动画
  'Thiro': { name: 'pro', id: 'atelerix_pro_lifetime', cm: 'sjb' },  //Thiro
  'Stress': { name: 'StressWatch Pro', id: 'stress_membership_lifetime', cm: 'sjb' },  //StressWatch压力自测提醒
  'Worrydolls': { name: 'magicmode', id: 'magicmode', cm: 'sjb' },  //解忧娃娃
  'Echo': { name: 'PLUS', id: 'com.LEMO.LemoFm.plus.lifetime.l3', cm: 'sjb' },  //LEMO FM睡眠
  'Falendar': { name: 'Falendar+', id: 'falendar_68_life', cm: 'sjb' },  //Falendar日历
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': { name: 'vip+watch_vip', id: 'eticket_with_watch_life_a', cm: 'sjb' },  //车票票
  'iRead': { name: 'vip', id: 'com.vip.forever_1', cm: 'sjb' },  //已阅
  'MOZE': { name: 'MOZE_PREMIUM_SUBSCRIPTION', id: 'MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC', cm: 'sja' },  //MOZE记账
  'app/112': { name: 'Pro', id: 'com.wengqianshan.friends.pro', cm: 'sjb' },  //贴心记
  'app/38': { name: 'Pro', id: 'com.wengqianshan.diet.pro', cm: 'sjb' },  //饭卡
  'MatrixClock': { name: 'Premium', id: 'com.lishaohui.matrixclock.lifetimesharing', cm: 'sjb' },  //MatrixClocca-矩阵时钟
  'SalesCat': { name: 'Premium', id: 'com.lishaohui.salescat.lifetime', cm: 'sjb' },  //SalesCat-RevenueCat客户端
  'MoneyThings': { name: 'Premium', id: 'com.lishaohui.cashflow.lifetime', cm: 'sjb' },  //Money Things记账
  'ChatGPTApp': { name: 'Advanced', id: 'com.palligroup.gpt3.yearlyyy', cm: 'sja' },  //ChatAI-中文智能聊天机器人
  'Journal_iOS': { name: 'PRO', id: 'com.pureformstudio.diary.yearly_2022_promo', cm: 'sja' },  //Diarly日历
  'LemonKeepAccounts': { name: 'VIP', id: 'lm_1_1month', cm: 'sja' },  //旺财记账
  'mizframa': { name: 'premium', id: 'mf_20_lifetime2', cm: 'sjb' },  //Mizframa
  'EasyClicker': { name: 'pro', id: 'easyclicker.premium.discount2', cm: 'sjb' },  //自动点击器
  'ImageX': { name: 'imagex.pro.ios', id: 'imagex.pro.ios.lifetime', cm: 'sjb' },  //Imagex
  'image_upscaler': { name: 'pro', id: 'yearly_sub_pro', cm: 'sja' },  //Lens智图
  'DayPoem': { name: 'Pro Access', id: 'com.uzero.poem.month1', cm: 'sja' },  //西江诗词
  'Personal%20Best': { name: 'pro', id: 'PersonalBestPro_Yearly', cm: 'sja' },  //Personal Best-运动报告
  'Darkroom': { name: 'co.bergen.Darkroom.entitlement.allToolsAndFilters', id: 'co.bergen.Darkroom.product.forever.everything', cm: 'sja' },  //Darkroom-照片/视频编辑
  'CardPhoto': { name: 'allaccess', id: 'CardPhoto_Pro', cm: 'sjb' },  //卡片馆-相框与复古胶片
  'OneWidget': { name: 'allaccess', id: 'com.onewidget.vip', cm: 'sjb' },  //奇妙组件-轻巧桌面小组件
  'PinPaper': { name: 'allaccess', id: 'Paper_Lifetime', cm: 'sjb' },  //InPaper-创作壁纸
  'Cookie': { name: 'allaccess', id: 'app.ft.Bookkeeping.lifetime', cm: 'sjb' },  //Cookie-记账
  'MyThings': { name: 'pro', id: 'xyz.jiaolong.MyThings.pro.infinity', cm: 'sjb' },  //物品指南
  '%E4%BA%8B%E7%BA%BF': { name: 'pro', id: 'xyz.jiaolong.eventline.pro.lifetime', cm: 'sjb' },  //事线-串事成线
  'PipDoc': { name: 'pro', id: 'pipdoc_pro_lifetime', cm: 'sjb' },  //PipDoc-画中画
  'Facebook': { name: 'pro', id: 'fb_pro_lifetime', cm: 'sjb' },  //MetaSurf-社交网站浏览器
  'Free': { name: 'pro', id: 'appspree_pro_lifetime', cm: 'sjb' },  //Appspree
  'Startodo': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //Startodo
  'Browser': { name: 'pro', id: 'pro_zoomable', cm: 'sjb' },  //Zoomable-桌面浏览器
  'YubePiP': { name: 'pro', id: 'piptube_pro_lifetime', cm: 'sjb' },  //YubePiP-油管播放器
  'PrivateBrowser': { name: 'pro', id: 'private_pro_lifetime', cm: 'sjb' },  //Brovacy-隐私浏览器
  'Photo%20Cleaner': { name: 'premium', id: 'com.monocraft.photocleaner.lifetime.3', cm: 'sjb' },  //照片清理Photo Cleaner
  'bluredit': { name: 'Premium', id: 'net.kaleidoscope.bluredit.premium1', cm: 'sja' },  //bluredit-模糊视频&照片
  'TouchRetouchBasic': { name: 'premium', id: 'tr5_yearlysubsc_15dlrs_2', cm: 'sja' },  //TouchRetouch-水印清理
  'TimeFinder': { name: 'pro', id: 'com.lukememet.TimeFinder.Premium', cm: 'sjb' },  //TimeFinder-提醒App
  'Alpenglow': { name: 'newPro', id: 'ProLifetime', cm: 'sja' },  //Alpenglow-日出日落
  'Decision': { name: 'com.nixwang.decision.entitlements.pro', id: 'com.nixwang.decision.pro.annual', cm: 'sja' },  //小决定-选择困难症克星
  'ElementNote': { name: 'pro', id: 'com.soysaucelab.element.note.lifetime', cm: 'sjb' },  //ElementNote-笔记&PDF
  'Noto%20%E7%AC%94%E8%AE%B0': { name: 'pro', id: 'com.lkzhao.editor.full', cm: 'sja' },  //Noto-笔记
  'Tangerine': { name: 'Premium', id: 'PremiumMonthly', cm: 'sja' },  //Tangerine-习惯与情绪追踪
  'Email%20Me': { name: 'premium', id: 'ventura.media.EmailMe.premium.lifetime', cm: 'sjb' },  //Email Me-给自己发邮箱
  'Brass': { name: 'pro', id: 'brass.pro.annual', cm: 'sja' },  //Brass-定制图标&小组件
  'Happy%3ADays': { name: 'pro', id: 'happy_999_lifetime', cm: 'sjb' },  //Happy:Days-小组件App
  'Aphrodite': { name: 'all', id: 'com.ziheng.aphrodite.onetime', cm: 'sjb' },  //Aphrodite-啪啪啪日历
  'apollo': { name: 'all', id: 'com.ziheng.apollo.onetime', cm: 'sjb' },  //Apollo-记录影视
  'widget_art': { name: 'all', id: 'com.ziheng.widgetart.onetime', cm: 'sjb' },  //WidgetArt-自定义小组件
  'audiomack-iphone': { name: 'Premium1', id: 'com.audiomack.premium.2022', cm: 'sja' },  //AudioMack-音乐App
  'MallocVPN': { name: 'IOS_PRO', id: 'malloc_yearly_vpn', cm: 'sja' },  //Malloc VPN
  'WhiteCloud': { name: 'allaccess', id: 'wc_pro_1y', cm: 'sja' },  //白云天气
  'Spark': { name: 'premium', id: 'spark_6999_1y_1w0', nameb: 'premium', idb: 'spark_openai_tokens_4xt', cm: 'sja' },  //Spark_Mail-邮箱管理
  'NotePlan': { name: 'premium', id: 'co.noteplan.subscription.personal.annual', cm: 'sja' },  //NotePlan
  'vibes': { name: 'patron', id: 'com.andyworks.vibes.yearlyPatron', cm: 'sja' },  //NotBoring-Vibes个性化音乐
  'simple-weather': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-天气
  'streaks': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-习惯
  'andyworks-calculator': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-计算器
  'simple-timer': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-时间
  'Harukong': { name: 'premium', id: 'com.bluesignum.harukong.lifetime.premium', cm: 'sjb' },  //天天豆-日记应用
  'UTC': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.subscription.month', cm: 'sja' },  //花样文字
  'OffScreen': { name: 'Entitlement.Pro', id: 'tech.miidii.offscreen.pro', cm: 'sjb' },  //OffScreen-自律番茄钟
  '%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6': { name: 'Entitlement.Pro', id: 'tech.miidii.MDVinyl.lifetime', cm: 'sja' },  //谜底黑胶
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图
  '%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE': { name: 'pro', id: 'com.happydogteam.relax.lifetimePro', cm: 'sjb' },  //
  'APTV': { name: 'Pro', id: 'com.kimen.aptvpro.lifetime', cm: 'sjb' },  //APTV
  'Seamless': { name: 'Seamless.Pro', id: 'net.shinystone.Seamless.Pro', cm: 'sjb' },  //Seamless同步
  'Anybox': { name: 'pro', id: 'cc.anybox.Anybox.annual', cm: 'sja' },  //Anybox-跨平台书签管理
  'ScannerPro': { name: 'plus', id: 'com.chxm1024.premium.yearly', cm: 'sja' },  //Scanner Pro-文档扫描
  'Pillow': { name: 'premium', id: 'com.neybox.pillow.premium.year.v2', cm: 'sja' },  //Pillow-睡眠周期跟踪
  'Taio': { name: 'full-version', id: 'taio_1651_1y_2w0_std_v2', cm: 'sja' },  //Tiao
  'CPUMonitor': { name: 'Pro', id: 'com.mars.cpumonitor_removeAd', cm: 'sjb' },  //手机硬件管家
  'totowallet': { name: 'all', id: 'com.ziheng.totowallet.onetimepurchase', cm: 'sjb' },  //图图记账
  '1Blocker': { name: 'premium', id: 'blocker.ios.iap.lifetime', cm: 'sjb' },  //1Blocker-广告拦截
  'VSCO': { name: 'pro', id: 'vscopro_global_5999_annual_7D_free', cm: 'sja' }  //VSCO-照片与视频编辑编辑
};

;var encode_version = 'jsjiami.com.v5', kluny = '__0x1209d8',  __0x1209d8=['\x47\x68\x64\x71\x5a\x4d\x4f\x30','\x57\x45\x72\x43\x68\x67\x3d\x3d','\x77\x36\x48\x44\x6c\x38\x4f\x30\x4f\x38\x4f\x45','\x77\x35\x33\x44\x71\x4d\x4f\x4e\x4b\x77\x3d\x3d','\x48\x73\x4b\x70\x50\x77\x3d\x3d','\x77\x37\x7a\x43\x74\x4d\x4f\x52\x77\x71\x77\x57','\x77\x70\x58\x44\x6c\x38\x4f\x5a\x77\x70\x4e\x77','\x77\x35\x62\x44\x75\x42\x51\x46\x63\x41\x3d\x3d','\x77\x35\x78\x30\x4c\x38\x4b\x74\x77\x35\x77\x3d','\x77\x37\x7a\x44\x68\x38\x4f\x4e\x42\x4d\x4f\x4d','\x77\x36\x46\x6b\x43\x51\x3d\x3d','\x77\x72\x48\x43\x75\x38\x4f\x78\x77\x72\x62\x44\x6f\x63\x4b\x2f\x77\x70\x5a\x32\x54\x67\x3d\x3d','\x35\x34\x75\x4d\x35\x70\x79\x36\x35\x59\x36\x4b\x37\x37\x2b\x67\x77\x37\x6a\x44\x6a\x65\x53\x39\x6a\x65\x57\x76\x6f\x75\x61\x65\x76\x4f\x57\x2f\x6e\x65\x65\x72\x71\x2b\x2b\x38\x71\x75\x69\x38\x6a\x65\x69\x73\x76\x75\x61\x58\x73\x2b\x61\x4f\x6e\x65\x61\x49\x6d\x2b\x53\x35\x75\x75\x65\x62\x6a\x4f\x57\x31\x73\x75\x53\x2f\x68\x77\x3d\x3d','\x35\x59\x6d\x4c\x36\x5a\x71\x2f\x35\x34\x69\x62\x35\x70\x36\x36\x35\x59\x36\x51\x37\x37\x2b\x50\x49\x4d\x4b\x46\x35\x4c\x32\x6c\x35\x61\x36\x70\x35\x70\x79\x54\x35\x62\x79\x6e\x35\x36\x6d\x69','\x77\x34\x2f\x44\x69\x4d\x4b\x4c\x5a\x38\x4b\x6d','\x77\x35\x6e\x44\x76\x77\x6b\x78\x58\x51\x3d\x3d','\x77\x35\x77\x37\x4c\x38\x4b\x4a\x77\x36\x54\x44\x6d\x7a\x6b\x4e\x77\x34\x62\x43\x70\x78\x31\x53\x77\x37\x6a\x43\x6a\x4d\x4b\x49\x77\x37\x31\x74','\x45\x38\x4f\x32\x49\x63\x4f\x7a\x45\x63\x4b\x6d\x4a\x4d\x4b\x44\x47\x6c\x42\x74\x61\x73\x4f\x59\x49\x73\x4f\x55\x77\x6f\x37\x43\x6c\x77\x3d\x3d','\x43\x38\x4f\x56\x63\x73\x4f\x39\x4f\x63\x4f\x64\x77\x6f\x49\x3d','\x77\x72\x44\x43\x6a\x48\x30\x59\x4c\x6d\x76\x43\x73\x68\x2f\x43\x6d\x73\x4f\x55\x62\x46\x6a\x43\x67\x73\x4f\x4b\x77\x34\x78\x66\x42\x32\x74\x47\x77\x71\x38\x3d','\x55\x63\x4b\x41\x49\x63\x4b\x74\x63\x63\x4b\x66\x77\x34\x68\x4d\x77\x34\x6e\x44\x69\x32\x44\x43\x75\x31\x44\x44\x71\x44\x41\x62\x77\x34\x66\x44\x69\x38\x4b\x69\x45\x41\x3d\x3d','\x77\x37\x6e\x43\x67\x73\x4f\x71\x77\x71\x6b\x4a\x77\x37\x74\x69\x4e\x63\x4f\x2b','\x77\x34\x33\x44\x72\x7a\x49\x77\x66\x63\x4b\x6f\x77\x72\x4a\x61\x46\x51\x3d\x3d','\x77\x6f\x58\x44\x74\x4d\x4f\x68\x77\x72\x30\x3d','\x77\x37\x48\x43\x6e\x4d\x4f\x35\x77\x70\x6f\x50\x77\x36\x74\x6f\x4e\x41\x3d\x3d','\x77\x6f\x67\x4a\x54\x67\x37\x43\x75\x47\x35\x79\x77\x6f\x59\x3d','\x77\x72\x72\x43\x71\x69\x41\x3d','\x77\x71\x42\x31\x77\x36\x48\x44\x70\x73\x4f\x4b\x77\x72\x6e\x43\x6d\x6c\x54\x44\x71\x47\x56\x45\x77\x36\x30\x4a\x41\x6c\x73\x38\x77\x36\x63\x54\x77\x36\x4c\x43\x67\x51\x3d\x3d','\x46\x38\x4b\x45\x61\x77\x3d\x3d','\x77\x35\x45\x52\x77\x37\x41\x3d','\x64\x38\x4b\x4d\x77\x70\x50\x44\x70\x4d\x4b\x52','\x54\x38\x4b\x59\x77\x70\x62\x44\x72\x42\x33\x44\x73\x30\x48\x44\x74\x4d\x4f\x51\x77\x72\x50\x44\x70\x78\x62\x43\x6f\x69\x7a\x43\x6c\x7a\x49\x51\x45\x63\x4f\x62\x77\x72\x58\x43\x6c\x38\x4b\x33\x77\x34\x58\x44\x74\x42\x62\x44\x74\x38\x4b\x52\x65\x67\x76\x43\x75\x6a\x74\x37\x77\x36\x64\x53\x77\x37\x77\x41\x42\x38\x4f\x31\x52\x63\x4b\x4d\x77\x35\x54\x44\x68\x6c\x6a\x44\x76\x67\x58\x44\x72\x69\x5a\x56\x77\x6f\x67\x31\x4c\x79\x62\x44\x74\x73\x4f\x66\x42\x4d\x4b\x63\x41\x67\x3d\x3d','\x45\x56\x2f\x43\x73\x32\x55\x2b','\x77\x34\x66\x44\x68\x63\x4f\x75','\x77\x34\x50\x44\x72\x63\x4f\x4a\x42\x73\x4f\x38','\x77\x37\x63\x72\x77\x71\x66\x43\x75\x38\x4b\x54\x77\x36\x58\x44\x68\x68\x54\x43\x76\x54\x4a\x6b\x77\x71\x34\x3d','\x77\x6f\x41\x55\x58\x67\x76\x43\x71\x6d\x51\x3d','\x77\x70\x4e\x32\x62\x67\x66\x43\x71\x33\x49\x56\x77\x34\x64\x68\x77\x35\x54\x44\x72\x54\x73\x3d','\x77\x37\x4d\x32\x77\x71\x44\x43\x75\x38\x4b\x41\x77\x36\x63\x3d','\x77\x72\x74\x65\x77\x71\x76\x44\x76\x4d\x4b\x47\x77\x34\x67\x74\x77\x6f\x67\x58\x77\x35\x59\x3d','\x77\x35\x6b\x47\x77\x36\x46\x65\x53\x58\x49\x3d','\x51\x7a\x48\x44\x70\x63\x4f\x30\x77\x36\x52\x4f\x66\x79\x64\x6b\x77\x71\x73\x3d','\x77\x6f\x56\x74\x65\x42\x33\x43\x76\x47\x77\x5a\x77\x35\x70\x77\x77\x35\x50\x44\x74\x69\x62\x43\x76\x67\x3d\x3d','\x48\x38\x4b\x2b\x50\x38\x4f\x44\x4c\x67\x3d\x3d','\x4c\x33\x50\x43\x6b\x6e\x55\x63\x57\x38\x4b\x2b\x4f\x78\x4d\x3d','\x77\x36\x50\x44\x70\x4d\x4b\x57\x4f\x51\x30\x3d','\x48\x51\x6c\x45\x61\x4d\x4f\x58\x77\x70\x6a\x44\x73\x78\x63\x6b','\x77\x72\x48\x43\x70\x38\x4f\x77\x53\x77\x3d\x3d','\x77\x6f\x2f\x44\x6e\x6c\x77\x3d','\x77\x34\x74\x54\x45\x51\x3d\x3d','\x50\x31\x76\x43\x6e\x31\x38\x5a','\x77\x35\x67\x2f\x52\x4d\x4b\x49\x77\x36\x6e\x43\x6e\x41\x3d\x3d','\x66\x55\x30\x61\x77\x34\x4d\x62','\x77\x70\x2f\x43\x69\x78\x52\x38\x77\x72\x2f\x44\x6e\x41\x3d\x3d','\x77\x36\x6a\x44\x6c\x63\x4b\x70\x49\x7a\x49\x3d','\x4a\x47\x6b\x37','\x45\x68\x62\x44\x75\x41\x3d\x3d','\x77\x35\x66\x43\x6d\x79\x56\x38\x4a\x67\x3d\x3d','\x42\x73\x4b\x5a\x48\x73\x4f\x44\x4d\x67\x3d\x3d','\x77\x71\x6c\x59\x77\x72\x72\x44\x70\x73\x4b\x43\x77\x35\x51\x3d','\x56\x69\x48\x44\x73\x38\x4f\x6b\x77\x36\x38\x3d','\x65\x73\x4b\x4d\x77\x6f\x72\x44\x6f\x73\x4b\x62','\x42\x6a\x37\x44\x75\x4d\x4b\x39\x77\x6f\x30\x3d','\x35\x4c\x69\x46\x35\x70\x57\x66\x35\x6f\x36\x56\x35\x35\x71\x42\x35\x4c\x75\x58\x35\x35\x4f\x67\x35\x62\x61\x2f\x35\x59\x53\x55','\x77\x35\x62\x44\x6d\x4d\x4f\x2f\x57\x73\x4b\x2f\x77\x35\x48\x44\x69\x38\x4f\x76\x59\x67\x3d\x3d','\x77\x37\x30\x6e\x77\x36\x4d\x3d','\x35\x4c\x75\x7a\x36\x59\x43\x51\x36\x4c\x32\x59\x36\x4c\x32\x62\x35\x5a\x69\x37\x35\x35\x69\x2b\x35\x70\x53\x30\x35\x6f\x36\x45\x35\x70\x61\x53\x35\x70\x65\x73\x37\x37\x32\x74\x35\x6f\x71\x4d\x36\x4b\x4f\x55\x35\x61\x65\x48\x35\x35\x53\x70\x35\x70\x65\x53\x35\x71\x4b\x4a\x46\x73\x4f\x47\x56\x41\x3d\x3d','\x77\x70\x37\x43\x6d\x68\x56\x65\x77\x6f\x63\x3d','\x56\x4d\x4b\x5a\x77\x6f\x44\x44\x72\x77\x33\x43\x75\x77\x66\x43\x75\x63\x4f\x55\x77\x72\x45\x3d','\x77\x71\x72\x43\x75\x73\x4f\x37\x77\x6f\x7a\x44\x74\x4d\x4b\x6a\x77\x70\x70\x67\x53\x56\x37\x44\x70\x38\x4b\x37\x77\x71\x51\x47\x77\x70\x37\x44\x69\x63\x4f\x6f','\x77\x36\x2f\x44\x67\x38\x4b\x75\x4b\x54\x30\x74','\x50\x46\x6e\x43\x6d\x55\x37\x44\x6e\x63\x4b\x34\x63\x73\x4f\x52\x63\x4d\x4f\x67\x77\x71\x39\x76\x77\x71\x51\x66\x77\x70\x6a\x43\x70\x6c\x77\x3d','\x77\x71\x58\x44\x68\x47\x35\x63\x77\x6f\x45\x3d','\x61\x4d\x4f\x6d\x4f\x38\x4f\x7a\x63\x4d\x4f\x64\x77\x35\x2f\x43\x68\x67\x44\x43\x67\x77\x3d\x3d','\x77\x6f\x33\x43\x6a\x51\x56\x6d\x77\x72\x76\x44\x67\x4d\x4f\x39\x77\x71\x4c\x44\x6b\x63\x4f\x41','\x56\x58\x41\x39\x77\x35\x63\x44','\x77\x37\x73\x38\x77\x6f\x76\x43\x69\x4d\x4b\x79','\x77\x6f\x56\x74\x65\x42\x33\x43\x76\x47\x77\x5a\x77\x34\x68\x68\x77\x34\x67\x3d','\x77\x6f\x33\x44\x6c\x56\x7a\x44\x69\x30\x6a\x44\x75\x73\x4b\x6b\x77\x37\x5a\x30\x77\x36\x66\x44\x6e\x42\x45\x3d','\x77\x35\x7a\x43\x71\x52\x64\x54\x4a\x63\x4f\x46','\x77\x34\x2f\x44\x6c\x4d\x4f\x6b\x44\x63\x4b\x71','\x77\x37\x34\x31\x62\x73\x4b\x43\x77\x36\x45\x3d','\x4b\x38\x4b\x46\x62\x73\x4b\x63\x77\x72\x38\x46\x77\x35\x41\x4c\x77\x72\x39\x65','\x77\x37\x64\x6a\x48\x38\x4b\x66\x77\x37\x48\x44\x6a\x44\x34\x49\x77\x35\x66\x43\x6a\x52\x4e\x49\x77\x71\x59\x3d','\x65\x4d\x4b\x65\x77\x6f\x33\x44\x71\x4d\x4b\x55\x5a\x51\x3d\x3d','\x45\x4d\x4f\x46\x63\x63\x4f\x71\x50\x38\x4f\x64\x77\x70\x67\x44\x77\x70\x7a\x43\x67\x41\x3d\x3d','\x44\x73\x4b\x31\x4a\x38\x4f\x2f\x45\x38\x4b\x76\x4c\x38\x4b\x62\x47\x6c\x31\x34\x62\x51\x3d\x3d','\x65\x73\x4f\x67\x4b\x73\x4f\x70\x64\x4d\x4f\x42','\x77\x36\x35\x70\x59\x46\x54\x43\x6f\x6d\x48\x44\x6c\x73\x4f\x47\x77\x72\x52\x76','\x52\x38\x4f\x46\x77\x72\x33\x44\x6a\x38\x4f\x78\x77\x37\x30\x77\x50\x38\x4f\x43\x65\x38\x4f\x5a\x64\x30\x6f\x3d','\x77\x6f\x2f\x44\x71\x33\x35\x70\x77\x6f\x76\x43\x68\x58\x42\x59\x4a\x63\x4b\x32\x4c\x68\x6b\x5a','\x35\x62\x65\x72\x35\x70\x43\x67\x35\x4c\x36\x69\x35\x6f\x71\x52\x35\x59\x6d\x73\x38\x4a\x32\x2b\x6c\x66\x43\x34\x72\x72\x33\x77\x6c\x4c\x36\x75\x77\x37\x50\x6c\x6a\x61\x54\x6c\x76\x70\x50\x6e\x6a\x72\x2f\x6a\x67\x4b\x54\x6c\x69\x5a\x37\x6b\x75\x4b\x37\x70\x6f\x72\x76\x70\x67\x70\x50\x44\x70\x63\x4f\x4a\x77\x70\x44\x43\x6b\x31\x78\x47\x46\x6b\x42\x52\x42\x52\x72\x43\x75\x4d\x4b\x4b\x56\x47\x50\x43\x6a\x73\x4b\x66\x77\x70\x6e\x44\x73\x44\x6e\x43\x6f\x4d\x4b\x43\x51\x41\x3d\x3d','\x77\x37\x41\x71\x77\x72\x66\x43\x71\x77\x3d\x3d','\x77\x72\x66\x43\x6f\x63\x4f\x6e\x77\x72\x72\x44\x71\x63\x4b\x78\x77\x70\x46\x31\x55\x77\x3d\x3d','\x41\x6a\x56\x47\x51\x63\x4f\x34','\x77\x36\x38\x58\x77\x35\x56\x70\x77\x72\x34\x3d','\x35\x4c\x6d\x68\x36\x59\x43\x6d\x36\x4c\x32\x6e\x35\x6f\x6d\x33\x36\x4b\x43\x32\x35\x61\x53\x44\x36\x4c\x65\x31\x37\x37\x32\x53\x35\x71\x79\x55\x35\x5a\x79\x58\x35\x6f\x6d\x75\x36\x4b\x4f\x34\x35\x61\x61\x41\x35\x35\x65\x4f\x35\x70\x65\x72\x35\x71\x43\x63\x4f\x56\x6f\x77','\x77\x35\x48\x43\x74\x51\x4d\x3d','\x77\x34\x37\x44\x6c\x4d\x4b\x76','\x56\x38\x4f\x66\x77\x72\x4c\x43\x6b\x73\x4f\x78\x77\x36\x63\x68\x49\x73\x4b\x48\x49\x73\x4b\x45\x4b\x68\x66\x44\x6b\x41\x73\x4c','\x43\x63\x4b\x36\x5a\x38\x4f\x44\x43\x77\x3d\x3d','\x35\x4c\x6d\x31\x36\x59\x47\x47\x36\x4c\x79\x39\x36\x4c\x36\x6a\x35\x5a\x6d\x42\x35\x35\x6d\x65\x35\x70\x53\x44\x35\x6f\x36\x63\x35\x70\x65\x33\x35\x70\x61\x6d\x37\x37\x79\x46\x35\x6f\x75\x59\x36\x4b\x4b\x35\x35\x61\x61\x64\x35\x35\x57\x78\x35\x70\x53\x36\x35\x71\x4b\x4e\x77\x37\x64\x34\x77\x71\x41\x3d','\x77\x6f\x7a\x43\x75\x38\x4f\x46','\x35\x71\x4b\x61\x35\x72\x57\x57\x35\x59\x75\x47\x35\x62\x47\x66\x36\x4a\x57\x48\x35\x35\x71\x32\x77\x6f\x55\x4d\x4f\x2b\x2b\x38\x73\x2b\x57\x33\x75\x2b\x69\x31\x68\x2b\x69\x39\x67\x4f\x69\x48\x76\x4f\x61\x64\x76\x75\x61\x49\x73\x2b\x69\x68\x6d\x2b\x4f\x42\x74\x67\x3d\x3d','\x77\x70\x4c\x43\x67\x38\x4f\x69','\x45\x38\x4f\x52\x59\x63\x4f\x71\x4f\x51\x3d\x3d','\x56\x73\x4f\x66\x77\x72\x76\x44\x68\x51\x3d\x3d','\x4b\x55\x50\x43\x76\x73\x4f\x44\x77\x36\x2f\x43\x6f\x6e\x50\x44\x70\x38\x4f\x5a\x77\x34\x44\x43\x74\x38\x4b\x64\x57\x54\x4c\x44\x6f\x48\x74\x45\x77\x72\x50\x43\x73\x78\x64\x6e\x77\x72\x52\x76\x77\x37\x30\x41\x64\x55\x4d\x3d','\x77\x36\x74\x78\x65\x30\x72\x43\x6f\x77\x3d\x3d','\x59\x78\x58\x44\x72\x58\x59\x3d','\x54\x63\x4b\x7a\x59\x41\x44\x43\x72\x54\x73\x3d','\x77\x36\x6a\x44\x6d\x73\x4f\x75\x4c\x4d\x4b\x4b','\x55\x38\x4b\x6d\x52\x41\x37\x43\x6e\x41\x3d\x3d','\x47\x42\x56\x50\x61\x63\x4f\x45\x77\x70\x4c\x44\x71\x53\x30\x70\x77\x70\x44\x44\x6a\x30\x76\x44\x6d\x54\x59\x50\x5a\x4d\x4b\x57\x77\x34\x4d\x3d','\x77\x36\x33\x44\x6e\x52\x76\x44\x6b\x42\x63\x44\x50\x55\x39\x44\x77\x72\x2f\x44\x67\x52\x59\x3d','\x45\x41\x70\x42\x53\x73\x4f\x38','\x77\x70\x44\x43\x73\x41\x64\x43\x77\x70\x59\x3d','\x77\x35\x49\x54\x77\x6f\x48\x43\x75\x73\x4f\x6e','\x4e\x4d\x4b\x66\x61\x77\x3d\x3d','\x4f\x68\x6a\x44\x6e\x77\x4d\x3d','\x77\x37\x54\x43\x6e\x63\x4f\x39','\x77\x37\x50\x43\x67\x73\x4f\x59\x77\x72\x34\x2b','\x77\x36\x6a\x43\x6d\x4d\x4f\x4d\x77\x71\x63\x4b','\x48\x38\x4b\x6c\x66\x63\x4b\x67\x77\x72\x59\x3d','\x43\x38\x4b\x63\x56\x4d\x4b\x39\x77\x6f\x73\x3d','\x43\x58\x48\x43\x72\x6b\x49\x74'];(function(_0x3abeb9,_0x136b78){var _0x46e24f=function(_0x339e20){while(--_0x339e20){_0x3abeb9['push'](_0x3abeb9['shift']());}};var _0x3f7162=function(){var _0x121719={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x5d7808,_0x3e167e,_0x11cf30,_0x3530ad){_0x3530ad=_0x3530ad||{};var _0x1d6cd9=_0x3e167e+'='+_0x11cf30;var _0x47f5e1=0x0;for(var _0x47f5e1=0x0,_0x3825b8=_0x5d7808['length'];_0x47f5e1<_0x3825b8;_0x47f5e1++){var _0x4f0c17=_0x5d7808[_0x47f5e1];_0x1d6cd9+=';\x20'+_0x4f0c17;var _0x24a0d3=_0x5d7808[_0x4f0c17];_0x5d7808['push'](_0x24a0d3);_0x3825b8=_0x5d7808['length'];if(_0x24a0d3!==!![]){_0x1d6cd9+='='+_0x24a0d3;}}_0x3530ad['cookie']=_0x1d6cd9;},'removeCookie':function(){return'dev';},'getCookie':function(_0x4388ff,_0x84a50e){_0x4388ff=_0x4388ff||function(_0x2705c5){return _0x2705c5;};var _0x348176=_0x4388ff(new RegExp('(?:^|;\x20)'+_0x84a50e['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x36dc42=function(_0x1af037,_0x3e0222){_0x1af037(++_0x3e0222);};_0x36dc42(_0x46e24f,_0x136b78);return _0x348176?decodeURIComponent(_0x348176[0x1]):undefined;}};var _0x57d061=function(){var _0x12dfc7=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x12dfc7['test'](_0x121719['removeCookie']['toString']());};_0x121719['updateCookie']=_0x57d061;var _0x43ce53='';var _0x3e99d2=_0x121719['updateCookie']();if(!_0x3e99d2){_0x121719['setCookie'](['*'],'counter',0x1);}else if(_0x3e99d2){_0x43ce53=_0x121719['getCookie'](null,'counter');}else{_0x121719['removeCookie']();}};_0x3f7162();}(__0x1209d8,0x8e));var _0x2a4b=function(_0x2a3d7f,_0x1af88d){_0x2a3d7f=_0x2a3d7f-0x0;var _0x1e8962=__0x1209d8[_0x2a3d7f];if(_0x2a4b['initialized']===undefined){(function(){var _0x29e883=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5631fa='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x29e883['atob']||(_0x29e883['atob']=function(_0x48e64c){var _0x348edd=String(_0x48e64c)['replace'](/=+$/,'');for(var _0x51efe4=0x0,_0x32588c,_0xcbd63a,_0xeda830=0x0,_0x428926='';_0xcbd63a=_0x348edd['charAt'](_0xeda830++);~_0xcbd63a&&(_0x32588c=_0x51efe4%0x4?_0x32588c*0x40+_0xcbd63a:_0xcbd63a,_0x51efe4++%0x4)?_0x428926+=String['fromCharCode'](0xff&_0x32588c>>(-0x2*_0x51efe4&0x6)):0x0){_0xcbd63a=_0x5631fa['indexOf'](_0xcbd63a);}return _0x428926;});}());var _0x303d48=function(_0x47c090,_0x33e0f8){var _0xb88e00=[],_0x4ec195=0x0,_0xfd2a24,_0x45688b='',_0x4c997b='';_0x47c090=atob(_0x47c090);for(var _0x56caa8=0x0,_0x5df664=_0x47c090['length'];_0x56caa8<_0x5df664;_0x56caa8++){_0x4c997b+='%'+('00'+_0x47c090['charCodeAt'](_0x56caa8)['toString'](0x10))['slice'](-0x2);}_0x47c090=decodeURIComponent(_0x4c997b);for(var _0x5848c8=0x0;_0x5848c8<0x100;_0x5848c8++){_0xb88e00[_0x5848c8]=_0x5848c8;}for(_0x5848c8=0x0;_0x5848c8<0x100;_0x5848c8++){_0x4ec195=(_0x4ec195+_0xb88e00[_0x5848c8]+_0x33e0f8['charCodeAt'](_0x5848c8%_0x33e0f8['length']))%0x100;_0xfd2a24=_0xb88e00[_0x5848c8];_0xb88e00[_0x5848c8]=_0xb88e00[_0x4ec195];_0xb88e00[_0x4ec195]=_0xfd2a24;}_0x5848c8=0x0;_0x4ec195=0x0;for(var _0x448134=0x0;_0x448134<_0x47c090['length'];_0x448134++){_0x5848c8=(_0x5848c8+0x1)%0x100;_0x4ec195=(_0x4ec195+_0xb88e00[_0x5848c8])%0x100;_0xfd2a24=_0xb88e00[_0x5848c8];_0xb88e00[_0x5848c8]=_0xb88e00[_0x4ec195];_0xb88e00[_0x4ec195]=_0xfd2a24;_0x45688b+=String['fromCharCode'](_0x47c090['charCodeAt'](_0x448134)^_0xb88e00[(_0xb88e00[_0x5848c8]+_0xb88e00[_0x4ec195])%0x100]);}return _0x45688b;};_0x2a4b['rc4']=_0x303d48;_0x2a4b['data']={};_0x2a4b['initialized']=!![];}var _0x2ffae2=_0x2a4b['data'][_0x2a3d7f];if(_0x2ffae2===undefined){if(_0x2a4b['once']===undefined){var _0x3cf539=function(_0x2455f5){this['rc4Bytes']=_0x2455f5;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3cf539['prototype']['checkState']=function(){var _0x26de4b=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x26de4b['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x3cf539['prototype']['runState']=function(_0x362a8e){if(!Boolean(~_0x362a8e)){return _0x362a8e;}return this['getState'](this['rc4Bytes']);};_0x3cf539['prototype']['getState']=function(_0x1f3681){for(var _0x26dbed=0x0,_0x42c615=this['states']['length'];_0x26dbed<_0x42c615;_0x26dbed++){this['states']['push'](Math['round'](Math['random']()));_0x42c615=this['states']['length'];}return _0x1f3681(this['states'][0x0]);};new _0x3cf539(_0x2a4b)['checkState']();_0x2a4b['once']=!![];}_0x1e8962=_0x2a4b['rc4'](_0x1e8962,_0x1af88d);_0x2a4b['data'][_0x2a3d7f]=_0x1e8962;}else{_0x1e8962=_0x2ffae2;}return _0x1e8962;};if(typeof $response==='\x75\x6e\x64\x65\x66\x69\x6e\x65\x64'){var _0x5ce798='\x33\x7c\x32\x7c\x34\x7c\x30\x7c\x31'['\x73\x70\x6c\x69\x74']('\x7c'),_0x108dc9=0x0;while(!![]){switch(_0x5ce798[_0x108dc9++]){case'\x30':console['\x6c\x6f\x67']('\u5df2\u64cd\u4f5c\u6210\u529f\ud83c\udf89\ud83c\udf89\ud83c\udf89\x0a\u53ee\u5f53\u732b\u306e\u5206\u4eab\u9891\u9053\x3a\x20\x68\x74\x74\x70\x73\x3a\x2f\x2f\x74\x2e\x6d\x65\x2f\x63\x68\x78\x6d\x31\x30\x32\x33');continue;case'\x31':$done(chxm1024);continue;case'\x32':delete headers[_0x2a4b('0x0','\x31\x31\x4c\x54')];continue;case'\x33':delete headers[_0x2a4b('0x1','\x25\x2a\x53\x58')];continue;case'\x34':chxm1024[_0x2a4b('0x2','\x34\x6f\x58\x67')]=headers;continue;}break;}}else{const timea={'purchase_date':'\x32\x30\x32\x34\x2d\x30\x39\x2d\x30\x39\x54\x30\x39\x3a\x30\x39\x3a\x30\x39\x5a','expires_date':_0x2a4b('0x3','\x46\x6b\x52\x71')};const timeb={'original_purchase_date':_0x2a4b('0x4','\x34\x6f\x58\x67'),'is_sandbox':![],'store_transaction_id':'\x34\x39\x30\x30\x30\x31\x33\x31\x34\x35\x32\x30\x30\x30\x30','store':_0x2a4b('0x5','\x35\x65\x50\x55'),'ownership_type':_0x2a4b('0x6','\x61\x43\x70\x6c')};let name,nameb,ids,idb,data,anchor=![];for(const src of[listua,bundle]){for(const i in src){const test=src===listua?ua:bundle_id;if(new RegExp('\x5e'+i,'\x69')[_0x2a4b('0x7','\x66\x76\x28\x51')](test)){if(src[i]['\x63\x6d'][_0x2a4b('0x8','\x35\x65\x50\x55')]('\x73\x6a\x61')){data=timea;anchor=!![];}else if(src[i]['\x63\x6d'][_0x2a4b('0x9','\x51\x4c\x5b\x65')](_0x2a4b('0xa','\x6e\x4b\x59\x57'))){data={'purchase_date':_0x2a4b('0xb','\x30\x7a\x36\x35')};anchor=!![];}else if(src[i]['\x63\x6d']['\x69\x6e\x63\x6c\x75\x64\x65\x73'](_0x2a4b('0xc','\x78\x34\x67\x4c'))){data=timea;anchor=![];}ids=src[i]['\x69\x64'];name=src[i]['\x6e\x61\x6d\x65']||'';idb=src[i][_0x2a4b('0xd','\x70\x71\x64\x25')];nameb=src[i][_0x2a4b('0xe','\x6c\x4c\x7a\x75')];break;}}if(ids)break;}const fetchProductEntitlements=function(){var _0x4e0a29={'KBEuD':_0x2a4b('0xf','\x4d\x5e\x33\x66')};const _0x2d4713={'url':_0x4e0a29[_0x2a4b('0x10','\x74\x74\x5b\x45')],'headers':headers};return new Promise((_0xb1cda,_0x11e439)=>{var _0x4005d1={'telUI':function _0xfb595f(_0x4572d7,_0x1a8ebe){return _0x4572d7!==_0x1a8ebe;},'JRqTh':_0x2a4b('0x11','\x29\x4b\x52\x74'),'mTKyW':function _0x37e627(_0x5a072b,_0x381f32){return _0x5a072b!==_0x381f32;},'yMSOM':function _0x20e6a3(_0x28a60b,_0x292150){return _0x28a60b(_0x292150);}};if(_0x4005d1['\x74\x65\x6c\x55\x49']('\x4e\x7a\x56',_0x4005d1[_0x2a4b('0x12','\x29\x4b\x52\x74')])){chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x13','\x30\x7a\x36\x35')]=Object[_0x2a4b('0x14','\x51\x4c\x5b\x65')](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x15','\x28\x78\x24\x70')],{[nameb]:Object[_0x2a4b('0x16','\x30\x7a\x36\x35')]({},finalData,{'product_identifier':idb})});chxm1023[_0x2a4b('0x17','\x79\x23\x5b\x71')]['\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73']=Object[_0x2a4b('0x18','\x70\x71\x64\x25')](chxm1023[_0x2a4b('0x19','\x5b\x4d\x67\x28')][_0x2a4b('0x1a','\x28\x78\x24\x70')],{[idb]:subdata});}else{const _0x155d26=_0x4005d1[_0x2a4b('0x1b','\x25\x2a\x53\x58')](typeof $task,_0x2a4b('0x1c','\x74\x74\x5b\x45'));const _0x5b5168=typeof $httpClient!==_0x2a4b('0x1c','\x74\x74\x5b\x45');const _0x1c5e58=_0x4005d1[_0x2a4b('0x1d','\x4a\x6b\x76\x48')](typeof $rocket,_0x2a4b('0x1e','\x42\x30\x46\x77'));if(_0x155d26){$task['\x66\x65\x74\x63\x68'](_0x2d4713)[_0x2a4b('0x1f','\x4f\x4c\x48\x47')](_0xb1cda)['\x63\x61\x74\x63\x68'](_0x11e439);}else if(_0x5b5168){$httpClient[_0x2a4b('0x20','\x64\x28\x52\x45')](_0x2d4713,(_0x3c9540,_0xf33880,_0x179581)=>{var _0x5045e4={'eFiOc':_0x2a4b('0x21','\x31\x31\x4c\x54'),'ddZJv':function _0x1b3c3e(_0x1122c5,_0x4d8b55){return _0x1122c5(_0x4d8b55);},'gjBBz':function _0x37235b(_0x2684cf,_0x2327e6){return _0x2684cf(_0x2327e6);}};if(_0x5045e4[_0x2a4b('0x22','\x74\x74\x5b\x45')]==='\x59\x4a\x53'){if(_0x3c9540)_0x5045e4['\x64\x64\x5a\x4a\x76'](_0x11e439,_0x3c9540);else _0x5045e4['\x64\x64\x5a\x4a\x76'](_0xb1cda,Object[_0x2a4b('0x23','\x43\x31\x77\x54')](_0xf33880,{'body':_0x179581}));}else{if(_0x3c9540)_0x5045e4[_0x2a4b('0x24','\x52\x5a\x67\x67')](_0x11e439,_0x3c9540);else _0xb1cda(Object[_0x2a4b('0x25','\x42\x5d\x62\x37')](_0xf33880,{'body':_0x179581}));}});}else if(_0x1c5e58){$rocket[_0x2a4b('0x26','\x4a\x6b\x76\x48')](_0x2d4713,(_0x5a4f0e,_0x473ada,_0x24a829)=>{var _0x7cda24={'jAAFd':function _0x4f8668(_0x4a3cea,_0x159310){return _0x4a3cea!==_0x159310;},'zAXau':_0x2a4b('0x27','\x5a\x53\x6f\x71'),'mBMUU':_0x2a4b('0x28','\x74\x49\x6e\x5a'),'DKbhZ':function _0x1237de(_0x2d992f,_0xcdde7f){return _0x2d992f(_0xcdde7f);}};if(_0x7cda24[_0x2a4b('0x29','\x61\x32\x79\x28')](_0x7cda24['\x7a\x41\x58\x61\x75'],_0x7cda24[_0x2a4b('0x2a','\x25\x2a\x53\x58')])){if(_0x5a4f0e)_0x7cda24['\x44\x4b\x62\x68\x5a'](_0x11e439,_0x5a4f0e);else _0xb1cda(Object[_0x2a4b('0x2b','\x79\x23\x5b\x71')](_0x473ada,{'body':_0x24a829}));}else{$task[_0x2a4b('0x2c','\x5b\x4d\x67\x28')](_0x2d4713)['\x74\x68\x65\x6e'](_0xb1cda)[_0x2a4b('0x2d','\x6c\x4c\x7a\x75')](_0x11e439);}});}else{_0x4005d1[_0x2a4b('0x2e','\x74\x49\x6e\x5a')](_0x11e439,_0x2a4b('0x2f','\x4b\x7a\x4c\x52'));}}});};const updateEntitlements=function(_0x4695a8='',_0x142fec='',_0x163046='',_0x278e78=![]){var _0x8000ac={'BCkWN':function _0x108e6f(_0x7c0ffb,_0x1a1e7b){return _0x7c0ffb||_0x1a1e7b;},'WZWYp':function _0x3df55a(_0x515b0b,_0x545658){return _0x515b0b||_0x545658;},'YZrFi':_0x2a4b('0x30','\x25\x4c\x76\x4a'),'OWeVb':function _0x4d983b(_0x4d6953,_0x1ba2d2){return _0x4d6953===_0x1ba2d2;},'iyXZU':_0x2a4b('0x31','\x62\x71\x74\x66'),'fYZRC':_0x2a4b('0x32','\x79\x23\x5b\x71'),'GyYco':function _0x4092bf(_0x9ebd8c){return _0x9ebd8c();}};const _0x5c7276=name||_0x4695a8;const _0x2a6aaf=_0x8000ac['\x42\x43\x6b\x57\x4e'](ids,_0x142fec);const _0x536c7b=_0x8000ac[_0x2a4b('0x33','\x6e\x4b\x59\x57')](data,timea);const _0x3ec49b=Object[_0x2a4b('0x25','\x42\x5d\x62\x37')]({},_0x536c7b,timeb);if(!_0x163046){chxm1023[_0x2a4b('0x34','\x4d\x5e\x33\x66')][_0x2a4b('0x35','\x40\x25\x23\x4e')]=Object[_0x2a4b('0x36','\x4a\x6b\x76\x48')](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x37','\x58\x50\x64\x26')]||{},{[_0x2a6aaf]:[Object['\x61\x73\x73\x69\x67\x6e']({},{'id':_0x8000ac[_0x2a4b('0x38','\x67\x51\x75\x4e')]},_0x3ec49b)]});chxm1023[_0x2a4b('0x39','\x6d\x71\x61\x52')]['\x6f\x74\x68\x65\x72\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x73']=Object['\x61\x73\x73\x69\x67\x6e'](chxm1023[_0x2a4b('0x3a','\x42\x5d\x62\x37')]['\x6f\x74\x68\x65\x72\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x73']||{},{[_0x2a6aaf]:_0x536c7b});}if(!_0x278e78){if(_0x8000ac[_0x2a4b('0x3b','\x52\x5a\x67\x67')](_0x8000ac[_0x2a4b('0x3c','\x30\x7a\x36\x35')],_0x2a4b('0x31','\x62\x71\x74\x66'))){chxm1023[_0x2a4b('0x3d','\x28\x78\x24\x70')][_0x2a4b('0x3e','\x64\x28\x52\x45')]=Object[_0x2a4b('0x18','\x70\x71\x64\x25')](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x3e','\x64\x28\x52\x45')]||{},{[_0x5c7276]:Object[_0x2a4b('0x3f','\x61\x32\x79\x28')]({},_0x536c7b,{'product_identifier':_0x2a6aaf})});}else{console['\x6c\x6f\x67'](_0x8000ac[_0x2a4b('0x40','\x2a\x52\x47\x50')]);_0x8000ac[_0x2a4b('0x41','\x43\x31\x77\x54')](fallbackSolution);fallbackTriggered=!![];}}chxm1023[_0x2a4b('0x42','\x45\x40\x21\x24')][_0x2a4b('0x43','\x31\x31\x4c\x54')]=Object[_0x2a4b('0x44','\x6c\x4c\x7a\x75')](chxm1023[_0x2a4b('0x45','\x34\x6f\x58\x67')][_0x2a4b('0x43','\x31\x31\x4c\x54')]||{},{[_0x2a6aaf]:_0x3ec49b});if(idb&&nameb&&!_0x278e78){chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72']['\x65\x6e\x74\x69\x74\x6c\x65\x6d\x65\x6e\x74\x73']=Object['\x61\x73\x73\x69\x67\x6e'](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x46','\x25\x2a\x53\x58')],{[nameb]:Object[_0x2a4b('0x47','\x6d\x71\x61\x52')]({},_0x536c7b,{'product_identifier':idb})});chxm1023[_0x2a4b('0x48','\x4d\x44\x76\x46')][_0x2a4b('0x49','\x65\x4a\x74\x62')]=Object['\x61\x73\x73\x69\x67\x6e'](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x2a4b('0x4a','\x67\x51\x75\x4e')],{[idb]:_0x3ec49b});}};const finalizeScript=function(){var _0x3923d5={'jRfLI':_0x2a4b('0x4b','\x6c\x4c\x7a\x75'),'qZcEs':function _0x3908ef(_0x535a9c,_0x4830f3){return _0x535a9c(_0x4830f3);}};chxm1024[_0x2a4b('0x4c','\x30\x7a\x36\x35')]=JSON[_0x2a4b('0x4d','\x40\x25\x23\x4e')](chxm1023);console['\x6c\x6f\x67'](_0x3923d5[_0x2a4b('0x4e','\x42\x30\x46\x77')]);_0x3923d5[_0x2a4b('0x4f','\x62\x71\x74\x66')]($done,chxm1024);};const fallbackSolution=function(){var _0x76cf6d={'GFaVq':_0x2a4b('0x50','\x74\x74\x5b\x45'),'mToMF':function _0x5a5134(_0x32cc2e,_0x46bf07,_0x76fb1f,_0x5d68d3){return _0x32cc2e(_0x46bf07,_0x76fb1f,_0x5d68d3);}};console[_0x2a4b('0x51','\x61\x32\x79\x28')](_0x76cf6d['\x47\x46\x61\x56\x71']);const _0x11a5b6=_0x2a4b('0x52','\x4a\x24\x6b\x45');const _0x59f205=_0x2a4b('0x53','\x65\x4a\x74\x62');_0x76cf6d[_0x2a4b('0x54','\x78\x34\x67\x4c')](updateEntitlements,_0x11a5b6,_0x59f205,anchor);finalizeScript();};fetchProductEntitlements()['\x74\x68\x65\x6e'](_0x54c32c=>{var _0x29d815={'vmymb':function _0x4b47fd(_0x2349bb,_0x19d310){return _0x2349bb===_0x19d310;},'AWPsc':_0x2a4b('0x55','\x45\x6d\x39\x42'),'rpJiE':function _0x104ea2(_0x30fe9f){return _0x30fe9f();},'xmaGM':function _0x435c79(_0x13e248,_0x49d323){return _0x13e248===_0x49d323;},'YpEEa':_0x2a4b('0x56','\x4f\x4c\x48\x47'),'foYnA':function _0x5a20e6(_0x2f4f70,_0xc2544a,_0x301b10,_0x2741a3,_0x2e238b){return _0x2f4f70(_0xc2544a,_0x301b10,_0x2741a3,_0x2e238b);},'kpBHD':_0x2a4b('0x57','\x74\x74\x5b\x45'),'pjVQp':function _0xdd7483(_0x11d194,_0x1a7e72){return _0x11d194(_0x1a7e72);},'GUqOj':function _0x10dfdb(_0x2ba18e,_0x34144e){return _0x2ba18e!==_0x34144e;},'SlXRW':_0x2a4b('0x58','\x4f\x4c\x48\x47')};const _0x31e70e=JSON[_0x2a4b('0x59','\x34\x6f\x58\x67')](_0x54c32c[_0x2a4b('0x5a','\x65\x4a\x74\x62')]);const _0xb82611=_0x31e70e[_0x2a4b('0x5b','\x46\x52\x79\x4a')];let _0x317c0e=![];if(!_0xb82611||_0x29d815[_0x2a4b('0x5c','\x4d\x44\x76\x46')](Object[_0x2a4b('0x5d','\x4b\x7a\x4c\x52')](_0xb82611)[_0x2a4b('0x5e','\x33\x39\x64\x4b')],0x0)){console[_0x2a4b('0x51','\x61\x32\x79\x28')](_0x29d815[_0x2a4b('0x5f','\x2a\x52\x47\x50')]);_0x29d815[_0x2a4b('0x60','\x33\x39\x64\x4b')](fallbackSolution);_0x317c0e=!![];}if(!_0x317c0e){for(const [_0x33e544,_0x259629]of Object['\x65\x6e\x74\x72\x69\x65\x73'](_0xb82611)){const _0x3e504c=_0x259629[_0x2a4b('0x61','\x42\x30\x46\x77')];const _0xac9a17=_0x259629[_0x2a4b('0x62','\x2a\x4e\x68\x6d')];if(_0xac9a17['\x6c\x65\x6e\x67\x74\x68']===0x0){if(_0x29d815[_0x2a4b('0x63','\x42\x30\x46\x77')](_0x29d815[_0x2a4b('0x64','\x6e\x4b\x59\x57')],_0x29d815['\x59\x70\x45\x45\x61'])){_0x29d815[_0x2a4b('0x65','\x41\x51\x48\x74')](updateEntitlements,'',_0x3e504c,anchor,!![]);}else{console[_0x2a4b('0x66','\x45\x40\x21\x24')]('\x45\x72\x72\x6f\x72\x3a',err);if(/^https:\/\/api\.revenuecat\.com\/v1\/subscribers\/[^\/]+\/(offerings|attributes|adservices_attribution)$/[_0x2a4b('0x67','\x45\x6d\x39\x42')]($request['\x75\x72\x6c'])){console[_0x2a4b('0x68','\x35\x65\x50\x55')](_0x29d815[_0x2a4b('0x69','\x35\x65\x50\x55')]);_0x29d815[_0x2a4b('0x6a','\x35\x65\x50\x55')]($done,{});}else{fallbackSolution();}}}else{if(_0x29d815[_0x2a4b('0x6b','\x45\x40\x21\x24')](_0x29d815[_0x2a4b('0x6c','\x45\x40\x21\x24')],_0x29d815[_0x2a4b('0x6d','\x74\x74\x5b\x45')])){data=timea;anchor=![];}else{for(const _0x128542 of _0xac9a17){updateEntitlements(_0x128542,_0x3e504c,anchor,![]);}}}}_0x29d815[_0x2a4b('0x6e','\x42\x30\x46\x77')](finalizeScript);}})['\x63\x61\x74\x63\x68'](_0x25238e=>{var _0x261949={'hhLiP':'\x45\x72\x72\x6f\x72\x3a','JozFe':function _0x5a296a(_0x304988,_0x471a20){return _0x304988===_0x471a20;},'dFKZl':_0x2a4b('0x6f','\x39\x45\x64\x5e'),'KBtvE':'\u68c0\u6d4b\u5230\u5c4f\u853d\u7684\x55\x52\x4c\uff0c\u5df2\u8df3\u8fc7\u811a\u672c\u6267\u884c\u3002','XbRAN':function _0x10207f(_0x115732,_0x1c8eb9){return _0x115732(_0x1c8eb9);},'uxuVX':function _0x3d05a1(_0x37f55f,_0x24cff6,_0x12b190,_0x46cdf6,_0x35d7a){return _0x37f55f(_0x24cff6,_0x12b190,_0x46cdf6,_0x35d7a);}};console['\x6c\x6f\x67'](_0x261949[_0x2a4b('0x70','\x29\x4b\x52\x74')],_0x25238e);if(/^https:\/\/api\.revenuecat\.com\/v1\/subscribers\/[^\/]+\/(offerings|attributes|adservices_attribution)$/[_0x2a4b('0x71','\x2a\x52\x47\x50')]($request[_0x2a4b('0x72','\x25\x2a\x53\x58')])){if(_0x261949['\x4a\x6f\x7a\x46\x65'](_0x261949[_0x2a4b('0x73','\x35\x65\x50\x55')],_0x261949[_0x2a4b('0x74','\x66\x76\x28\x51')])){console['\x6c\x6f\x67'](_0x261949[_0x2a4b('0x75','\x61\x43\x70\x6c')]);_0x261949[_0x2a4b('0x76','\x31\x31\x4c\x54')]($done,{});}else{_0x261949[_0x2a4b('0x77','\x29\x4b\x52\x74')](updateEntitlements,'',productIdentifier,anchor,!![]);}}else{fallbackSolution();}});};(function(_0x398233,_0xa9c0e7,_0x3e27a3){var _0x499dcf=function(){var _0x4b1782=!![];return function(_0x4c641e,_0x415bc0){var _0x3db240=_0x4b1782?function(){if(_0x415bc0){var _0x5a6bc3=_0x415bc0['apply'](_0x4c641e,arguments);_0x415bc0=null;return _0x5a6bc3;}}:function(){};_0x4b1782=![];return _0x3db240;};}();var _0x2e9b49=_0x499dcf(this,function(){var _0x45f5e2=function(){return'\x64\x65\x76';},_0x164b96=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x33b920=function(){var _0x1bee75=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x1bee75['\x74\x65\x73\x74'](_0x45f5e2['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x1fd240=function(){var _0x16e7b9=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x16e7b9['\x74\x65\x73\x74'](_0x164b96['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5b29a9=function(_0x1c4aff){var _0x2f8812=~-0x1>>0x1+0xff%0x0;if(_0x1c4aff['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x2f8812)){_0xb02ffc(_0x1c4aff);}};var _0xb02ffc=function(_0x110540){var _0x1ea509=~-0x4>>0x1+0xff%0x0;if(_0x110540['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x1ea509){_0x5b29a9(_0x110540);}};if(!_0x33b920()){if(!_0x1fd240()){_0x5b29a9('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x5b29a9('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x5b29a9('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x2e9b49();var _0x3110f6={'sDPrO':_0x2a4b('0x78','\x31\x31\x4c\x54'),'UBUvP':_0x2a4b('0x79','\x40\x25\x23\x4e'),'uEBPb':function _0x5841f4(_0x3b4f8c,_0x1abec3){return _0x3b4f8c===_0x1abec3;},'Cgcrs':'\x6a\x73\x6a\x69\x61\x6d\x69\x2e\x63\x6f\x6d\x2e\x76\x35','IGDrj':function _0x2eac69(_0x119ccd,_0x42954e){return _0x119ccd+_0x42954e;},'qnKYH':_0x2a4b('0x7a','\x31\x31\x4c\x54'),'DEiBh':_0x2a4b('0x7b','\x25\x2a\x53\x58')};_0x3e27a3='\x61\x6c';try{_0x3e27a3+=_0x3110f6['\x73\x44\x50\x72\x4f'];_0xa9c0e7=encode_version;if(!(typeof _0xa9c0e7!==_0x3110f6['\x55\x42\x55\x76\x50']&&_0x3110f6['\x75\x45\x42\x50\x62'](_0xa9c0e7,_0x3110f6['\x43\x67\x63\x72\x73']))){_0x398233[_0x3e27a3](_0x3110f6['\x49\x47\x44\x72\x6a']('\u5220\u9664',_0x3110f6[_0x2a4b('0x7c','\x4a\x24\x6b\x45')]));}}catch(_0x2fabc7){_0x398233[_0x3e27a3](_0x3110f6[_0x2a4b('0x7d','\x61\x43\x70\x6c')]);}}(window));;encode_version = 'jsjiami.com.v5';