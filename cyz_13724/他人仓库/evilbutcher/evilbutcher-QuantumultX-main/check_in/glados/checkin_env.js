/*
Check in for Surge by Neurogram

 - 站点签到脚本
 - 流量详情显示
 - 多站签到支持
 - 多类站点支持

使用说明：https://www.notion.so/neurogram/Check-in-0797ec9f9f3f445aae241d7762cf9d8b

关于作者
Telegram: Neurogram
GitHub: Neurogram-R

————————————————————

【机场签到Cookie版】修改自Neurogram
Modified by evilbutcher

【仓库地址】https://github.com/evilbutcher/QuantumultX/tree/master（欢迎star🌟）

【BoxJs】https://raw.githubusercontent.com/evilbutcher/QuantumultX/master/evilbutcher.boxjs.json

【致谢】
使用Chavy的Env.js修改了原脚本，支持Quantumult X和Loon，并支持BoxJs

⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

自行写cron，例如 0 1 0 * * * https://raw.githubusercontent.com/evilbutcher/QuantumultX/master/check_in/glados/checkin_env.js

*/
const $ = new Env("机场签到");
$.autoLogout = true;

if (
  $.getdata("evil_checkintitle") != undefined &&
  $.getdata("evil_checkintitle") != ""
) {
  var acc = $.getdata("evil_checkintitle");
  accounts = acc.split("，");
} else {
  $.msg("机场签到", "", "请在 BoxJs 检查标题填写是否正确", "http://boxjs.com");
}

if (
  $.getdata("evil_checkinlogin") != undefined &&
  $.getdata("evil_checkinlogin") != ""
) {
  var ur = $.getdata("evil_checkinlogin");
  urls = ur.split("，");
} else {
  $.msg("机场签到", "", "请在 BoxJs 检查链接填写是否正确", "http://boxjs.com");
}

if (
  $.getdata("evil_checkinemail") != undefined &&
  $.getdata("evil_checkinemail") != ""
) {
  var ema = $.getdata("evil_checkinemail");
  emails = ema.split("，");
} else {
  $.msg("机场签到", "", "请在 BoxJs 检查邮箱填写是否正确", "http://boxjs.com");
}

if (
  $.getdata("evil_checkinpwd") != undefined &&
  $.getdata("evil_checkinpwd") != ""
) {
  var pwd = $.getdata("evil_checkinpwd");
  passwords = pwd.split("，");
} else {
  $.msg("机场签到", "", "请在 BoxJs 检查密码填写是否正确", "http://boxjs.com");
}

$.autoLogout = JSON.parse($.getdata("evil_autoLogout") || $.autoLogout);

!(async () => {
  await launch();
})()
  .catch((e) => {
    $.log("", `❌失败! 原因: ${e}!`, "");
  })
  .finally(() => {
    $.done();
  });

async function launch() {
  for (var i in accounts) {
    let title = accounts[i];
    let url = urls[i];
    let email = emails[i];
    let password = passwords[i];
    if ($.autoLogout) {
      let logoutPath =
        url.indexOf("auth/login") != -1 ? "user/logout" : "user/logout.php";
      var logouturl = {
        url: url.replace(/(auth|user)\/login(.php)*/g, "") + logoutPath,
      };
      console.log(JSON.stringify(logouturl));
      $.get(logouturl);
    }
    await checkin(url, email, password, title);
    if ($.checkinok == true) {
      await dataResults(url, $.checkindatamsg, title);
    } else {
      await login(url, email, password, title);
      if ($.loginok == true) {
        await checkin(url, email, password, title);
        if ($.checkinok == true) {
          await dataResults(url, $.checkindatamsg, title);
        }
      }
    }
  }
}

