/**
 * @author fmz200
 * @function 小红书去广告、净化、解除下载限制、画质增强等
 * @date 2025-03-21 21:19:00
 * @quote @RuCu6
 */

const $ = new Env('小红书');
const url = $request.url;
let rsp_body = $response.body;
if (!rsp_body) {
  $done({});
}
let obj = JSON.parse(rsp_body);

if (url.includes("/search/banner_list")) {
  obj.data = {};
} 

if (url.includes("/search/hot_list")) {
  // 热搜列表
  obj.data.items = [];
}

if (url.includes("/search/hint")) {
  // 搜索栏填充词
  obj.data.hint_words = [];
}

if (url.includes("/search/trending?")) {
  // 搜索栏
  obj.data.queries = [];
  obj.data.hint_word = {};
}

if (url.includes("/search/notes?")) {
  // 搜索结果
  if (obj.data.items?.length > 0) {
    obj.data.items = obj.data.items.filter((i) => i.model_type === "note");
  }
}

if (url.includes("/system_service/config?")) {
  // 整体配置
  const item = ["app_theme", "loading_img", "splash", "store"];
  if (obj.data) {
    for (let i of item) {
      delete obj.data[i];
    }
  }
}

if (url.includes("/system_service/splash_config")) {
  // 开屏广告
  if (obj?.data?.ads_groups?.length > 0) {
    for (let i of obj.data.ads_groups) {
      i.start_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
      i.end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
      if (i?.ads?.length > 0) {
        for (let ii of i.ads) {
          ii.start_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
          ii.end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
        }
      }
    }
  }
}

if (url.includes("/note/imagefeed?") || url.includes("/note/feed?")) {
  // 信息流 图片
  if (obj?.data?.length > 0) {
    if (obj.data[0]?.note_list?.length > 0) {
      for (let item of obj.data[0].note_list) {
        if (item?.media_save_config) {
          // 水印开关
          item.media_save_config.disable_save = false;
          item.media_save_config.disable_watermark = true;
          item.media_save_config.disable_weibo_cover = true;
        }
        if (item?.share_info?.function_entries?.length > 0) {
          // 下载限制
          const addItem = {type: "video_download"};
          let func = item.share_info.function_entries[0];
          if (func?.type !== "video_download") {
            // 向数组开头添加对象
            item.share_info.function_entries.unshift(addItem);
          }
        }
      }

      const images_list = obj.data[0].note_list[0].images_list;
      // 画质增强
      obj.data[0].note_list[0].images_list = imageEnhance(JSON.stringify(images_list));
      // 保存无水印信息
      $.setdata(JSON.stringify(images_list), "fmz200.xiaohongshu.feed.rsp");
      console.log('已存储无水印信息♻️');
    }
  }
} 

if (url.includes("/note/live_photo/save")) {
  console.log('原body：' + rsp_body);
  const rsp = $.getdata("fmz200.xiaohongshu.feed.rsp");
  console.log("读取缓存key：fmz200.xiaohongshu.feed.rsp");
  // console.log("读取缓存val：" + rsp);
  if (rsp == null || rsp.length === 0) {
    console.log('缓存无内容，返回原body');
    $done({body: rsp_body});
  }
  const cache_body = JSON.parse(rsp);
  let new_data = [];
  for (const images of cache_body) {
    if (images.live_photo_file_id) {
      const item = {
        file_id: images.live_photo_file_id,
        video_id: images.live_photo.media.video_id,
        url: images.live_photo.media.stream.h265[0].master_url
      };
      new_data.push(item);
    }
  }
  if (obj.data.datas) {
    replaceUrlContent(obj.data.datas, new_data);
  } else {
    obj = {"code": 0, "success": true, "msg": "成功", "data": {"datas": new_data}};
  }
  console.log('新body：' + JSON.stringify(obj));
} 

