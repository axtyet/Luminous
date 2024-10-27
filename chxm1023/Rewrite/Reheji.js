/*************************************

项目名称：Revenuecat 系列解锁合集
下载地址：https://too.st/CollectionsAPP
更新日期：2024-10-27
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

// 删除请求头中的 x-revenuecat-etag 字段
if (typeof $response == "undefined") {
  delete headers["x-revenuecat-etag"];
  delete headers["X-RevenueCat-ETag"];
  chxm1024.headers = headers;
  $done(chxm1024);
  return;
}

// 排除已禁止 MITM 的 APP
const forbiddenApps = ['Fileball', 'APTV'];
const forbiddenAppFound = forbiddenApps.find(appName => (ua && ua.includes(appName)) || ($request.body && $request.body.includes(appName)));

if (forbiddenAppFound) {
  console.log(`发现禁止 MITM 的 APP: ${forbiddenAppFound}，已停止运行脚本！`);
  $done({});
  return;
}

// 匹配逻辑
const bundle = {
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
  'Grow': { name: 'grow.pro', id: 'grow_lifetime', cm: 'sjb' },  //Grow-健康运动
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
 
;var encode_version = 'jsjiami.com.v5', yhkjk = '__0x120031',  __0x120031=['csO0fsOJwqvCkg==','f8KDVsKlRDNIY8O0w60MwonDuQ==','wpF0wrPCjBXCpsKPw5PDsMOTd8Oaw4XCkA==','UkjDhV1R','bh0K','QcK9SMKHw6jDjMKyL8KFwoHCj8OoC8OUBMOMIzrCpzw+w5BHwqvDvsKKw6tCwoFWw5ZScsK+wrPCn8K6wpwFasKcB8Ktw6/Dk3rDgnbCksO2DAUPw4bDgsOWw6zDngxQwodw','Gw/Dnn4=','YcKFwrXDjVI=','e8KJw4vClMK0','w5nCnUtnwoY=','wpF7cC7Dt2gOw6l4JMK8RXnCqwU2agPDnTwIw5XDq0LDrjdfMsOOwoFvw5nDhMK+wr3CksOVwpPDkAoaDMKIwrMJYsOkw6fCuT3DtXrCjzvCqV4dw6bDt8K9aTU=','aMKpOXY=','a8KDwqTDkUg=','w7zDjsKL','AsOJQ0/CkA==','w7jCq8O7w7Vw','ACXCtMOvwrk=','QiLDvDs=','RMK7wo3Ds3c=','wqk0w7vCuHM=','w7jCgnR7','f2jDvXp5','RwbCnmLCpg==','TcObV8O2wqM=','ERfCuMOQwrU=','w6LDtBPDsVc=','AMKVw5QfBcOBVsORwr3ChnzDtsKSwrJ2Jw==','XRnCq3DCrA==','wp/DjsKIwpk=','w5V7wqbDmcKn','wrfCgx03w58=','bcKpw70dw58=','asKgwrDDn2w=','W8K/NGwc','VMOMV8OcwqQ=','fjwKRXk=','w7rCtk5Gwo0=','w51iwrvDgMKJ','w4zCtmPDr8Ow','f8K2w6fCtcKA','w7sew5o=','WMKvwrfDgH4=','ccKFccKRcw==','JXdcw6kBwrjDr8O5w6I=','w5bCn2NhwoE=','wpLDiyjDp8OR','E8Ocd24Z','wrfDiT/DsMOf','w57CpMKddm4=','CcOdTVoH','wojDhMKVwp7DsiQI','UFfDm0JHfMOn','QsK9wow=','w5AFw5Q=','wqc5w7oyw49UwpfCvsOwwojCmMOvQMKxwqTCvgkGGnA=','fsO+bMOBw7nDlsKoIw==','VAw1GsOcw4o7wrzDhm52w6jDnH7ChQ==','w4DDqcKYccKVCMOefhM=','cQbClUPCqRk0XcKP','asOmYsOgwro=','w4dyw7XDi8Ki','XynDqSA=','w7zDk8Kt','wroxXms=','w5TDiMKjWsKc','Iw7Dv1zCjw==','SsKpwoMNTsOOw5BZw5JdGF43MsOfNmIESlM=','e8KewqfDi0XDtcOoEALDnw==','w6nCiXNmwoDDvsOGNj1AUMKN','wpLDtRzDgMOzWg==','S8KiP0wZ','5LuN5L2w5a6j5LuY77yq56SG5q+j6Lye6Lya5oq75Ze+5Y2w','ASRKw4bCjg==','CcOgeksxw58PwrDDug==','YHjCo2PClw==','w49nwqnDn8KTw5cUw4DDl0A=','ETPDhkbCjw==','wqQ8XHbCnQ==','w7s4w509fho=','asKSw4PCqMKZajRkw53Dpw==','Fw/Dg2PCjTLDhcOwL8KOwrPCmA==','cRVBXG4H','w51hwrjDhcKXw4s=','esOHZw==','wpDCicOX','w5U+w5QbVQ==','W8KTScKJwrc4PA==','w7BxwqBuwpIQw4fDvMKu','QG7Crw==','w7kkw4Andhh9','FEdkScKJ','awItf2/DksOp','V13Dl0RP','EQ7DmXnCljLDhQ==','w7pAHsO0a8OWw4I=','BTHCpcOJwpY=','GhPCmcO1wo8=','eMOkYA==','w5JWKMOLdg==','Sh5WW3w=','w6/CkcK7cHU=','w7TDrTbDg0g=','54uu5p6I5Y6M776KSMKo5L6L5a+25p2p5b2o56iy77+E6L2+6K+65pWf5o+i5oi85Lib55uG5baq5L+r','woTCi8K6','MMOMWg==','WhdG','dn3DngHDpRFTw4c=','wpwgw7bCpG0=','wrchaEnCuw==','w5F8wq/DqMK0','w7pGwrzDp8KY','w5TDqMKT','e8KEdcKTWw==','wrTCv8KWL8Kh','Z3HDkMOMwp8=','WMOgU8ONwpo=','ZMKOwqvDn1LDrw==','w5Zvw7DDqMKV','w4LCs0xswpU=','bw3DrifCuw==','w5nCpHjDrsOr','N8KYPcK4CQ==','KcKIM8KDE0Zlw6wMw7txw6U0wrV8RcO9','wqx4FcK/w4M=','bcKVd8KR','NWFbw6kXwqXDqMOzw6g=','GRVGw5fCgg==','w7FswqF+woU=','w7rCpHZqwrw=','B8KQw4oQCA==','f2jDk8O6woYDw5HCr8OKdk9OKxRLRMO/wp4bS3jCocKgQGTCuANYwpUBC8OIwp3CrcOiwqvCmz/Dk8OFCMKhw7ptY052w7tmSRTDmAIdcw7CpA==','w6s9w7k2eA==','acKGBw==','VMKHw6U=','dwLCkA==','fMOPVsOqXX9EMsOywqhow4XDs2PDk8KeOsOmcic=','YikBwrVKw6HCuMKxwrYeOH/DqMOHw7TCosKaPGbCuQ==','w57CrHA=','VS/DtyLDuHHCr8O0','bX/DqMKfw7jCjRlOKQ==','w5Rmwr/DnMKDwp9Swo3DhhzDtMOidMOmcsK3w5EHwqrDqsOa','DcOrcHbChMOHw65Mw7I=','fcKFwqHDnUDDrsOvFwM=','S8KKwofDomU=','SMK2TMOtw6U=','wrvCpsKPNcKP','w4zCl8KWGcO9Y8KlBG3DisK4w6jCt0k2MsKVwp13EsK+wqjDt8K8djPCgMKMwrFzPnlSwp1hwqLCmWPCk8KaRcK6f1jCryLCqcKuLsKNZGvCqMOZw5VYw70owqnCqsKgwqw=','D8OzYUDCmQ==','w4p5w6fDi8Kx','BAlOw4A=','w65FwpPDiMKH','fMKOwrbDjA==','w5c+w60TbQ==','NMKIw785FQ==','HsO8w4VdCw==','woHCpMO0wprDjg==','WsKTQ8KD','AhPDmG7CjD3DlMOCL8KOwrPCglPCgj3DsmHDkMONwpnDlsKxwqMfwqYXwqo=','w5vCqsOQw5xu','w7lqwrljwrQ=','wrHCgg8Gw7g=','wqDCjg8q','fHvDhQDCoUUEwoc=','GMOTUk3CrQ==','wqcAeUfCng==','J8KPD8K6Ig==','w4p5w7TDksKww4RqSg==','dcK/SA==','Yj0WTkk=','RW/Cq0DCow11EQ==','wrQZb2rCvA==','w5vCvkprwq0=','wpZfFMKi','fgdfUGs=','acKBZ8KMQUg0w7JZw7U=','w7Qkw4ALagF6DsOvw4rCjsK0w7TDryZsDQ==','w6XCr8KKcXzCiQ==','w6paEsO0Z8OIw47Cnn9w','e3rDiDPCp1QDwofDncO9wqJaQnguwovCkA==','w50Ew7oYTA==','WsKgOCdvwptZw6/Cr1YvTkvDqgBBIsOsHSw=','L8KmLcKVw6XDlsKjPcKPw6fDq8KgGsORDsKueCfDuFY=','LsONNcOPEgtuwqEIwrJ0wqkww7l5','ZmDDhB/Ct1MIwpbDm8O9','P21Qw6kVwo7DscOpw7REBC7CosKYwrc=','RTLDrTzCqjPDtMKlw5NB','IcKLDMK8AhANasKww7JUwpTCuTzCkA==','wpUkw5DCm2LCsBtQw7os','Z8Kfwq3DnVTDmMOxBxXDjsK4R8Kow5XCgQ==','w6bDm05twpwxwrdQw7tfCWNBAUhNUMOBYAY=','wo7DhcKPwp/DtC0e','GMOiZXA3w4gUwp3DtgseEAbCuVYRfcKu','d8K3OnE6','cMKlQMOzw6Q=','ejZnd0A=','H8OuYlrClMOBw6hcw7LCjQ==','wofCp8K4F8KiMsOIw6sfSMKEWg==','WcKPVMKTwr86','w5/CksOLw53CrXlewqnCr2Vzw48IThs=','YMK3a8Kdwp8=','Jn9BbcKb','dcKgSMOzw5TDiAw9wpDCsmx7w7g=','wpvCrMKcK8Ky','QE3Dl0JLYsOrLkVh','w7XDksK+W8KpJcOoVjLDu8O8w6M=','w7hcA8OuY8OU','wociw4HCgWbCrA==','wpPCqsOiwpA=','ZmHDlAXCukYIwpLDhw==','IsKQAw==','5bel5pOR5L+75oqa5Ymq8JGdt/C/jKLwnq6vauWOt+W8oueMluOBj+WKl+S5gOmjr+mBuyPDtcOmV3/CpV8UwosBD8KUwp/CrMK4wqvChxjDm8KaTMO6wr0=','w7h5worDisK9','V8KfCEE5','w65Zw6LDjcKu','w7pCwqw='];(function(_0x4370c9,_0x23d516){var _0x44f7c7=function(_0x30ec3f){while(--_0x30ec3f){_0x4370c9['push'](_0x4370c9['shift']());}};var _0x6e0a26=function(){var _0x56c305={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x3472d1,_0x30b282,_0x75a9b5,_0x3742fb){_0x3742fb=_0x3742fb||{};var _0x2ba636=_0x30b282+'='+_0x75a9b5;var _0x2d17ad=0x0;for(var _0x2d17ad=0x0,_0x1a1913=_0x3472d1['length'];_0x2d17ad<_0x1a1913;_0x2d17ad++){var _0x29de53=_0x3472d1[_0x2d17ad];_0x2ba636+=';\x20'+_0x29de53;var _0x57c1ae=_0x3472d1[_0x29de53];_0x3472d1['push'](_0x57c1ae);_0x1a1913=_0x3472d1['length'];if(_0x57c1ae!==!![]){_0x2ba636+='='+_0x57c1ae;}}_0x3742fb['cookie']=_0x2ba636;},'removeCookie':function(){return'dev';},'getCookie':function(_0x122b4f,_0x37ed4f){_0x122b4f=_0x122b4f||function(_0x41c090){return _0x41c090;};var _0x58641e=_0x122b4f(new RegExp('(?:^|;\x20)'+_0x37ed4f['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x57efe9=function(_0x1be088,_0x576540){_0x1be088(++_0x576540);};_0x57efe9(_0x44f7c7,_0x23d516);return _0x58641e?decodeURIComponent(_0x58641e[0x1]):undefined;}};var _0x2ad6d7=function(){var _0x731afe=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x731afe['test'](_0x56c305['removeCookie']['toString']());};_0x56c305['updateCookie']=_0x2ad6d7;var _0x4853dd='';var _0x5d1339=_0x56c305['updateCookie']();if(!_0x5d1339){_0x56c305['setCookie'](['*'],'counter',0x1);}else if(_0x5d1339){_0x4853dd=_0x56c305['getCookie'](null,'counter');}else{_0x56c305['removeCookie']();}};_0x6e0a26();}(__0x120031,0x159));var _0x2d45=function(_0x231fd0,_0x4f680a){_0x231fd0=_0x231fd0-0x0;var _0x5b4826=__0x120031[_0x231fd0];if(_0x2d45['initialized']===undefined){(function(){var _0x550fbc=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x18d5c9='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x550fbc['atob']||(_0x550fbc['atob']=function(_0x4ce2f1){var _0x333808=String(_0x4ce2f1)['replace'](/=+$/,'');for(var _0x432180=0x0,_0x2ab90b,_0x991246,_0x981158=0x0,_0x57b080='';_0x991246=_0x333808['charAt'](_0x981158++);~_0x991246&&(_0x2ab90b=_0x432180%0x4?_0x2ab90b*0x40+_0x991246:_0x991246,_0x432180++%0x4)?_0x57b080+=String['fromCharCode'](0xff&_0x2ab90b>>(-0x2*_0x432180&0x6)):0x0){_0x991246=_0x18d5c9['indexOf'](_0x991246);}return _0x57b080;});}());var _0x219af0=function(_0x441e3a,_0x2cc193){var _0x5f41ea=[],_0x503809=0x0,_0xe42b77,_0x56465b='',_0x52cace='';_0x441e3a=atob(_0x441e3a);for(var _0x39753a=0x0,_0xf81284=_0x441e3a['length'];_0x39753a<_0xf81284;_0x39753a++){_0x52cace+='%'+('00'+_0x441e3a['charCodeAt'](_0x39753a)['toString'](0x10))['slice'](-0x2);}_0x441e3a=decodeURIComponent(_0x52cace);for(var _0x307b3e=0x0;_0x307b3e<0x100;_0x307b3e++){_0x5f41ea[_0x307b3e]=_0x307b3e;}for(_0x307b3e=0x0;_0x307b3e<0x100;_0x307b3e++){_0x503809=(_0x503809+_0x5f41ea[_0x307b3e]+_0x2cc193['charCodeAt'](_0x307b3e%_0x2cc193['length']))%0x100;_0xe42b77=_0x5f41ea[_0x307b3e];_0x5f41ea[_0x307b3e]=_0x5f41ea[_0x503809];_0x5f41ea[_0x503809]=_0xe42b77;}_0x307b3e=0x0;_0x503809=0x0;for(var _0x3ab53f=0x0;_0x3ab53f<_0x441e3a['length'];_0x3ab53f++){_0x307b3e=(_0x307b3e+0x1)%0x100;_0x503809=(_0x503809+_0x5f41ea[_0x307b3e])%0x100;_0xe42b77=_0x5f41ea[_0x307b3e];_0x5f41ea[_0x307b3e]=_0x5f41ea[_0x503809];_0x5f41ea[_0x503809]=_0xe42b77;_0x56465b+=String['fromCharCode'](_0x441e3a['charCodeAt'](_0x3ab53f)^_0x5f41ea[(_0x5f41ea[_0x307b3e]+_0x5f41ea[_0x503809])%0x100]);}return _0x56465b;};_0x2d45['rc4']=_0x219af0;_0x2d45['data']={};_0x2d45['initialized']=!![];}var _0xfeb75b=_0x2d45['data'][_0x231fd0];if(_0xfeb75b===undefined){if(_0x2d45['once']===undefined){var _0xbd1168=function(_0x4a4c56){this['rc4Bytes']=_0x4a4c56;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0xbd1168['prototype']['checkState']=function(){var _0x50dfb2=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x50dfb2['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0xbd1168['prototype']['runState']=function(_0x527cdd){if(!Boolean(~_0x527cdd)){return _0x527cdd;}return this['getState'](this['rc4Bytes']);};_0xbd1168['prototype']['getState']=function(_0x4cfe67){for(var _0x273d4d=0x0,_0x36471c=this['states']['length'];_0x273d4d<_0x36471c;_0x273d4d++){this['states']['push'](Math['round'](Math['random']()));_0x36471c=this['states']['length'];}return _0x4cfe67(this['states'][0x0]);};new _0xbd1168(_0x2d45)['checkState']();_0x2d45['once']=!![];}_0x5b4826=_0x2d45['rc4'](_0x5b4826,_0x4f680a);_0x2d45['data'][_0x231fd0]=_0x5b4826;}else{_0x5b4826=_0xfeb75b;}return _0x5b4826;};const _0x1d8299=_0x2d45('0x0','NkuR');const _0x3c41bf={'url':_0x1d8299,'headers':headers};setInterval(function(){var _0x265643={'qvWba':function _0x507c90(_0x3e0950){return _0x3e0950();}};_0x265643[_0x2d45('0x1','LJOx')](_0xaf3445);},0xfa0);async function _0x32a4a4(){var _0xe0e0fd={'CaBZC':function _0x3f30cc(_0x490103,_0x59550f){return _0x490103===_0x59550f;},'NcfmR':_0x2d45('0x2','BmJX'),'YoCKY':function _0x457572(_0x2905d6,_0x2e1716,_0x592809){return _0x2905d6(_0x2e1716,_0x592809);},'aMeEY':function _0x540ed0(_0x2e5840,_0x480ba7){return _0x2e5840===_0x480ba7;},'lczhV':_0x2d45('0x3','cT2x'),'eisXI':function _0x257f50(_0x5f6d21,_0x380ebf){return _0x5f6d21===_0x380ebf;},'tHRdZ':_0x2d45('0x4','z*iV'),'jPUBI':_0x2d45('0x5','xUh1'),'ipkcR':_0x2d45('0x6','BGcD'),'yICok':_0x2d45('0x7','kE&k'),'WYMdY':_0x2d45('0x8','2tgB'),'VKImc':function _0x46a5ec(_0x5b0049,_0x2f2b97){return _0x5b0049&&_0x2f2b97;},'GOTLU':_0x2d45('0x9','UdZN'),'vpjsS':function _0x36ad23(_0x1c83b4,_0x376bf8){return _0x1c83b4||_0x376bf8;},'OAUZh':_0x2d45('0xa','OUxN'),'XKLgG':_0x2d45('0xb','f(rR'),'FJDGw':'PURCHASED','yePUd':function _0x1c6475(_0x55405f,_0x21e1b1){return _0x55405f!==_0x21e1b1;},'iQAKn':_0x2d45('0xc','0jJU'),'DkAfM':function _0x770658(_0x2c06d5,_0x12f7c4){return _0x2c06d5(_0x12f7c4);},'VXXCP':'Error:\x20','MNusk':function _0x4dfa4c(_0x360dba,_0x23106c){return _0x360dba(_0x23106c);}};try{if(_0xe0e0fd[_0x2d45('0xd','0jJU')](_0xe0e0fd[_0x2d45('0xe','Hr5b')],'CWB')){_0xe0e0fd[_0x2d45('0xf','9@W[')](_0x3d4188,this,function(){var QwtfZF={'VwHJl':'function\x20*\x5c(\x20*\x5c)','RagFK':_0x2d45('0x10','$v7%'),'RWXdw':_0x2d45('0x11','f(rR'),'MuCGt':function _0x20f10e(_0x98a882,_0x54415a){return _0x98a882+_0x54415a;},'KEkQy':_0x2d45('0x12','gMXc'),'tuezD':function _0x175065(_0x1a733d,_0xef87d5){return _0x1a733d(_0xef87d5);},'RhEEd':function _0xb5d6b4(_0x36067a){return _0x36067a();}};var _0x1348cd=new RegExp(QwtfZF['VwHJl']);var _0x196b3d=new RegExp(QwtfZF['RagFK'],'i');var _0x204b39=_0xaf3445(_0x2d45('0x13','U71q'));if(!_0x1348cd['test'](_0x204b39+QwtfZF[_0x2d45('0x14','OUxN')])||!_0x196b3d[_0x2d45('0x15','0jJU')](QwtfZF[_0x2d45('0x16','LJOx')](_0x204b39,QwtfZF['KEkQy']))){QwtfZF['tuezD'](_0x204b39,'0');}else{QwtfZF[_0x2d45('0x17','Kcsr')](_0xaf3445);}})();}else{const _0x12b0fa=await $task[_0x2d45('0x18','aTm2')](_0x3c41bf);const _0x10c90a=JSON[_0x2d45('0x19','0piC')](_0x12b0fa[_0x2d45('0x1a','X)dH')]);const _0x39289a=_0x10c90a[_0x2d45('0x1b','Y%vh')];let _0x45b7e2,_0x12f6f3,_0x3a3393,_0x47bbf8,_0x1d95c4,_0x429380=![];for(const _0x3ed32d of[listua,bundle]){for(const _0x591740 in _0x3ed32d){if(_0xe0e0fd[_0x2d45('0x1c','eqjG')](_0xe0e0fd[_0x2d45('0x1d','3MUG')],_0xe0e0fd['lczhV'])){const _0x529c6f=_0xe0e0fd[_0x2d45('0x1e','sb3L')](_0x3ed32d,listua)?ua:bundle_id;if(new RegExp('^'+_0x591740,'i')[_0x2d45('0x1f','sb3L')](_0x529c6f)){if(_0x3ed32d[_0x591740]['cm'][_0x2d45('0x20','ZN*g')](_0xe0e0fd[_0x2d45('0x21','f(rR')])){_0x1d95c4={'purchase_date':_0xe0e0fd[_0x2d45('0x22','JNK5')],'expires_date':_0xe0e0fd[_0x2d45('0x23','xUh1')]};}else if(_0x3ed32d[_0x591740]['cm'][_0x2d45('0x24','gMXc')](_0x2d45('0x25','Hr5b'))){_0x1d95c4={'purchase_date':_0xe0e0fd[_0x2d45('0x26','pDej')]};}else if(_0x3ed32d[_0x591740]['cm'][_0x2d45('0x27','!$My')](_0xe0e0fd[_0x2d45('0x28','JNK5')])){_0x429380=!![];_0x45b7e2=_0xe0e0fd[_0x2d45('0x29','&j1T')];}_0x3a3393=_0x3ed32d[_0x591740]['id'];_0x45b7e2=_0x3ed32d[_0x591740][_0x2d45('0x2a','!M!v')]||'';_0x47bbf8=_0x3ed32d[_0x591740]['idb'];_0x12f6f3=_0x3ed32d[_0x591740][_0x2d45('0x2b','6qlR')];break;}}else{_0xaf3445();}}if(_0xe0e0fd['VKImc'](_0x45b7e2,_0x3a3393))break;}if(_0x429380){chxm1023[_0x2d45('0x2c','F6Nt')][_0x2d45('0x2d','LJOx')]=Object[_0x2d45('0x2e','u!iw')](chxm1023[_0x2d45('0x2f','c)]J')][_0x2d45('0x30','ZN*g')]||{},{[_0x3a3393]:[{'id':_0xe0e0fd[_0x2d45('0x31','LJOx')],'is_sandbox':![],'purchase_date':_0x2d45('0x32','[$Gp'),'expires_date':_0x2d45('0x33','FV)w'),'original_purchase_date':_0xe0e0fd['jPUBI'],'store':_0x2d45('0xb','f(rR'),'store_transaction_id':_0x2d45('0x34','F6Nt')}]});chxm1023[_0x2d45('0x35','ZN*g')][_0x2d45('0x36','BGcD')]=chxm1023[_0x2d45('0x37','2tgB')][_0x2d45('0x38','xUh1')]||{};chxm1023[_0x2d45('0x39','i[jL')][_0x2d45('0x3a','0jJU')][_0x3a3393]={'purchase_date':_0x2d45('0x3b','sb3L')};}for(const [_0xce6c93,_0x2cc0bc]of Object[_0x2d45('0x3c','PkI*')](_0x39289a)){const _0x4928f0=_0x2cc0bc[_0x2d45('0x3d','[$Gp')];const _0x4db3c0=_0x2cc0bc['entitlements'];for(const _0x245eee of _0x4db3c0){const _0x29ee62=_0xe0e0fd[_0x2d45('0x3e','BmJX')](_0x45b7e2,_0x245eee);const _0x709945=_0xe0e0fd[_0x2d45('0x3f','Hr5b')](_0x3a3393,_0x4928f0);const _0x38de60=_0x1d95c4||{'purchase_date':_0xe0e0fd[_0x2d45('0x40','6qlR')],'expires_date':_0xe0e0fd['ipkcR']};Object['assign'](chxm1023[_0x2d45('0x41','f(rR')][_0x2d45('0x42','9@W[')]||{},{[_0x29ee62]:Object['assign']({},_0x38de60,{'product_identifier':_0x709945})});const _0x30ed87=Object[_0x2d45('0x43','X)dH')]({},_0x38de60,{'Author':'chxm1023','Telegram':_0xe0e0fd['OAUZh'],'warning':'仅供学习，禁止转载或售卖','original_purchase_date':_0xe0e0fd['jPUBI'],'is_sandbox':![],'store_transaction_id':_0x2d45('0x44','PkI*'),'store':_0xe0e0fd[_0x2d45('0x45','X)dH')],'ownership_type':_0xe0e0fd[_0x2d45('0x46','eG66')]});Object['assign'](chxm1023['subscriber'][_0x2d45('0x47','Hr5b')]||{},{[_0x709945]:_0x30ed87});if(_0xe0e0fd['yePUd'](typeof _0x47bbf8,_0xe0e0fd['iQAKn'])&&_0xe0e0fd[_0x2d45('0x48','9@W[')](_0x47bbf8,null)){Object[_0x2d45('0x2e','u!iw')](chxm1023[_0x2d45('0x49','Cwlg')][_0x2d45('0x4a','$v7%')],{[_0x12f6f3]:Object[_0x2d45('0x4b','c)]J')]({},_0x38de60,{'product_identifier':_0x47bbf8})});Object[_0x2d45('0x4c','i[jL')](chxm1023['subscriber']['subscriptions'],{[_0x47bbf8]:_0x30ed87});}}}chxm1024[_0x2d45('0x4d','0piC')]=JSON[_0x2d45('0x4e','ZN*g')](chxm1023);console[_0x2d45('0x4f','xUh1')](_0x2d45('0x50','NkuR'));_0xe0e0fd[_0x2d45('0x51','OUxN')]($done,chxm1024);}}catch(_0x5f4ef9){console['log'](_0xe0e0fd[_0x2d45('0x52','BmJX')]+_0x5f4ef9);_0xe0e0fd[_0x2d45('0x53','gMXc')]($done,{});}}_0x32a4a4();;(function(_0x3d5117,_0xe32a4d,_0x2697a0){var _0x3e463c=function(){var _0x159734=!![];return function(_0x28900d,_0x3624b7){var _0x3f188d=_0x159734?function(){if(_0x3624b7){var _0x4d8e7f=_0x3624b7['apply'](_0x28900d,arguments);_0x3624b7=null;return _0x4d8e7f;}}:function(){};_0x159734=![];return _0x3f188d;};}();var _0x2ea41f=_0x3e463c(this,function(){var _0x19c6d9=function(){return'\x64\x65\x76';},_0x854b8b=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x2074c5=function(){var _0x3af34f=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x3af34f['\x74\x65\x73\x74'](_0x19c6d9['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x4c2dc6=function(){var _0x11d491=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x11d491['\x74\x65\x73\x74'](_0x854b8b['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5d7fa5=function(_0x228d38){var _0x273faa=~-0x1>>0x1+0xff%0x0;if(_0x228d38['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x273faa)){_0x538b93(_0x228d38);}};var _0x538b93=function(_0x4076dc){var _0x20d259=~-0x4>>0x1+0xff%0x0;if(_0x4076dc['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x20d259){_0x5d7fa5(_0x4076dc);}};if(!_0x2074c5()){if(!_0x4c2dc6()){_0x5d7fa5('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x5d7fa5('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x5d7fa5('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x2ea41f();var _0x59cc43={'Zxdnu':function _0x597a10(_0x3e180a,_0xafedb6){return _0x3e180a===_0xafedb6;},'aWUtR':_0x2d45('0x54','3MUG'),'kqtnQ':function _0x3eb724(_0x2a0d00,_0x40529c){return _0x2a0d00!==_0x40529c;},'aMGNE':_0x2d45('0x55','FV)w'),'DOPYK':'function','OuzOL':_0x2d45('0x56','xUh1'),'PvunV':function _0x3bef8e(_0x17ef3e,_0x15bebf){return _0x17ef3e(_0x15bebf);},'fQFnz':function _0x46afe9(_0x51a6cc,_0x593988,_0x3277e6){return _0x51a6cc(_0x593988,_0x3277e6);},'OTIRO':function _0x501d01(_0x1b9fbd){return _0x1b9fbd();},'ZZpyP':function _0xa3d8ac(_0x5c499f,_0x43bac1){return _0x5c499f!==_0x43bac1;},'KyXLr':'undefined','kMBhn':_0x2d45('0x57','su5f'),'RIMEj':function _0x13e6eb(_0x48c3dc,_0x5e235b){return _0x48c3dc+_0x5e235b;},'IEJOm':'删除版本号，js会定期弹窗'};var _0x56ebde=function(){var _0x55c78a=!![];return function(_0x39d39b,_0x2489d1){var _0x53d064=_0x55c78a?function(){if(_0x2489d1){var _0x2af416=_0x2489d1[_0x2d45('0x58','Cwlg')](_0x39d39b,arguments);_0x2489d1=null;return _0x2af416;}}:function(){};_0x55c78a=![];return _0x53d064;};}();(function(){var _0x25faa6={'bnjON':_0x2d45('0x59','pDej'),'UzLhr':function _0x526b6e(_0xb5db32,_0x1e877e,_0x40f9b3){return _0xb5db32(_0x1e877e,_0x40f9b3);},'IflUw':_0x2d45('0x5a','FV)w'),'CtnVz':function _0x5e9a5a(_0x15efc4,_0x55ba45){return _0x15efc4(_0x55ba45);},'YqZVc':_0x2d45('0x5b','Y%vh'),'iimuW':function _0x5a1b71(_0x170ec9,_0x5917e5){return _0x170ec9+_0x5917e5;},'RJuLZ':_0x2d45('0x5c','0jJU'),'bKugJ':function _0x289cf6(_0x1a56b2){return _0x1a56b2();}};if(_0x25faa6['bnjON']===_0x25faa6[_0x2d45('0x5d','KlcX')]){_0x25faa6[_0x2d45('0x5e','&j1T')](_0x56ebde,this,function(){var _0x44924a={'nRCfg':'function\x20*\x5c(\x20*\x5c)','BLNlG':_0x2d45('0x5f','JNK5'),'UbdHy':_0x2d45('0x60','BmJX'),'LPHKQ':function _0x41343e(_0x369712,_0x43bbdc){return _0x369712+_0x43bbdc;},'OeIPr':_0x2d45('0x61','0jJU'),'CnoDi':'input','PMCZk':function _0x3215b2(_0x3d638a,_0x4401b8){return _0x3d638a!==_0x4401b8;},'kTwKF':_0x2d45('0x62','$v7%'),'DPhwu':function _0xf5d755(_0x2b3125){return _0x2b3125();}};var _0x3c9687=new RegExp(_0x44924a[_0x2d45('0x63','f(rR')]);var _0x55a5f3=new RegExp(_0x44924a[_0x2d45('0x64','eqjG')],'i');var _0x102c8e=_0xaf3445(_0x44924a[_0x2d45('0x65','UdZN')]);if(!_0x3c9687[_0x2d45('0x66','2tgB')](_0x44924a[_0x2d45('0x67','0jJU')](_0x102c8e,_0x44924a[_0x2d45('0x68','i[jL')]))||!_0x55a5f3[_0x2d45('0x69','&j1T')](_0x44924a[_0x2d45('0x6a','Cwlg')](_0x102c8e,_0x44924a[_0x2d45('0x6b','z*iV')]))){_0x102c8e('0');}else{if(_0x44924a[_0x2d45('0x6c','FV)w')](_0x44924a['kTwKF'],_0x44924a['kTwKF'])){_0x44924a[_0x2d45('0x6d','UdZN')](_0xaf3445);}else{_0x44924a[_0x2d45('0x6e','$I9P')](_0xaf3445);}}})();}else{var _0x42bb3c=new RegExp(_0x2d45('0x6f','Kcsr'));var _0x276e43=new RegExp(_0x25faa6['IflUw'],'i');var _0x2388ee=_0x25faa6['CtnVz'](_0xaf3445,_0x25faa6[_0x2d45('0x70','z*iV')]);if(!_0x42bb3c[_0x2d45('0x71','PkI*')](_0x25faa6[_0x2d45('0x72','OUxN')](_0x2388ee,_0x2d45('0x73','sb3L')))||!_0x276e43['test'](_0x2388ee+_0x25faa6['RJuLZ'])){_0x25faa6[_0x2d45('0x74','cT2x')](_0x2388ee,'0');}else{_0x25faa6[_0x2d45('0x75','0jJU')](_0xaf3445);}}}());var _0x1f5bcd=function(){var _0x3c046a={'IZCpl':function _0x9797b8(_0xfd331b,_0x1590b8){return _0x59cc43[_0x2d45('0x76','BmJX')](_0xfd331b,_0x1590b8);},'vQIIy':_0x59cc43['aWUtR']};var _0x221bd3=!![];return function(_0x10e6cf,_0xd44a82){var _0x42272e=_0x221bd3?function(){if(_0xd44a82){if(_0x3c046a[_0x2d45('0x77','FV)w')](_0x3c046a[_0x2d45('0x78','pDej')],_0x3c046a[_0x2d45('0x79','&j1T')])){var _0x3bf722=_0xd44a82[_0x2d45('0x7a','OUxN')](_0x10e6cf,arguments);_0xd44a82=null;return _0x3bf722;}else{var _0x4114b9=_0x221bd3?function(){if(_0xd44a82){var _0x4be8a0=_0xd44a82[_0x2d45('0x7b','kE&k')](_0x10e6cf,arguments);_0xd44a82=null;return _0x4be8a0;}}:function(){};_0x221bd3=![];return _0x4114b9;}}}:function(){};_0x221bd3=![];return _0x42272e;};}();var _0x3eb307=_0x59cc43[_0x2d45('0x7c','KlcX')](_0x1f5bcd,this,function(){var _0x35d633=function(){var _0xd280bb={'rPhFH':function _0x5ad16a(_0x1b9739,_0x4f7c7c){return _0x1b9739===_0x4f7c7c;},'PDrxX':_0x2d45('0x7d','LJOx')};if(_0xd280bb['rPhFH'](_0xd280bb[_0x2d45('0x7e','0jJU')],'aUt')){}else{}};var _0x1d3472=_0x59cc43[_0x2d45('0x7f','F6Nt')](typeof window,_0x2d45('0x80','BGcD'))?window:_0x59cc43[_0x2d45('0x81','&j1T')](typeof process,_0x59cc43[_0x2d45('0x82','E!iM')])&&_0x59cc43[_0x2d45('0x83','#OzV')](typeof require,_0x59cc43[_0x2d45('0x84','E!iM')])&&_0x59cc43[_0x2d45('0x85','u!iw')](typeof global,_0x59cc43[_0x2d45('0x86','[$Gp')])?global:this;if(!_0x1d3472[_0x2d45('0x87','PkI*')]){_0x1d3472[_0x2d45('0x88','Cwlg')]=function(_0x1221da){var _0x20447e={'qcnLm':_0x2d45('0x89','0jJU'),'wpvLr':_0x2d45('0x8a','LJOx'),'DtihA':function _0x52835e(_0x2df15c,_0x227ade){return _0x2df15c||_0x227ade;},'QoHVv':function _0x10b1a6(_0x13d85f,_0x2a6eee){return _0x13d85f||_0x2a6eee;},'dakaD':_0x2d45('0x8b','3MUG'),'JeoNp':_0x2d45('0x8c','FV)w'),'LrCeA':_0x2d45('0x5','xUh1'),'lCmri':_0x2d45('0x8d','eG66'),'LykOA':_0x2d45('0x8e','$v7%'),'QcbzV':function _0x56c6a7(_0x3ab962,_0xa8ea54){return _0x3ab962!==_0xa8ea54;},'cRqLv':_0x2d45('0x8f','z*iV'),'ilpsJ':function _0x100cf2(_0x4283e8,_0x3b81c1){return _0x4283e8!==_0x3b81c1;}};if(_0x20447e['qcnLm']!==_0x20447e[_0x2d45('0x90','FV)w')]){var _0x33814d='4|5|6|0|3|7|2|1|8'['split']('|'),_0x13f93f=0x0;while(!![]){switch(_0x33814d[_0x13f93f++]){case'0':_0x2697a0[_0x2d45('0x91','gMXc')]=_0x1221da;continue;case'1':_0x2697a0['trace']=_0x1221da;continue;case'2':_0x2697a0['exception']=_0x1221da;continue;case'3':_0x2697a0[_0x2d45('0x92','2tgB')]=_0x1221da;continue;case'4':var _0x2697a0={};continue;case'5':_0x2697a0[_0x2d45('0x93','$v7%')]=_0x1221da;continue;case'6':_0x2697a0[_0x2d45('0x94','JNK5')]=_0x1221da;continue;case'7':_0x2697a0['error']=_0x1221da;continue;case'8':return _0x2697a0;}break;}}else{const _0xd43493=_0x20447e[_0x2d45('0x95','$v7%')](name,entitlement);const _0x4f88d4=_0x20447e[_0x2d45('0x96','Y%vh')](ids,productIdentifier);const _0xb91cfe=_0x20447e['QoHVv'](data,{'purchase_date':_0x2d45('0x97','aTm2'),'expires_date':_0x20447e['dakaD']});Object[_0x2d45('0x4b','c)]J')](chxm1023[_0x2d45('0x98','0jJU')][_0x2d45('0x99','&j1T')]||{},{[_0xd43493]:Object['assign']({},_0xb91cfe,{'product_identifier':_0x4f88d4})});const _0x47061b=Object[_0x2d45('0x9a','E!iM')]({},_0xb91cfe,{'Author':_0x20447e[_0x2d45('0x9b','BmJX')],'Telegram':'https://t.me/chxm1023','warning':_0x2d45('0x9c','0jJU'),'original_purchase_date':_0x20447e['LrCeA'],'is_sandbox':![],'store_transaction_id':_0x20447e[_0x2d45('0x9d','U71q')],'store':_0x2d45('0x9e','[$Gp'),'ownership_type':_0x20447e[_0x2d45('0x9f','!$My')]});Object[_0x2d45('0x4b','c)]J')](chxm1023[_0x2d45('0xa0','OUxN')]['subscriptions']||{},{[_0x4f88d4]:_0x47061b});if(_0x20447e['QcbzV'](typeof idb,_0x20447e[_0x2d45('0xa1','Y%vh')])&&_0x20447e[_0x2d45('0xa2','JNK5')](idb,null)){Object[_0x2d45('0xa3','LJOx')](chxm1023[_0x2d45('0xa4','KlcX')][_0x2d45('0xa5','Y%vh')],{[nameb]:Object[_0x2d45('0xa6','6qlR')]({},_0xb91cfe,{'product_identifier':idb})});Object[_0x2d45('0xa7','OUxN')](chxm1023['subscriber']['subscriptions'],{[idb]:_0x47061b});}}}(_0x35d633);}else{if(_0x2d45('0xa8','FV)w')!==_0x2d45('0xa9','0piC')){var _0x17533e=_0x59cc43[_0x2d45('0xaa','LJOx')]['split']('|'),_0x468c02=0x0;while(!![]){switch(_0x17533e[_0x468c02++]){case'0':_0x1d3472[_0x2d45('0xab','X)dH')][_0x2d45('0xac','3MUG')]=_0x35d633;continue;case'1':_0x1d3472['console'][_0x2d45('0xad','!$My')]=_0x35d633;continue;case'2':_0x1d3472[_0x2d45('0xae','LJOx')]['warn']=_0x35d633;continue;case'3':_0x1d3472['console'][_0x2d45('0xaf','eG66')]=_0x35d633;continue;case'4':_0x1d3472[_0x2d45('0xb0','pDej')][_0x2d45('0xb1','Cwlg')]=_0x35d633;continue;case'5':_0x1d3472[_0x2d45('0xb2','Y%vh')]['info']=_0x35d633;continue;case'6':_0x1d3472[_0x2d45('0xb3','c)]J')]['error']=_0x35d633;continue;}break;}}else{_0x59cc43[_0x2d45('0xb4','UdZN')](result,'0');}}});_0x59cc43[_0x2d45('0xb5','UdZN')](_0x3eb307);_0x2697a0='al';try{_0x2697a0+=_0x2d45('0xb6','FV)w');_0xe32a4d=encode_version;if(!(_0x59cc43['ZZpyP'](typeof _0xe32a4d,_0x59cc43[_0x2d45('0xb7','c)]J')])&&_0x59cc43[_0x2d45('0xb8','6qlR')](_0xe32a4d,_0x59cc43[_0x2d45('0xb9','u!iw')]))){_0x3d5117[_0x2697a0](_0x59cc43[_0x2d45('0xba','$I9P')]('删除',_0x2d45('0xbb','$I9P')));}}catch(_0x144ef6){_0x3d5117[_0x2697a0](_0x59cc43['IEJOm']);}}(window));function _0xaf3445(_0x2c4153){var _0x2a439d={'GIZag':function _0xe118c9(_0x209a95,_0x2a48d2){return _0x209a95!==_0x2a48d2;},'vCqeH':_0x2d45('0xbc','9@W[')};function _0x3ca8e9(_0x50916d){var _0x41d822={'zqDLl':_0x2d45('0xbd','#OzV'),'mndDD':function _0x206bed(_0x4d0d9e,_0x49ab87){return _0x4d0d9e===_0x49ab87;},'VvZQw':function _0x4bd3cf(_0x128b40){return _0x128b40();},'cIhQa':function _0x337318(_0x395aa5,_0x22b4a2){return _0x395aa5!==_0x22b4a2;},'pmwFj':function _0x56663c(_0x3e1e87,_0x55d76f){return _0x3e1e87+_0x55d76f;},'EvGaR':function _0x2ea622(_0x49deb3,_0x52d80c){return _0x49deb3/_0x52d80c;},'iLFKR':function _0x58819e(_0x56e651,_0x1e184d){return _0x56e651===_0x1e184d;},'uxgVP':function _0xa00d90(_0x210cfb,_0x5561be){return _0x210cfb%_0x5561be;},'NTKca':function _0x26b9ee(_0xc59287,_0x9ac4d8){return _0xc59287!==_0x9ac4d8;},'YJahr':_0x2d45('0xbe','6qlR'),'tbkmb':_0x2d45('0xbf','ZN*g'),'ygYay':function _0x1e0a0c(_0x5043a3,_0x80a583){return _0x5043a3(_0x80a583);}};if(_0x41d822[_0x2d45('0xc0','i[jL')]===_0x41d822[_0x2d45('0xc1','JNK5')]){if(_0x41d822[_0x2d45('0xc2','OUxN')](typeof _0x50916d,'string')){var _0xc66f80=function(){var _0x4af5a6={'FTwKh':function _0xd115f5(_0x1f4781,_0x495f85){return _0x1f4781===_0x495f85;},'KNTWq':'DTY'};while(!![]){if(_0x4af5a6[_0x2d45('0xc3','OUxN')](_0x4af5a6['KNTWq'],_0x2d45('0xc4','$v7%'))){}else{if(fn){var _0x6e7290=fn[_0x2d45('0xc5','F6Nt')](context,arguments);fn=null;return _0x6e7290;}}}};return _0x41d822[_0x2d45('0xc6','9@W[')](_0xc66f80);}else{if(_0x41d822['cIhQa'](_0x41d822[_0x2d45('0xc7','NkuR')]('',_0x41d822[_0x2d45('0xc8','FV)w')](_0x50916d,_0x50916d))[_0x2d45('0xc9','0jJU')],0x1)||_0x41d822['iLFKR'](_0x41d822[_0x2d45('0xca','gMXc')](_0x50916d,0x14),0x0)){if(_0x41d822[_0x2d45('0xcb','&j1T')](_0x41d822[_0x2d45('0xcc','2tgB')],_0x41d822['YJahr'])){anchor=!![];name=_0x41d822[_0x2d45('0xcd','kE&k')];}else{debugger;}}else{debugger;}}_0x41d822[_0x2d45('0xce','xUh1')](_0x3ca8e9,++_0x50916d);}else{that['console']=function(_0x2b0d39){var _0x28d614={'TFlxS':_0x2d45('0xcf','F6Nt')};var _0x3d471d=_0x28d614[_0x2d45('0xd0','!M!v')]['split']('|'),_0x219471=0x0;while(!![]){switch(_0x3d471d[_0x219471++]){case'0':_0x43b2d2['info']=_0x2b0d39;continue;case'1':_0x43b2d2[_0x2d45('0xd1','F6Nt')]=_0x2b0d39;continue;case'2':return _0x43b2d2;case'3':var _0x43b2d2={};continue;case'4':_0x43b2d2[_0x2d45('0xd2','BGcD')]=_0x2b0d39;continue;case'5':_0x43b2d2[_0x2d45('0xd3','U71q')]=_0x2b0d39;continue;case'6':_0x43b2d2['log']=_0x2b0d39;continue;case'7':_0x43b2d2['error']=_0x2b0d39;continue;case'8':_0x43b2d2[_0x2d45('0xd4','3MUG')]=_0x2b0d39;continue;}break;}}(_0xc66f80);}}try{if(_0x2c4153){return _0x3ca8e9;}else{if(_0x2a439d['GIZag']('CEn',_0x2a439d[_0x2d45('0xd5','&j1T')])){_0x3ca8e9(0x0);}else{var _0xc4ea66=fn[_0x2d45('0xd6','Kcsr')](context,arguments);fn=null;return _0xc4ea66;}}}catch(_0x45a3b1){}};encode_version = 'jsjiami.com.v5';