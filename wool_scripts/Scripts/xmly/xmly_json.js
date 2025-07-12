const version = 'V1.0.38';
let body = $response.body;
if (body) {
  switch (!0) {
    case/discovery-category\/customCategories/.test($request.url):
      try {
        let e = JSON.parse(body);
        e.customCategoryList && (e.customCategoryList = e.customCategoryList.filter(e => ("recommend" == e.itemType || "template_category" == e.itemType || "single_category" == e.itemType) && 1005 !== e.categoryId)), e.defaultTabList && (e.defaultTabList = e.defaultTabList.filter(e => ("recommend" == e.itemType || "template_category" == e.itemType || "single_category" == e.itemType) && 1005 !== e.categoryId)), body = JSON.stringify(e)
      } catch (t) {
        console.log("customCategories: " + t)
      }
      break;
    case/discovery-category\/v\d\/category/.test($request.url):
      try {
        let a = JSON.parse(body);
        a.focusImages && a.focusImages.data && (a.focusImages.data = a.focusImages.data.filter(e => -1 != e.realLink.indexOf("open") && !e.isAd)), body = JSON.stringify(a)
      } catch (r) {
        console.log("categories: " + r)
      }
      break;
    case/focus-mobile\/focusPic/.test($request.url):
      try {
        let s = JSON.parse(body);
        s.header && s.header.length <= 1 && (s.header[0].item.list[0].data = s.header[0].item.list[0].data.filter(e => -1 != e.realLink.indexOf("open") && !e.isAd)), body = JSON.stringify(s)
      } catch (i) {
        console.log("discovery-feed" + i)
      }
      break;
    case/discovery-feed\/v\d\/mix/.test($request.url):
      try {
        let o = JSON.parse(body);
        o.header?.length == 2 && delete o.header[0], o.body = o.body.filter(e => !(e.item?.adInfo || e.item?.moduleType == "mix_ad" || "bigCard" == e.displayClass)), body = JSON.stringify(o)
      } catch (d) {
        console.log("discovery-feed:" + d)
      }
      break;
    case/mobile-user\/v\d\/homePage/.test($request.url):
      try {
        let c = new Set([210, 213, 215]), y = JSON.parse(body);
        if (y.data.serviceModule.entrances) {
          let l = y.data.serviceModule.entrances.filter(e => c.has(e.id));
          y.data.serviceModule.entrances = l
        }
        body = JSON.stringify(y)
      } catch (g) {
        console.log("mobile-user:" + g)
      }
      break;
    default:
      $done({})
  }
  $done({body})
} else $done({});
