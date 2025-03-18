# ************************************# 
# 项目功能：App去广告/小程序去广告
# 更新日期：2025-03-18
# 脚本作者：@ddm1023
# 电报频道：https://t.me/ddm1023
# 使用声明：⚠️仅供参考，🈲转载与售卖！
# ************************************# 

########## App去广告系列 ##########

# 阿里系列开屏 hostname = *.m.taobao.com
^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.(alibaba\.advertisementservice\.getadv|alimama\.etao\.config\.query\/.+?etao_advertise|alimusic\.common\.mobileservice\.startinit|etao\.noah\.query\/.+tao_splash|film\.mtopadvertiseapi\.queryadvertise|o2o\.ad\.gateway\.get|taobao\.idle\.home\.welcome|trip\.activity\.querytmsresources) url reject-dict
^https?:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.(cainiao\.adx\.flyad\.getad|taobao\.(volvo\.secondfloor\.getconfig|wireless\.home\.newface\.awesome\.get)) url reject-dict

# 京东金融 去除开屏广告 hostname = ms.jr.jd.com
^https?:\/\/ms\.jr\.jd\.com\/gw\/generic\/aladdin\/newna\/m\/getLoadingPicture url reject-200

# 京喜/京喜特价/京东小家 去除开屏广告 hostname = api.*.jd.com
^https?:\/\/api\..*\.jd\.com\/(client\.action\?functionId=lite_advertising|.+\/service\/getLoadingLinks) url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/jhad.js

# 趣听音乐馆 屏蔽弹窗–自动激活App hostname = api.bspapp.com, api.next.bspapp.com
^https?:\/\/(api|api\.next)\.bspapp\.com\/client$ url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/quting.js

# 瓜子影视横幅广告 hostname = api.5fcgcnn.com, api.hpdgjnf.com
^https?:\/\/api\.(5fcgcnn|hpdgjnf)\.com\/App\/Ad\/(barsIndexAdInfo|splashInfo|vajraInfo) url reject-dict

# 段咖影视-去除所有 hostname = www.duankamv.site
^https?:\/\/www\.duankamv\.site\/api\/DKswitch url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/Admodule.js

# 1080-看世界-去除公告弹窗显示
http:\/\/(haoa\.woaifan\.me|172\.247\.68\.76):\d+\/(aifan|xnm)\.php\/v\d\/top_notice url reject-dict

# 新剧多-xjd333.com hostname = apple.tongchengfabu.com
^https?:\/\/apple\.tongchengfabu\.com\/video url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/Admodule.js

# 佩奇影视-去除开屏显示/首页弹窗
http:\/\/162\.209\.166\.196:6080\/pqys\.php\/v\d\/(app_config|top_notice) url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/Admodule.js

# 小龙/小毛影视 hostname = api.juliangcili.com
^https:\/\/api\.juliangcili\.com\/\/api\/adver\/space\/waterFall\/list url reject-dict
http:\/\/sv\.adintl\.cn url reject

# 555影视 去除广告模块 hostname = vip7.fzwdyy.cn
^https?:\/\/vip7\.fzwdyy\.cn:8083\/api\/(getAdvertInfo|getGOOGAdvert) url reject-dict
# hostname = a.weilai555.com, app-v1.ecoliving168.com
^https?:\/\/.*\.(weilai555\.com:1000|ecoliving168\.com)\/api\/v\d\/movie\/(index_recommend.+|detail) url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/555ad.js

# 酷安 去好物推荐 hostname = api.coolapk.com
^https:\/\/api\.coolapk\.com\/v\d\/feed\/detail.* url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/KA.js

# 大师兄 开屏倒计时广告 hostname = sdk.alibaba.com.ailbaba.me
^https?:\/\/sdk\.alibaba\.com\.ailbaba\.me\/xgapp\.php\/.+\/(top_notice.+|advert.position.[^2](?<=position..)) url reject-dict

# Clicli hostname = js-ad.ayximgss.com
^https?:\/\/js-ad\.ayximgs\.com\.ad-universe-cdn\.hzhcbkj\.cn\/xgapp\.php\/v2\/top_notice? url reject

# Omofun https://t.me/ae86_ios/140
# hostname = 103.91.210.141:2515
^https?:\/\/103\.91\.210\.141:2515\/xgapp\.php\/v\d\/top_notice? url reject

# 鸭奈飞 去开屏广告 hostname = pipi.4kya.com
^https?:\/\/pipi\.4kya\.com/\/xgapp\.php\/v3\/advert.position.[^2](?<=position..) url reject

# 无他相机 去开屏广告 hostname = image.cdn.zxrtb.com
^https?:\/\/image\.cdn\.zxrtb\.com url reject-200

# 网速管家 去开屏广告 hostname = *.speedtest.cn
^https:\/\/.*\.speedtest\.cn\/(images|api\/.+\/showpic\/position?(.*?)) url reject-200

# 拼多多相关广告和营销路径 hostname = adim.pinduoduo.com, images.pinduoduo.com, t-dsp.pinduoduo.com
^https:\/\/(?:adim|images|t-dsp)\.pinduoduo\.com\/(?:.*\/toutiao|mrk\/.*|marketing_api|dspcb\/i\/mrk_union) url reject-dict