if (url.includes("/note/widgets")) {
  const item = ["cooperate_binds", "generic", "note_next_step"];
  if (obj?.data) {
    for (let i of item) {
      delete obj.data[i];
    }
  }
} 

if (url.includes("/v3/note/videofeed?")) {
  // 信息流 视频
  if (obj?.data?.length > 0) {
    for (let item of obj.data) {
      if (item?.media_save_config) {
        // 水印
        item.media_save_config.disable_save = false;
        item.media_save_config.disable_watermark = true;
        item.media_save_config.disable_weibo_cover = true;
      }
      if (item?.share_info?.function_entries?.length > 0) {
        // 下载限制
        const addItem = {type: "video_download"};
        let func = item.share_info.function_entries[0];
        if (func?.type !== "video_download") {
          // 向数组开头添加对象
          item.share_info.function_entries.unshift(addItem);
        }
      }
    }
  }
}

if (url.includes("/v4/note/videofeed")) {
  // 信息流 视频
  let newDatas = [];
  let unlockDatas = [];
  if (obj?.data?.length > 0) {
    for (let item of obj.data) {
      // 检查function_entries中的每一个元素的type属性是否等于"video_download"
      console.log("检查是否有下载按钮")
      let found = false;
      for (let entry of item.share_info.function_entries) {
        if (entry.type === "video_download") {
          found = true;
          break;
        }
      }
      // 如果没有匹配到，则添加一个新的元素
      if (!found) {
        console.log("添加下载按钮")
        item.share_info.function_entries.push({
          "type": "video_download"
        });
      }
      // 存储无水印视频链接
      if (item?.id !== "" && item?.video_info_v2?.media?.stream?.h265?.[0]?.master_url !== "") {
        let myData = {
          id: item.id,
          url: item.video_info_v2.media.stream.h265[0].master_url
        };
        newDatas.push(myData);
      }
    }
    $.setdata(JSON.stringify(newDatas), "redBookVideoFeed"); // 普通视频 写入持久化存储
  }
  // let cache = $.getdata("redBookVideoFeedUnlock");
  let videoFeedUnlock = {notSave: "fmz200"}; // 禁止保存的视频 读取持久化存储
  if (videoFeedUnlock?.notSave === "fmz200") {
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        if (item?.id !== "" && item?.video_info_v2?.media?.stream?.h265?.[0]?.master_url !== "") {
          let myData = {
            id: item.id,
            url: item.video_info_v2.media.stream.h265[0].master_url
          };
          unlockDatas.push(myData);
        }
      }
    }
    $.setdata(JSON.stringify(unlockDatas), "redBookVideoFeedUnlock"); // 禁止保存的视频 写入持久化存储
  }
}

if (url.includes("/v10/note/video/save")) {
  // 视频保存请求
  let videoFeed = JSON.parse($.getdata("redBookVideoFeed")); // 普通视频 读取持久化存储
  let videoFeedUnlock = JSON.parse($.getdata("redBookVideoFeedUnlock")); // 禁止保存的视频 读取持久化存储
  if (obj?.data?.note_id !== "" && videoFeed?.length > 0) {
    for (let item of videoFeed) {
      if (item.id === obj.data.note_id) {
        obj.data.download_url = item.url;
      }
    }
  }
  if (obj?.data?.note_id !== "" && videoFeedUnlock?.length > 0) {
    if (obj?.data?.disable === true && obj?.data?.msg !== "") {
      delete obj.data.disable;
      delete obj.data.msg;
      obj.data.download_url = "";
      obj.data.status = 2;
      for (let item of videoFeedUnlock) {
        if (item.id === obj.data.note_id) {
          obj.data.download_url = item.url;
        }
      }
    }
  }
  videoFeedUnlock = { notSave: "fmz200" };
  $.setdata(JSON.stringify(videoFeedUnlock), "redBookVideoFeedUnlock");
}

if (url.includes("/user/followings/followfeed")) {
  // 关注页信息流 可能感兴趣的人
  if (obj?.data?.items?.length > 0) {
    // 白名单
    obj.data.items = obj.data.items.filter((i) => i?.recommend_reason === "friend_post");
  }
} 

