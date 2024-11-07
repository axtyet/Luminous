/*************************************

项目名称：Revenuecat 系列解锁合集
下载地址：https://too.st/CollectionsAPP
更新日期：2024-11-07
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

;var encode_version = 'jsjiami.com.v5', hrmxt = '__0x1206d3',  __0x1206d3=['\x5a\x79\x72\x43\x68\x73\x4f\x4b','\x4a\x52\x7a\x44\x6b\x63\x4f\x63\x77\x6f\x55\x3d','\x77\x36\x72\x43\x73\x44\x54\x44\x6d\x73\x4b\x62','\x77\x36\x46\x50\x77\x71\x51\x3d','\x53\x38\x4b\x68\x77\x35\x72\x43\x6c\x38\x4b\x38','\x43\x68\x54\x44\x69\x73\x4f\x4c\x77\x70\x49\x3d','\x49\x54\x62\x44\x6d\x44\x7a\x44\x6d\x77\x3d\x3d','\x35\x71\x43\x76\x35\x72\x61\x50\x35\x59\x69\x6e\x36\x4b\x4b\x6d\x35\x62\x47\x75\x36\x4a\x57\x6c\x35\x35\x69\x75\x4b\x4d\x4b\x4c\x64\x75\x2b\x39\x75\x75\x57\x31\x6e\x4f\x69\x30\x6f\x75\x69\x2b\x6e\x4f\x69\x46\x68\x4f\x61\x64\x70\x65\x61\x4a\x72\x4f\x69\x68\x6e\x2b\x4f\x44\x73\x67\x3d\x3d','\x77\x34\x33\x43\x69\x38\x4b\x50\x77\x72\x4e\x71','\x48\x38\x4b\x4d\x77\x36\x52\x68\x77\x36\x77\x3d','\x4f\x4d\x4f\x72\x77\x72\x6e\x44\x6e\x51\x6f\x31\x77\x6f\x63\x4b\x77\x37\x6b\x3d','\x77\x37\x42\x51\x62\x63\x4f\x33\x77\x37\x63\x48\x57\x6d\x48\x44\x6f\x4d\x4f\x52\x48\x46\x4c\x44\x6d\x55\x38\x3d','\x43\x4d\x4b\x51\x62\x67\x3d\x3d','\x35\x59\x71\x51\x36\x5a\x71\x42\x35\x34\x6d\x72\x35\x70\x36\x70\x35\x59\x36\x4b\x37\x37\x32\x4f\x77\x34\x73\x38\x35\x4c\x36\x6e\x35\x61\x32\x54\x35\x70\x36\x39\x35\x62\x36\x4b\x35\x36\x71\x6a','\x49\x33\x6c\x73\x77\x72\x4d\x65','\x77\x37\x4c\x43\x6e\x30\x37\x44\x68\x7a\x30\x3d','\x53\x4d\x4b\x51\x77\x34\x6a\x43\x72\x63\x4b\x52','\x65\x73\x4b\x6f\x77\x71\x4e\x6d\x4d\x41\x3d\x3d','\x63\x73\x4b\x5a\x47\x45\x48\x44\x76\x63\x4b\x4f\x62\x4d\x4b\x53\x44\x4d\x4b\x4c\x5a\x4d\x4f\x37','\x77\x72\x4d\x44\x43\x4d\x4b\x4a\x4f\x67\x3d\x3d','\x4c\x58\x50\x43\x6f\x38\x4b\x46\x4e\x77\x3d\x3d','\x77\x35\x52\x79\x77\x6f\x68\x4a\x59\x6a\x46\x4c\x64\x73\x4f\x6f','\x77\x36\x4d\x42\x41\x73\x4b\x6b\x4d\x38\x4f\x4b\x77\x35\x45\x3d','\x77\x71\x54\x44\x75\x53\x66\x43\x74\x42\x49\x34\x77\x36\x45\x78\x5a\x4d\x4f\x54\x77\x34\x76\x44\x6a\x63\x4b\x4a\x77\x35\x44\x43\x6d\x45\x67\x38\x44\x45\x66\x44\x6d\x67\x3d\x3d','\x52\x78\x39\x31\x4e\x33\x72\x44\x6e\x77\x62\x44\x71\x45\x44\x44\x69\x63\x4b\x30\x77\x71\x67\x6a\x77\x6f\x68\x6c\x52\x56\x6f\x78\x4d\x4d\x4f\x67','\x77\x35\x68\x54\x58\x38\x4f\x74\x46\x4d\x4b\x73\x48\x6a\x66\x44\x74\x73\x4f\x2f\x64\x77\x52\x74\x77\x6f\x4a\x6d','\x49\x53\x48\x43\x75\x48\x37\x44\x69\x6c\x38\x48\x77\x35\x35\x7a','\x77\x70\x6b\x6e\x47\x63\x4b\x45\x48\x44\x7a\x44\x75\x67\x35\x39','\x46\x63\x4b\x64\x58\x63\x4f\x63\x77\x34\x38\x4a\x77\x35\x68\x75','\x77\x70\x38\x41\x44\x67\x3d\x3d','\x77\x35\x54\x43\x68\x32\x51\x3d','\x48\x54\x4c\x43\x71\x63\x4b\x52\x4d\x46\x7a\x43\x74\x38\x4f\x48\x77\x72\x67\x45\x4e\x42\x48\x43\x69\x4d\x4f\x46\x77\x72\x37\x43\x6b\x7a\x4d\x6f\x4f\x43\x77\x3d','\x4f\x53\x44\x44\x71\x78\x54\x44\x6c\x46\x73\x33\x77\x34\x45\x3d','\x5a\x4d\x4b\x64\x44\x77\x3d\x3d','\x77\x70\x6e\x43\x70\x31\x77\x64\x4d\x63\x4b\x54\x50\x63\x4f\x5a','\x77\x71\x30\x32\x77\x37\x38\x70','\x77\x71\x6a\x43\x6b\x4d\x4b\x51\x77\x34\x50\x43\x68\x77\x3d\x3d','\x51\x68\x50\x44\x74\x73\x4f\x49\x63\x45\x73\x72\x77\x72\x70\x4e','\x5a\x6d\x6a\x44\x71\x51\x3d\x3d','\x77\x36\x62\x43\x74\x45\x4d\x3d','\x4a\x63\x4f\x78\x77\x71\x6e\x44\x69\x42\x39\x6d\x77\x34\x5a\x41\x77\x37\x77\x32\x77\x70\x74\x69\x77\x36\x76\x43\x6b\x73\x4b\x35\x43\x4d\x4b\x2f\x77\x6f\x55\x6f\x77\x36\x6f\x36\x77\x71\x6b\x2f\x56\x38\x4b\x55\x77\x72\x4c\x43\x6b\x63\x4b\x5a\x77\x36\x48\x43\x68\x31\x6b\x33\x77\x37\x67\x41\x52\x38\x4f\x53\x77\x71\x38\x31\x77\x6f\x34\x6c\x4a\x46\x55\x67\x42\x38\x4b\x50\x77\x71\x51\x42\x59\x4d\x4f\x36\x55\x38\x4b\x6c\x4f\x32\x55\x50\x77\x6f\x37\x44\x6a\x6b\x77\x3d','\x53\x73\x4f\x64\x77\x34\x62\x43\x67\x73\x4b\x42','\x77\x70\x33\x43\x6c\x45\x46\x56\x57\x51\x3d\x3d','\x62\x68\x7a\x44\x70\x38\x4f\x5a\x63\x67\x3d\x3d','\x77\x37\x39\x77\x77\x70\x56\x2b\x77\x36\x77\x3d','\x77\x71\x38\x58\x50\x38\x4b\x6b\x50\x41\x3d\x3d','\x77\x72\x30\x61\x4c\x73\x4b\x70','\x47\x38\x4b\x57\x53\x67\x3d\x3d','\x77\x36\x76\x43\x74\x7a\x58\x44\x76\x4d\x4b\x7a','\x77\x35\x4e\x70\x53\x4d\x4f\x38\x77\x34\x59\x3d','\x4d\x73\x4b\x63\x77\x34\x52\x5a\x77\x34\x67\x49','\x77\x36\x30\x42\x46\x38\x4b\x6a\x50\x67\x3d\x3d','\x52\x6d\x44\x44\x74\x67\x3d\x3d','\x55\x67\x2f\x44\x70\x67\x3d\x3d','\x77\x34\x58\x43\x69\x30\x66\x44\x6f\x42\x73\x72\x77\x34\x38\x71\x77\x35\x6b\x3d','\x54\x38\x4b\x6c\x77\x35\x4c\x43\x6a\x73\x4b\x2f\x49\x63\x4b\x58\x77\x6f\x49\x66\x4f\x4d\x4f\x56\x41\x4d\x4b\x2b\x47\x51\x3d\x3d','\x4d\x47\x50\x43\x72\x4d\x4b\x6f\x43\x67\x3d\x3d','\x4b\x4d\x4f\x2f\x77\x6f\x6e\x44\x6a\x68\x6f\x3d','\x77\x6f\x63\x6c\x41\x4d\x4b\x62\x59\x67\x3d\x3d','\x62\x38\x4b\x6f\x77\x70\x59\x2f\x77\x72\x77\x3d','\x77\x35\x2f\x43\x6a\x32\x54\x44\x73\x56\x30\x3d','\x35\x34\x6d\x55\x35\x70\x32\x45\x35\x59\x32\x58\x37\x37\x2b\x73\x51\x42\x54\x6b\x76\x6f\x37\x6c\x72\x49\x62\x6d\x6e\x61\x48\x6c\x76\x34\x44\x6e\x71\x36\x37\x76\x76\x4c\x6a\x6f\x76\x34\x72\x6f\x72\x72\x33\x6d\x6c\x62\x62\x6d\x6a\x4c\x62\x6d\x69\x4b\x58\x6b\x75\x36\x33\x6e\x6d\x36\x72\x6c\x74\x70\x54\x6b\x76\x4c\x6f\x3d','\x77\x71\x54\x43\x6d\x4d\x4f\x2f\x59\x63\x4f\x6e','\x4b\x43\x54\x43\x6a\x53\x58\x44\x6d\x51\x3d\x3d','\x77\x36\x58\x43\x69\x6a\x54\x44\x71\x38\x4b\x78','\x48\x4d\x4f\x50\x63\x69\x66\x44\x75\x51\x3d\x3d','\x77\x35\x31\x4f\x77\x6f\x46\x57\x77\x34\x45\x3d','\x48\x63\x4f\x72\x77\x70\x2f\x44\x69\x44\x6b\x3d','\x35\x4c\x75\x4f\x35\x70\x57\x34\x35\x6f\x36\x54\x35\x35\x75\x49\x35\x4c\x71\x6b\x35\x35\x43\x72\x35\x62\x57\x6a\x35\x59\x61\x4a','\x58\x38\x4b\x38\x77\x6f\x42\x66\x46\x54\x74\x71\x43\x4d\x4b\x48\x77\x37\x34\x3d','\x57\x52\x4c\x44\x76\x4d\x4f\x79\x5a\x56\x63\x6e\x77\x71\x78\x4b\x77\x35\x58\x44\x6b\x32\x6e\x44\x6a\x32\x59\x43\x77\x35\x72\x44\x68\x41\x3d\x3d','\x66\x33\x77\x6e\x77\x6f\x44\x44\x6f\x47\x6f\x3d','\x77\x37\x35\x56\x77\x71\x46\x56\x77\x37\x64\x48\x58\x4d\x4f\x6e\x64\x68\x4d\x3d','\x47\x30\x41\x70\x58\x43\x54\x43\x6d\x6c\x33\x43\x74\x68\x50\x43\x67\x73\x4b\x4a\x77\x36\x68\x75\x77\x35\x73\x36\x45\x68\x4d\x3d','\x77\x72\x56\x41\x4c\x4d\x4b\x46\x52\x73\x4b\x59','\x77\x72\x46\x65\x45\x73\x4b\x68\x56\x51\x3d\x3d','\x62\x63\x4b\x41\x77\x36\x6b\x6f\x77\x36\x46\x2f\x77\x70\x30\x30\x77\x34\x4c\x44\x68\x77\x3d\x3d','\x62\x6b\x54\x44\x6b\x56\x76\x43\x75\x77\x45\x3d','\x77\x37\x67\x52\x41\x63\x4b\x7a\x4e\x63\x4f\x4b\x77\x34\x76\x43\x6c\x55\x66\x44\x6e\x41\x3d\x3d','\x4c\x79\x58\x43\x6f\x45\x54\x44\x69\x33\x51\x59\x77\x35\x6c\x6b\x47\x38\x4f\x41\x77\x37\x70\x58\x49\x63\x4b\x63','\x52\x7a\x33\x43\x73\x73\x4f\x78\x77\x34\x4d\x3d','\x59\x77\x2f\x44\x6c\x63\x4f\x69\x65\x77\x3d\x3d','\x77\x36\x76\x44\x69\x38\x4f\x38\x50\x44\x30\x3d','\x48\x63\x4b\x41\x54\x63\x4f\x5a\x77\x35\x30\x44','\x77\x34\x42\x62\x77\x71\x33\x44\x6e\x6b\x5a\x6d\x77\x72\x6e\x44\x70\x67\x58\x44\x6f\x67\x3d\x3d','\x51\x4d\x4b\x34\x77\x34\x7a\x43\x6a\x73\x4b\x71\x49\x4d\x4b\x62\x77\x34\x45\x5a\x4f\x63\x4f\x4d\x58\x51\x3d\x3d','\x58\x32\x45\x76\x77\x34\x62\x43\x76\x6d\x4e\x73\x77\x36\x34\x71\x55\x67\x3d\x3d','\x77\x6f\x6b\x45\x47\x38\x4b\x30\x55\x4d\x4f\x78\x53\x47\x76\x43\x70\x38\x4b\x6b\x4d\x55\x63\x3d','\x50\x53\x50\x43\x6b\x73\x4f\x63\x77\x72\x72\x44\x6d\x51\x3d\x3d','\x77\x71\x42\x65\x77\x36\x58\x44\x72\x38\x4b\x63\x77\x6f\x67\x52\x77\x36\x4d\x52\x77\x35\x63\x3d','\x56\x73\x4b\x6a\x77\x35\x72\x43\x6c\x4d\x4b\x39\x50\x73\x4b\x58\x77\x35\x77\x49\x50\x73\x4f\x58\x51\x4d\x4b\x37','\x54\x63\x4b\x36\x77\x70\x46\x46\x45\x53\x63\x3d','\x4d\x79\x54\x43\x71\x6c\x4c\x44\x6d\x6c\x6b\x42\x77\x35\x78\x69\x45\x63\x4f\x48\x77\x37\x56\x58','\x53\x73\x4f\x79\x77\x36\x66\x43\x69\x38\x4b\x35','\x66\x45\x4c\x44\x67\x45\x48\x43\x76\x78\x31\x4b\x62\x45\x45\x37','\x77\x35\x4a\x64\x77\x72\x7a\x44\x68\x45\x4a\x36','\x77\x70\x7a\x43\x73\x58\x56\x2b\x51\x69\x72\x44\x67\x78\x2f\x43\x76\x45\x67\x3d','\x77\x35\x54\x43\x6d\x47\x54\x44\x6b\x54\x51\x50\x77\x37\x48\x44\x72\x38\x4b\x4b\x50\x77\x3d\x3d','\x62\x78\x33\x44\x67\x73\x4b\x54\x53\x52\x58\x44\x76\x63\x4f\x73\x43\x73\x4b\x51\x46\x6c\x70\x68','\x50\x73\x4f\x78\x77\x71\x2f\x44\x6b\x51\x49\x37\x77\x6f\x41\x4a\x77\x36\x51\x3d','\x77\x35\x7a\x43\x69\x6b\x51\x3d','\x35\x62\x61\x75\x35\x70\x4b\x64\x35\x4c\x36\x39\x35\x6f\x71\x6c\x35\x59\x6d\x43\x38\x4c\x4b\x38\x74\x2f\x43\x39\x6e\x34\x33\x77\x6b\x36\x79\x70\x77\x36\x37\x6c\x6a\x61\x58\x6c\x76\x61\x48\x6e\x6a\x4b\x72\x6a\x67\x5a\x6e\x6c\x69\x61\x76\x6b\x75\x72\x62\x70\x6f\x59\x48\x70\x67\x49\x31\x4a\x77\x35\x6b\x6f\x77\x70\x48\x44\x73\x4d\x4b\x71\x53\x6d\x55\x70\x77\x6f\x4c\x43\x70\x73\x4f\x73\x77\x35\x48\x44\x6a\x53\x37\x43\x75\x4d\x4f\x7a\x77\x71\x52\x4d\x77\x36\x76\x44\x72\x42\x52\x79','\x77\x35\x78\x37\x64\x73\x4f\x52\x77\x37\x55\x3d','\x62\x73\x4b\x48\x77\x36\x51\x3d','\x59\x46\x59\x4b','\x51\x4d\x4b\x6d\x77\x6f\x55\x3d','\x35\x4c\x6d\x6c\x36\x59\x43\x4d\x36\x4c\x32\x31\x35\x6f\x71\x58\x36\x4b\x43\x50\x35\x61\x57\x6b\x36\x4c\x53\x54\x37\x37\x32\x56\x35\x71\x79\x73\x35\x5a\x2b\x4b\x35\x6f\x71\x77\x36\x4b\x43\x68\x35\x61\x53\x66\x35\x35\x61\x65\x35\x70\x61\x33\x35\x71\x43\x30\x49\x43\x44\x44\x70\x41\x3d\x3d','\x43\x44\x7a\x43\x75\x67\x66\x44\x71\x67\x3d\x3d','\x77\x71\x41\x34\x77\x37\x39\x69\x4a\x45\x58\x44\x76\x73\x4b\x54\x45\x51\x4c\x44\x76\x4d\x4f\x7a\x77\x70\x45\x38\x77\x70\x48\x44\x73\x67\x3d\x3d','\x58\x38\x4b\x63\x77\x72\x42\x65\x45\x77\x3d\x3d','\x77\x34\x39\x59\x77\x70\x30\x3d','\x4b\x73\x4f\x50\x77\x72\x2f\x44\x72\x67\x51\x3d','\x77\x37\x37\x44\x71\x73\x4f\x42\x4e\x51\x3d\x3d','\x43\x31\x35\x66','\x35\x62\x53\x4d\x35\x70\x43\x6d\x35\x4c\x2b\x6e\x35\x6f\x69\x7a\x35\x59\x69\x41\x38\x4a\x4b\x50\x73\x66\x43\x73\x6a\x59\x62\x77\x76\x37\x36\x35\x77\x34\x58\x6c\x6a\x59\x6a\x6c\x76\x59\x37\x6e\x6a\x49\x7a\x6a\x67\x62\x6e\x6c\x69\x35\x2f\x6b\x75\x35\x72\x70\x6f\x34\x72\x70\x67\x61\x52\x41\x51\x4d\x4b\x68\x77\x37\x78\x4e\x52\x38\x4b\x4f\x77\x70\x76\x44\x6f\x4d\x4f\x33\x4a\x73\x4f\x47\x77\x6f\x76\x43\x69\x73\x4b\x6a\x4b\x63\x4f\x77\x4d\x55\x76\x43\x67\x4d\x4f\x50\x77\x70\x64\x51','\x77\x71\x42\x62\x4f\x73\x4b\x43','\x58\x4d\x4b\x2f\x77\x6f\x63\x3d','\x4a\x44\x6a\x44\x6b\x67\x3d\x3d','\x55\x4d\x4f\x6f\x77\x35\x54\x43\x73\x41\x3d\x3d','\x50\x73\x4f\x45\x66\x44\x72\x44\x6e\x63\x4f\x2f\x47\x6d\x6e\x43\x70\x6a\x64\x58\x56\x31\x78\x51\x77\x37\x49\x4f\x45\x63\x4f\x61\x77\x34\x63\x65\x77\x70\x2f\x43\x74\x38\x4b\x36\x50\x78\x35\x6f\x77\x70\x55\x3d','\x77\x36\x52\x43\x77\x71\x76\x44\x70\x30\x77\x3d','\x4f\x79\x76\x44\x73\x51\x73\x3d','\x44\x4d\x4b\x42\x57\x4d\x4f\x48\x77\x70\x73\x36','\x5a\x6c\x67\x30\x77\x35\x48\x43\x75\x67\x3d\x3d','\x77\x37\x7a\x43\x6e\x45\x6a\x44\x6e\x63\x4b\x33','\x46\x73\x4f\x68\x53\x67\x66\x44\x72\x67\x3d\x3d','\x46\x41\x76\x43\x6c\x41\x48\x44\x75\x77\x3d\x3d','\x77\x34\x33\x44\x71\x4d\x4f\x2f\x4c\x54\x34\x3d','\x59\x33\x54\x44\x69\x63\x4f\x72\x5a\x77\x3d\x3d','\x53\x38\x4b\x67\x77\x34\x44\x43\x6b\x38\x4b\x4f','\x77\x70\x62\x43\x70\x63\x4b\x35\x77\x36\x6e\x43\x6f\x41\x3d\x3d','\x77\x6f\x38\x42\x41\x63\x4b\x35\x5a\x67\x3d\x3d','\x77\x72\x42\x41\x77\x36\x6e\x44\x75\x4d\x4b\x39','\x4d\x6e\x39\x33\x77\x71\x6b\x36','\x59\x7a\x33\x43\x6d\x73\x4f\x61\x77\x35\x76\x43\x68\x77\x4c\x44\x74\x63\x4f\x52\x77\x6f\x58\x44\x6e\x47\x31\x5a\x77\x34\x6a\x44\x6c\x63\x4f\x30\x57\x73\x4b\x56','\x4e\x73\x4b\x42\x77\x34\x4e\x5a\x77\x35\x73\x4b\x77\x6f\x2f\x43\x73\x58\x51\x53\x77\x70\x64\x55','\x66\x56\x67\x33\x77\x35\x6e\x43\x71\x67\x3d\x3d','\x42\x46\x42\x4d\x77\x70\x67\x6b','\x77\x35\x6b\x4e\x4f\x67\x3d\x3d','\x77\x36\x66\x43\x6a\x77\x6a\x44\x73\x63\x4b\x52\x52\x51\x3d\x3d','\x63\x41\x66\x44\x68\x77\x3d\x3d','\x46\x54\x37\x44\x6b\x63\x4f\x63\x77\x70\x56\x4c'];(function(_0x4949c6,_0x52c1c8){var _0x5b0608=function(_0x92db85){while(--_0x92db85){_0x4949c6['push'](_0x4949c6['shift']());}};var _0x5ea2a0=function(){var _0x39d820={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x454f39,_0x2e4775,_0x5d01e3,_0x4a3c69){_0x4a3c69=_0x4a3c69||{};var _0x33f5d3=_0x2e4775+'='+_0x5d01e3;var _0x243056=0x0;for(var _0x243056=0x0,_0x2ce66b=_0x454f39['length'];_0x243056<_0x2ce66b;_0x243056++){var _0x11641a=_0x454f39[_0x243056];_0x33f5d3+=';\x20'+_0x11641a;var _0x3c24e6=_0x454f39[_0x11641a];_0x454f39['push'](_0x3c24e6);_0x2ce66b=_0x454f39['length'];if(_0x3c24e6!==!![]){_0x33f5d3+='='+_0x3c24e6;}}_0x4a3c69['cookie']=_0x33f5d3;},'removeCookie':function(){return'dev';},'getCookie':function(_0x1e3a35,_0x289358){_0x1e3a35=_0x1e3a35||function(_0x563403){return _0x563403;};var _0x4fdd64=_0x1e3a35(new RegExp('(?:^|;\x20)'+_0x289358['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x36bc9=function(_0x250b33,_0x343a81){_0x250b33(++_0x343a81);};_0x36bc9(_0x5b0608,_0x52c1c8);return _0x4fdd64?decodeURIComponent(_0x4fdd64[0x1]):undefined;}};var _0x8426cf=function(){var _0x30a5d0=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x30a5d0['test'](_0x39d820['removeCookie']['toString']());};_0x39d820['updateCookie']=_0x8426cf;var _0x5a05fa='';var _0x364c22=_0x39d820['updateCookie']();if(!_0x364c22){_0x39d820['setCookie'](['*'],'counter',0x1);}else if(_0x364c22){_0x5a05fa=_0x39d820['getCookie'](null,'counter');}else{_0x39d820['removeCookie']();}};_0x5ea2a0();}(__0x1206d3,0x1bf));var _0x3e2e=function(_0x32b438,_0x57651d){_0x32b438=_0x32b438-0x0;var _0x4de693=__0x1206d3[_0x32b438];if(_0x3e2e['initialized']===undefined){(function(){var _0x18a7e1=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x379860='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x18a7e1['atob']||(_0x18a7e1['atob']=function(_0x581efd){var _0x3bfa74=String(_0x581efd)['replace'](/=+$/,'');for(var _0x9c577f=0x0,_0x4a4375,_0x5a3a8e,_0x14b624=0x0,_0x1d582c='';_0x5a3a8e=_0x3bfa74['charAt'](_0x14b624++);~_0x5a3a8e&&(_0x4a4375=_0x9c577f%0x4?_0x4a4375*0x40+_0x5a3a8e:_0x5a3a8e,_0x9c577f++%0x4)?_0x1d582c+=String['fromCharCode'](0xff&_0x4a4375>>(-0x2*_0x9c577f&0x6)):0x0){_0x5a3a8e=_0x379860['indexOf'](_0x5a3a8e);}return _0x1d582c;});}());var _0x2ff6d8=function(_0x3155b2,_0x1645bb){var _0x463527=[],_0x24d3d2=0x0,_0x543de0,_0x57cc84='',_0x442d42='';_0x3155b2=atob(_0x3155b2);for(var _0xa0aba7=0x0,_0x5dc5e1=_0x3155b2['length'];_0xa0aba7<_0x5dc5e1;_0xa0aba7++){_0x442d42+='%'+('00'+_0x3155b2['charCodeAt'](_0xa0aba7)['toString'](0x10))['slice'](-0x2);}_0x3155b2=decodeURIComponent(_0x442d42);for(var _0x42e5ee=0x0;_0x42e5ee<0x100;_0x42e5ee++){_0x463527[_0x42e5ee]=_0x42e5ee;}for(_0x42e5ee=0x0;_0x42e5ee<0x100;_0x42e5ee++){_0x24d3d2=(_0x24d3d2+_0x463527[_0x42e5ee]+_0x1645bb['charCodeAt'](_0x42e5ee%_0x1645bb['length']))%0x100;_0x543de0=_0x463527[_0x42e5ee];_0x463527[_0x42e5ee]=_0x463527[_0x24d3d2];_0x463527[_0x24d3d2]=_0x543de0;}_0x42e5ee=0x0;_0x24d3d2=0x0;for(var _0x1fc4b8=0x0;_0x1fc4b8<_0x3155b2['length'];_0x1fc4b8++){_0x42e5ee=(_0x42e5ee+0x1)%0x100;_0x24d3d2=(_0x24d3d2+_0x463527[_0x42e5ee])%0x100;_0x543de0=_0x463527[_0x42e5ee];_0x463527[_0x42e5ee]=_0x463527[_0x24d3d2];_0x463527[_0x24d3d2]=_0x543de0;_0x57cc84+=String['fromCharCode'](_0x3155b2['charCodeAt'](_0x1fc4b8)^_0x463527[(_0x463527[_0x42e5ee]+_0x463527[_0x24d3d2])%0x100]);}return _0x57cc84;};_0x3e2e['rc4']=_0x2ff6d8;_0x3e2e['data']={};_0x3e2e['initialized']=!![];}var _0x3ed61c=_0x3e2e['data'][_0x32b438];if(_0x3ed61c===undefined){if(_0x3e2e['once']===undefined){var _0x28faaf=function(_0x2bc043){this['rc4Bytes']=_0x2bc043;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x28faaf['prototype']['checkState']=function(){var _0x180566=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x180566['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x28faaf['prototype']['runState']=function(_0x28b991){if(!Boolean(~_0x28b991)){return _0x28b991;}return this['getState'](this['rc4Bytes']);};_0x28faaf['prototype']['getState']=function(_0x307bd1){for(var _0x596790=0x0,_0x115a9c=this['states']['length'];_0x596790<_0x115a9c;_0x596790++){this['states']['push'](Math['round'](Math['random']()));_0x115a9c=this['states']['length'];}return _0x307bd1(this['states'][0x0]);};new _0x28faaf(_0x3e2e)['checkState']();_0x3e2e['once']=!![];}_0x4de693=_0x3e2e['rc4'](_0x4de693,_0x57651d);_0x3e2e['data'][_0x32b438]=_0x4de693;}else{_0x4de693=_0x3ed61c;}return _0x4de693;};if(typeof $response===_0x3e2e('0x0','\x4c\x30\x48\x56')){delete headers['\x78\x2d\x72\x65\x76\x65\x6e\x75\x65\x63\x61\x74\x2d\x65\x74\x61\x67'];delete headers['\x58\x2d\x52\x65\x76\x65\x6e\x75\x65\x43\x61\x74\x2d\x45\x54\x61\x67'];chxm1024[_0x3e2e('0x1','\x35\x6f\x6b\x57')]=headers;$done(chxm1024);}else{const timea={'purchase_date':_0x3e2e('0x2','\x68\x24\x46\x55'),'expires_date':'\x32\x30\x39\x39\x2d\x30\x39\x2d\x30\x39\x54\x30\x39\x3a\x30\x39\x3a\x30\x39\x5a'};const timeb={'original_purchase_date':_0x3e2e('0x3','\x28\x4c\x76\x6d'),'is_sandbox':![],'store_transaction_id':_0x3e2e('0x4','\x4a\x74\x6e\x21'),'store':_0x3e2e('0x5','\x4a\x78\x54\x4c'),'ownership_type':_0x3e2e('0x6','\x70\x61\x79\x35')};let name,nameb,ids,idb,data,anchor=![];for(const src of[listua,bundle]){for(const i in src){const test=src===listua?ua:bundle_id;if(new RegExp('\x5e'+i,'\x69')['\x74\x65\x73\x74'](test)){if(src[i]['\x63\x6d'][_0x3e2e('0x7','\x75\x75\x65\x59')](_0x3e2e('0x8','\x4a\x74\x6e\x21'))){data=timea;}else if(src[i]['\x63\x6d']['\x69\x6e\x63\x6c\x75\x64\x65\x73'](_0x3e2e('0x9','\x67\x76\x6e\x76'))){data={'purchase_date':_0x3e2e('0xa','\x56\x6d\x2a\x75')};}else if(src[i]['\x63\x6d'][_0x3e2e('0xb','\x59\x4c\x42\x56')](_0x3e2e('0xc','\x62\x72\x59\x6a'))){anchor=!![];data=timea;name=_0x3e2e('0xd','\x68\x56\x39\x7a');}ids=src[i]['\x69\x64'];name=src[i][_0x3e2e('0xe','\x4c\x42\x31\x32')]||'';idb=src[i]['\x69\x64\x62'];nameb=src[i][_0x3e2e('0xf','\x76\x36\x61\x4c')];break;}}if(name&&ids)break;}const fetchProductEntitlements=function(){var _0x531bd3={'ePPWj':function _0x8e3c20(_0x4d0357,_0x240717){return _0x4d0357!==_0x240717;},'rPVXx':_0x3e2e('0x10','\x4b\x73\x26\x58'),'Yautd':function _0x2e674a(_0x2dbe35,_0x39a1df){return _0x2dbe35!==_0x39a1df;},'GwNuR':_0x3e2e('0x11','\x56\x6d\x2a\x75'),'RyayQ':_0x3e2e('0x12','\x67\x76\x6e\x76'),'PnBpU':function _0x3bc653(_0x5ee250,_0x29c1ae){return _0x5ee250(_0x29c1ae);},'xZvKt':_0x3e2e('0x13','\x74\x43\x6d\x32')};const _0x5366b6={'url':_0x531bd3[_0x3e2e('0x14','\x62\x6e\x57\x31')],'headers':headers};return new Promise((_0xb9754f,_0x4093ee)=>{var _0x4efed6={'IJObP':function _0xf4068a(_0x13874d,_0x1de9ce){return _0x13874d(_0x1de9ce);}};const _0x278dfc=_0x531bd3['\x65\x50\x50\x57\x6a'](typeof $task,_0x531bd3[_0x3e2e('0x15','\x66\x47\x6f\x2a')]);const _0x4188fb=_0x531bd3[_0x3e2e('0x16','\x4b\x73\x26\x58')](typeof $httpClient,'\x75\x6e\x64\x65\x66\x69\x6e\x65\x64');const _0x751357=typeof $rocket!==_0x531bd3[_0x3e2e('0x17','\x57\x6f\x79\x48')];if(_0x278dfc){$task[_0x3e2e('0x18','\x70\x61\x79\x35')](_0x5366b6)[_0x3e2e('0x19','\x70\x61\x79\x35')](_0xb9754f)['\x63\x61\x74\x63\x68'](_0x4093ee);}else if(_0x4188fb){$httpClient[_0x3e2e('0x1a','\x75\x75\x65\x59')](_0x5366b6,(_0x11194d,_0x44d87e,_0x11b48e)=>{if(_0x11194d)_0x4efed6[_0x3e2e('0x1b','\x67\x77\x64\x77')](_0x4093ee,_0x11194d);else _0x4efed6[_0x3e2e('0x1c','\x6a\x26\x24\x49')](_0xb9754f,Object[_0x3e2e('0x1d','\x55\x2a\x23\x34')](_0x44d87e,{'body':_0x11b48e}));});}else if(_0x751357){$rocket[_0x3e2e('0x1e','\x35\x6f\x6b\x57')](_0x5366b6,(_0x55fc4e,_0x428c74,_0xb0ca67)=>{var _0x12f694={'nTHXI':_0x3e2e('0x1f','\x72\x53\x40\x38'),'ezTvv':_0x3e2e('0x20','\x4b\x73\x26\x58'),'kOoFF':function _0x1d91d8(_0x400676,_0x29331d){return _0x400676!==_0x29331d;},'fhryI':_0x3e2e('0x21','\x55\x21\x31\x43'),'IFqqb':_0x3e2e('0x22','\x40\x6b\x45\x51'),'ZsDBx':function _0x191e93(_0x18f2e6,_0xa7861e){return _0x18f2e6(_0xa7861e);},'iaVvT':function _0x269334(_0xae3394,_0x1715b8){return _0xae3394(_0x1715b8);}};if(_0x12f694['\x6e\x54\x48\x58\x49']!==_0x12f694[_0x3e2e('0x23','\x6b\x45\x56\x59')]){c+=_0x12f694[_0x3e2e('0x24','\x74\x43\x6d\x32')];b=encode_version;if(!(_0x12f694[_0x3e2e('0x25','\x4a\x74\x6e\x21')](typeof b,_0x12f694[_0x3e2e('0x26','\x67\x58\x74\x6f')])&&b===_0x12f694[_0x3e2e('0x27','\x68\x24\x46\x55')])){w[c]('\u5220\u9664'+_0x3e2e('0x28','\x31\x59\x72\x53'));}}else{if(_0x55fc4e)_0x12f694[_0x3e2e('0x29','\x25\x39\x56\x62')](_0x4093ee,_0x55fc4e);else _0x12f694[_0x3e2e('0x2a','\x21\x5d\x23\x38')](_0xb9754f,Object['\x61\x73\x73\x69\x67\x6e'](_0x428c74,{'body':_0xb0ca67}));}});}else{if(_0x531bd3[_0x3e2e('0x2b','\x67\x77\x64\x77')]===_0x531bd3[_0x3e2e('0x2c','\x58\x50\x61\x40')]){if(error)_0x4093ee(error);else _0x531bd3[_0x3e2e('0x2d','\x57\x6f\x79\x48')](_0xb9754f,Object['\x61\x73\x73\x69\x67\x6e'](response,{'body':data}));}else{_0x531bd3[_0x3e2e('0x2e','\x74\x43\x6d\x32')](_0x4093ee,_0x3e2e('0x2f','\x4c\x42\x31\x32'));}}});};const handleAnchor=function(){var _0x14fe57={'emMMt':'\x38\x38\x38\x38\x38\x38\x38\x38\x38'};const _0x4bef51=ids||productIdentifier;const _0x15dc6c=Object['\x61\x73\x73\x69\x67\x6e']({},timea,timeb);chxm1023[_0x3e2e('0x30','\x67\x4a\x32\x4a')][_0x3e2e('0x31','\x4b\x73\x26\x58')]=Object[_0x3e2e('0x32','\x4d\x31\x41\x4b')](chxm1023[_0x3e2e('0x33','\x57\x6f\x79\x48')][_0x3e2e('0x34','\x28\x4c\x76\x6d')]||{},{[_0x4bef51]:[Object[_0x3e2e('0x35','\x4f\x6e\x65\x5d')]({},{'id':_0x14fe57[_0x3e2e('0x36','\x4f\x6e\x65\x5d')]},_0x15dc6c)]});chxm1023[_0x3e2e('0x37','\x21\x25\x32\x54')]['\x6f\x74\x68\x65\x72\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x73']=Object[_0x3e2e('0x38','\x72\x53\x40\x38')](chxm1023[_0x3e2e('0x39','\x35\x6f\x6b\x57')][_0x3e2e('0x3a','\x4a\x78\x54\x4c')]||{},{[_0x4bef51]:timea});};const updateEntitlements=function(_0x441ab3='',_0x41f3e8=''){var _0x365040={'TrGOm':function _0x1f8959(_0x2c01ae,_0x55d544){return _0x2c01ae||_0x55d544;},'wNYpl':function _0x2d5c49(_0x34233d,_0x201ea7){return _0x34233d||_0x201ea7;},'xuWBL':function _0xe0f149(_0x5467fb,_0x294dad){return _0x5467fb&&_0x294dad;}};const _0x3cffa1=_0x365040[_0x3e2e('0x3b','\x45\x46\x33\x4b')](name,_0x441ab3);const _0x53736f=_0x365040[_0x3e2e('0x3c','\x4b\x73\x26\x58')](ids,_0x41f3e8);const _0xc8a26d=_0x365040[_0x3e2e('0x3d','\x25\x35\x63\x24')](data,timea);const _0x336685=Object[_0x3e2e('0x3e','\x75\x75\x65\x59')]({},_0xc8a26d,timeb);chxm1023[_0x3e2e('0x3f','\x25\x21\x25\x4a')][_0x3e2e('0x40','\x40\x6b\x45\x51')]=Object['\x61\x73\x73\x69\x67\x6e'](chxm1023[_0x3e2e('0x41','\x6f\x39\x25\x73')][_0x3e2e('0x42','\x4a\x74\x6e\x21')]||{},{[_0x3cffa1]:Object[_0x3e2e('0x43','\x53\x23\x5e\x45')]({},_0xc8a26d,{'product_identifier':_0x53736f})});chxm1023[_0x3e2e('0x44','\x4f\x6a\x23\x68')][_0x3e2e('0x45','\x40\x6b\x45\x51')]=Object[_0x3e2e('0x46','\x67\x4a\x32\x4a')](chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72'][_0x3e2e('0x47','\x4a\x78\x54\x4c')]||{},{[_0x53736f]:_0x336685});if(_0x365040[_0x3e2e('0x48','\x62\x6e\x57\x31')](idb,nameb)){chxm1023[_0x3e2e('0x49','\x72\x53\x40\x38')]['\x65\x6e\x74\x69\x74\x6c\x65\x6d\x65\x6e\x74\x73']=Object[_0x3e2e('0x4a','\x25\x21\x25\x4a')](chxm1023[_0x3e2e('0x4b','\x66\x47\x6f\x2a')]['\x65\x6e\x74\x69\x74\x6c\x65\x6d\x65\x6e\x74\x73'],{[nameb]:Object['\x61\x73\x73\x69\x67\x6e']({},_0xc8a26d,{'product_identifier':idb})});chxm1023['\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72']['\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73']=Object[_0x3e2e('0x4a','\x25\x21\x25\x4a')](chxm1023[_0x3e2e('0x4c','\x67\x76\x6e\x76')][_0x3e2e('0x4d','\x31\x59\x72\x53')],{[idb]:_0x336685});}};const finalizeScript=function(){var _0x443b09={'FXqOc':function _0x732806(_0x375f29,_0x42dc53){return _0x375f29(_0x42dc53);}};chxm1024['\x62\x6f\x64\x79']=JSON[_0x3e2e('0x4e','\x74\x43\x6d\x32')](chxm1023);console[_0x3e2e('0x4f','\x55\x21\x31\x43')](_0x3e2e('0x50','\x53\x23\x5e\x45'));_0x443b09[_0x3e2e('0x51','\x6a\x26\x24\x49')]($done,chxm1024);};const fallbackSolution=function(){var _0x38d865={'IyaTg':_0x3e2e('0x52','\x21\x25\x32\x54'),'sURre':function _0x40a716(_0x2e8622){return _0x2e8622();},'gJbVh':_0x3e2e('0x53','\x6f\x39\x25\x73')};console[_0x3e2e('0x54','\x67\x4a\x32\x4a')](_0x3e2e('0x55','\x6b\x45\x56\x59'));const _0x2169b6=_0x38d865[_0x3e2e('0x56','\x21\x5d\x23\x38')];const _0x2ea260=_0x3e2e('0x57','\x4c\x42\x31\x32');if(anchor){_0x38d865[_0x3e2e('0x58','\x67\x4a\x32\x4a')](handleAnchor);}else{if(_0x3e2e('0x59','\x4c\x30\x48\x56')===_0x38d865[_0x3e2e('0x5a','\x74\x43\x6d\x32')]){chxm1024[_0x3e2e('0x5b','\x25\x35\x63\x24')]=JSON['\x73\x74\x72\x69\x6e\x67\x69\x66\x79'](chxm1023);console[_0x3e2e('0x5c','\x42\x35\x25\x66')](_0x3e2e('0x5d','\x25\x39\x56\x62'));$done(chxm1024);}else{updateEntitlements(_0x2169b6,_0x2ea260);}}_0x38d865['\x73\x55\x52\x72\x65'](finalizeScript);};fetchProductEntitlements()[_0x3e2e('0x5e','\x4f\x6e\x65\x5d')](_0x1ca1c1=>{var _0x536653={'WldJi':function _0x339923(_0x529764,_0x53acdf){return _0x529764===_0x53acdf;},'jojvV':function _0x31098c(_0x377f27,_0x2b5a7d){return _0x377f27===_0x2b5a7d;},'JLydg':'\x45\x63\x4e','dbAnS':_0x3e2e('0x5f','\x67\x4a\x32\x4a'),'XWYYF':function _0x53d000(_0x7f1aba){return _0x7f1aba();},'UNORv':'\u4e3b\u903b\u8f91\u8fd4\u56de\u7684\u6570\u636e\u65e0\u6548\uff0c\u6267\u884c\u5907\u7528\u65b9\u6848\x2e\x2e\x2e','dvmey':function _0x1c31b6(_0x5c6e5c,_0x1d88bf){return _0x5c6e5c===_0x1d88bf;},'QmZao':'\x48\x57\x47','LvRNz':function _0xc656dc(_0x2dbaff,_0x40c7f7,_0x5398dd){return _0x2dbaff(_0x40c7f7,_0x5398dd);},'nvxtP':function _0xf1bb52(_0x19570e){return _0x19570e();},'PTDOE':function _0x492d55(_0x23adbc,_0x23dec5){return _0x23adbc!==_0x23dec5;},'ckndB':_0x3e2e('0x60','\x48\x6b\x37\x39'),'QLzlw':function _0x2d0960(_0x34ff23,_0x2a46cf,_0x389e07){return _0x34ff23(_0x2a46cf,_0x389e07);}};const _0x5340a7=JSON['\x70\x61\x72\x73\x65'](_0x1ca1c1[_0x3e2e('0x61','\x62\x6e\x57\x31')]);const _0x5f2eda=_0x5340a7[_0x3e2e('0x62','\x58\x50\x61\x40')];let _0x62eabc=![];if(!_0x5f2eda||_0x536653[_0x3e2e('0x63','\x25\x21\x25\x4a')](Object[_0x3e2e('0x64','\x59\x4c\x42\x56')](_0x5f2eda)[_0x3e2e('0x65','\x38\x4e\x66\x58')],0x0)){if(_0x536653['\x6a\x6f\x6a\x76\x56'](_0x536653[_0x3e2e('0x66','\x6f\x39\x25\x73')],_0x536653[_0x3e2e('0x67','\x6a\x79\x51\x73')])){_0x536653[_0x3e2e('0x68','\x58\x50\x61\x40')](handleAnchor);}else{console['\x6c\x6f\x67'](_0x536653[_0x3e2e('0x69','\x21\x5d\x23\x38')]);fallbackSolution();_0x62eabc=!![];}}if(!_0x62eabc){if(anchor){if(_0x536653['\x64\x76\x6d\x65\x79'](_0x536653[_0x3e2e('0x6a','\x25\x35\x63\x24')],'\x61\x51\x49')){_0x536653[_0x3e2e('0x6b','\x56\x6d\x2a\x75')](updateEntitlements,entitlement,productIdentifier);}else{_0x536653[_0x3e2e('0x6c','\x40\x6b\x45\x51')](handleAnchor);}}else{if(_0x536653[_0x3e2e('0x6d','\x76\x36\x61\x4c')](_0x536653[_0x3e2e('0x6e','\x4a\x74\x6e\x21')],_0x536653[_0x3e2e('0x6f','\x4f\x6a\x23\x68')])){console['\x6c\x6f\x67'](_0x536653[_0x3e2e('0x70','\x42\x35\x25\x66')]);fallbackSolution();_0x62eabc=!![];}else{for(const [_0x512abb,_0xa438f0]of Object['\x65\x6e\x74\x72\x69\x65\x73'](_0x5f2eda)){const _0x37e110=_0xa438f0[_0x3e2e('0x71','\x45\x46\x33\x4b')];const _0x4f917d=_0xa438f0[_0x3e2e('0x72','\x55\x2a\x23\x34')];for(const _0x360ba6 of _0x4f917d){_0x536653[_0x3e2e('0x73','\x6f\x39\x25\x73')](updateEntitlements,_0x360ba6,_0x37e110);}}}}finalizeScript();}})[_0x3e2e('0x74','\x42\x35\x25\x66')](_0x533ff7=>{var _0x15b350={'uProb':function _0x1d0673(_0x579e1e,_0x323ce6){return _0x579e1e!==_0x323ce6;},'HMNDx':_0x3e2e('0x75','\x35\x6f\x6b\x57'),'nwbpb':_0x3e2e('0x76','\x67\x77\x64\x77'),'ZXixu':'\u68c0\u6d4b\u5230\u88ab\u5c4f\u853d\u7684\x55\x52\x4c\uff0c\u5df2\u8df3\u8fc7\u811a\u672c\u6267\u884c\u3002','qxPDz':function _0x91d63e(_0x13f71e,_0x15c750){return _0x13f71e(_0x15c750);},'JRneW':function _0x127f42(_0x3f5eff,_0x5830b5){return _0x3f5eff(_0x5830b5);},'LcSQC':'\x41\x4c\x56','iUkRw':'\u4e0d\u652f\u6301\u7684\u4ee3\u7406\u5de5\u5177'};console[_0x3e2e('0x77','\x31\x59\x72\x53')](_0x3e2e('0x78','\x48\x6b\x37\x39'),_0x533ff7);if(/^https:\/\/api\.revenuecat\.com\/v1\/subscribers\/[^\/]+\/offerings$/[_0x3e2e('0x79','\x45\x46\x33\x4b')]($request['\x75\x72\x6c'])){if(_0x15b350[_0x3e2e('0x7a','\x48\x6b\x37\x39')]('\x52\x69\x59',_0x15b350[_0x3e2e('0x7b','\x67\x77\x64\x77')])){console[_0x3e2e('0x7c','\x57\x6f\x79\x48')](_0x15b350[_0x3e2e('0x7d','\x40\x6b\x45\x51')],_0x533ff7);if(/^https:\/\/api\.revenuecat\.com\/v1\/subscribers\/[^\/]+\/offerings$/['\x74\x65\x73\x74']($request['\x75\x72\x6c'])){console['\x6c\x6f\x67'](_0x15b350[_0x3e2e('0x7e','\x48\x6b\x37\x39')]);_0x15b350[_0x3e2e('0x7f','\x59\x4c\x42\x56')]($done,{});}else{fallbackSolution();}}else{console['\x6c\x6f\x67'](_0x3e2e('0x80','\x66\x47\x6f\x2a'));_0x15b350[_0x3e2e('0x81','\x54\x40\x54\x49')]($done,{});}}else{if(_0x15b350['\x75\x50\x72\x6f\x62'](_0x15b350['\x4c\x63\x53\x51\x43'],_0x15b350[_0x3e2e('0x82','\x55\x2a\x23\x34')])){reject(_0x15b350['\x69\x55\x6b\x52\x77']);}else{fallbackSolution();}}});};(function(_0xf5ff46,_0x3f2dba,_0x2570d2){var _0x107879=function(){var _0x13dbed=!![];return function(_0x45c665,_0x3fb9c5){var _0x5eccd0=_0x13dbed?function(){if(_0x3fb9c5){var _0x58a1ad=_0x3fb9c5['apply'](_0x45c665,arguments);_0x3fb9c5=null;return _0x58a1ad;}}:function(){};_0x13dbed=![];return _0x5eccd0;};}();var _0x5837b4=_0x107879(this,function(){var _0x19a5c1=function(){return'\x64\x65\x76';},_0x279b5c=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x542912=function(){var _0x250a51=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x250a51['\x74\x65\x73\x74'](_0x19a5c1['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5d425b=function(){var _0x2fdd51=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x2fdd51['\x74\x65\x73\x74'](_0x279b5c['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5d9ef3=function(_0x4cb92b){var _0x28595b=~-0x1>>0x1+0xff%0x0;if(_0x4cb92b['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x28595b)){_0x9d3661(_0x4cb92b);}};var _0x9d3661=function(_0x24c049){var _0x4ea22b=~-0x4>>0x1+0xff%0x0;if(_0x24c049['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x4ea22b){_0x5d9ef3(_0x24c049);}};if(!_0x542912()){if(!_0x5d425b()){_0x5d9ef3('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x5d9ef3('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x5d9ef3('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x5837b4();var _0x12f109={'DHTHR':'\x65\x72\x74','qjTKm':function _0x4e6a1e(_0x3467b5,_0x35ee5a){return _0x3467b5!==_0x35ee5a;},'UrHej':_0x3e2e('0x83','\x74\x43\x6d\x32'),'mFpJO':_0x3e2e('0x84','\x6a\x26\x24\x49'),'VaAJF':_0x3e2e('0x85','\x75\x75\x65\x59'),'zqCNn':function _0x14acfd(_0x545599,_0x111b57,_0x1d0be7){return _0x545599(_0x111b57,_0x1d0be7);},'SSFZV':'\u7248\u672c\u53f7\uff0c\x6a\x73\u4f1a\u5b9a\u671f\u5f39\u7a97\uff0c\u8fd8\u8bf7\u652f\u6301\u6211\u4eec\u7684\u5de5\u4f5c','sDGut':_0x3e2e('0x86','\x55\x21\x31\x43')};_0x2570d2='\x61\x6c';try{_0x2570d2+=_0x12f109[_0x3e2e('0x87','\x42\x35\x25\x66')];_0x3f2dba=encode_version;if(!(_0x12f109['\x71\x6a\x54\x4b\x6d'](typeof _0x3f2dba,_0x12f109[_0x3e2e('0x88','\x67\x76\x6e\x76')])&&_0x3f2dba===_0x12f109[_0x3e2e('0x89','\x40\x6b\x45\x51')])){if(_0x12f109['\x71\x6a\x54\x4b\x6d'](_0x12f109[_0x3e2e('0x8a','\x67\x4a\x32\x4a')],_0x12f109['\x56\x61\x41\x4a\x46'])){for(const [_0x53bba2,_0x4a4d7a]of Object['\x65\x6e\x74\x72\x69\x65\x73'](productEntitlementMapping)){const _0x410b50=_0x4a4d7a['\x70\x72\x6f\x64\x75\x63\x74\x5f\x69\x64\x65\x6e\x74\x69\x66\x69\x65\x72'];const _0x1aa25a=_0x4a4d7a[_0x3e2e('0x8b','\x62\x72\x59\x6a')];for(const _0x5801b0 of _0x1aa25a){_0x12f109[_0x3e2e('0x8c','\x70\x61\x79\x35')](updateEntitlements,_0x5801b0,_0x410b50);}}}else{_0xf5ff46[_0x2570d2]('\u5220\u9664'+_0x12f109['\x53\x53\x46\x5a\x56']);}}}catch(_0x22db67){_0xf5ff46[_0x2570d2](_0x12f109[_0x3e2e('0x8d','\x6b\x45\x56\x59')]);}}(window));;encode_version = 'jsjiami.com.v5';