# 拼多多视频广告路径 hostname = video-dsp.pddpic.com
^https:\/\/video-dsp\.pddpic\.com\/market-dsp-video url reject-dict

# 字节跳动相关广告和数据上报接口 hostname = log-api.pangolin-sdk-toutiao*.com, api-access.pangolin-sdk-toutiao*.com, gromore.pangolin-sdk-toutiao.com, *.pglstatp-toutiao.com, toblog.ctobsnssdk.com
^https?:\/\/(log-api|api-access|gromore)\.pangolin-sdk-toutiao.*\.com\/(service|api\/ad)? url reject
^https?:\/\/.*\.pglstatp-toutiao\.com\/.* url reject
^https?:\/\/toblog\.ctobsnssdk\.com\/service url reject

# TX广点通相关广告路径 hostname = *.gdt.qq.com, adsmind.gdtimg.com, pgdt.gtimg.cn
^https?:\/\/(.*\.gdt\.qq\.com\/(gdt_mview.*|server_bidding)|adsmind\.gdtimg\.com\/ads_svp_video.*|pgdt\.gtimg\.cn) url reject-200

# 拦截TX广告服务 hostname = vpic.cms.qq.com, us.l.qq.com, sdk.e.qq.com, ad.qq.com, qzs.gdtimg.com, snowflake.qq.com
^https?:\/\/vpic\.cms\.qq\.com\/nj_vpic url reject
^https?:\/\/us\.l\.qq\.com\/exapp.* url reject
^https?:\/\/sdk\.e\.qq\.com url reject
^https?:\/\/ad\.qq\.com url reject
^https?:\/\/qzs\.gdtimg\.com\/union url reject
^https?:\/\/snowflake\.qq\.com\/ola url reject

# 广告营销服务 hostname = *.cpatrk.net
//^https?:\/\/.*\.cpatrk\.net url reject

# 拦截 Twitter 的广告内容 hostname = ads.twitter.com
^https?:\/\/ads\.twitter\.com url reject

# 拦截 Google 的广告服务 (DoubleClick 是 Google旗下的广告平台) hostname = googleads.g.doubleclick.net
^https?:\/\/googleads\.g\.doubleclick\.net url reject

# 拦截 Google AdSense 服务，该服务用于提供 Google 的网页广告 hostname = pagead2.googlesyndication.com
^https?:\/\/pagead2\.googlesyndication\.com url reject

# 拦截 Google 的广告服务接口 hostname = adservice.google.com
^https?:\/\/adservice\.google\.com url reject

# 拦截 AppNexus 广告，AppNexus 是一家实时广告技术公司 hostname = ib.adnxs.com
^https?:\/\/ib\.adnxs\.com url reject

# 拦截雅虎广告内容 hostname = as.yahoo.com
^https?:\/\/as\.yahoo\.com url reject

# 拦截使用安全协议加载的 Google 广告 hostname = ssl.googlesyndication.com
^https?:\/\/ssl\.googlesyndication\.com url reject

# 快手开放平台广告接口 hostname = open.e.kuaishou.com
^https?:\/\/open\.e\.kuaishou\.com\/rest url reject-200

# 巨量引擎广告分析接口 hostname = analytics.oceanengine.com
^https?:\/\/analytics\.oceanengine\.com\/sdk\/app url reject-dict

# AnyThink 广告竞价接口 hostname = adx-bj.anythinktech.com
^https?:\/\/adx-bj\.anythinktech\.com\/bid url reject

# Sigmob（思谋广告） hostname = adservice.sigmob.cn
^https?:\/\/adservice\.sigmob\.cn url reject

# BridgeOOS 广告竞价接口 hostname = adx-os.bridgeoos.com
^https?:\/\/adx-os\.bridgeoos\.com url reject

# 友盟日志上报接口 hostname = ulogs.umeng*.com
^https?:\/\/ulogs\.umeng.*\.com url reject

# 网易邮箱相关接口 hostname = appconf.mail.163.com, dashi.163.com
^https:\/\/(?:appconf\.mail\.163\.com\/(?:mailmaster\/api\/http\/urlConfig\.do|mailoperating\/mailmaster\/api\/operator\/get)|dashi\.163\.com\/task-center-api\/fapi\/task\/list$) url reject-dict

# 酷狗概念版去开屏广告 hostname = gateway.kugou.com
^https?:\/\/gateway\.kugou\.com\/(youth\/v\d\/(ad\/play_status.+|start_img\/get_set|ab\/tmeab.+)|ads.+) url reject-dict
# hostname = adsfileretry.service.kugou.com
^https?:\/\/adsfileretry\.service\.kugou\.com url reject-dict

# 特狗影视-屏蔽弹窗
^http:\/\/162\.209\.190\.203:510\/tegou\.php\/.+\/top_notice url reject

# 掌上公交去广告 hostname = *.mygolbs.com
^https?:\/\/quanguo\.mygolbs\.com:8081 url reject
^https?:\/\/remind\.mygolbs\.com\/remind-off\/query\/.+ url reject