function login(url, email, password, title) {
  let loginPath =
    url.indexOf("auth/login") != -1 ? "auth/login" : "user/_login.php";
  let table = {
    url:
      url.replace(/(auth|user)\/login(.php)*/g, "") +
      loginPath +
      `?email=${email}&passwd=${password}&rumber-me=week`,
  };
  console.log(loginPath + " 保护隐私隐去登录信息");
  return new Promise((resolve) => {
    $.post(table, function (error, response, data) {
      if (error) {
        console.log(JSON.stringify(error));
        $.msg(title + "登录失败", JSON.stringify(error), "");
        resolve();
      } else {
        if (
          JSON.parse(data).msg.match(
            /邮箱或者密码错误|Mail or password is incorrect/
          )
        ) {
          console.log(response);
          $.msg(title + "邮箱或者密码错误", "", "");
          $.loginok = false;
        } else {
          $.loginok = true;
          $.log("登陆成功");
        }
        resolve();
      }
    });
  });
}

function checkin(url, email, password, title) {
  let checkinPath =
    url.indexOf("auth/login") != -1 ? "user/checkin" : "user/_checkin.php";
  var checkinreqest = {
    url: url.replace(/(auth|user)\/login(.php)*/g, "") + checkinPath,
  };
  console.log(JSON.stringify(checkinreqest));
  return new Promise((resolve) => {
    $.post(checkinreqest, function (error, response, data) {
      if (error) {
        console.log(JSON.stringify(error));
        $.msg(title + "签到失败", JSON.stringify(error), "");
        resolve();
      } else {
        if (data.match(/\"msg\"\:/)) {
          $.checkinok = true;
          $.checkindatamsg = JSON.parse(data).msg;
          $.log("签到成功");
        } else {
          $.checkinok = false;
          $.log("签到失败");
        }
        resolve();
      }
    });
  });
}

function dataResults(url, checkinMsg, title) {
  let userPath = url.indexOf("auth/login") != -1 ? "user" : "user/index.php";
  var datarequest = {
    url: url.replace(/(auth|user)\/login(.php)*/g, "") + userPath,
  };
  console.log(JSON.stringify(datarequest));
  return new Promise((resolve) => {
    $.get(datarequest, function (error, response, data) {
      let resultData = "";
      let result = [];
      if (data.match(/theme\/malio/)) {
        let flowInfo = data.match(/trafficDountChat\s*\(([^\)]+)/);
        if (flowInfo) {
          let flowData = flowInfo[1].match(/\d[^\']+/g);
          let usedData = flowData[0];
          let todatUsed = flowData[1];
          let restData = flowData[2];
          result.push(
            `今日：${todatUsed}\n已用：${usedData}\n剩余：${restData}`
          );
        }
        let userInfo = data.match(/ChatraIntegration\s*=\s*({[^}]+)/);
        if (userInfo) {
          let user_name = userInfo[1].match(/name.+'(.+)'/)[1];
          let user_class = userInfo[1].match(/Class.+'(.+)'/)[1];
          let class_expire = userInfo[1].match(/Class_Expire.+'(.+)'/)[1];
          let money = userInfo[1].match(/Money.+'(.+)'/)[1];
          result.push(
            `用户名：${user_name}\n用户等级：lv${user_class}\n余额：${money}\n到期时间：${class_expire}`
          );
        }
        if (result.length != 0) {
          resultData = result.join("\n\n");
        }
      } else {
        let todayUsed = data.match(/>*\s*今日(已用|使用)*[^B]+/);
        if (todayUsed) {
          todayUsed = flowFormat(todayUsed[0]);
          result.push(`今日：${todayUsed}`);
        }
        let usedData = data.match(
          /(Used Transfer|>过去已用|>已用|>总已用|\"已用)[^B]+/
        );
        if (usedData) {
          usedData = flowFormat(usedData[0]);
          result.push(`已用：${usedData}`);
        }
        let restData = data.match(
          /(Remaining Transfer|>剩余流量|>流量剩余|>可用|\"剩余)[^B]+/
        );
        if (restData) {
          restData = flowFormat(restData[0]);
          result.push(`剩余：${restData}`);
        }
        if (result.length != 0) {
          resultData = result.join("\n");
        }
      }
      let flowMsg = resultData == "" ? "流量信息获取失败" : resultData;
      $.msg(title, checkinMsg, flowMsg);
      resolve();
    });
  });
}

function flowFormat(data) {
  data = data.replace(/\d+(\.\d+)*%/, "");
  let flow = data.match(/\d+(\.\d+)*\w*/);
  return flow[0] + "B";
}

//From chavyleung's Env.js
function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? { url: opts } : opts
      let sender = this.get
      if (method === 'POST') {
        sender = this.post
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err)
          else resolve(resp)
        })
      })
    }

    get(opts) {
      return this.send.call(this.env, opts)
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST')
    }
  }

  return new (class {
    constructor(name, opts) {
      this.name = name
      this.http = new Http(this)
      this.data = null
      this.dataFile = 'box.dat'
      this.logs = []
      this.isMute = false
      this.isNeedRewrite = false
      this.logSeparator = '\n'
      this.encoding = 'utf-8'
      this.startTime = new Date().getTime()
      Object.assign(this, opts)
      this.log('', `🔔${this.name}, 开始!`)
    }

    getEnv() {
      if ('undefined' !== typeof $environment && $environment['surge-version'])
        return 'Surge'
      if ('undefined' !== typeof $environment && $environment['stash-version'])
        return 'Stash'
      if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
      if ('undefined' !== typeof $task) return 'Quantumult X'
      if ('undefined' !== typeof $loon) return 'Loon'
      if ('undefined' !== typeof $rocket) return 'Shadowrocket'
    }

    isNode() {
      return 'Node.js' === this.getEnv()
    }

    isQuanX() {
      return 'Quantumult X' === this.getEnv()
    }

    isSurge() {
      return 'Surge' === this.getEnv()
    }

    isLoon() {
      return 'Loon' === this.getEnv()
    }

    isShadowrocket() {
      return 'Shadowrocket' === this.getEnv()
    }

    isStash() {
      return 'Stash' === this.getEnv()
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str)
      } catch {
        return defaultValue
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj)
      } catch {
        return defaultValue
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue
      const val = this.getdata(key)
      if (val) {
        try {
          json = JSON.parse(this.getdata(key))
        } catch { }
      }
      return json
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key)
      } catch {
        return false
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body))
      })
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
        let httpapi_timeout = this.getdata(
          '@chavy_boxjs_userCfgs.httpapi_timeout'
        )
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
        httpapi_timeout =
          runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
        const [key, addr] = httpapi.split('@')
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: {
            script_text: script,
            mock_type: 'cron',
            timeout: httpapi_timeout
          },
          headers: { 'X-Key': key, 'Accept': '*/*' },
          timeout: httpapi_timeout
        }
        this.post(opts, (err, resp, body) => resolve(body))
      }).catch((e) => this.logErr(e))
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        )
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile
            ? curDirDataFilePath
            : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      } else return {}
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        )
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
      let result = source
      for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
          return defaultValue
        }
      }
      return result
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
      path
        .slice(0, -1)
        .reduce(
          (a, c, i) =>
            Object(a[c]) === a[c]
              ? a[c]
              : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
          obj
        )[path[path.length - 1]] = value
      return obj
    }

    getdata(key) {
      let val = this.getval(key)
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objval = objkey ? this.getval(objkey) : ''
        if (objval) {
          try {
            const objedval = JSON.parse(objval)
            val = objedval ? this.lodash_get(objedval, paths, '') : val
          } catch (e) {
            val = ''
          }
        }
      }
      return val
    }

    setdata(val, key) {
      let issuc = false
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objdat = this.getval(objkey)
        const objval = objkey
          ? objdat === 'null'
            ? null
            : objdat || '{}'
          : '{}'
        try {
          const objedval = JSON.parse(objval)
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        } catch (e) {
          const objedval = {}
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        }
      } else {
        issuc = this.setval(val, key)
      }
      return issuc
    }

    getval(key) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
          return $persistentStore.read(key)
        case 'Quantumult X':
          return $prefs.valueForKey(key)
        case 'Node.js':
          this.data = this.loaddata()
          return this.data[key]
        default:
          return (this.data && this.data[key]) || null
      }
    }

    setval(val, key) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
          return $persistentStore.write(val, key)
        case 'Quantumult X':
          return $prefs.setValueForKey(val, key)
        case 'Node.js':
          this.data = this.loaddata()
          this.data[key] = val
          this.writedata()
          return true
        default:
          return (this.data && this.data[key]) || null
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got')
      this.cktough = this.cktough ? this.cktough : require('tough-cookie')
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar
        }
      }
    }

    get(request, callback = () => { }) {
      if (request.headers) {
        delete request.headers['Content-Type']
        delete request.headers['Content-Length']

        // HTTP/2 全是小写
        delete request.headers['content-type']
        delete request.headers['content-length']
      }
      if (request.params) {
        request.url += '?' + this.queryStr(request.params)
      }
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        default:
          if (this.isSurge() && this.isNeedRewrite) {
            request.headers = request.headers || {}
            Object.assign(request.headers, { 'X-Surge-Skip-Scripting': false })
          }
          $httpClient.get(request, (err, resp, body) => {
            if (!err && resp) {
              resp.body = body
              resp.statusCode = resp.status ? resp.status : resp.statusCode
              resp.status = resp.statusCode
            }
            callback(err, resp, body)
          })
          break
        case 'Quantumult X':
          if (this.isNeedRewrite) {
            request.opts = request.opts || {}
            Object.assign(request.opts, { hints: false })
          }
          $task.fetch(request).then(
            (resp) => {
              const {
                statusCode: status,
                statusCode,
                headers,
                body,
                bodyBytes
              } = resp
              callback(
                null,
                { status, statusCode, headers, body, bodyBytes },
                body,
                bodyBytes
              )
            },
            (err) => callback((err && err.error) || 'UndefinedError')
          )
          break
        case 'Node.js':
          let iconv = require('iconv-lite')
          this.initGotEnv(request)
          this.got(request)
            .on('redirect', (resp, nextOpts) => {
              try {
                if (resp.headers['set-cookie']) {
                  const ck = resp.headers['set-cookie']
                    .map(this.cktough.Cookie.parse)
                    .toString()
                  if (ck) {
                    this.ckjar.setCookieSync(ck, null)
                  }
                  nextOpts.cookieJar = this.ckjar
                }
              } catch (e) {
                this.logErr(e)
              }
              // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
            })
            .then(
              (resp) => {
                const {
                  statusCode: status,
                  statusCode,
                  headers,
                  rawBody
                } = resp
                const body = iconv.decode(rawBody, this.encoding)
                callback(
                  null,
                  { status, statusCode, headers, rawBody, body },
                  body
                )
              },
              (err) => {
                const { message: error, response: resp } = err
                callback(
                  error,
                  resp,
                  resp && iconv.decode(resp.rawBody, this.encoding)
                )
              }
            )
          break
      }
    }

    post(request, callback = () => { }) {
      const method = request.method
        ? request.method.toLocaleLowerCase()
        : 'post'

      // 如果指定了请求体, 但没指定 `Content-Type`、`content-type`, 则自动生成。
      if (
        request.body &&
        request.headers &&
        !request.headers['Content-Type'] &&
        !request.headers['content-type']
      ) {
        // HTTP/1、HTTP/2 都支持小写 headers
        request.headers['content-type'] = 'application/x-www-form-urlencoded'
      }
      // 为避免指定错误 `content-length` 这里删除该属性，由工具端 (HttpClient) 负责重新计算并赋值
      if (request.headers) {
        delete request.headers['Content-Length']
        delete request.headers['content-length']
      }
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        default:
          if (this.isSurge() && this.isNeedRewrite) {
            request.headers = request.headers || {}
            Object.assign(request.headers, { 'X-Surge-Skip-Scripting': false })
          }
          $httpClient[method](request, (err, resp, body) => {
            if (!err && resp) {
              resp.body = body
              resp.statusCode = resp.status ? resp.status : resp.statusCode
              resp.status = resp.statusCode
            }
            callback(err, resp, body)
          })
          break
        case 'Quantumult X':
          request.method = method
          if (this.isNeedRewrite) {
            request.opts = request.opts || {}
            Object.assign(request.opts, { hints: false })
          }
          $task.fetch(request).then(
            (resp) => {
              const {
                statusCode: status,
                statusCode,
                headers,
                body,
                bodyBytes
              } = resp
              callback(
                null,
                { status, statusCode, headers, body, bodyBytes },
                body,
                bodyBytes
              )
            },
            (err) => callback((err && err.error) || 'UndefinedError')
          )
          break
        case 'Node.js':
          let iconv = require('iconv-lite')
          this.initGotEnv(request)
          const { url, ..._request } = request
          this.got[method](url, _request).then(
            (resp) => {
              const { statusCode: status, statusCode, headers, rawBody } = resp
              const body = iconv.decode(rawBody, this.encoding)
              callback(
                null,
                { status, statusCode, headers, rawBody, body },
                body
              )
            },
            (err) => {
              const { message: error, response: resp } = err
              callback(
                error,
                resp,
                resp && iconv.decode(resp.rawBody, this.encoding)
              )
            }
          )
          break
      }
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {string} fmt 格式化参数
     * @param {number} 可选: 根据指定时间戳返回格式化日期
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date()
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
      return fmt
    }

    /**
     *
     * @param {Object} options
     * @returns {String} 将 Object 对象 转换成 queryStr: key=val&name=senku
     */
    queryStr(options) {
      let queryString = ''

      for (const key in options) {
        let value = options[key]
        if (value != null && value !== '') {
          if (typeof value === 'object') {
            value = JSON.stringify(value)
          }
          queryString += `${key}=${value}&`
        }
      }
      queryString = queryString.substring(0, queryString.length - 1)

      return queryString
    }

    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawopts) => {
        switch (typeof rawopts) {
          case undefined:
            return rawopts
          case 'string':
            switch (this.getEnv()) {
              case 'Surge':
              case 'Stash':
              default:
                return { url: rawopts }
              case 'Loon':
              case 'Shadowrocket':
                return rawopts
              case 'Quantumult X':
                return { 'open-url': rawopts }
              case 'Node.js':
                return undefined
            }
          case 'object':
            switch (this.getEnv()) {
              case 'Surge':
              case 'Stash':
              case 'Shadowrocket':
              default: {
                let openUrl =
                  rawopts.url || rawopts.openUrl || rawopts['open-url']
                return { url: openUrl }
              }
              case 'Loon': {
                let openUrl =
                  rawopts.openUrl || rawopts.url || rawopts['open-url']
                let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                return { openUrl, mediaUrl }
              }
              case 'Quantumult X': {
                let openUrl =
                  rawopts['open-url'] || rawopts.url || rawopts.openUrl
                let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                let updatePasteboard =
                  rawopts['update-pasteboard'] || rawopts.updatePasteboard
                return {
                  'open-url': openUrl,
                  'media-url': mediaUrl,
                  'update-pasteboard': updatePasteboard
                }
              }
              case 'Node.js':
                return undefined
            }
          default:
            return undefined
        }
      }
      if (!this.isMute) {
        switch (this.getEnv()) {
          case 'Surge':
          case 'Loon':
          case 'Stash':
          case 'Shadowrocket':
          default:
            $notification.post(title, subt, desc, toEnvOpts(opts))
            break
          case 'Quantumult X':
            $notify(title, subt, desc, toEnvOpts(opts))
            break
          case 'Node.js':
            break
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '==============📣系统通知📣==============']
        logs.push(title)
        subt ? logs.push(subt) : ''
        desc ? logs.push(desc) : ''
        console.log(logs.join('\n'))
        this.logs = this.logs.concat(logs)
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs]
      }
      console.log(logs.join(this.logSeparator))
    }

    logErr(err, msg) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        case 'Quantumult X':
        default:
          this.log('', `❗️${this.name}, 错误!`, err)
          break
        case 'Node.js':
          this.log('', `❗️${this.name}, 错误!`, err.stack)
          break
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    done(val = {}) {
      const endTime = new Date().getTime()
      const costTime = (endTime - this.startTime) / 1000
      this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
      this.log()
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        case 'Quantumult X':
        default:
          $done(val)
          break
        case 'Node.js':
          process.exit(1)
      }
    }
  })(name, opts)
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