if (url.includes("/v4/followfeed")) {
  // 关注列表
  if (obj?.data?.items?.length > 0) {
    // recommend_user 可能感兴趣的人
    obj.data.items = obj.data.items.filter((i) => !["recommend_user"].includes(i.recommend_reason));
  }
}  

if (url.includes("/recommend/user/follow_recommend")) {
  // 用户详情页 你可能感兴趣的人
  if (obj?.data?.title === "你可能感兴趣的人" && obj?.data?.rec_users?.length > 0) {
    obj.data = {};
  }
} 

if (url.includes("/v6/homefeed")) {
  if (obj?.data?.length > 0) {
    // 信息流广告
    let newItems = [];
    for (let item of obj.data) {
      if (item?.model_type === "live_v2") {
        // 信息流-直播

      } else if (item?.hasOwnProperty("ads_info")) {
        // 信息流-赞助

      } else if (item?.hasOwnProperty("card_icon")) {
        // 信息流-带货

      } else if (item?.note_attributes?.includes("goods")) {
        // 信息流-商品

      } else {
        if (item?.related_ques) {
          delete item.related_ques;
        }
        newItems.push(item);
      }
    }
    obj.data = newItems;
  }
}

// 加载评论区
if (url.includes("/api/sns/v5/note/comment/list?")) {
  replaceRedIdWithFmz200(obj.data);
  let livePhotos = [];
  let note_id = "";
  if (obj.data?.comments?.length > 0) {
    note_id = obj.data.comments[0].note_id;
    for (const comment of obj.data.comments) {
      if (comment.pictures?.length > 0) {
        console.log("comment_id: " + comment.id);
        for (const picture of comment.pictures) {
          if (picture.video_id) {
            const picObj = JSON.parse(picture.video_info);
            if (picObj.stream?.h265?.[0]?.master_url) {
              console.log("video_id：" + picture.video_id);
              const videoData = {
                videId: picture.video_id,
                videoUrl: picObj.stream.h265[0].master_url
              };
              livePhotos.push(videoData);
            }
          }
        }
      }
      if (comment.sub_comments?.length > 0) {
        for (const sub_comment of comment.sub_comments) {
          if (sub_comment.pictures?.length > 0) {
            console.log("comment_id1: " + comment.id);
            for (const picture of sub_comment.pictures) {
              if (picture.video_id) {
                const picObj = JSON.parse(picture.video_info);
                if (picObj.stream?.h265?.[0]?.master_url) {
                  console.log("video_id1：" + picture.video_id);
                  const videoData = {
                    videId: picture.video_id,
                    videoUrl: picObj.stream.h265[0].master_url
                  };
                  livePhotos.push(videoData);
                }
              }
            }
          }
        }
      }
    }
  }
  console.log("本次note_id：" + note_id);
  if (livePhotos.length > 0) {
    let commitsRsp;
    const commitsCache = $.getdata("fmz200.xiaohongshu.comments.rsp");
    console.log("读取缓存val：" + commitsCache);
    if (!commitsCache) {
      commitsRsp = {noteId: note_id, livePhotos: livePhotos};
    } else {
      commitsRsp = JSON.parse(commitsCache);
      console.log("缓存note_id：" + commitsRsp.noteId);
      if (commitsRsp.noteId === note_id) {
        console.log("增量数据");
        commitsRsp.livePhotos = deduplicateLivePhotos(commitsRsp.livePhotos.concat(livePhotos));
      } else {
        console.log("更换数据");
        commitsRsp = {noteId: note_id, livePhotos: livePhotos};
      }
    }
    console.log("写入缓存val：" + JSON.stringify(commitsRsp));
    $.setdata(JSON.stringify(commitsRsp), "fmz200.xiaohongshu.comments.rsp");
  }
}