# 掌上公交最下方新闻广告列表 hostname = cpu-openapi.baidu.com, mobads.baidu.com
^https?:\/\/(cpu-openapi|mobads)\.baidu\.com\/(api\/.+\/data\/list|ads|cpro) url reject

# 淘淘阅读 hostname = bid.adview.cn
^https?:\/\/bid\.adview\.cn\/agent\/getAd url reject

# 豆瓣开屏广告 hostname = api.douban.com
^https?:\/\/api\.douban\.com\/.+\/.*ads url reject-200

# 百度系列 hostname = mime.baidu.com
^https?:\/\/mime\.baidu\.com\/v\d\/(activity\/advertisement|start_screen_ads\/list) url reject-dict
# hostname = bgg.baidu.com
^https?:\/\/bgg\.baidu\.com\/bgg\/produce url reject-dict

# 漫步者APP hostname = app-statistics.edifier.com
^https?:\/\/app-statistics\.edifier\.com\/api\/v1\/app_marquee_statistics url reject-dict
# hostname = admin-app.edifier.com
^https?:\/\/admin-app\.edifier\.com url reject-dict



########## 小程序广告系列 ##########

# 亲邻开门-AD净化(App+小程序) hostname = qadx*.qinlinad.com, mall-dsp*.qinlinkeji.com
^https?:\/\/(qadx.*\.qinlinad|mall-dsp.*\.qinlinkeji)\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/xcx/qlkm.js

# 海绵去水印 hostname = analysis.20kaka.cn
^https?:\/\/analysis\.20kaka\.cn\/api\/wechat url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/hmqsy.js

# 功夫去水印 hostname = q12.tuanyougou.com
^https?:\/\/q12\.tuanyougou\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/hmqsy.js

# 搜罗好货 hostname = www.i3zh.com
^https?:\/\/www\.i3zh\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/xcx/slhh.js

# 小打卡-App＋小程序通用 hostname = *.sharedaka.com
^https?:\/\/.*\.sharedaka\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/xiaodaka.js

# 漫画台Lite hostname = comic.321mh.com
^https?:\/\/comic\.321mh\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/donghuatai.js

# 怪兽充电 hostname = *.enmonster.com
^https?:\/\/.*\.enmonster\.com\/apa\/(advert\/demand\/home\/poster|index\/advert\/skin) url reject-dict

# 公众号文章去广告 hostname = mp.weixin.qq.com
^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/wxgzhad.js

# 小野分享 hostname = lysl2020.com
^https?:\/\/lysl2020.com/wp-json/wp/v2/posts url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/Admodule.js

# 小程序解锁查看数据 hostname = *.hseon.cn, *.hhios.cn, *.ppkok.com
^https?:\/\/.*\.(hseon|hhios|ppkok)\.(cn|com)\/api url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/Admodule.js



hostname = admin-app.edifier.com, *.m.taobao.com, ms.jr.jd.com, api.*.jd.com, api.next.bspapp.com, api.bspapp.com, api.5fcgcnn.com, api.hpdgjnf.com, www.duankamv.site, apple.tongchengfabu.com, api.juliangcili.com, vip7.fzwdyy.cn, app-v1.ecoliving168.com, a.weilai555.com, api.coolapk.com, sdk.alibaba.com.ailbaba.me, js-ad.ayximgss.com, pipi.4kya.com, image.cdn.zxrtb.com, *.speedtest.cn, adim.pinduoduo.com, images.pinduoduo.com, t-dsp.pinduoduo.com, video-dsp.pddpic.com, *.pangolin-sdk-toutiao*.com, *.pglstatp-toutiao.com, toblog.ctobsnssdk.com, *.gdt.qq.com, adsmind.gdtimg.com, pgdt.gtimg.cn, vpic.cms.qq.com, us.l.qq.com, sdk.e.qq.com, ad.qq.com, qzs.gdtimg.com, snowflake.qq.com, *.cpatrk.net, ads.twitter.com, googleads.g.doubleclick.net, pagead2.googlesyndication.com, adservice.google.com, ib.adnxs.com, as.yahoo.com, ssl.googlesyndication.com, open.e.kuaishou.com, analytics.oceanengine.com, adx-bj.anythinktech.com, adx-os.bridgeoos.com, adservice.sigmob.cn, ulogs.umeng*.com, appconf.mail.163.com, dashi.163.com, adsfileretry.service.kugou.com, gateway.kugou.com, *.mygolbs.com, cpu-openapi.baidu.com, mobads.baidu.com, bid.adview.cn, api.douban.com, mime.baidu.com, bgg.baidu.com, app-statistics.edifier.com, admin-app.edifier.com, qadx*.qinlinad.com, mall-dsp*.qinlinkeji.com, analysis.20kaka.cn, q12.tuanyougou.com, www.i3zh.com, *.sharedaka.com, comic.321mh.com, *.enmonster.com, mp.weixin.qq.com, lysl2020.com, *.hseon.cn, *.hhios.cn, *.ppkok.com
