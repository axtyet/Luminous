/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2024-11-22
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突
特别说明：此脚本可能会导致App Store无法登录ID
解决方法：关[MITM][脚本][代理工具]方法选一即可
已解锁App传送门：https://too.st/iTunes

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/Luminous/main/chxm1023/Rewrite/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = chxm1023.receipt["bundle_id"] || chxm1023.receipt["Bundle_Id"];
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const list = {
  'MonitorPlus': { cm: 'timeb', hx: 'hxpda', id: "com.unhonin.MonitorPlus.proversion", latest: "chxm1023" },  //Monitor+
  'MessageHold': { cm: 'timeb', hx: 'hxpda', id: "com.messagehold.forever", latest: "chxm1023" },  //拦截盾
  'co.vulcanlabs': { cm: 'timeb', hx: 'hxpda', id: lifetimeid, latest: "chxm1023" },  //vulcanlabs合集
  'com.eleven.chatgpt': { cm: 'timea', hx: 'hxpda', id: "com.chatgpt.yearly", latest: "chxm1023" },  //ChatAI
  'com.casttv.remotetv': { cm: 'timeb', hx: 'hxpda', id: "liftetime2", latest: "chxm1023" }, //TVRemote电视遥控器
  'WallpaperWidget': { cm: 'timea', hx: 'hxpda', id: "com.widget.theme.yearly.3dayfree", latest: "chxm1023" }, //壁纸主题(需试用)
  'ProREC': { cm: 'timea', hx: 'hxpda', id: "ProAudioCamera_Annual", latest: "chxm1023" }, //ProREC-相机
  'Period': { cm: 'timeb', hx: 'hxpda', id: "com.hanchongzan.book.vip", latest: "chxm1023" }, //闪电记账
  'TypeOn%20Keyboard': { cm: 'timeb', hx: 'hxpda', id: "com.hanchongzan.book.vip", latest: "chxm1023" }, //TypeOn
  'PhotoCollagePro': { cm: 'timeb', hx: 'hxpda', id: "PHOTABLE_PREMIUM", latest: "chxm1023" }, //Photable-腹肌P图神器
  'com.alphamobiletech.bodyApp': { cm: 'timeb', hx: 'hxpda', id: "Bodyapp_Forever", latest: "chxm1023" }, //Bodyapp-身材修图软件
  'com.alphamobiletech.facey': { cm: 'timeb', hx: 'hxpda', id: "Facey_Forever", latest: "chxm1023" }, //Facey-专业彩妆P图神器
  'Packet': { cm: 'timeb', hx: 'hxpda', id: "com.aaaalab.nepacket.iap.full", latest: "chxm1023" }, //HTTPS抓包
  'AllMyBatteries': { cm: 'timeb', hx: 'hxpda', id: "AllMyBatteries_Ultimate", latest: "chxm1023" }, //AllMyBatteries-电池管家
  'VDIT': { cm: 'timea', hx: 'hxpda', id: "me.imgbase.videoday.profeaturesYearly", latest: "chxm1023" }, //VDIT-视频转换
  'CodeSnippet': { cm: 'timea', hx: 'hxpda', id: "it.beatcode.codesnippetpro.annualSubscription", latest: "chxm1023" }, //CodeSnippet
  'darkWeb': { cm: 'timea', hx: 'hxpda', id: "dforce_unlock_all_functions", latest: "chxm1023" }, //DForce-Safari扩展
  'BookReader': { cm: 'timea', hx: 'hxpda', id: "com.reader.1year", latest: "chxm1023" }, //阅读器-小说阅读器
  'BeatStation': { cm: 'timea', hx: 'hxpda', id: "BS_Pro_Yearly", latest: "chxm1023" }, //BeatStation-节奏工作站
  'FastPlayer': { cm: 'timea', hx: 'hxpda', id: "VideoPlayer_ProVersion", latest: "chxm1023" }, //万能播放器
  'SimpleNotation': { cm: 'timeb', hx: 'hxpda', id: "com.xinlin.notation.once", latest: "chxm1023" }, //简谱大师
  'ChordMaster': { cm: 'timeb', hx: 'hxpda', id: "com.chordMaster.once", latest: "chxm1023" }, //MusicTotor-识谱大师
  'Xfuse': { cm: 'timeb', hx: 'hxpda', id: "com.xfuse.ProVision", latest: "chxm1023" }, //磁力宅播放器
  'com.BertonYc.ScannerOCR': { cm: 'timeb', hx: 'hxpda', id: "Scanner_Subscibe_Permanent", latest: "chxm1023" }, //万能扫描王
  'HRV': { hx: 'hxpdc', id: "com.stress.test.record.yearly", latest: "chxm1023" },  //解压小橘子(需试用)
  'iVCam': { cm: 'timeb', hx: 'hxpda', id: "ivcam.full", latest: "chxm1023" },//iVCam-电脑摄像头
  'RBrowser': { cm: 'timea', hx: 'hxpda', id: "com.mm.RBroswer.product11", latest: "chxm1023" }, //R浏览器(需试用)
  'VideoLab': { cm: 'timea', hx: 'hxpda', id: "com.jellybus.VideoLab.IAP.PRO7999", latest: "chxm1023" },//VideoLab
  'Filterra': { cm: 'timea', hx: 'hxpda', id: "com.filterra.wtonetimepurchase", latest: "chxm1023" },//Filterra
  'MOLDIV': { cm: 'timea', hx: 'hxpda', id: "com.jellybus.Moldiv.IAP.PRO7999", latest: "chxm1023" },//MOLDIV
  'PICSPLAY': { cm: 'timea', hx: 'hxpda', id: "com.jellybus.PicsPlay2.IAP.PRO5999", latest: "chxm1023" },//PICSPLAY
  'Rookie': { cm: 'timea', hx: 'hxpda', id: "com.jellybus.Rookie.IAP.PRO5999", latest: "chxm1023" },//RKCAM
  'MoneyWiz': { cm: 'timea', hx: 'hxpda', id: "com.moneywiz.personalfinance.1year", latest: "chxm1023" }, //MoneyWiz-个人财务
  'qxzs': { cm: 'timeb', hx: 'hxpda', id: "yongjiu", latest: "chxm1023" },//心率广播
  'Overdrop': { cm: 'timeb', hx: 'hxpda', id: "com.weather.overdrop.forever", latest: "chxm1023" }, //Overdrop-天气预报
  'Boom': { cm: 'timeb', hx: 'hxpda', id: "com.globaldelight.iBoom.LifetimeDiscountPack", latest: "chxm1023" }, //Boom-感受音乐
  'PDFReaderPro%20Free': { cm: 'timeb', hx: 'hxpda', id: "com.pdfreaderpro.free.member.all_access_pack_permanent_license.001", latest: "chxm1023" }, //PDFReaderProFree
  'VideoHelper': { cm: 'timeb', hx: 'hxpda', id: "vip_service", latest: "chxm1023" }, //媒关系
  'Digital%20Planner': { cm: 'timea', hx: 'hxpda', id: "com.softwings.DigitalPlanner.1year", latest: "chxm1023" }, //电子手帐
  'SuperMandarin': { cm: 'timea', hx: 'hxpda', id: "pth_vip_year", latest: "chxm1023" }, //普通话水平测试
  'SuperQuestion': { cm: 'timea', hx: 'hxpda', id: "qtzs_vip_year", latest: "chxm1023" }, //真题全刷
  'SuperElves': { cm: 'timeb', hx: 'hxpda', id: "com.SuperElves.Answer.Forever", latest: "chxm1023" }, //答案精灵
  'SuperDriving': { cm: 'timeb', hx: 'hxpda', id: "jiakao_vip_forever", latest: "chxm1023" }, //驾考学典
  'Pollykann': { cm: 'timeb', hx: 'hxpda', id: "vip.forever.pollykann", latest: "chxm1023" }, //小鹦看看
  'JCCalendar': { cm: 'timeb', hx: 'hxpda', id: "com.sjc.calendar.vip.lifelong", latest: "chxm1023" }, //简约日历
  'com.yanxia.ChsMedical': { cm: 'timeb', hx: 'hxpda', id: "VIPUser", latest: "chxm1023" }, //中医精华
  'SuperPointer': { cm: 'timeb', hx: 'hxpda', id: "com.SuperPointer.Location.Forever", latest: "chxm1023" }, //海拔指南针
  'SnakeReader': { cm: 'timeb', hx: 'hxpda', id: "com.lyran.snakescanner.premium18", latest: "chxm1023" }, //开卷阅读
  'FourthPPT': { cm: 'timeb', hx: 'hxpda', id: "com.FourthPPT.Mobile.Forever", latest: "chxm1023" }, //PPT制作软件
  'OneExtractor': { cm: 'timeb', hx: 'hxpda', id: "com.OneExtractor.Video.Forever", latest: "chxm1023" }, //视频提取器
  'com.Colin.Colors': { cm: 'timea', hx: 'hxpda', id: "com.colin.colors.annualVIP", latest: "chxm1023" }, //搜图
  'PhotosSorter': { cm: 'timeb', hx: 'hxpda', id: "sorter.pro.ipa", latest: "chxm1023" }, //Sorter-相册整理
  'intolive': { cm: 'timea', hx: 'hxpda', id: "me.imgbase.intolive.proSubYearly", latest: "chxm1023" }, //intolive-实况壁纸制作器
  'MyAlbum': { cm: 'timeb', hx: 'hxpda', id: "com.colin.myalbum.isUpgradeVip", latest: "chxm1023" }, //Cleaner-照片管理
  'VideoEditor': { cm: 'timeb', hx: 'hxpda', id: "com.god.videohand.alwaysowner", latest: "chxm1023" }, //VideoShot
  'PhotoMovie': { cm: 'timea', hx: 'hxpda', id: "com.mediaeditor.photomovie.year", latest: "chxm1023" }, //PhotoMovie-照片视频
  'ShotOn': { cm: 'timeb', hx: 'hxpda', id: "com.colin.shoton.forevervip", latest: "chxm1023" }, //ShotOn
  'PhimCiaj': { cm: 'timeb', hx: 'hxpda', id: "com.jiancent.calligraphymaster.lifetime", latest: "chxm1023" }, //练字大师
  'TimeCut': { cm: 'timea', hx: 'hxpda', id: "com.floatcamellia.hfrslowmotion.forevervip", latest: "chxm1023" },  //TimeCut
  'com.floatcamellia.motiok': { cm: 'timea', hx: 'hxpda', id: "com.floatcamellia.motiok.vipforever", latest: "chxm1023" },  //Hype_Text-AE特效片制作
  'POPOLockScreenWidgetable': { cm: 'timea', hx: 'hxpda', id: "com.widget.fightenegery.yearly", latest: "chxm1023" },  //多彩壁纸
  'GreetingScanner': { cm: 'timea', hx: 'hxpda', id: "com.alphaplus.greetingscaner.w.b", latest: "chxm1023" },  //扫描识别王
  'FancyCamPlus': { cm: 'timea', hx: 'hxpda', id: "com.alphaplus.fancycam.year.198", latest: "chxm1023" },  //悦颜相机
  'Again': { cm: 'timeb', hx: 'hxpda', id: "com.owen.again.profession", latest: "chxm1023" },  //Again-稍后阅读器
  'remotelg': { cm: 'timeb', hx: 'hxpda', id: "com.gqp.remotelg.lifetime", latest: "chxm1023" },  //UniversalRemoteTV+ 遥控器
  'Notebook': { cm: 'timea', hx: 'hxpda', id: "com.zoho.notebook.ios.personal.yearly", latest: "chxm1023" },  //Notebook
  'com.damon.dubbing': { cm: 'timea', hx: 'hxpda', id: "com.damon.dubbing.vip12", latest: "chxm1023" },  //有声英语绘本
  'ZHUBEN': { cm: 'timea', hx: 'hxpda', id: "com.xiaoyu.yue", latest: "chxm1023" },  //有声英语绘本
  'XIAOTangHomeParadise': { cm: 'timea', hx: 'hxpda', id: "com.yuee.mo2", latest: "chxm1023" },  //鸿海幼儿启蒙
  'film': { cm: 'timea', hx: 'hxpda', id: "pro_auto_subscribe_year_ovs", latest: "chxm1023" },  //胶卷相机
  'Muza': { cm: 'timea', hx: 'hxpda', id: "com.appmuza.premium_year", latest: "chxm1023" },  //Muza-修图APP
  'StandbyWidget': { cm: 'timed', hx: 'hxpda', id: "com.standby.idream.year.68", ids: "standbyus.nonconsume.missingyou", latest: "chxm1023" },  //StandBy_Us-情侣定位
  'Mango6Minute': { cm: 'timea', hx: 'hxpda', id: "576170870", latest: "chxm1023" },  //6分钟英语
  'Photo%20Cutout': { cm: 'timea', hx: 'hxpda', id: "com.icepine.allyear", latest: "chxm1023" },  //轻松扣图
  'cleanPhone': { cm: 'timea', hx: 'hxpda', id: "com.clean.year", latest: "chxm1023" },  //爱机清理
  'ppt': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.pptios.yearly", latest: "chxm1023" },  //手机PPT制作
  'WasteCat': { cm: 'timeb', hx: 'hxpda', id: "dev.sanjin.WasteCat.PermanentVip", latest: "chxm1023" },  //垃圾贪吃猫
  'MeowTalk': { cm: 'timea', hx: 'hxpda', id: "meowtalk.month.basic.autorenewable.subscription", latest: "chxm1023" },  //喵说
  'habitdot': { cm: 'timeb', hx: 'hxpda', id: "habitdots_pro_forever", latest: "chxm1023" },  //习惯点点
  'stretchworkout': { cm: 'timea', hx: 'hxpda', id: "com.abishkking.premiumYearStretch", latest: "chxm1023" },  //拉伸运动
  'Planist': { cm: 'timed', hx: 'hxpda', id: "org.zrey.planist.main", ids: "org.zrey.planist.lifetime", latest: "chxm1023" },  //Planist
  'com.uzstudio.avenuecast.ios': { cm: 'timeb', hx: 'hxpda', id: "1001", latest: "chxm1023" },  //凡视知音
  'CongZhenBaZi': { cm: 'timeb', hx: 'hxpda', id: "vip_forever_78", latest: "chxm1023" },  //八字排盘-从真版
  'CongZhenQiMen': { cm: 'timea', hx: 'hxpda', id: "cn.congzhen.CongZhenQiMen.yearlyplan", latest: "chxm1023" },  //奇门遁甲
  'ProFit': { cm: 'timea', hx: 'hxpda', id: "com.maxty.gofitness.yearlyplan", latest: "chxm1023" },  //ProFit锻炼计划
  'FitnessBodybuildingVGFIT': { cm: 'timea', hx: 'hxpda', id: "com.vgfit.fitnessvip.yearly", latest: "chxm1023" },  //fitnessvip
  'Water%20Reminder': { cm: 'timea', hx: 'hxpda', id: "com.vgfit.premiumtracker.year", latest: "chxm1023" },  //WaterReminder水提醒
  '%E7%91%9C%E4%BC%BD': { cm: 'timea', hx: 'hxpda', id: "com.vgfit.yoga.yearly", latest: "chxm1023" },  //瑜伽
  'GPSMaker': { cm: 'timea', hx: 'hxpda', id: "theodolite_vip_year", latest: "chxm1023" },  //指南针定位
  'wrongbook': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.wrongbookios.yearly", latest: "chxm1023" },  //错题宝
  'excel': { cm: 'timea', hx: 'hxpda', id: "com.gamawh.excelerios.yearly", latest: "chxm1023" },  //办公文档
  'Future%20Baby': { cm: 'timea', hx: 'hxpda', id: "com.nilu.faceseer.yearly", latest: "chxm1023" },  //宝宝长相预测
  'Smoke': { cm: 'timea', hx: 'hxpda', id: "smoke19870727", latest: "chxm1023" },  //今日香烟
  'com.wms.hrv': { cm: 'timea', hx: 'hxpda', id: "com.wms.hrv.pro", latest: "chxm1023" },  //ECG+
  'AppAlarmIOS': { cm: 'timea', hx: 'hxpda', id: "alarm.me.vip.year.tier1", latest: "chxm1023" },  //Me+
  'Tinglee': { cm: 'timea', hx: 'hxpdb', id: "vip.forever.tinglee", latest: "chxm1023" },  //英语听听
  'NoteKeys': { cm: 'timea', hx: 'hxpda', id: "notekeys_access_weekly", latest: "chxm1023" },  //五线谱
  'SheetMusicPro': { cm: 'timea', hx: 'hxpda', id: "sheetmusicpro.yearwithtrial", latest: "chxm1023" },  //乐谱吧
  'ProtractorEdge': { cm: 'timea', hx: 'hxpda', id: "ProtracatorEdge.PremiumAccess", latest: "chxm1023" },  //量角器
  'Piano%20Plus': { cm: 'timea', hx: 'hxpda', id: "kn_access_weekly", latest: "chxm1023" },  //Piano Plus
  'Notation%20Pad': { cm: 'timea', hx: 'hxpda', id: "np_access_weekly", latest: "chxm1023" },  //Notation Pad
  'Guitar%20Notation': { cm: 'timea', hx: 'hxpda', id: "gn_access_weekly", latest: "chxm1023" },  //Guitar Notation
  'Piano%20Fantasy': { cm: 'timea', hx: 'hxpda', id: "com.lotuz.PianoFantasy.weekwithtrail", latest: "chxm1023" },  //钢琴幻想
  'Piano%20Rush': { cm: 'timea', hx: 'hxpda', id: "com.lotuz.PianoPro.weekwithtrail", latest: "chxm1023" },  //钢琴大师
  'com.richads.saucyart': { cm: 'timea', hx: 'hxpda', id: "com.richads.saucyart.sub.quarterly_29.99", latest: "chxm1023" },  //Perky
  'SurveyorPro': { cm: 'timea', hx: 'hxpda', id: "com.celiangyuan.SurveyorPro.OneYear", latest: "chxm1023" },  //测量员Pro
  'com.ydatong.dingdone': { cm: 'timeb', hx: 'hxpda', id: "com.ydatong.dingdone.vip.forever", latest: "chxm1023" },  //叮当代办
  'Dial': { cm: 'timea', hx: 'hxpda', id: "2104", latest: "chxm1023" },  //T9拨号
  'qxwp%20copy': { cm: 'timea', hx: 'hxpda', id: "com.chowjoe.wp2free.year.pro", latest: "chxm1023" },  //壁纸
  'LingLongShouZ': { cm: 'timea', hx: 'hxpda', id: "zhenwushouzhangQuarterlyPlus", latest: "chxm1023" },  //Cute手帐软件
  'MediaEditor': { cm: 'timeb', hx: 'hxpda', id: "alwaysowner", latest: "chxm1023" },  //剪影(需试用)
  'UniversTranslate': { cm: 'timea', hx: 'hxpda', id: "com.univers.translator.tool.year", latest: "chxm1023" },  //翻译官(需试用)
  'com.gostraight.smallAccountBook': { cm: 'timeb', hx: 'hxpda', id: "ForeverVIPPayment", latest: "chxm1023" },  //iCost记账(需要购买)
  'ZJTBiaoGe': { cm: 'timea', hx: 'hxpda', id: "zhangjt.biaoge.monthvip", latest: "chxm1023" },  //表格手机版
  'MiniMouse': { cm: 'timea', hx: 'hxpda', id: "minimouse_vip_1year", latest: "chxm1023" },  //MiniMouse
  'Paste%20Keyboard': { cm: 'timea', hx: 'hxpda', id: "com.keyboard.1yetr", latest: "chxm1023" },  //复制和粘贴键盘
  'EWA': { cm: 'timea', hx: 'hxpda', id: "com.ewa.renewable.subscription.year8", latest: "chxm1023" },  //EWA-学习外语
  'BuBuSZ': { cm: 'timea', hx: 'hxpda', id: "quaVersion", latest: "chxm1023" },  //BuBu手帐
  'CapyMood': { cm: 'timea', hx: 'hxpda', id: "com.paha.CapyMood.year", latest: "chxm1023" },  //CapyMood
  'xyz.iofree.lifenotes': { cm: 'timea', hx: 'hxpda', id: "xyz.iofree.lifelog.pro.yearly", latest: "chxm1023" },  //人生笔记(需试用)
  'com.icandiapps.nightsky': { cm: 'timea', hx: 'hxpda', id: "com.icandiapps.ns4.annual", latest: "chxm1023" },  //星空
  'Wallpapers': { cm: 'timea', hx: 'hxpda', id: "wallpaperworld.subscription.yearly.12.notrial", latest: "chxm1023" },  //Wallpaper Tree壁纸
  'com.yumiteam.Kuki.ID': { cm: 'timea', hx: 'hxpda', id: "com.yumiteam.Kuki.ID.2", latest: "chxm1023" },  //PicsLeap-美飞
  'com.quangtm193.picpro': { cm: 'timea', hx: 'hxpda', id: "com.quangtm193.picpro1year", latest: "chxm1023" },  //PicPro-人工智能照片编辑器
  'Storybeat': { cm: 'timea', hx: 'hxpda', id: "yearly_1", latest: "chxm1023" },  //Storybeat
  'com.smartgymapp.smartgym': { cm: 'timea', hx: 'hxpda', id: "com.smartgymapp.smartgym.premiumpersonaltraineryearly", latest: "chxm1023" },  //SmartGym
  'Ptime': { cm: 'timea', hx: 'hxpda', id: "com.subscribe.pro.year", latest: "chxm1023" },  //Ptime-拼图(需试用)
  'Prookie': { cm: 'timea', hx: 'hxpda', id: "prookie.month.withtrial.0615", latest: "chxm1023" },  //AI灵绘
  'BodyTune': { cm: 'timea', hx: 'hxpda', id: "Bodypro1", latest: "chxm1023" },  //BodyTune-瘦身相机
  'Caculator': { cm: 'timea', hx: 'hxpda', id: "calc_Unlock_1", latest: "chxm1023" },  //计算器+
  'killer.sudoku.free.brain.puzzle': { cm: 'timea', hx: 'hxpda', id: "ks.i.iap.premium", latest: "chxm1023" },  //杀手数独
  'sudoku.puzzle.free.game.brain': { cm: 'timea', hx: 'hxpda', id: "sudoku.i.sub.vvip.p1y", latest: "chxm1023" },  //数独
  'One%20Markdown': { cm: 'timeb', hx: 'hxpda', id: "10012", latest: "chxm1023" },  //One Markdown
  'MWeb%20iOS': { cm: 'timeb', hx: 'hxpda', id: "10001", latest: "chxm1023" },  //MWeb-编辑器/笔记/发布
  'NYMF': { cm: 'timea', hx: 'hxpda', id: "com.nymf.app.premium_year", latest: "chxm1023" },  //Nymf艺术照片
  'com.lockwidt.cn': { cm: 'timea', hx: 'hxpda', id: "com.lockwidt.cn.member", latest: "chxm1023" },  //壁纸16
  'Utsuki': { cm: 'timea', hx: 'hxpda', id: "KameePro", latest: "chxm1023" },  //梦见账本
  'Processing': { cm: 'timeb', hx: 'hxpda', id: "wtf.riedel.processing.lifetime", latest: "chxm1023" },  //Processing-软件开发工具
  'one%20sec': { cm: 'timeb', hx: 'hxpda', id: "wtf.riedel.onesec.lifetime", latest: "chxm1023" },  //onesec-番茄钟
  'com.skysoft.pencilsketch': { cm: 'timea', hx: 'hxpda', id: "com.skysoft.pencilsketch.subscription.yearly", latest: "chxm1023" },  //铅笔画(需试用)
  'com.instagridpost.rsigp': { cm: 'timea', hx: 'hxpda', id: "com.GridPost.oneyearplus", latest: "chxm1023" },  //九宫格切图
  'com.skysoft.picsqueen': { cm: 'timea', hx: 'hxpda', id: "com.skysoft.picsqueen.subscription.yearly", latest: "chxm1023" },  //PicsQueen-AI绘图
  'com.skysoft.removalfree': { cm: 'timea', hx: 'hxpda', id: "com.skysoft.removalfree.subscription.yearly3", latest: "chxm1023" },  //神奇消除笔-图片消除
  'com.skysoft.facecartoon': { cm: 'timea', hx: 'hxpda', id: "com.skysoft.facecartoon.subscription.yearly", latest: "chxm1023" },  //卡通头像
  'Jennie%20AI': { cm: 'timea', hx: 'hxpda', id: "com.skysoft.text2img.vip.yearly", latest: "chxm1023" },  //Jennie AI制作图片
  'MGhostLens': { cm: 'timea', hx: 'hxpda', id: "com.ghostlens.premium1month", latest: "chxm1023" },  //魔鬼相机
  'Luminous': { cm: 'timea', hx: 'hxpda', id: "com.spacemushrooms.weekly", latest: "chxm1023" },  //光影修图
  'RitmoVideo': { cm: 'timea', hx: 'hxpda', id: "com.zhk.hidebox.yearly", latest: "chxm1023" },  //RitmoVideo
  'PerfectImage': { cm: 'timea', hx: 'hxpda', id: "Perfect_Image_VIP_Yearly", latest: "chxm1023" },  //完美影像(需试用)
  'moment': { cm: 'timea', hx: 'hxpda', id: "PYJMoment2", latest: "chxm1023" },  //片羽集(需试用)
  'Planner%20Plus': { cm: 'timea', hx: 'hxpda', id: "com.btgs.plannerfree.yearly", latest: "chxm1023" },  //PlannerPro-日程安排
  'HiddenBox': { cm: 'timec', hx: 'hxpdb', version: "1" },//我的书橱
  'Synthesizer': { cm: 'timea', hx: 'hxpda', id: "com.qingxiu.synthesizer.mon", latest: "chxm1023" },  //语音合成
  'ContractMaster': { cm: 'timea', hx: 'hxpda', id: "com.qingxiu.contracts.monthly", latest: "chxm1023" },  //印象全能王
  'MyDiary': { cm: 'timea', hx: 'hxpda', id: "diary.yearly.vip.1029", latest: "chxm1023" },  //我的日记
  'Translator': { cm: 'timea', hx: 'hxpda', id: "trans_sub_week", latest: "chxm1023" },  //翻译家
  'ToDoList': { cm: 'timea', hx: 'hxpda', id: "todolist.subscription.yearly", latest: "chxm1023" },  //ToDoList(需试用)
  'Idea': { cm: 'timea', hx: 'hxpda', id: "top.ideaapp.ideaiOS.membership.oneyear", latest: "chxm1023" },  //灵感(需试用)
  'ZeroTuImg': { cm: 'timea', hx: 'hxpda', id: "ZeroTuImgPlus", latest: "chxm1023" },  //Zero壁纸
  'com.traveltao.ExchangeAssistant': { cm: 'timea', hx: 'hxpda', id: "lxbyplus", latest: "chxm1023" },  //极简汇率(需试用)
  'ServerKit': { cm: 'timea', hx: 'hxpda', id: "com.serverkit.subscription.year.a", latest: "chxm1023" },  //服务器助手
  'RawPlus': { cm: 'timea', hx: 'hxpda', id: "com.dynamicappdesign.rawplus.yearlysubscription", latest: "chxm1023" },  //Raw相机
  'OrderGenerator': { cm: 'timeb', hx: 'hxpda', id: "oder_pay_forever", latest: "chxm1023" },  //订单生成
  'GenerateAllOrdersTool': { cm: 'timea', hx: 'hxpda', id: "Order_Vip_010", latest: "chxm1023" },  //订单生成器(需试用)
  'MoMoShouZhang': { cm: 'timea', hx: 'hxpda', id: "shunchangshouzhangQuarterlyPlus", latest: "chxm1023" },  //卡卡手账(需试用)
  'Mindkit': { cm: 'timeb', hx: 'hxpda', id: "mindkit_permanently", latest: "chxm1023" },  //Mindkit
  'DailySpending': { cm: 'timea', hx: 'hxpda', id: "com.xxtstudio.dailyspending.year", latest: "chxm1023" },  //Daily记账
  'Miary': { cm: 'timeb', hx: 'hxpda', id: "lifetime_sub", latest: "chxm1023" },  //Miary-记录日记
  'Noted': { cm: 'timeb', hx: 'hxpda', id: "com.digitalworkroom.noted.plus.lifetime", latest: "chxm1023" },  //Noted-录音笔记软件
  'BingQiTools': { cm: 'timea', hx: 'hxpda', id: "bingqi_e2", latest: "chxm1023" },  //猫狗翻译
  'AnyDown': { cm: 'timeb', hx: 'hxpda', id: "com.xiaoqi.down.forever", latest: "chxm1023" },  //AnyDown-下载神器
  'Reader': { cm: 'timeb', hx: 'hxpda', id: "com.xiaoqi.reader.forever", latest: "chxm1023" },  //爱阅读-TXT阅读器
  'com.bestmusicvideo.formmaster': { cm: 'timea', hx: 'hxpda', id: "com.form.1yearvip", latest: "chxm1023" },  //表格大师
  'ExcelSpreadSheetsWPS': { cm: 'timea', hx: 'hxpda', id: "com.turbocms.SimpleSpreadSheet.viponeyear", latest: "chxm1023" },  //简易表格(需试用)
  'XinQingRiJi': { cm: 'timea', hx: 'hxpda', id: "zhiwenshouzhangQuarterlyPlus", latest: "chxm1023" },  //猫咪手帐(需试用)
  'Nutrilio': { cm: 'timea', hx: 'hxpda', id: "net.nutrilio.one_year_plus", latest: "chxm1023" },  //Nutrilio
  'Pixiu%E8%AE%B0%E8%B4%A6': { cm: 'timea', hx: 'hxpda', id: "com.RuoG.Pixiu.VIPYear", latest: "chxm1023" },  //貔貅记账
  'AIHeader': { cm: 'timea', hx: 'hxpda', id: "com.ai.avatar.maker.month.3dayfree", latest: "chxm1023" },  //AI头像馆
  'MoodTracker': { cm: 'timeb', hx: 'hxpda', id: "co.vulcanlabs.moodtracker.lifetime2", latest: "chxm1023" },  //ChatSmith(美区)
  'com.dandelion.Routine': { cm: 'timeb', hx: 'hxpda', id: "membership", latest: "chxm1023" },  //小日常
  'YSBrowser': { cm: 'timeb', hx: 'hxpda', id: "com.ys.pro", latest: "chxm1023" },  //亚瑟浏览器
  'org.zrey.metion': { cm: 'timed', hx: 'hxpda', id: "org.zrey.metion.pro", ids: "org.zrey.metion.main", latest: "chxm1023" },  //Metion-基础+Pro
  'ZenJournal': { cm: 'timea', hx: 'hxpda', id: "zen_pro", latest: "chxm1023" },  //禅记
  '%E5%80%92%E6%94%BE%E6%8C%91%E6%88%98': { cm: 'timea', hx: 'hxpda', id: "com.abighead.ReverseChallenge.iap.pro.year", latest: "chxm1023" },  //倒放挑战
  'com.visualmidi.app.perfectpiano.Perfect-Piano': { cm: 'timea', hx: 'hxpda', id: "auto_renew_monthly_subscription", latest: "chxm1023" },  //完美钢琴
  'Straw': { cm: 'timea', hx: 'hxpda', id: "com.1year.eyedropper", latest: "chxm1023" },  //吸管Pro-取色
  'vibee': { cm: 'timea', hx: 'hxpda', id: "com.vibee.year.bigchampagne", latest: "chxm1023" },  //vibee-氛围歌单小组件
  'Lister': { cm: 'timea', hx: 'hxpda', id: "com.productlab.lister.yearly", latest: "chxm1023" },  //Lister-计划清单
  'DrumPads': { cm: 'timeb', hx: 'hxpda', id: "com.gismart.drumpads.pro_lifetime_30", latest: "chxm1023" },  //BeatMakerGo-打碟机/打击垫/DJ鼓机
  'com.photoslab.ai.writerassistant': { cm: 'timea', hx: 'hxpda', id: "com.photoslab.ai.writerassistant.year", latest: "chxm1023" },  //Smart AI
  'WaterMaskCamera': { cm: 'timea', hx: 'hxpda', id: "com.camera.watermark.yearly.3dayfree", latest: "chxm1023" },  //徕卡水印相机
  'ColorPaint': { cm: 'timea', hx: 'hxpda', id: "coloring.app.singingfish.year", latest: "chxm1023" },  //涂色
  'SymbolKeyboard': { cm: 'timeb', hx: 'hxpda', id: "fronts.keyboard.singingfish.one", latest: "chxm1023" },  //Fonts花样字体
  'com.SingingFish.SudokuGame': { cm: 'timea', hx: 'hxpda', id: "com.singingfish.sudokugame.year", latest: "chxm1023" },  //数独
  'com.kuaijiezhilingdashi.appname': { cm: 'timea', hx: 'hxpda', id: "com.othermaster.yearlyvip", latest: "chxm1023" },  //快捷指令库
  'LogInput': { cm: 'timea', hx: 'hxpda', id: "com.logcg.loginput", latest: "chxm1023" },  //落格输入法
  'SoundLab': { cm: 'timea', hx: 'hxpda', id: "8800", latest: "chxm1023" },  //合声
  'Kilonotes': { cm: 'timea', hx: 'hxpda', id: "kipa_kilonotes_quarter_subscription", latest: "chxm1023" },  //千本笔记
  'YiJianKouTu': { cm: 'timea', hx: 'hxpda', id: "XiChaoYiJianKouTuPlus", latest: "chxm1023" },  //一键抠图
  'FileArtifact': { cm: 'timea', hx: 'hxpda', id: "com.shengzhou.fileartifact.year", latest: "chxm1023" },  //文晓生
  'Wext': { cm: 'timeb', hx: 'hxpda', id: "com.lmf.wext.life", latest: "chxm1023" },  //万源阅读
  'ColorCapture': { cm: 'timeb', hx: 'hxpda', id: "10001", latest: "chxm1023" },  //色采
  'xTerminal': { cm: 'timea', hx: 'hxpda', id: "xterminal.pro2", latest: "chxm1023" },  //xTerminal
  'Fotoz': { cm: 'timeb', hx: 'hxpda', id: "com.kiddy.fotoz.ipa.pro", latest: "chxm1023" },  //Fotoz
  'TheLastFilm': { cm: 'timea', hx: 'hxpda', id: "Filmroll_Pro_1Year", latest: "chxm1023" },  //最后一卷胶片(需订阅一次)
  'Motivation': { cm: 'timea', hx: 'hxpda', id: "com.monkeytaps.motivation.premium.year3", latest: "chxm1023" },  //Motivation
  'io.sumi.GridDiary2': { cm: 'timea', hx: 'hxpda', id: "io.sumi.GridDiary.pro.annually", latest: "chxm1023" },  //格志
  'Subscriptions': { cm: 'timea', hx: 'hxpda', id: "com.touchbits.subscriptions.iap.pro.yearly", latest: "chxm1023" },  //订阅通
  'com.leapfitness.fasting': { cm: 'timea', hx: 'hxpda', id: "com.leapfitness.fasting.oneyear1", latest: "chxm1023" },  //168轻断食
  'WidgetBox': { cm: 'timeb', hx: 'hxpda', id: "widgetlab001", latest: "chxm1023" },  //小组件盒子
  'LifeTracker': { cm: 'timea', hx: 'hxpda', id: "com.dk.lifetracker.yearplan", latest: "chxm1023" },  //Becord生活记录
  'imgplay': { cm: 'timea', hx: 'hxpda', id: "me.imgbase.imgplay.subscriptionYearly", latest: "chxm1023" },  //imgPlay
  'WaterMinder': { cm: 'timea', hx: 'hxpda', id: "waterminder.premiumYearly", latest: "chxm1023" },  //WaterMinder喝水APP
  'HashPhotos': { cm: 'timeb', hx: 'hxpda', id: "com.kobaltlab.HashPhotos.iap.allinone.free", latest: "chxm1023" },  //HashPhotos
  'FileBrowser': { cm: 'timea', hx: 'hxpda', id: "com.qingcheng.filex.pro.yearly", latest: "chxm1023" },  //松鼠下载
  'SilProject': { cm: 'timea', hx: 'hxpda', id: "com.sm.Alina.Pro", latest: "chxm1023" },  //Alina米克锁屏—
  'com.chenxi.shanniankapian': { cm: 'timea', hx: 'hxpda', id: "com.chenxi.shannian.superNian", latest: "chxm1023" },  //闪念
  'com.risingcabbage.pro.camera': { cm: 'timea', hx: 'hxpda', id: "com.risingcabbage.pro.camera.yearlysubscription", latest: "chxm1023" },  //ReLens相机
  'co.bazaart.patternator': { cm: 'timea', hx: 'hxpda', id: "Patternator_Lock_Screen_Monthly", latest: "chxm1023" },  //拍特内头
  '%E5%BD%95%E9%9F%B3%E4%B8%93%E4%B8%9A%E7%89%88': { cm: 'timea', hx: 'hxpda', id: "com.winat.recording.pro.yearly", latest: "chxm1023" },  //录音专业版
  'cn.linfei.SimpleRecorder': { cm: 'timea', hx: 'hxpda', id: "cn.linfei.SimpleRecorder.Plus", latest: "chxm1023" },  //录音机
  'com.maliquankai.appdesign': { cm: 'timec', hx: 'hxpdb', version: "1.5.8" },  //PutApp-应用收集
  'PictureScanner': { cm: 'timea', hx: 'hxpda', id: "om.picturescanner.tool.year", latest: "chxm1023" },  //扫描王
  'BestColor': { cm: 'timea', hx: 'hxpda', id: "com.bestColor.tool.month", latest: "chxm1023" },  //小红图
  'com.decibel.tool': { cm: 'timea', hx: 'hxpda', id: "decibel98free3", latest: "chxm1023" },  //分贝测试仪
  'MeasurementTools': { cm: 'timea', hx: 'hxpda', id: "mesurementyearvip", latest: "chxm1023" },  //测量工具
  'TinyPNGTool': { cm: 'timea', hx: 'hxpda', id: "com.tinypngtool.tool.weekvip", latest: "chxm1023" },  //TinyPNG
  'IconChange': { cm: 'timea', hx: 'hxpda', id: "iconeryearvip", latest: "chxm1023" },  //iconser图标更换
  'life.journal.diary': { cm: 'timeb', hx: 'hxpda', id: "life.journal.diary.lifetime", latest: "chxm1023" },  //Today日记
  'com.floatcamellia.motionninja': { cm: 'timea', hx: 'hxpda', id: "com.floatcamellia.motionninja.yearlyvip", latest: "chxm1023" },  //MotionNinja
  'com.iuuapp.audiomaker': { cm: 'timed', hx: 'hxpda', id: "com.iuuapp.audiomaker.cloud.year", ids: "com.iuuapp.audiomaker.removeads", latest: "chxm1023" },  //音频剪辑
  'com.biggerlens.photoretouch': { cm: 'timeb', hx: 'hxpda', id: "com.photoretouch.SVIP", latest: "chxm1023" },  //PhotoRetouch消除笔P图
  'com.macpaw.iosgemini': { cm: 'timea', hx: 'hxpda', id: "com.macpaw.iosgemini.month.trial", latest: "chxm1023" },  //GeminiPhotos
  'com.mematom.ios': { cm: 'timea', hx: 'hxpda', id: "MMYear", latest: "chxm1023" },  //年轮3
  'com.LuoWei.aDiary': { cm: 'timea', hx: 'hxpda', id: "com.LuoWei.aDiary.yearly0", latest: "chxm1023" },  //aDiary-待办日记本
  'com.zerone.hidesktop': { cm: 'timeb', hx: 'hxpda', id: "com.zerone.hidesktop.forever", latest: "chxm1023" },  //iScreen-桌面小组件主题美化
  'MagicWidget': { cm: 'timea', hx: 'hxpda', id: "com.sm.widget.Pro", latest: "chxm1023" },  //ColorfulWidget—小组件
  'com.tasmanic.capture': { cm: 'timea', hx: 'hxpda', id: "CTPCAPTUREYEARLY", latest: "chxm1023" },  //3DScanner-绘制/测量平面图
  'com.readdle.CalendarsLite': { cm: 'timea', hx: 'hxpda', id: "com.readdle.CalendarsLite.subscription.year20trial7", latest: "chxm1023" },  //Calendars-日历/计划
  'com.readdle.ReaddleDocsIPad': { cm: 'timea', hx: 'hxpda', id: "com.readdle.ReaddleDocsIPad.subscription.month10_allusers", latest: "chxm1023" },  //Documents
  'com.1ps.lovetalk': { cm: 'timea', hx: 'hxpda', id: "com.1ps.lovetalk.normal.weekly", latest: "chxm1023" },  //高级恋爱话术
  'tech.miidii.MDClock': { cm: 'timeb', hx: 'hxpda', id: "tech.miidii.MDClock.pro", latest: "chxm1023" },  //谜底时钟
  'com.floatcamellia.prettyup': { cm: 'timeb', hx: 'hxpda', id: "com.floatcamellia.prettyup.onetimepurchase", latest: "chxm1023" },  //PrettyUp视频P图
  'com.zijayrate.analogcam': { cm: 'timea', hx: 'hxpda', id: "com.zijayrate.analogcam.vipforever10", latest: "chxm1023" },  //oldroll复古相机
  'WeeklyNote': { cm: 'timea', hx: 'hxpda', id: "org.zrey.weeklynote.yearly", latest: "chxm1023" },  //WeeklyNote(周周记)
  'DoMemo': { cm: 'timea', hx: 'hxpda', id: "org.zrey.fastnote.yearly", latest: "chxm1023" },  //DoMemo
  'CostMemo': { cm: 'timea', hx: 'hxpda', id: "org.zrey.money.yearly", latest: "chxm1023" },  //CostMemo
  'iTimely': { cm: 'timea', hx: 'hxpda', id: "org.zrey.iTimely.yearly", latest: "chxm1023" },  //iTimely
  'net.daylio.Daylio': { cm: 'timea', hx: 'hxpda', id: "net.daylio.one_year_pro.offer_initial", latest: "chxm1023" },  //Daylio-日记
  'com.yengshine.webrecorder': { cm: 'timea', hx: 'hxpda', id: "com.yengshine.webrecorder.yearly", latest: "chxm1023" },  //VlogStar-视频编辑器
  'org.skydomain.foodcamera': { cm: 'timea', hx: 'hxpda', id: "org.skydomain.foodcamera.yearly", latest: "chxm1023" },  //Koloro-滤镜君
  'com.yengshine.proccd': { cm: 'timea', hx: 'hxpda', id: "com.yengshine.proccd.yearly", latest: "chxm1023" },  //ProCCD相机
  'com.palmmob.pdfios': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.pdfios.168", latest: "chxm1023" },  //图片PDF转换器
  'com.palmmob.scanner2ios': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.scanner2ios.396", latest: "chxm1023" },  //文字扫描
  'com.palmmob.officeios': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.officeios.188", latest: "chxm1023" },  //文档表格编辑
  'com.palmmob.recorder': { cm: 'timea', hx: 'hxpda', id: "com.palmmob.recorder.198", latest: "chxm1023" },  //录音转文字
  'com.7color.newclean': { cm: 'timea', hx: 'hxpda', id: "com.cleaner.salesyear", latest: "chxm1023" },  //手机清理
  'Habbit': { cm: 'timea', hx: 'hxpda', id: "HabitUpYearly", latest: "chxm1023" },  //习惯清单
  'com.dbmeterpro.dB-Meter-Free': { cm: 'timea', hx: 'hxpda', id: "com.dbmeterpro.premiumModeSubscriptionWithTrial", latest: "chxm1023" },  //dBMeter-分贝仪(专业版)
  'com.vstudio.newpuzzle': { cm: 'timea', hx: 'hxpda', id: "com.vstudio.newpuzzle.yearlyVipFreetrail.15_99", latest: "chxm1023" },  //拼图酱
  'com.jianili.Booka': { cm: 'timea', hx: 'hxpda', id: "com.jianili.Booka.pro.yearly", latest: "chxm1023" },  //Booka-极简书房
  'com.ziheng.OneBox': { cm: 'timeb', hx: 'hxpda', id: "com.ziheng.OneBox", latest: "chxm1023" },  //Pandora管理订阅
  'ChickAlarmClock': { cm: 'timea', hx: 'hxpda', id: "com.ChickFocus.ChickFocus.yearly_2023_promo", latest: "chxm1023" },  //小鸡专注
  'MyWorks': { cm: 'timea', hx: 'hxpda', id: "com.MyWorks.Handwritten.Year", latest: "chxm1023" },  //仿手写
  'Instant%20Saver': { cm: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly", latest: "chxm1023" },  //InstantSocialSaver(ins下载)
  'SaveTik': { cm: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly", latest: "chxm1023" },  //SaveTik
  '%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%99%A8': { cm: 'timea', hx: 'hxpda', id: "com.mobislet.files.yearly", latest: "chxm1023" },  //文件管理器
  'ZIP%E5%8E%8B%E7%BC%A9%E8%A7%A3%E5%8E%8B%E7%BC%A9%E5%B7%A5%E5%85%B7': { cm: 'timea', hx: 'hxpda', id: "com.mobislet.zipfile.yearly", latest: "chxm1023" },  //ZIP压缩解压
  'TPTeleprompter': { cm: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly", latest: "chxm1023" },  //爱提词
  'com.pocket.photo': { cm: 'timea', hx: 'hxpda', id: "com.pocket.photo.yearly", latest: "chxm1023" },  //一寸证件照
  'com.pocket.watermark': { cm: 'timea', hx: 'hxpda', id: "com.pocket.watermark.yearly", latest: "chxm1023" },  //一键水印
  'com.pocket.compress': { cm: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly", latest: "chxm1023" },  //压缩软件
  'com.pocket.format': { cm: 'timea', hx: 'hxpda', id: "com.pocket.format.yearly", latest: "chxm1023" },  //格式转换
  'com.CalculatorForiPad.InternetRocks': { cm: 'timea', hx: 'hxpda', id: "co.airapps.calculator.year", latest: "chxm1023" },  //计算器Air
  'solutions.wzp': { cm: 'timea', hx: 'hxpda', id: yearlysubscription, latest: "chxm1023" },  //airapps
  'co.airapps': { cm: 'timea', hx: 'hxpda', id: yearid, latest: "chxm1023" },  //airapps
  'com.internet-rocks': { cm: 'timea', hx: 'hxpda', id: yearid, latest: "chxm1023" },  //airapps
  'SuperWidget': { cm: 'timea', hx: 'hxpda', id: "com.focoslive", latest: "chxm1023" },  //PandaWidget小组件
  'Picsew': { cm: 'timeb', hx: 'hxpdb', id: "com.sugarmo.ScrollClip.pro"},  //Picsew截长图3.9.4版本(最新版无效)
  'vpn': { cm: 'timea', hx: 'hxpda', id: "yearautorenew", latest: "chxm1023" },  //VPN-unlimited
  'TT': { cm: 'timea', hx: 'hxpda', id: "com.55panda.hicalculator.year_sub", latest: "chxm1023" },  //TT_私密相册管家
  'Focos': { cm: 'timea', hx: 'hxpda', id: "com.focos.1w_t4_1w", latest: "chxm1023" },  //Focos
  'ProKnockOut': { cm: 'timeb', hx: 'hxpda', id: "com.knockout.SVIP.50off", latest: "chxm1023" },  //ProKnockOut
  'com.teadoku.flashnote': { cm: 'timea', hx: 'hxpda', id: "pro_ios_ipad_mac", latest: "chxm1023" },  //AnkiNote
  'com.tapuniverse.texteditor': { cm: 'timea', hx: 'hxpda', id: "com.tapuniverse.texteditor.w", latest: "chxm1023" }  //TextEditor
};

//内购数据变量
const receipt = { "quantity": "1", "purchase_date_ms": "1694250549000", "is_in_intro_offer_period": "false", "transaction_id": "490001314520000", "is_trial_period": "false", "original_transaction_id": "490001314520000", "purchase_date": "2023-09-09 09:09:09 Etc/GMT", "product_id": yearlyid, "original_purchase_date_pst": "2023-09-09 02:09:10 America/Los_Angeles", "in_app_ownership_type": "PURCHASED", "original_purchase_date_ms": "1694250550000", "web_order_line_item_id": "490000123456789", "purchase_date_pst": "2023-09-09 02:09:09 America/Los_Angeles", "original_purchase_date": "2023-09-09 09:09:10 Etc/GMT" };
const expirestime = { "expires_date": "2099-09-09 09:09:09 Etc/GMT", "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles", "expires_date_ms": "4092599349000", };
let anchor = false;
let data;

// 核心内容处理
for (const i in list) {
  const regex = new RegExp(`^${i}`, `i`);
  if (regex.test(ua) || regex.test(bundle_id)) {
    const { cm, hx, id, ids, latest, version } = list[i];
    const receiptdata = Object.assign({}, receipt, { "product_id": id });
    //处理数据
    switch (cm) {
      case 'timea':
        data = [ Object.assign({}, receiptdata, expirestime)];
        break;
      case 'timeb':
        data = [receiptdata];
        break;
      case 'timec':
        data = [];
        break;
      case 'timed':
        data = [
          Object.assign({}, receiptdata, expirestime, { "product_id": ids }),
          Object.assign({}, receiptdata, expirestime, { "product_id": id })
        ];
        break;
    }
    //处理核心收尾
    if (hx.includes('hxpda')) {
      chxm1023["receipt"]["in_app"] = data;
      chxm1023["latest_receipt_info"] = data;
      chxm1023["pending_renewal_info"] = [{ "product_id": id, "original_transaction_id": "490001314520000", "auto_renew_product_id": id, "auto_renew_status": "1" }];
      chxm1023["latest_receipt"] = latest;
    }
    else if (hx.includes('hxpdb')) {
      chxm1023["receipt"]["in_app"] = data;
    }
    else if (hx.includes('hxpdc')) {
      const xreceipt = { "expires_date_formatted" : "2099-09-09 09:09:09 Etc/GMT", "expires_date" : "4092599349000", "expires_date_formatted_pst" : "2099-09-09 06:06:06 America/Los_Angeles", "product_id" : id, };
      chxm1023["receipt"] = Object.assign({}, chxm1023["receipt"], xreceipt);
      chxm1023["latest_receipt_info"] = Object.assign({}, chxm1023["receipt"], xreceipt);
      chxm1023["status"] = 0;
      chxm1023["auto_renew_status"] = 1;
      chxm1023["auto_renew_product_id"] = id;
      delete chxm1023["latest_expired_receipt_info"];
      delete chxm1023["expiration_intent"];
    }
    // 判断是否需要加入版本号
    if (version && version.trim() !== '') { chxm1023["receipt"]["original_application_version"] = version; }
    anchor = true;
    console.log('恭喜您，已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');
    break;
  }
}

// 如果没有匹配到 UA 或 bundle_id 使用备用方案
if (!anchor) {
  data = [ Object.assign({}, receipt, expirestime)];
  chxm1023["receipt"]["in_app"] = data;
  chxm1023["latest_receipt_info"] = data;
  chxm1023["pending_renewal_info"] = [{ "product_id": yearlyid, "original_transaction_id": "490001314520000", "auto_renew_product_id": yearlyid, "auto_renew_status": "1" }];
  chxm1023["latest_receipt"] = "chxm1023";
  console.log('很遗憾未能识别出UA或bundle_id\n但已使用备用方案操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');
}

chxm1023["Telegram"] = "https://t.me/chxm1023";
chxm1023["warning"] = "仅供学习，禁止转载或售卖";

$done({ body: JSON.stringify(chxm1023) });
