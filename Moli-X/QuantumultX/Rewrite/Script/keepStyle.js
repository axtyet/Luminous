/**********************************************
> 应用名称：墨鱼自用Keep去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-04-10
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
**********************************************/





const version = 'V1.0.33';


if(-1!=$request.url.indexOf("people/my")){let e=JSON.parse($response.body);e.data.floatingInfo={},e.data.memberInfo&&delete e.data.memberInfo,$done({body:JSON.stringify(e)})}else if(-1!=$request.url.indexOf("start")){let a=JSON.parse($response.body);a.data.status=!0,$done({body:JSON.stringify(a)})}else if(-1!=$request.url.indexOf("preview")){let t=JSON.parse($response.body);t.data.detailSections=Object.values(t.data.detailSections).filter(e=>"recommendation"!=e.sectionType),t.data.extendInfo.startEnable=!0,t.data.extendInfo.hasPaid=!0,$done({body:JSON.stringify(t)})}else if(-1!=$request.url.indexOf("twins/v4/feed/course")){let o=JSON.parse($response.body);o.data.modules=Object.values(o.data.modules).filter(e=>!("homepageCommonContainer"==e.code||"homepageLive"==e.code)),$done({body:JSON.stringify(o)})}else if(-1!=$request.url.indexOf("config/v3/basic")){let d=JSON.parse($response.body);d.data.bottomBarControl.defaultTab="home",d.data.bottomBarControl.tabs=Object.values(d.data.bottomBarControl.tabs).filter(e=>"home"==e.tabType||"dynamic_sports"==e.tabType||"personal"==e.tabType),d.data.homeTabs=[{type:"homeRecommend",order:1,name:"推荐",schema:"keep://homepage/homeRecommend",showInFewDays:7,reverseSwitch:!1,default:!0},{type:"homePrime",order:2,name:"会员",schema:"keep://coursepage/homePrime",showInFewDays:7,reverseSwitch:!1,default:!1}],$done({body:JSON.stringify(d)})}else $done();
