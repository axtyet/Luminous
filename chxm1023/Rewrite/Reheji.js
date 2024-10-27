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

;var encode_version = 'jsjiami.com.v5', uwjmw = '__0x120071',  __0x120071=['wqTDuMOeRMK/','wr3DqQE=','E8Oqw4YHAQ==','L3TCv8Ofwq4=','wpdaGg==','NsKeL2w=','FyvCn8KwBQ==','JcOrw4US','wp1QSA==','5Lu85pS05o6q55ud5Lq755Kh5bSW5YeT','LsKkLA==','wrtLXQ==','IMOwwrTCkXg=','w7DDjzZCwrg=','w7Z6w5vCjcOG','FnFJw53Dkg==','RCQQMMK7','wrXDm0/Dtz5Ow5E=','woB0XiLCqw==','w7QMAcOEET7Dgw==','w43DrEczw7p4wqpXA8ORSsOkK2PCsyjCvQ==','LMONHBw=','fMKSPMKOw59DK8KGw5U=','wpRpw5k2Kg==','wphUwoc=','cjLCh8KVwpc=','w7NTw5g=','wqFsXA==','NVNdGEY=','wpHDksKpaEE=','wpAawpdBF1A=','wqPDkT5FwoU=','HMKfHEEa','wrxww6IpIQ==','wro7DcK5AQ==','w51Vw5HCmMO8','OsOEwpvClUI=','IDDDoMOn','w6bDvztkwro=','wqNoMQ==','wqJGEMOcwp4=','w5N5w6AjfQ==','e8KOCMKMw4w=','fX0dTMOdwqbDpMKTwrcYOsOgb8KWwpASworDuRjCqlBowoo+w6jClwbCpW5DbC3Cl3jCkE9gIFDDusOXwqcIbcOIbsKLwpzDmWxuRMOXwqghw4XDrsONwo/DvsOcJQ==','w7Fhwooww7U=','wqjDmls=','wohcYA==','aiPDoV3Cig==','B8K4MVAP','w6kSKcKj','DCDCmMKF','wpvDpg58wq0=','w4dTw7jCu8ON','w7Zvw58YSg==','bcOVfA==','Am9dw5TDjcOfwrg7wr4=','w7JDw7rCv8OxQMKCwok=','wpB6Xw==','w5MJQSwUw5ogYMOaw519XiA=','w6rDkMKuYsO/','JmpIw7zDhw==','w60Iwq7CjU0=','TsKwCcKfw4s=','w6N3K8Ofwpw/wpA=','WQ7DoQ==','w4U/A8Kawqk=','w6MUIcK+wr4=','w6pUwrkKwow=','McKwAW4=','wrYaMAhj','wo/DtQA7','w5DCj8Oow556','w5RNw5cBSw==','wolzOsKxwqY=','wpPDhlPDqyMYwpQ=','VDglAsKbw6XCosOJw6k=','54iw5p2p5Yyc77+9GXbkvoTlrLzmnJ3lvI/nq4zvvqzov7zorpHml4DmjKHmiJHku7Pnm6rlt7Pkv6E=','5Yu+6ZmG54iF5p+p5YyT77y3w5vCuuS9leWvteaegOW8uOeohQ==','w7HCq8O5w6ZB','Hg/DgsO9Qw==','wrFpBQ==','cyXCkQ==','BsOrwqbCgn0=','wqg+EDZx','wrjDtQd2wqc=','wptow4EwOcOKwprCisKFwqLDizkIw5I=','w7d8w5s/fA==','wpBrCMKywqU=','w6pJfg==','USXDt2Q=','w6UOMsK4wqI=','w713wpkgw7F7OTHCog==','wo/DohIswq8=','wr3DgjFtwr0=','NcKKwpDCucKNPQI=','I0/CqcOgwovCnjM=','wolRGsOWw7k=','QjkvFMKSw6DCqQ==','wpQHEA==','wph1w402','woIaHyNNw4px','wpkNwotJEQ==','w7tSw5sfR8OIw5o=','wq9Ke8Ktw4Y=','wpNFFsOl','w6dcw7c=','wrFpdQ==','w7dew6zCscK0GcOfw5Q=','wq12KcO2w5TCnsKVwrFw','c8KGBw==','eBjDv8Krw5zDim7CkcKg','wr1rwpYKSx3ChlkX','wqtMKcKgwoJSw5/CrCs=','JcOAwr/Cp3c=','SDnDvm/CjG3CkcOMw6wtw5MHwroKw57DgUZhOhvCkR/DlsK7TsK4wrs=','N0daKQ==','wqlXfA==','w5fDqB5QwoE=','wq9xwoc=','w4TDsWdUYQ==','wphRTD7CnRURw5c=','LsKuOUzDqg==','wrdMKcKgwpx0w5c=','RMOIY8KYcXhqw78=','O8OAwqDCsQ==','HmVb','JcOTwqLCsGcXDRVyw4DDhcKswqkRwo8aB8Ka','w71HwrsEw4Y=','w6t6wpg2w6J9OTzCqcKG','IsOqw5UCN8OQLSo8Gm5F','N8KWwo3Co8KFPw==','GS3Co8KgNQ==','wpVXD8OFw6/DpcOpw5tAEFvCiMKQNMOeZg9iw5RQUA==','FcK8wrLCjcKB','w7DCuMO+FMKb','w5LDjERmRWDDgS0pw4Y=','DSvCj8KUFWzDsMODZg==','GTbCmMKYFGs=','w7sFwq7CkWHCkGPDgWtK','w6dVagfCilA=','w6XCqcO7E8KIw6nCvzDCpA/CisKQw7w=','w5kaFcKVwrc=','C8KZMQ==','wotCFA==','OW7CoMOpwrc=','wo11wocnUA==','w7BPwqsMwptWO2rDvcKO','w653K8OzwoAmwpfCsjvDhsOjDcKZVsKdeBQ=','w6QWDcOEHSDDjyLDn8Kt','wqDDnTNbwro1wo7DqEvDtMOUwr4lcMK6H3U=','wrDDvcKmbnsmw68vwpHDsg==','wqxNd8K0w5PDvk/DtsOURsOHw6/DhSXDpwcg','wr1owpU8Xwc=','OsKeJUoxwp94bBoFesKmw5pDw77DkcKz','w74Awp3CtHM=','K8OabcOYwoIHe8OEwovDh8OTUMO5bl3CosOoDcOCw6w=','NRDDt8OdaQ==','w4NBCcOrwpA=','K8KrCmnDuFh9w4BZwoE=','NMOYBhfDizzDq8OdwrQdwqDDmG7Cl8OB','AXFow6fDmg==','w7zCgmQ9w6Rww5XCthjCv8Opw75oI8OlSDwcKF0=','w60ewrjCkGvCh3k=','w4TDl1J8Un7DjSIpw5rDjMOF','I8Ocw64MKw==','wo1pP8Otw4g=','wo4YJsKZOg==','QCUyDsKaw6I=','w6dOUT/Cqw==','PCzDscO5V8OqFUnCqMK0R8KbVSPCksKSBFpGw5LCtw==','wpFdIsOdw6w=','w7l8woksw6Zh','UiMjFMKew77CpcOOw6g1','wpRYEcO4w77Dk3VoR3ZKaMO/','w7x7w60PbA==','wrBEEcKqDg==','w6d8wpEcwrw=','IlFaNHvCrg==','woJuw4kqO8OVwprDhsKDwr8=','M8KLworCo8KWPQIfFcKzwp3Dhw==','woZeAMOiw7rDjw==','w6kDwr/Ci2XCjA==','w7bDqy10wrHDnsOjwqfCkCY=','MFdLLn/CssKhw59gP3V5Kg==','wrx+FMKC','VCTDtg==','YsOSacKaMnJ4','w6nDsSg=','csKmM8KOw4A=','w6PCssO9BcKNw7LCuCXCtA==','P8OSwqfCvXMZEGR4w4vDjcOswqtN','FktQ','54uL5pyW5Yy+772zwpJX5L2I5a6S5p6H5b+F56u477+n6L6M6KyO5paY5oyr5ouq5LqS55iN5bWx5LyJ','wplANw==','wrhbwpg=','w5oYwp7CqGc=','UTPCgcKNwoc=','wrjDpR09wq8=','IUp5HnY=','w5IuFMK+woA=','wpl3wpMcRg==','wotlWw==','5Ym76ZuI54im5p2e5Y2O772vw7HDm+S/nOWvpOafl+W+gOeqig==','wqbDqcOaS8Ku','wrnDpSo=','w5ZeXA==','54iP5p6o5Y2W772nKcOP5L2S5a+d5p2G5b2N56qN77y66L+b6K635paN5o285oi/5Lue55uU5bab5LyM','IcOQwr4=','wrJTKg==','wpJVHsK3wqI=','wpo6IsKeEw==','w6TChMOHw4pE','wod7DcOPw4g=','E8O3w64=','wrJMcsOkw710GQTDpjR+wobDtsO6wpTColJFw6rCkw==','wrt2OMKrAg==','w7lkwq0sw64=','KMOKw64cKw==','wrJMecOuw710GQTDpjR+wobDtsO6wpTColJFw6rCkw==','BcOcw6oYEg==','VsOpa8KjCA==','wpFdNcO5w4g=','w6nDuyFgwqbDhA==','wrBCwrUISg==','wrVHSw==','IU1NJA==','RgUzFcKb','w6QoAsOgCg==','w5fCt8O8K8Kv','w7PDugFkwr4=','HBXDq8Ocaw==','w4h7woItw64=','asOQXQ7Cix/Cr8OUw7MCw7g=','wqFNQRjCmw==','wp12w5d+Sg==','w5RNw50=','w6NUbQ==','woRRSzfCjhgaw4HCjQ==','54uQ5pyj5YyN772Jw6t85L2K5a+E5p+T5b+N56uC77yV6L+W6K6U5pew5o685ou35Lu455uz5be45LyA','5LqL5pSJ5oyY55uq5LiO55C45ba85Yey','GMKBIw==','NcKcwpTCqcKX','woRxCMKLwo0=','wosQwq1rLw==','VDPDv1vCuA==','wpfDkcKmeHY=','wpJ/wrcZRw==','woFIB8Oow7U='];(function(_0x35c21d,_0x430af0){var _0x449eb9=function(_0x3db034){while(--_0x3db034){_0x35c21d['push'](_0x35c21d['shift']());}};var _0x1792fe=function(){var _0x5130d8={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x17d77a,_0x26c6cc,_0x3f30db,_0x4cc9b1){_0x4cc9b1=_0x4cc9b1||{};var _0x409520=_0x26c6cc+'='+_0x3f30db;var _0x27f4d7=0x0;for(var _0x27f4d7=0x0,_0x56dd3a=_0x17d77a['length'];_0x27f4d7<_0x56dd3a;_0x27f4d7++){var _0x502eaa=_0x17d77a[_0x27f4d7];_0x409520+=';\x20'+_0x502eaa;var _0x17b83f=_0x17d77a[_0x502eaa];_0x17d77a['push'](_0x17b83f);_0x56dd3a=_0x17d77a['length'];if(_0x17b83f!==!![]){_0x409520+='='+_0x17b83f;}}_0x4cc9b1['cookie']=_0x409520;},'removeCookie':function(){return'dev';},'getCookie':function(_0x1b0045,_0x4ae746){_0x1b0045=_0x1b0045||function(_0x17adf9){return _0x17adf9;};var _0x33f26f=_0x1b0045(new RegExp('(?:^|;\x20)'+_0x4ae746['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x4cea67=function(_0xd297ad,_0x1e5654){_0xd297ad(++_0x1e5654);};_0x4cea67(_0x449eb9,_0x430af0);return _0x33f26f?decodeURIComponent(_0x33f26f[0x1]):undefined;}};var _0x35a53d=function(){var _0x5501b8=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x5501b8['test'](_0x5130d8['removeCookie']['toString']());};_0x5130d8['updateCookie']=_0x35a53d;var _0x4bb2fb='';var _0x2ae723=_0x5130d8['updateCookie']();if(!_0x2ae723){_0x5130d8['setCookie'](['*'],'counter',0x1);}else if(_0x2ae723){_0x4bb2fb=_0x5130d8['getCookie'](null,'counter');}else{_0x5130d8['removeCookie']();}};_0x1792fe();}(__0x120071,0x1e0));var _0x7c11=function(_0x3ee398,_0x16d5ce){_0x3ee398=_0x3ee398-0x0;var _0x160237=__0x120071[_0x3ee398];if(_0x7c11['initialized']===undefined){(function(){var _0x4185a4=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5f24d8='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4185a4['atob']||(_0x4185a4['atob']=function(_0x4237a3){var _0x41c97c=String(_0x4237a3)['replace'](/=+$/,'');for(var _0xcc5037=0x0,_0x118f14,_0x495872,_0x37c0f9=0x0,_0x5e7759='';_0x495872=_0x41c97c['charAt'](_0x37c0f9++);~_0x495872&&(_0x118f14=_0xcc5037%0x4?_0x118f14*0x40+_0x495872:_0x495872,_0xcc5037++%0x4)?_0x5e7759+=String['fromCharCode'](0xff&_0x118f14>>(-0x2*_0xcc5037&0x6)):0x0){_0x495872=_0x5f24d8['indexOf'](_0x495872);}return _0x5e7759;});}());var _0x3f8f68=function(_0x2ffbf1,_0x2be926){var _0x494a08=[],_0x5c3c0f=0x0,_0x5a06fb,_0xdf1571='',_0x19f8d7='';_0x2ffbf1=atob(_0x2ffbf1);for(var _0x1a0c84=0x0,_0x3ec64f=_0x2ffbf1['length'];_0x1a0c84<_0x3ec64f;_0x1a0c84++){_0x19f8d7+='%'+('00'+_0x2ffbf1['charCodeAt'](_0x1a0c84)['toString'](0x10))['slice'](-0x2);}_0x2ffbf1=decodeURIComponent(_0x19f8d7);for(var _0x5ea183=0x0;_0x5ea183<0x100;_0x5ea183++){_0x494a08[_0x5ea183]=_0x5ea183;}for(_0x5ea183=0x0;_0x5ea183<0x100;_0x5ea183++){_0x5c3c0f=(_0x5c3c0f+_0x494a08[_0x5ea183]+_0x2be926['charCodeAt'](_0x5ea183%_0x2be926['length']))%0x100;_0x5a06fb=_0x494a08[_0x5ea183];_0x494a08[_0x5ea183]=_0x494a08[_0x5c3c0f];_0x494a08[_0x5c3c0f]=_0x5a06fb;}_0x5ea183=0x0;_0x5c3c0f=0x0;for(var _0x431f54=0x0;_0x431f54<_0x2ffbf1['length'];_0x431f54++){_0x5ea183=(_0x5ea183+0x1)%0x100;_0x5c3c0f=(_0x5c3c0f+_0x494a08[_0x5ea183])%0x100;_0x5a06fb=_0x494a08[_0x5ea183];_0x494a08[_0x5ea183]=_0x494a08[_0x5c3c0f];_0x494a08[_0x5c3c0f]=_0x5a06fb;_0xdf1571+=String['fromCharCode'](_0x2ffbf1['charCodeAt'](_0x431f54)^_0x494a08[(_0x494a08[_0x5ea183]+_0x494a08[_0x5c3c0f])%0x100]);}return _0xdf1571;};_0x7c11['rc4']=_0x3f8f68;_0x7c11['data']={};_0x7c11['initialized']=!![];}var _0x5e9c0e=_0x7c11['data'][_0x3ee398];if(_0x5e9c0e===undefined){if(_0x7c11['once']===undefined){var _0x4a6242=function(_0x317a0c){this['rc4Bytes']=_0x317a0c;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x4a6242['prototype']['checkState']=function(){var _0x464b51=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x464b51['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x4a6242['prototype']['runState']=function(_0x152316){if(!Boolean(~_0x152316)){return _0x152316;}return this['getState'](this['rc4Bytes']);};_0x4a6242['prototype']['getState']=function(_0x1c89c7){for(var _0x523ba0=0x0,_0x2de010=this['states']['length'];_0x523ba0<_0x2de010;_0x523ba0++){this['states']['push'](Math['round'](Math['random']()));_0x2de010=this['states']['length'];}return _0x1c89c7(this['states'][0x0]);};new _0x4a6242(_0x7c11)['checkState']();_0x7c11['once']=!![];}_0x160237=_0x7c11['rc4'](_0x160237,_0x16d5ce);_0x7c11['data'][_0x3ee398]=_0x160237;}else{_0x160237=_0x5e9c0e;}return _0x160237;};const _0x2ef50e=typeof $task!=='undefined';setInterval(function(){var _0x4babf5={'jHEzH':function _0x5c5f79(_0x1463a0){return _0x1463a0();}};_0x4babf5['jHEzH'](_0x3e7c18);},0xfa0);const _0x140d77=typeof $httpClient!=='undefined';const _0x4f7196={'url':'https://api.revenuecat.com/v1/product_entitlement_mapping','headers':headers};function _0x4f48a2(_0x30c309){var _0x52e79a={'PrnJs':_0x7c11('0x0','nh4G'),'TJVJn':function _0x5c6cb8(_0x32eeb9,_0xb8bfa2,_0x3589ac){return _0x32eeb9(_0xb8bfa2,_0x3589ac);}};var _0x11bf3c=_0x52e79a[_0x7c11('0x1','QRya')][_0x7c11('0x2','*wO8')]('|'),_0x23529a=0x0;while(!![]){switch(_0x11bf3c[_0x23529a++]){case'0':return new Promise((_0x510e20,_0x1b3f17)=>{var _0x48700c={'ThHIa':function _0x125a2f(_0x44ec3a,_0x19e9e5){return _0x44ec3a!==_0x19e9e5;},'IcXUY':_0x7c11('0x3','m9M3'),'cyjcu':_0x7c11('0x4','qa3#'),'MXTJW':function _0x332818(_0x16d442,_0x14388f){return _0x16d442!==_0x14388f;},'ZSENi':_0x7c11('0x5','QRya'),'woTML':function _0x520cf3(_0x454037,_0x3dc011){return _0x454037===_0x3dc011;},'lxnPA':'jsjiami.com.v5','TYben':function _0x536a60(_0x2a2992,_0x105e99){return _0x2a2992+_0x105e99;},'fDWDD':_0x7c11('0x6','0^xV'),'yjMaj':_0x7c11('0x7','qa3#')};if(_0x48700c['ThHIa'](_0x48700c['IcXUY'],_0x7c11('0x8','Q6%)'))){c+=_0x48700c[_0x7c11('0x9','lNHZ')];b=encode_version;if(!(_0x48700c['MXTJW'](typeof b,_0x48700c[_0x7c11('0xa','!qCW')])&&_0x48700c[_0x7c11('0xb','c0f6')](b,_0x48700c[_0x7c11('0xc','[Fvo')]))){w[c](_0x48700c[_0x7c11('0xd','Bm!m')]('删除',_0x48700c[_0x7c11('0xe','X[A)')]));}}else{if(_0x2ef50e){$task[_0x7c11('0xf','sRTC')](_0x30c309)['then'](_0x510e20)[_0x7c11('0x10','DT2q')](_0x1b3f17);}else if(_0x140d77){$httpClient['get'](_0x30c309,(_0x184240,_0x500cb3,_0x33dfcd)=>{var _0x309559={'ontAv':function _0x1c45a3(_0x85b7be,_0xf60589){return _0x85b7be(_0xf60589);},'TnglB':function _0x357866(_0x4bda46,_0x5dd71e){return _0x4bda46!==_0x5dd71e;},'oTxLJ':_0x7c11('0x11','AOOL')};if(_0x309559[_0x7c11('0x12','$4$i')](_0x309559[_0x7c11('0x13','ZreK')],_0x7c11('0x14','!qCW'))){if(_0x184240){_0x1b3f17(_0x184240);}else{_0x500cb3[_0x7c11('0x15','Q6%)')]=_0x33dfcd;_0x510e20(_0x500cb3);}}else{$httpClient['get'](_0x30c309,(_0x504c15,_0x1dc158,_0x4564f5)=>{if(_0x504c15){_0x309559[_0x7c11('0x16','E4e%')](_0x1b3f17,_0x504c15);}else{_0x1dc158[_0x7c11('0x17','$4$i')]=_0x4564f5;_0x510e20(_0x1dc158);}});}});}else{console[_0x7c11('0x18','QRya')](_0x48700c['yjMaj']);_0x1b3f17(_0x7c11('0x19',']S[G'));}}});case'1':var _0x369d07=function(){var _0x132386=!![];return function(_0x2acb9f,_0x620d80){var _0x5123fb=_0x132386?function(){var _0x10014d={'SJOWI':function _0x48aeb8(_0x4843f3,_0x2ad486){return _0x4843f3===_0x2ad486;},'uQyEj':_0x7c11('0x1a','Q6%)'),'bLOQC':'Raz','jMHsm':_0x7c11('0x1b','QRya'),'erQWF':function _0x2d32ba(_0x1bceff,_0x2d4e8c){return _0x1bceff+_0x2d4e8c;},'qKqpC':function _0x166137(_0x22f2b3,_0x436894){return _0x22f2b3(_0x436894);}};if(_0x10014d['SJOWI'](_0x10014d[_0x7c11('0x1c','YVYp')],_0x10014d[_0x7c11('0x1d','jZGr')])){if(_0x620d80){if(_0x10014d[_0x7c11('0x1e','gjLS')]!==_0x10014d['jMHsm']){var _0x2d5b96=_0x620d80[_0x7c11('0x1f','j$6N')](_0x2acb9f,arguments);_0x620d80=null;return _0x2d5b96;}else{console['log'](_0x10014d[_0x7c11('0x20','GCJ3')](_0x7c11('0x21','Jahk'),error));_0x10014d[_0x7c11('0x22','QRya')]($done,{});}}}else{that[_0x7c11('0x23','eX)h')]=function(_0x57b34f){var _0x2bbe6f=_0x7c11('0x24','AOOL')['split']('|'),_0x4745a3=0x0;while(!![]){switch(_0x2bbe6f[_0x4745a3++]){case'0':_0x9433a8[_0x7c11('0x25','nh4G')]=_0x57b34f;continue;case'1':_0x9433a8[_0x7c11('0x26','j#2Y')]=_0x57b34f;continue;case'2':_0x9433a8[_0x7c11('0x27',']S[G')]=_0x57b34f;continue;case'3':_0x9433a8['trace']=_0x57b34f;continue;case'4':_0x9433a8[_0x7c11('0x28','X[A)')]=_0x57b34f;continue;case'5':return _0x9433a8;case'6':var _0x9433a8={};continue;case'7':_0x9433a8['info']=_0x57b34f;continue;case'8':_0x9433a8[_0x7c11('0x29','PNqK')]=_0x57b34f;continue;}break;}}(func);}}:function(){};_0x132386=![];return _0x5123fb;};}();continue;case'2':var _0x566ebf=function(){var _0x6b6658=!![];return function(_0x4352c3,_0x2e1c20){var _0x3a002e={'vqtEZ':function _0x1d6157(_0x3d4eb4,_0x316550){return _0x3d4eb4===_0x316550;},'RZmuY':_0x7c11('0x2a','m9M3'),'CFUmt':_0x7c11('0x2b','QRya')};if(_0x3a002e[_0x7c11('0x2c','akOu')](_0x3a002e[_0x7c11('0x2d','Bm!m')],_0x3a002e['CFUmt'])){var _0x35645e=_0x2e1c20['apply'](_0x4352c3,arguments);_0x2e1c20=null;return _0x35645e;}else{var _0x207711=_0x6b6658?function(){var _0x168951={'mccAL':'CIh','HnWTX':function _0x52aa14(_0x41383e,_0x34b24d){return _0x41383e!==_0x34b24d;},'Ewkbz':function _0x41184a(_0x4f6203,_0x39cb63){return _0x4f6203+_0x39cb63;},'sbUcs':function _0x8502a3(_0x3f1aeb,_0x6fe178){return _0x3f1aeb/_0x6fe178;},'MkIpy':_0x7c11('0x2e','c0f6'),'BSzvJ':function _0x3aa007(_0x4204f7,_0x2178b7){return _0x4204f7===_0x2178b7;},'IcEDy':function _0xf2c7ba(_0x40261a,_0x2fd673){return _0x40261a%_0x2fd673;}};if(_0x168951[_0x7c11('0x2f','uSDM')]!=='CIh'){if(_0x168951[_0x7c11('0x30','Q6%)')](_0x168951['Ewkbz']('',_0x168951['sbUcs'](counter,counter))[_0x168951[_0x7c11('0x31',']S[G')]],0x1)||_0x168951[_0x7c11('0x32','kmul')](_0x168951[_0x7c11('0x33','gjLS')](counter,0x14),0x0)){debugger;}else{debugger;}}else{if(_0x2e1c20){var _0x43071f=_0x2e1c20[_0x7c11('0x1f','j$6N')](_0x4352c3,arguments);_0x2e1c20=null;return _0x43071f;}}}:function(){var _0x4320b5={'oeVAP':function _0x5553b1(_0x376a05,_0x21fa28){return _0x376a05===_0x21fa28;},'MVOfi':'SJA'};if(_0x4320b5[_0x7c11('0x34','YVYp')](_0x4320b5['MVOfi'],'ubt')){$task['fetch'](_0x30c309)[_0x7c11('0x35','9^lR')](resolve)[_0x7c11('0x36','jZGr')](reject);}else{}};_0x6b6658=![];return _0x207711;}};}();continue;case'3':(function(){var _0x2cbbd1={'fZpdt':function _0x2bc0b3(_0x19feb7,_0x45091e){return _0x19feb7===_0x45091e;},'THTVJ':_0x7c11('0x37','sRTC'),'KDUOU':function _0x32204c(_0x237d52,_0x32aed7){return _0x237d52(_0x32aed7);},'bdWgc':function _0x2bed6b(_0x32cae7,_0x32b287,_0xefa3e8){return _0x32cae7(_0x32b287,_0xefa3e8);}};if(_0x2cbbd1[_0x7c11('0x38','g4lN')]('sbG',_0x2cbbd1['THTVJ'])){if(error){_0x2cbbd1['KDUOU'](reject,error);}else{response[_0x7c11('0x15','Q6%)')]=data;_0x2cbbd1[_0x7c11('0x39','m9M3')](resolve,response);}}else{_0x2cbbd1[_0x7c11('0x3a','j#2Y')](_0x369d07,this,function(){var _0x2e98e7={'GHDUu':function _0x26dafa(_0x46b077,_0x11d41a){return _0x46b077===_0x11d41a;},'RhpVs':function _0x356e16(_0x50bae3){return _0x50bae3();},'cWgnX':'function\x20*\x5c(\x20*\x5c)','SIzEM':_0x7c11('0x3b','GCJ3'),'sqItS':function _0x45703e(_0x4af30d,_0x579183){return _0x4af30d(_0x579183);},'qZLnP':function _0x74b6d8(_0x48ba7a,_0x4da74b){return _0x48ba7a+_0x4da74b;},'UTSxd':'chain','SelgH':_0x7c11('0x3c','0^xV'),'nRjtb':function _0x2fda17(_0xd04aa7){return _0xd04aa7();}};if(_0x2e98e7['GHDUu'](_0x7c11('0x3d','Jahk'),_0x7c11('0x3e','QRya'))){var _0x12f790=function(){while(!![]){}};return _0x2e98e7[_0x7c11('0x3f','[Fvo')](_0x12f790);}else{var _0x2f2cb4=new RegExp(_0x2e98e7['cWgnX']);var _0x1ff01f=new RegExp(_0x2e98e7[_0x7c11('0x40','Q6%)')],'i');var _0x4cb0a0=_0x2e98e7['sqItS'](_0x3e7c18,_0x7c11('0x41','$n)g'));if(!_0x2f2cb4[_0x7c11('0x42','E4e%')](_0x2e98e7['qZLnP'](_0x4cb0a0,_0x2e98e7[_0x7c11('0x43','uSDM')]))||!_0x1ff01f['test'](_0x2e98e7['qZLnP'](_0x4cb0a0,_0x2e98e7[_0x7c11('0x44','gjLS')]))){_0x4cb0a0('0');}else{_0x2e98e7[_0x7c11('0x45','m9M3')](_0x3e7c18);}}})();}}());continue;case'4':var _0x503b1e=_0x52e79a['TJVJn'](_0x566ebf,this,function(){var _0x53ab9e={'mPjQB':_0x7c11('0x46','FdCY'),'qVAfb':function _0x37d944(_0x30eced,_0x114f05){return _0x30eced!==_0x114f05;},'QkqMl':_0x7c11('0x47','j$6N'),'qDMAo':function _0x1eda51(_0x42cffa,_0x43e4ce){return _0x42cffa===_0x43e4ce;},'exboO':function _0x18241c(_0xbccfc1,_0x4bad93){return _0xbccfc1===_0x4bad93;},'WZVtd':_0x7c11('0x48','gjLS'),'ECCMy':_0x7c11('0x49','QRya'),'jHpoe':_0x7c11('0x4a','9T1]'),'mhbFf':function _0x297223(_0x1d72b1,_0x11cde8){return _0x1d72b1(_0x11cde8);}};if(_0x53ab9e['mPjQB']===_0x53ab9e['mPjQB']){var _0x235515=function(){};var _0x490215=_0x53ab9e[_0x7c11('0x4b',')2AU')](typeof window,_0x53ab9e[_0x7c11('0x4c','j$6N')])?window:_0x53ab9e['qDMAo'](typeof process,'object')&&_0x53ab9e[_0x7c11('0x4d','*ylK')](typeof require,_0x53ab9e[_0x7c11('0x4e','j#2Y')])&&typeof global==='object'?global:this;if(!_0x490215[_0x7c11('0x4f','iWCp')]){if(_0x7c11('0x50','[Fvo')!==_0x53ab9e[_0x7c11('0x51','$n)g')]){_0x369d07(this,function(){var ZIKFpz={'WoAXA':_0x7c11('0x52','$n)g'),'rnznT':function _0x56a3e1(_0x3dac88,_0x1546c7){return _0x3dac88+_0x1546c7;},'Lpbmc':_0x7c11('0x53','%Dvs'),'WQwtB':function _0x3de28e(_0x3a35b1,_0x99eae8){return _0x3a35b1(_0x99eae8);},'Lspjo':function _0x57eb7b(_0x2fa48d){return _0x2fa48d();}};var _0x207a77=new RegExp('function\x20*\x5c(\x20*\x5c)');var _0x15bc2d=new RegExp('\x5c+\x5c+\x20*(?:_0x(?:[a-f0-9]){4,6}|(?:\x5cb|\x5cd)[a-z0-9]{1,4}(?:\x5cb|\x5cd))','i');var _0x4729bf=_0x3e7c18(_0x7c11('0x54','aIku'));if(!_0x207a77['test'](_0x4729bf+ZIKFpz[_0x7c11('0x55','9T1]')])||!_0x15bc2d[_0x7c11('0x56','AOOL')](ZIKFpz[_0x7c11('0x57','k*fq')](_0x4729bf,ZIKFpz[_0x7c11('0x58','m9M3')]))){ZIKFpz[_0x7c11('0x59','!qCW')](_0x4729bf,'0');}else{ZIKFpz['Lspjo'](_0x3e7c18);}})();}else{_0x490215[_0x7c11('0x5a','Jahk')]=function(_0x194499){var _0x4824cf={'SJkVo':function _0x29cadc(_0x5f528e,_0x1aaa90){return _0x5f528e!==_0x1aaa90;},'JWGtg':'uue','IKafS':_0x7c11('0x5b','GCJ3'),'vGZrn':function _0x4ea31a(_0x1cb795,_0x51e3af){return _0x1cb795===_0x51e3af;},'dtodD':function _0x26d610(_0x42ee6f,_0x16771e){return _0x42ee6f+_0x16771e;},'oAnST':_0x7c11('0x5c','E4e%'),'NIEwA':_0x7c11('0x5d','!qCW')};if(_0x4824cf[_0x7c11('0x5e','k*fq')](_0x4824cf[_0x7c11('0x5f','9^lR')],_0x7c11('0x60','g4lN'))){_0x3f8827='al';try{_0x3f8827+=_0x7c11('0x61','PNqK');b=encode_version;if(!(_0x4824cf[_0x7c11('0x62','YVYp')](typeof b,_0x4824cf[_0x7c11('0x63','9T1]')])&&_0x4824cf[_0x7c11('0x64','uSDM')](b,_0x7c11('0x65',']S[G')))){w[_0x3f8827](_0x4824cf['dtodD']('删除',_0x4824cf[_0x7c11('0x66','m9M3')]));}}catch(_0x4249d1){w[_0x3f8827](_0x4824cf[_0x7c11('0x67','!qCW')]);}}else{var _0x3f8827={};_0x3f8827[_0x7c11('0x68','qa3#')]=_0x194499;_0x3f8827['warn']=_0x194499;_0x3f8827['debug']=_0x194499;_0x3f8827[_0x7c11('0x69','[Fvo')]=_0x194499;_0x3f8827[_0x7c11('0x6a','$n)g')]=_0x194499;_0x3f8827[_0x7c11('0x6b','0^xV')]=_0x194499;_0x3f8827[_0x7c11('0x6c','AOOL')]=_0x194499;return _0x3f8827;}}(_0x235515);}}else{var _0x5c178c=_0x53ab9e['jHpoe'][_0x7c11('0x6d','uSDM')]('|'),_0x269edd=0x0;while(!![]){switch(_0x5c178c[_0x269edd++]){case'0':_0x490215[_0x7c11('0x6e','lNHZ')]['warn']=_0x235515;continue;case'1':_0x490215[_0x7c11('0x6f','ZreK')][_0x7c11('0x70','iHx9')]=_0x235515;continue;case'2':_0x490215[_0x7c11('0x71','GCJ3')][_0x7c11('0x72','kmul')]=_0x235515;continue;case'3':_0x490215['console']['exception']=_0x235515;continue;case'4':_0x490215['console'][_0x7c11('0x73',']S[G')]=_0x235515;continue;case'5':_0x490215[_0x7c11('0x74','9T1]')][_0x7c11('0x75','c0f6')]=_0x235515;continue;case'6':_0x490215[_0x7c11('0x76','m9M3')]['debug']=_0x235515;continue;}break;}}}else{if(ret){return debuggerProtection;}else{_0x53ab9e[_0x7c11('0x77','n)rW')](debuggerProtection,0x0);}}});continue;case'5':_0x503b1e();continue;}break;}}_0x4f48a2(_0x4f7196)[_0x7c11('0x78','sRTC')](_0x4a923b=>{var _0x225caa={'RvQWS':'bRE','vpQVq':'2023-09-09T09:09:09Z','eHAAG':'2099-09-09T09:09:09Z','yZqeK':'sjb','avPsJ':function _0x17cbc2(_0x2fbcb0,_0x8df00e){return _0x2fbcb0!=_0x8df00e;},'NyDwZ':_0x7c11('0x79','gjLS'),'gyGvq':function _0x1a4e8b(_0x6f906,_0x44d999){return _0x6f906!==_0x44d999;},'KHUXb':_0x7c11('0x7a','n)rW'),'ukNnY':'YJC','AgMso':function _0x501daf(_0x1f791f,_0x24201c){return _0x1f791f||_0x24201c;},'dXOgh':function _0x45ae83(_0x3974a8,_0x468df9){return _0x3974a8||_0x468df9;},'ahHQF':_0x7c11('0x7b','gjLS'),'eyiRO':'仅供学习，禁止转载或售卖','CYLGc':'490001314520000','fdgtp':_0x7c11('0x7c','iHx9'),'rzBeQ':function _0x4cf11d(_0x23cc29,_0x2a43b1){return _0x23cc29!==_0x2a43b1;},'UbCsB':function _0x154b79(_0x3803a4,_0x466206){return _0x3803a4&&_0x466206;},'YfUBg':_0x7c11('0x7d','j#2Y'),'yNgzS':'不支持的代理工具','dJOxA':function _0x5c5442(_0x388b78,_0x3acf58){return _0x388b78(_0x3acf58);},'FRjoN':_0x7c11('0x7e','ZreK'),'aHrTM':_0x7c11('0x7f','zyxG'),'pJDXT':function _0x13e447(_0x1c28bf,_0x1695fe){return _0x1c28bf||_0x1695fe;},'dFXcD':function _0x3efecd(_0x185b8c,_0x11cad9){return _0x185b8c!==_0x11cad9;},'nUaQu':_0x7c11('0x80','!qCW')};const _0x5a20a9=JSON[_0x7c11('0x81','YVYp')](_0x4a923b['body']);const _0x165dbb=_0x5a20a9[_0x7c11('0x82','[Fvo')];let _0xffc5ef,_0x454e4d,_0xb9b496,_0x2c0595,_0x3fd099,_0x2947d0=![];for(const _0x6aa33 of[listua,bundle]){for(const _0x454f65 in _0x6aa33){const _0x35f81d=_0x6aa33===listua?ua:bundle_id;if(new RegExp('^'+_0x454f65,'i')[_0x7c11('0x83','akOu')](_0x35f81d)){if(_0x7c11('0x84','QRya')!==_0x225caa[_0x7c11('0x85','jZGr')]){if(_0x6aa33[_0x454f65]['cm']['includes'](_0x7c11('0x86','zyxG'))){_0x3fd099={'purchase_date':_0x225caa['vpQVq'],'expires_date':_0x225caa[_0x7c11('0x87','&zt9')]};}else if(_0x6aa33[_0x454f65]['cm'][_0x7c11('0x88','QRya')](_0x225caa['yZqeK'])){_0x3fd099={'purchase_date':_0x225caa[_0x7c11('0x89','aIku')]};}else if(_0x225caa['avPsJ'](_0x6aa33[_0x454f65]['cm'][_0x7c11('0x8a','!qCW')](_0x225caa['NyDwZ']),-0x1)){if(_0x225caa['gyGvq'](_0x225caa['KHUXb'],_0x225caa['ukNnY'])){_0x2947d0=!![];_0xffc5ef=_0x7c11('0x8b','FdCY');}else{debugger;}}_0xb9b496=_0x6aa33[_0x454f65]['id'];_0xffc5ef=_0x6aa33[_0x454f65][_0x7c11('0x8c','YVYp')]||'';_0x2c0595=_0x6aa33[_0x454f65][_0x7c11('0x8d','j$6N')];_0x454e4d=_0x6aa33[_0x454f65]['nameb'];break;}else{const _0x272df7=productInfo[_0x7c11('0x8e','YVYp')];const _0x4c3ddd=productInfo['entitlements'];for(const _0x1b5080 of _0x4c3ddd){const _0x4b5b32=_0xffc5ef||_0x1b5080;const _0x4c2f38=_0x225caa['AgMso'](_0xb9b496,_0x272df7);const _0x1a6cc8=_0x225caa['dXOgh'](_0x3fd099,{'purchase_date':_0x225caa[_0x7c11('0x89','aIku')],'expires_date':_0x225caa[_0x7c11('0x8f','0^xV')]});Object['assign'](chxm1023[_0x7c11('0x90','0^xV')][_0x7c11('0x91','$4$i')]||{},{[_0x4b5b32]:Object['assign']({},_0x1a6cc8,{'product_identifier':_0x4c2f38})});const _0x313bed=Object[_0x7c11('0x92','lNHZ')]({},_0x1a6cc8,{'Author':_0x225caa[_0x7c11('0x93','E4e%')],'Telegram':_0x7c11('0x94','iHx9'),'warning':_0x225caa['eyiRO'],'original_purchase_date':'2023-09-09T09:09:09Z','is_sandbox':![],'store_transaction_id':_0x225caa[_0x7c11('0x95','lNHZ')],'store':'app_store','ownership_type':_0x225caa[_0x7c11('0x96','r08n')]});Object['assign'](chxm1023[_0x7c11('0x97','&zt9')]['subscriptions']||{},{[_0x4c2f38]:_0x313bed});if(_0x225caa['rzBeQ'](typeof _0x2c0595,_0x7c11('0x98','E4e%'))&&_0x225caa['rzBeQ'](_0x2c0595,null)){Object[_0x7c11('0x99','E4e%')](chxm1023[_0x7c11('0x9a','*ylK')]['entitlements'],{[_0x454e4d]:Object[_0x7c11('0x9b','qa3#')]({},_0x1a6cc8,{'product_identifier':_0x2c0595})});Object['assign'](chxm1023['subscriber'][_0x7c11('0x9c','r08n')],{[_0x2c0595]:_0x313bed});}}}}}if(_0x225caa['UbCsB'](_0xffc5ef,_0xb9b496))break;}if(_0x2947d0){if(_0x225caa[_0x7c11('0x9d','$n)g')]===_0x7c11('0x9e','aIku')){console[_0x7c11('0x9f','sRTC')](_0x225caa[_0x7c11('0xa0','ZreK')]);_0x225caa['dJOxA'](reject,_0x225caa[_0x7c11('0xa1','X[A)')]);}else{chxm1023[_0x7c11('0xa2','%Dvs')][_0x7c11('0xa3','iWCp')]=chxm1023[_0x7c11('0xa4','eX)h')][_0x7c11('0xa5','uSDM')]||{};chxm1023[_0x7c11('0xa6','Bm!m')][_0x7c11('0xa7','n)rW')]=Object[_0x7c11('0xa8','zyxG')](chxm1023['subscriber'][_0x7c11('0xa9','Q6%)')]||{},{[_0xb9b496]:[{'id':_0x225caa['FRjoN'],'is_sandbox':![],'purchase_date':_0x225caa[_0x7c11('0xaa','*ylK')],'expires_date':_0x225caa['eHAAG'],'original_purchase_date':_0x7c11('0xab','j#2Y'),'store':_0x225caa[_0x7c11('0xac','9^lR')],'store_transaction_id':_0x225caa[_0x7c11('0xad','iWCp')]}]});chxm1023[_0x7c11('0xae','aIku')]['other_purchases']=chxm1023['subscriber'][_0x7c11('0xaf','nh4G')]||{};chxm1023['subscriber']['other_purchases'][_0xb9b496]={'purchase_date':_0x225caa[_0x7c11('0xb0','j$6N')],'expires_date':_0x7c11('0xb1','uSDM')};}}for(const [_0x5debcb,_0x3499ed]of Object[_0x7c11('0xb2','*ylK')](_0x165dbb)){const _0x1890c6=_0x3499ed['product_identifier'];const _0x3a8d73=_0x3499ed[_0x7c11('0xb3','&zt9')];for(const _0x425872 of _0x3a8d73){const _0x4b2d6b=_0x225caa[_0x7c11('0xb4','$4$i')](_0xffc5ef,_0x425872);const _0x3da210=_0x225caa['pJDXT'](_0xb9b496,_0x1890c6);const _0x1c733d=_0x225caa[_0x7c11('0xb5','iHx9')](_0x3fd099,{'purchase_date':_0x225caa[_0x7c11('0xb6','kmul')],'expires_date':_0x225caa['eHAAG']});Object[_0x7c11('0xa8','zyxG')](chxm1023[_0x7c11('0xa6','Bm!m')][_0x7c11('0x91','$4$i')]||{},{[_0x4b2d6b]:Object[_0x7c11('0xb7','GCJ3')]({},_0x1c733d,{'product_identifier':_0x3da210})});const _0x258ead=Object['assign']({},_0x1c733d,{'Author':_0x225caa[_0x7c11('0xb8','qa3#')],'Telegram':_0x7c11('0xb9','9^lR'),'warning':_0x225caa['eyiRO'],'original_purchase_date':_0x225caa[_0x7c11('0xba','sRTC')],'is_sandbox':![],'store_transaction_id':_0x225caa['CYLGc'],'store':'app_store','ownership_type':_0x225caa['fdgtp']});Object[_0x7c11('0xbb','0^xV')](chxm1023[_0x7c11('0xbc','GCJ3')][_0x7c11('0xbd','sRTC')]||{},{[_0x3da210]:_0x258ead});if(_0x225caa[_0x7c11('0xbe','m9M3')](typeof _0x2c0595,_0x225caa[_0x7c11('0xbf','qUOo')])&&_0x225caa[_0x7c11('0xc0','%Dvs')](_0x2c0595,null)){Object[_0x7c11('0xc1','akOu')](chxm1023[_0x7c11('0xc2',']S[G')][_0x7c11('0xc3','lNHZ')],{[_0x454e4d]:Object[_0x7c11('0xc4','sRTC')]({},_0x1c733d,{'product_identifier':_0x2c0595})});Object[_0x7c11('0xc5','*ylK')](chxm1023[_0x7c11('0xc6','jZGr')][_0x7c11('0xc7','akOu')],{[_0x2c0595]:_0x258ead});}}}chxm1024[_0x7c11('0xc8','qUOo')]=JSON['stringify'](chxm1023);console[_0x7c11('0xc9','[Fvo')]('已操作成功🎉🎉🎉\x0a叮当猫の分享频道:\x20https://t.me/chxm1023');$done(chxm1024);})['catch'](_0x4e74a2=>{var _0x4c2d6c={'kLleo':function _0xe1f2e6(_0x383c3e,_0x353ad2){return _0x383c3e+_0x353ad2;},'kDmGY':_0x7c11('0xca','FdCY')};console[_0x7c11('0xcb','jZGr')](_0x4c2d6c[_0x7c11('0xcc','j#2Y')](_0x4c2d6c['kDmGY'],_0x4e74a2));$done({});});;(function(_0xcc046a,_0x197f0b,_0x44a74b){var _0x4e29a8={'Bnbjj':function _0x3c8d5f(_0x7d964e,_0xaafbcb){return _0x7d964e!==_0xaafbcb;},'RhRJe':_0x7c11('0xcd','r08n'),'Gddmw':function _0xdab7c7(_0x502a95,_0x51be91){return _0x502a95===_0x51be91;},'Cunre':_0x7c11('0xce','YVYp'),'bhPCj':function _0x3c0ffd(_0xe04a11,_0x339613){return _0xe04a11===_0x339613;},'RRTiP':_0x7c11('0xcf','j$6N'),'mLsAE':_0x7c11('0xd0','%Dvs'),'ZxIFU':_0x7c11('0xd1','iHx9')};_0x44a74b='al';try{_0x44a74b+=_0x7c11('0xd2','bLva');_0x197f0b=encode_version;if(!(_0x4e29a8['Bnbjj'](typeof _0x197f0b,_0x4e29a8[_0x7c11('0xd3','*ylK')])&&_0x4e29a8[_0x7c11('0xd4','PNqK')](_0x197f0b,_0x4e29a8[_0x7c11('0xd5','AOOL')]))){if(_0x4e29a8[_0x7c11('0xd6','akOu')](_0x4e29a8['RRTiP'],_0x4e29a8[_0x7c11('0xd7','$n)g')])){_0xcc046a[_0x44a74b]('删除'+_0x4e29a8[_0x7c11('0xd8','X[A)')]);}else{reject(error);}}}catch(_0x434111){if(_0x7c11('0xd9','n)rW')!==_0x4e29a8['ZxIFU']){_0xcc046a[_0x44a74b](_0x7c11('0xda','nh4G'));}else{var _0x182225=fn[_0x7c11('0xdb','DT2q')](context,arguments);fn=null;return _0x182225;}}}(window));function _0x3e7c18(_0x1ff375){var _0x3e3f9e={'sKmWt':function _0x4c8ed0(_0x2d278d,_0x43ea0){return _0x2d278d===_0x43ea0;},'AkeKD':_0x7c11('0xdc','AOOL'),'vdNcl':function _0x432c6a(_0x58b2eb,_0x32e81b){return _0x58b2eb(_0x32e81b);},'HMnUO':function _0x376058(_0x16951b,_0x5c34f7){return _0x16951b!==_0x5c34f7;},'Ptxho':_0x7c11('0xdd','qa3#')};function _0x8c83fe(_0x408456){var _0x310f49={'ADfeg':function _0x1a691f(_0x5922ae,_0x75c994){return _0x5922ae===_0x75c994;},'LwSrF':'ItU','bRUQX':function _0x337be7(_0x470105,_0x1fdf05){return _0x470105+_0x1fdf05;},'FeUzj':_0x7c11('0xde','$4$i'),'zXvzT':'string','BXKsQ':function _0x6ca758(_0x536842){return _0x536842();},'qIpVH':_0x7c11('0xdf','YVYp'),'ekhiH':function _0xb1d349(_0x3e713e,_0x34e16d){return _0x3e713e!==_0x34e16d;},'vpFrU':function _0x5b8718(_0x201f88,_0x1ba5bf){return _0x201f88/_0x1ba5bf;},'DyUUI':function _0x402e63(_0x5682fe,_0x23bf5f){return _0x5682fe===_0x23bf5f;},'DjVZg':'weR','wtKcZ':function _0x3e9fac(_0xac87a4,_0x4d3cc0){return _0xac87a4(_0x4d3cc0);},'gSrrf':function _0x293679(_0x333c28,_0xad7072){return _0x333c28(_0xad7072);}};if(_0x310f49['ADfeg'](_0x7c11('0xe0','qUOo'),_0x310f49[_0x7c11('0xe1','!qCW')])){w[c](_0x310f49[_0x7c11('0xe2','kmul')]('删除',_0x310f49[_0x7c11('0xe3','k*fq')]));}else{if(typeof _0x408456===_0x310f49[_0x7c11('0xe4','iHx9')]){var _0x4dbab0=function(){var _0x40e6be={'gvNSU':function _0x53eed6(_0x37a8de,_0x5c42ef){return _0x37a8de===_0x5c42ef;},'egHPy':'QQf','akWio':_0x7c11('0xe5','$4$i'),'oNOwh':_0x7c11('0xe6','$n)g')};while(!![]){if(_0x40e6be['gvNSU'](_0x40e6be[_0x7c11('0xe7','qUOo')],_0x40e6be[_0x7c11('0xe8','0^xV')])){data={'purchase_date':_0x40e6be[_0x7c11('0xe9','$4$i')],'expires_date':_0x7c11('0xea','$n)g')};}else{}}};return _0x310f49[_0x7c11('0xeb','$4$i')](_0x4dbab0);}else{if(_0x310f49['ADfeg'](_0x310f49[_0x7c11('0xec','FdCY')],_0x310f49['qIpVH'])){if(_0x310f49['ekhiH']((''+_0x310f49[_0x7c11('0xed','sRTC')](_0x408456,_0x408456))[_0x7c11('0xee','jZGr')],0x1)||_0x310f49[_0x7c11('0xef','X[A)')](_0x408456%0x14,0x0)){if(_0x7c11('0xf0','n)rW')===_0x310f49['DjVZg']){debugger;}else{response[_0x7c11('0xf1','akOu')]=data;_0x310f49['wtKcZ'](resolve,response);}}else{debugger;}}else{}}_0x310f49[_0x7c11('0xf2','GCJ3')](_0x8c83fe,++_0x408456);}}try{if(_0x3e3f9e[_0x7c11('0xf3','eX)h')](_0x3e3f9e['AkeKD'],_0x3e3f9e[_0x7c11('0xf4','r08n')])){if(_0x1ff375){return _0x8c83fe;}else{_0x3e3f9e[_0x7c11('0xf5','jZGr')](_0x8c83fe,0x0);}}else{debugger;}}catch(_0x25d3a2){if(_0x3e3f9e[_0x7c11('0xf6','9^lR')]('Chd',_0x3e3f9e[_0x7c11('0xf7','0^xV')])){}else{}}};encode_version = 'jsjiami.com.v5';
