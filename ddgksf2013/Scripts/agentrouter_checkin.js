/**
 * AgentRouter 自动签到（Quantumult X / Loon / Surge / Node.js）
 * 站点：https://agentrouter.org/register?aff=cc9p
 * 脚本：https://raw.githubusercontent.com/axtyet/Luminous/main/ddgksf2013/Scripts/agentrouter_checkin.js
 *
 * 原理：POST /api/user/login 使用账号密码登录；登录本身会触发每日签到。
 * 登录后继续请求 /api/log/self/，确认当天存在签到日志。
 *
 * 配置方式一（最简单）：直接填写下面的 CONFIG。
 * 单账号：account: "邮箱#密码"
 * 多账号：accounts: [{ name: "甲", account: "a@x.com#pwdA" }, ...]
 *
 * 配置方式二（持久化存储，优先级高于 CONFIG）：
 * AGENTROUTER_ACCOUNT  = 邮箱#密码
 * AGENTROUTER_ACCOUNTS = [{"name":"甲","account":"a@x.com#pwdA"}]
 * AGENTROUTER_BASE_URL = https://agentrouter.org
 * AGENTROUTER_POLICY   = 可选；QX 策略 / Surge 策略 / Loon 节点或策略组
 * AGENTROUTER_TIMEOUT  = 可选；单次请求超时秒数，默认 20
 * AGENTROUTER_VERIFY_LOG = 可选；true/false，默认 true
 * 可用同目录 agentrouter.boxjs.json 将以上变量导入 BoxJS 图形化管理。
 *
 * 定时任务示例（本地文件名按实际情况修改）：
 * Quantumult X [task_local]
 * 0 9 * * * https://raw.githubusercontent.com/axtyet/Luminous/main/ddgksf2013/Scripts/agentrouter_checkin.js, tag=AgentRouter 签到, enabled=true
 *
 * Surge [Script]
 * AgentRouter = type=cron,cronexp="0 9 * * *",script-path=https://raw.githubusercontent.com/axtyet/Luminous/main/ddgksf2013/Scripts/agentrouter_checkin.js,timeout=120
 *
 * Loon 3.5.1 (983)+ [Script]
 * cron "0 9 * * *" then script("https://raw.githubusercontent.com/axtyet/Luminous/main/ddgksf2013/Scripts/agentrouter_checkin.js") with tag="AgentRouter 签到", timeout=120
 *
 * Loon 旧语法 [Script]
 * cron "0 9 * * *" script-path=https://raw.githubusercontent.com/axtyet/Luminous/main/ddgksf2013/Scripts/agentrouter_checkin.js,tag=AgentRouter 签到,timeout=120,enable=true
 *
 * Node.js（直接读取上方 CONFIG，不读取环境变量）
 * node agentrouter_checkin.js
 *
 * 无需 MITM。账号密码仅发送给 CONFIG.baseUrl 指定的站点。
 */

const CONFIG = {
  account: "", // 例："name@example.com#your_password"
  accounts: [
    // { name: "账号1", account: "a@example.com#password" },
    // 兼容：{ name: "账号2", email: "b@example.com", password: "password" },
  ],
  baseUrl: "https://agentrouter.org",
  policy: "", // 留空则按当前分流规则；
  timeoutSeconds: 20,
  verifyLog: true,
};

const LOGIN_PATH = "/api/user/login";
const USER_INFO_PATH = "/api/user/self";
const SELF_LOG_PATH = "/api/log/self/";
const SELF_LOG_HEADER = "New-API-User";
const CHECKIN_LOG_TYPE = 4;
const QUOTA_PER_DOLLAR = 500000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

let finished = false;

function isQuantumultX() {
  return typeof $task !== "undefined";
}

function isLoon() {
  return typeof $loon !== "undefined";
}

function isNode() {
  return (
    typeof process !== "undefined" &&
    process.versions &&
    typeof process.versions.node === "string"
  );
}