// 下载评论区live图
if (url.includes("/api/sns/v1/interaction/comment/video/download?")) {
  const commitsCache = $.getdata("fmz200.xiaohongshu.comments.rsp");
  console.log("读取缓存val：" + commitsCache);
  console.log("目标video_id：" + obj.data.video.video_id);
  if (commitsCache) {
    let commitsRsp = JSON.parse(commitsCache);
    if (commitsRsp.livePhotos.length > 0 && obj.data?.video) {
      for (const item of commitsRsp.livePhotos) {
        // console.log("缓存video_id：" + item.videId);
        if (item.videId === obj.data.video.video_id) {
          console.log("匹配到无水印链接：" + item.videoUrl);
          obj.data.video.video_url = item.videoUrl;
          break;
        }
      }
    }
  } else {
    console.log(`没有[${obj.data?.video.video_id}]的无水印地址`);
  }
}

$done({body: JSON.stringify(obj)});

// 小红书画质增强：加载2K分辨率的图片
function imageEnhance(jsonStr) {
  const imageQuality = $.getdata("fmz200.xiaohongshu.imageQuality");
  console.log(`Image Quality: ${imageQuality}`);
  if (imageQuality === "original") { // 原始分辨率，PNG格式的图片，占用空间比较大
    console.log("画质修改为-原始分辨率");
    jsonStr = jsonStr.replace(/\?imageView2\/2[^&]*(?:&redImage\/frame\/0)/, "?imageView2/0/format/png&redImage/frame/0");
  } else { // 高像素输出
    console.log("画质修改为-高像素输出");
    const regex1 = /imageView2\/2\/w\/\d+\/format/g;
    jsonStr = jsonStr.replace(regex1, `imageView2/2/w/2160/format`);

    const regex2 = /imageView2\/2\/h\/\d+\/format/g;
    jsonStr = jsonStr.replace(regex2, `imageView2/2/h/2160/format`);
  }
  console.log('图片画质增强完成✅');

  return JSON.parse(jsonStr);
}

function replaceUrlContent(collectionA, collectionB) {
  console.log('替换无水印的URL');
  collectionA.forEach(itemA => {
    const matchingItemB = collectionB.find(itemB => itemB.file_id === itemA.file_id);
    if (matchingItemB) {
      itemA.url = itemA.url.replace(/(.*)\.mp4/, `${matchingItemB.url.match(/(.*)\.mp4/)[1]}.mp4`);
      itemA.author = "@fmz200"
    }
  });
}

function deduplicateLivePhotos(livePhotos) {
  const seen = new Map();
  livePhotos = livePhotos.filter(item => {
    if (seen.has(item.videId)) {
      return false;
    }
    seen.set(item.videId, true);
    return true;
  });
  return livePhotos;
}

function replaceRedIdWithFmz200(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(item => replaceRedIdWithFmz200(item));
  } else if (typeof obj === 'object' && obj !== null) {
    if ('red_id' in obj) {
      obj.fmz200 = obj.red_id; // 创建新属性fmz200
      delete obj.red_id; // 删除旧属性red_id
    }
    Object.keys(obj).forEach(key => {
      replaceRedIdWithFmz200(obj[key]);
    });
  }
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } isShadowrocket() { return "undefined" != typeof $rocket } isStash() { return "undefined" != typeof $environment && $environment["stash-version"] } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, a] = i.split("@"), n = { url: `http://${a}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), a = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(a); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: i, statusCode: r, headers: o, rawBody: a } = t, n = s.decode(a, this.encoding); e(null, { status: i, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: i, response: r } = t; e(i, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let i = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...o } = t; this.got[s](r, o).then(t => { const { statusCode: s, statusCode: r, headers: o, rawBody: a } = t, n = i.decode(a, this.encoding); e(null, { status: s, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && i.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, i = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": i } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), this.isSurge() || this.isQuanX() || this.isLoon() ? $done(t) : this.isNode() && process.exit(1) } }(t, e) }