function finish() {
  if (finished) return;
  finished = true;
  if (typeof $done === "function") $done();
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatTime(date) {
  const d = date || new Date();
  return (
    d.getFullYear() +
    "-" +
    pad2(d.getMonth() + 1) +
    "-" +
    pad2(d.getDate()) +
    " " +
    pad2(d.getHours()) +
    ":" +
    pad2(d.getMinutes()) +
    ":" +
    pad2(d.getSeconds())
  );
}

function log(message) {
  console.log("[" + formatTime() + "] " + message);
}

function notify(title, content) {
  try {
    if (typeof $notify === "function") {
      $notify(title, "", content);
    } else if (
      typeof $notification !== "undefined" &&
      typeof $notification.post === "function"
    ) {
      $notification.post(title, "", content);
    } else {
      log("[通知] " + title + "\n" + content);
    }
  } catch (error) {
    log("通知发送失败（不影响签到）: " + errorMessage(error));
  }
}

function readPersistent(key) {
  try {
    if (typeof $prefs !== "undefined" && typeof $prefs.valueForKey === "function") {
      const value = $prefs.valueForKey(key);
      return value === null || value === undefined ? "" : value;
    }
    if (
      typeof $persistentStore !== "undefined" &&
      typeof $persistentStore.read === "function"
    ) {
      const value = $persistentStore.read(key);
      return value === null || value === undefined ? "" : value;
    }
  } catch (error) {
    log("读取持久化配置失败 [" + key + "]: " + errorMessage(error));
  }
  return "";
}

function trimString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUsername(value) {
  return trimString(value).replace(/^https?:\/\//i, "").replace(/\/+$/, "");
}

function parseBoolean(value, fallback) {
  if (typeof value === "boolean") return value;
  const normalized = String(value === null || value === undefined ? "" : value)
    .trim()
    .toLowerCase();
  if (["1", "true", "yes", "on"].indexOf(normalized) >= 0) return true;
  if (["0", "false", "no", "off"].indexOf(normalized) >= 0) return false;
  return fallback;
}

function parseAccount(raw) {
  const value = trimString(raw);
  const index = value.indexOf("#");
  if (index < 0) return { email: normalizeUsername(value), password: "" };
  return {
    email: normalizeUsername(value.slice(0, index)),
    password: value.slice(index + 1).trim(),
  };
}

function normalizeAccount(item, index) {
  if (!item || typeof item !== "object") return null;

  let email = "";
  let password = "";
  if (trimString(item.account)) {
    const parsed = parseAccount(item.account);
    email = parsed.email;
    password = parsed.password;
  }

  if ((!email || !password) && trimString(item.email) && trimString(item.password)) {
    email = normalizeUsername(item.email);
    password = trimString(item.password);
  }

  if (!email || !password) return null;
  return {
    name: normalizeUsername(item.name) || "账号" + (index + 1),
    email: email,
    password: password,
  };
}

function parseAccountArray(value, sourceName) {
  let array = value;
  if (typeof value === "string") {
    try {
      array = JSON.parse(value);
    } catch (error) {
      log(sourceName + " 解析失败: " + errorMessage(error));
      return [];
    }
  }

  if (!Array.isArray(array)) {
    if (value) log(sourceName + " 必须是 JSON 数组");
    return [];
  }

  return array
    .map(function (item, index) {
      return normalizeAccount(item, index);
    })
    .filter(Boolean);
}

function collectAccounts() {
  const storedMulti = trimString(readPersistent("AGENTROUTER_ACCOUNTS"));
  if (storedMulti) {
    const accounts = parseAccountArray(storedMulti, "AGENTROUTER_ACCOUNTS");
    if (accounts.length) {
      log("已读取持久化多账号配置，共 " + accounts.length + " 个");
      return accounts;
    }
    log("持久化多账号配置无有效账号，继续尝试单账号配置");
  }

  const storedSingle = trimString(readPersistent("AGENTROUTER_ACCOUNT"));
  const storedAccount = parseAccount(storedSingle);
  if (storedAccount.email && storedAccount.password) {
    log("已读取持久化单账号配置");
    return [
      { name: "默认账号", email: storedAccount.email, password: storedAccount.password },
    ];
  }

  const inlineAccounts = parseAccountArray(CONFIG.accounts, "CONFIG.accounts");
  if (inlineAccounts.length) {
    log("已读取脚本内多账号配置，共 " + inlineAccounts.length + " 个");
    return inlineAccounts;
  }

  const inlineAccount = parseAccount(CONFIG.account);
  if (inlineAccount.email && inlineAccount.password) {
    log("已读取脚本内单账号配置");
    return [
      { name: "默认账号", email: inlineAccount.email, password: inlineAccount.password },
    ];
  }

  log(
    "未检测到有效配置：请填写 CONFIG.account / CONFIG.accounts，" +
      "或写入 AGENTROUTER_ACCOUNT / AGENTROUTER_ACCOUNTS"
  );
  return [];
}

function getRuntimeConfig() {
  const storedBaseUrl = trimString(readPersistent("AGENTROUTER_BASE_URL"));
  const storedPolicy = trimString(readPersistent("AGENTROUTER_POLICY"));
  const storedTimeout = trimString(readPersistent("AGENTROUTER_TIMEOUT"));
  const storedVerifyLog = readPersistent("AGENTROUTER_VERIFY_LOG");
  const timeout = Number(storedTimeout || CONFIG.timeoutSeconds);
  return {
    baseUrl: (storedBaseUrl || trimString(CONFIG.baseUrl) || "https://agentrouter.org").replace(
      /\/+$/,
      ""
    ),
    policy: storedPolicy || trimString(CONFIG.policy),
    timeoutSeconds: Number.isFinite(timeout) && timeout > 0 ? timeout : 20,
    verifyLog: parseBoolean(storedVerifyLog, CONFIG.verifyLog !== false),
  };
}

function applyNetworkOptions(request, runtime) {
  if (isQuantumultX()) {
    request.opts = {
      redirection: true,
      "skip-cert-verify": false,
      "auto-cookie": false,
    };
    if (runtime.policy) request.opts.policy = runtime.policy;
    return request;
  }

  // Node 使用下方原生 http/https 请求，不需要代理工具的专用参数。
  if (isNode() && typeof $httpClient === "undefined") return request;

  request["auto-redirect"] = true;
  request["auto-cookie"] = false;
  if (isLoon()) {
    // Loon 的 timeout 单位是毫秒。
    request.timeout = runtime.timeoutSeconds * 1000;
    if (runtime.policy) request.node = runtime.policy;
  } else {
    // Surge（以及大多数兼容 $httpClient 的工具）的单位是秒。
    request.timeout = runtime.timeoutSeconds;
    request["full-header-mode"] = true;
    if (runtime.policy) request.policy = runtime.policy;
  }
  return request;
}

function nodeRequestOnce(options, runtime) {
  return new Promise(function (resolve, reject) {
    let target;
    try {
      target = new URL(options.url);
    } catch (error) {
      reject(new Error("无效请求地址: " + options.url));
      return;
    }

    if (target.protocol !== "http:" && target.protocol !== "https:") {
      reject(new Error("Node 模式仅支持 HTTP/HTTPS 地址"));
      return;
    }

    const transport = require(target.protocol === "https:" ? "https" : "http");
    const req = transport.request(
      target,
      {
        method: String(options.method || "GET").toUpperCase(),
        headers: options.headers || {},
      },
      function (response) {
        const chunks = [];
        response.setEncoding("utf8");
        response.on("data", function (chunk) {
          chunks.push(chunk);
        });
        response.on("end", function () {
          resolve({
            status: Number(response.statusCode || 0),
            headers: response.headers || {},
            body: chunks.join(""),
          });
        });
      }
    );

    req.setTimeout(runtime.timeoutSeconds * 1000, function () {
      req.destroy(new Error("请求超时（" + runtime.timeoutSeconds + " 秒）"));
    });
    req.on("error", function (error) {
      reject(error);
    });
    if (options.body !== undefined && options.body !== null) {
      req.write(String(options.body));
    }
    req.end();
  });
}

function deleteHeader(headers, wantedName) {
  const wanted = wantedName.toLowerCase();
  Object.keys(headers).forEach(function (name) {
    if (name.toLowerCase() === wanted) delete headers[name];
  });
}

function nodeRequest(options, runtime, redirectCount, inheritedSetCookies) {
  const count = redirectCount || 0;
  const previousCookies = inheritedSetCookies || [];
  return nodeRequestOnce(options, runtime).then(function (response) {
    const currentCookies = previousCookies.concat(headerValues(response.headers, "set-cookie"));
    const location = getHeader(response.headers, "location");
    const isRedirect = [301, 302, 303, 307, 308].indexOf(response.status) >= 0;

    if (!isRedirect || !location) {
      if (currentCookies.length) response.headers["set-cookie"] = currentCookies;
      return response;
    }
    if (count >= 5) throw new Error("重定向次数过多");

    const currentUrl = new URL(options.url);
    const nextUrl = new URL(location, currentUrl);
    // 登录请求包含明文密码，禁止跟随跨站重定向，避免凭据被转发到其他站点。
    if (nextUrl.origin !== currentUrl.origin) {
      throw new Error("为保护账号密码，已拒绝跨站重定向至 " + nextUrl.origin);
    }

    const nextHeaders = Object.assign({}, options.headers || {});
    const cookieHeader = extractCookieHeader({ "set-cookie": currentCookies });
    if (cookieHeader) nextHeaders.Cookie = cookieHeader;

    const nextOptions = {
      url: nextUrl.href,
      method: options.method,
      headers: nextHeaders,
      body: options.body,
    };
    const method = String(options.method || "GET").toUpperCase();
    if (response.status === 303 || ((response.status === 301 || response.status === 302) && method === "POST")) {
      nextOptions.method = "GET";
      delete nextOptions.body;
      deleteHeader(nextHeaders, "content-type");
      deleteHeader(nextHeaders, "content-length");
    }
    return nodeRequest(nextOptions, runtime, count + 1, currentCookies);
  });
}

function rawRequest(options, runtime) {
  return new Promise(function (resolve, reject) {
    if (isQuantumultX()) {
      $task.fetch(options).then(
        function (response) {
          resolve({
            status: Number(response.statusCode || response.status || 0),
            headers: response.headers || {},
            body: typeof response.body === "string" ? response.body : "",
          });
        },
        function (reason) {
          reject(new Error(errorMessage(reason)));
        }
      );
      return;
    }

    if (typeof $httpClient !== "undefined") {
      const method = String(options.method || "GET").toLowerCase();
      const clientMethod = $httpClient[method];
      if (typeof clientMethod !== "function") {
        reject(new Error("当前工具不支持 HTTP 方法: " + method.toUpperCase()));
        return;
      }
      clientMethod(options, function (error, response, data) {
        if (error) {
          reject(new Error(errorMessage(error)));
          return;
        }
        resolve({
          status: Number((response && (response.status || response.statusCode)) || 0),
          headers: (response && response.headers) || {},
          body: typeof data === "string" ? data : "",
        });
      });
      return;
    }

    if (isNode()) {
      nodeRequest(options, runtime).then(resolve, reject);
      return;
    }

    reject(new Error("不支持的脚本环境：缺少 $task.fetch、$httpClient 或 Node.js"));
  });
}

function request(options, runtime) {
  const configured = applyNetworkOptions(options, runtime);
  return new Promise(function (resolve, reject) {
    let settled = false;
    const timer = setTimeout(function () {
      if (settled) return;
      settled = true;
      reject(new Error("请求超时（" + runtime.timeoutSeconds + " 秒）"));
    }, runtime.timeoutSeconds * 1000);

    rawRequest(configured, runtime).then(
      function (response) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(response);
      },
      function (error) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function headerValues(headers, wantedName) {
  const wanted = wantedName.toLowerCase();
  const values = [];

  if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      if (!header || String(header.field || "").toLowerCase() !== wanted) return;
      if (Array.isArray(header.value)) values.push.apply(values, header.value);
      else if (header.value !== undefined && header.value !== null) values.push(header.value);
    });
    return values;
  }

  if (!headers || typeof headers !== "object") return values;
  Object.keys(headers).forEach(function (name) {
    if (name.toLowerCase() !== wanted) return;
    const value = headers[name];
    if (Array.isArray(value)) values.push.apply(values, value);
    else if (value !== undefined && value !== null) values.push(value);
  });
  return values;
}

function getHeader(headers, name) {
  const values = headerValues(headers, name);
  return values.length ? String(values[0]) : "";
}

function extractCookieHeader(headers) {
  const cookiePairs = [];
  headerValues(headers, "set-cookie").forEach(function (rawValue) {
    String(rawValue)
      .split(/\r?\n/)
      // 不在 Expires=Wed, 09 Jun ... 的逗号处误切分。
      .reduce(function (parts, line) {
        return parts.concat(line.split(/,(?=\s*[^;,\s]+=)/));
      }, [])
      .forEach(function (cookie) {
        const pair = cookie.split(";", 1)[0].trim();
        if (/^[^=;\s]+=.*/.test(pair) && cookiePairs.indexOf(pair) < 0) {
          cookiePairs.push(pair);
        }
      });
  });
  return cookiePairs.join("; ");
}

function parseJsonResponse(response, label) {
  const contentType = getHeader(response.headers, "content-type").toLowerCase();
  if (contentType.indexOf("text/html") >= 0) {
    throw new Error(label + "返回 HTML（HTTP " + response.status + "），可能被 WAF 拦截或接口已变化");
  }
  try {
    return JSON.parse(response.body);
  } catch (error) {
    throw new Error(label + "返回非 JSON（HTTP " + response.status + "）");
  }
}

function finiteNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function quotaToDollars(value) {
  const number = finiteNumber(value);
  if (number === null) return null;
  return Math.round((number / QUOTA_PER_DOLLAR) * 100) / 100;
}

function quotaDetailsFromUserData(payload, source) {
  if (!payload || typeof payload !== "object") {
    return { remaining: null, used: null, total: null, source: source || "unknown" };
  }

  const remaining = quotaToDollars(payload.quota);
  const used = quotaToDollars(payload.used_quota);
  const explicitTotal = quotaToDollars(payload.total_quota);
  const total =
    explicitTotal !== null
      ? explicitTotal
      : remaining !== null && used !== null
        ? Math.round((remaining + used) * 100) / 100
        : remaining;

  return {
    remaining: remaining,
    used: used,
    total: total,
    source: source || "unknown",
  };
}

function moneyText(value) {
  const number = finiteNumber(value);
  if (number === null) return "未知";
  return "$" + number.toFixed(2);
}

function errorMessage(error) {
  if (error && typeof error === "object") {
    return String(error.message || error.error || JSON.stringify(error));
  }
  return String(error || "未知错误");
}

function safeServerMessage(message, account) {
  let text = String(message || "未知错误").replace(/[\r\n]+/g, " ").slice(0, 160);
  [account.email, account.password].forEach(function (secret) {
    if (secret) text = text.split(secret).join("***");
  });
  return text;
}

function makeResult(name, status, message, username, quotaDetails) {
  const details = quotaDetails || {
    remaining: null,
    used: null,
    total: null,
    source: "unknown",
  };
  const result = {
    name: name,
    status: status,
    message: message,
    username: username || "",
    quota: details.remaining,
    usedQuota: details.used,
    totalQuota: details.total,
    quotaSource: details.source,
    time: formatTime(),
  };
  const tags = { success: "✅ 成功", already: "🟡 已签到", fail: "❌ 失败" };
  log(
    "[" + name + "] " +
      tags[status] +
      " | " +
      message +
      " | 剩余: " +
      moneyText(result.quota) +
      " | 已用: " +
      moneyText(result.usedQuota) +
      " | 总额: " +
      moneyText(result.totalQuota)
  );
  return result;
}

function agoText(seconds) {
  const ago = Math.max(0, Math.floor(seconds));
  if (ago < 60) return ago + " 秒前";
  if (ago < 3600) return Math.floor(ago / 60) + " 分钟前";
  if (ago < 86400) return Math.floor(ago / 3600) + " 小时前";
  return Math.floor(ago / 86400) + " 天前";
}

async function verifyCheckin(runtime, uid, cookieHeader, slackNew, windowDays) {
  if (!uid) return { level: "error", detail: "缺少 uid，跳过日志核验" };

  const headers = {
    Accept: "application/json, text/plain, */*",
    "User-Agent": USER_AGENT,
    [SELF_LOG_HEADER]: String(uid),
  };
  if (cookieHeader) headers.Cookie = cookieHeader;

  let response;
  try {
    response = await request(
      {
        url: runtime.baseUrl + SELF_LOG_PATH + "?p=1&page_size=20",
        method: "GET",
        headers: headers,
      },
      runtime
    );
  } catch (error) {
    return { level: "error", detail: "日志查询异常: " + errorMessage(error) };
  }

  if (response.status !== 200 || getHeader(response.headers, "content-type").toLowerCase().indexOf("text/html") >= 0) {
    return { level: "error", detail: "日志接口返回 HTTP " + response.status };
  }

  let payload;
  try {
    payload = JSON.parse(response.body);
  } catch (error) {
    return { level: "error", detail: "日志接口返回非 JSON" };
  }

  const items =
    payload && payload.data && Array.isArray(payload.data.items) ? payload.data.items : [];
  let newestTimestamp = null;
  let newestContent = "";

  items.forEach(function (item) {
    if (!item || typeof item !== "object") return;
    const content = String(item.content || "");
    const isCheckin = content.indexOf("签到成功") >= 0 || Number(item.type) === CHECKIN_LOG_TYPE;
    const timestamp = Number(item.created_at);
    if (isCheckin && Number.isFinite(timestamp) && (newestTimestamp === null || timestamp > newestTimestamp)) {
      newestTimestamp = timestamp;
      newestContent = content;
    }
  });

  if (newestTimestamp === null) {
    return { level: "none", detail: "日志中未找到任何签到记录" };
  }

  const now = Math.floor(Date.now() / 1000);
  const ago = now - newestTimestamp;
  const detailAgo = agoText(ago);
  if (newestTimestamp >= now - slackNew) {
    return {
      level: "new",
      detail: "本次运行已生成签到日志（" + detailAgo + "）",
      timestamp: newestTimestamp,
      content: newestContent,
    };
  }
  if (newestTimestamp >= now - windowDays * 86400) {
    return {
      level: "today",
      detail: "近 " + windowDays + " 天内有签到记录（" + detailAgo + "），本次未新增",
      timestamp: newestTimestamp,
      content: newestContent,
    };
  }
  return {
    level: "none",
    detail: "最近一条签到日志较旧（" + detailAgo + "）",
    timestamp: newestTimestamp,
    content: newestContent,
  };
}

async function fetchQuotaDetails(runtime, uid, cookieHeader, loginData) {
  const fallback = quotaDetailsFromUserData(loginData, "login-fallback");
  if (!uid) {
    return {
      details: fallback,
      warning: "缺少 uid，无法查询完整账户额度",
    };
  }

  const headers = {
    Accept: "application/json, text/plain, */*",
    "User-Agent": USER_AGENT,
    [SELF_LOG_HEADER]: String(uid),
  };
  if (cookieHeader) headers.Cookie = cookieHeader;

  let response;
  try {
    response = await request(
      {
        url: runtime.baseUrl + USER_INFO_PATH,
        method: "GET",
        headers: headers,
      },
      runtime
    );
  } catch (error) {
    return {
      details: fallback,
      warning: "账户额度查询异常: " + errorMessage(error),
    };
  }

  if (response.status !== 200) {
    return {
      details: fallback,
      warning: "账户额度接口返回 HTTP " + response.status,
    };
  }

  let payload;
  try {
    payload = parseJsonResponse(response, "账户额度接口");
  } catch (error) {
    return { details: fallback, warning: errorMessage(error) };
  }

  if (!payload || !payload.success || !payload.data || typeof payload.data !== "object") {
    return {
      details: fallback,
      warning: "账户额度接口未返回有效用户数据",
    };
  }

  const details = quotaDetailsFromUserData(payload.data, "user-self");
  if (details.remaining === null && details.used === null && details.total === null) {
    return {
      details: fallback,
      warning: "账户资料中未找到 quota / used_quota / total_quota",
    };
  }
  return { details: details, warning: "" };
}

async function passwordLogin(account, runtime) {
  const name = account.name || "默认账号";
  if (!account.email || !account.password) {
    return makeResult(name, "fail", "未配置 email/password，跳过", "", null);
  }

  log("====== 开始处理账号（账号密码登录）: " + name + " ======");
  let response;
  try {
    response = await request(
      {
        url: runtime.baseUrl + LOGIN_PATH,
        method: "POST",
        headers: {
          "User-Agent": USER_AGENT,
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Referer: runtime.baseUrl + "/login",
          Origin: runtime.baseUrl,
        },
        body: JSON.stringify({ username: account.email, password: account.password }),
      },
      runtime
    );
  } catch (error) {
    return makeResult(
      name,
      "fail",
      "登录请求异常: " + safeServerMessage(errorMessage(error), account),
      "",
      null
    );
  }

  let payload;
  try {
    payload = parseJsonResponse(response, "登录接口");
  } catch (error) {
    return makeResult(name, "fail", errorMessage(error), "", null);
  }

  if (!payload || !payload.success) {
    return makeResult(
      name,
      "fail",
      "登录失败: " + safeServerMessage(payload && payload.message, account),
      "",
      null
    );
  }

  const data = payload.data && typeof payload.data === "object" ? payload.data : {};
  const checkedIn = Boolean(data.checked_in);
  const username = normalizeUsername(data.username || data.display_name || account.email);
  const cookieHeader = extractCookieHeader(response.headers);
  const quotaResult = await fetchQuotaDetails(runtime, data.id, cookieHeader, data);
  const quotaDetails = quotaResult.details;
  let message;

  if (checkedIn && runtime.verifyLog) {
    const verification = await verifyCheckin(runtime, data.id, cookieHeader, 300, 1);
    if (verification.level === "new" || verification.level === "today") {
      message = "签到成功，日志已确认（" + verification.detail + "）";
    } else {
      message = "登录成功且服务端返回已签到，但日志未确认: " + verification.detail;
      if (!cookieHeader) message += "；登录响应中未读取到 Set-Cookie";
    }
  } else if (checkedIn) {
    message = "签到成功（已关闭日志核验）";
  } else {
    message = "登录成功，但 checked_in=false（可能今日额度已发或接口变化）";
  }

  if (quotaResult.warning) {
    message += "；" + quotaResult.warning;
    if (quotaDetails.source === "login-fallback") message += "，当前额度来自登录响应后备值";
  }

  return makeResult(name, "success", message, username, quotaDetails);
}

function buildSummary(results) {
  const accountBlocks = results
    .map(function (result) {
      const icon = result.status === "fail" ? "❌" : result.status === "already" ? "🟡" : "✅";
      return (
        icon +
        " " +
        result.name +
        "\n" +
        result.message +
        "\n剩余额度: " +
        moneyText(result.quota) +
        "｜已用: " +
        moneyText(result.usedQuota) +
        "｜总额度: " +
        moneyText(result.totalQuota)
      );
    })
    .join("\n\n");

  const known = results.filter(function (result) {
    return finiteNumber(result.totalQuota) !== null;
  });
  if (!known.length) return accountBlocks;

  const totals = known.reduce(
    function (sum, result) {
      const remaining = finiteNumber(result.quota);
      const used = finiteNumber(result.usedQuota);
      const total = finiteNumber(result.totalQuota);
      if (remaining !== null) sum.remaining += remaining;
      else sum.remainingKnown = false;
      if (used !== null) sum.used += used;
      else sum.usedKnown = false;
      if (total !== null) sum.total += total;
      return sum;
    },
    { remaining: 0, used: 0, total: 0, remainingKnown: true, usedKnown: true }
  );

  return (
    accountBlocks +
    "\n\n📊 " +
    known.length +
    " 个账号合计\n剩余额度: " +
    (totals.remainingKnown ? moneyText(totals.remaining) : "部分未知") +
    "｜已用: " +
    (totals.usedKnown ? moneyText(totals.used) : "部分未知") +
    "｜总额度: " +
    moneyText(totals.total)
  );
}

async function main() {
  log("AgentRouter 自动签到启动（账号密码登录即签到）");
  const runtime = getRuntimeConfig();
  const accounts = collectAccounts();
  if (!accounts.length) {
    notify("[AgentRouter] 签到失败", "未检测到有效账号配置");
    return;
  }

  const results = [];
  for (let i = 0; i < accounts.length; i += 1) {
    results.push(await passwordLogin(accounts[i], runtime));
  }

  const failures = results.filter(function (result) {
    return result.status === "fail";
  }).length;
  const title = failures
    ? "[AgentRouter] 签到完成（失败 " + failures + "/" + results.length + "）"
    : "[AgentRouter] 签到成功（" + results.length + " 个账号）";
  notify(title, buildSummary(results));
}

main()
  .catch(function (error) {
    const message = "脚本异常: " + errorMessage(error);
    log(message);
    notify("[AgentRouter] 签到失败", message);
  })
  .finally(finish);
