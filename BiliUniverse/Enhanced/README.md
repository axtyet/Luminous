# 🪐 Biliverse: ⚙️ Enhanced

## 本地设置

BoxJS 设置字段由现有 arguments-builder 生成，并与本仓库业务脚本在同一次构建中发布。dev 输出 `BiliBili.Enhanced.dev.boxjs.json` 到现有 Gist；正式版输出 `BiliBili.Enhanced.boxjs.json` 到对应 Release tag。模板中的配置来源与业务脚本使用相同的发布地址，github.io 不托管配置快照。

模板直接将版本对应的 BoxJS JSON Mock 到 `/api/Enhanced`，并安装 PreferencePanes 的固定存储 API 以及整个 Biliverse 唯一的通用 `web.js`。Surge/Loon 使用原生远程 JSON Mock；其它平台的 `config[.dev].bundle.js` 只返回同版 JSON。Enhanced 不依赖 PreferencePanes npm 包，不生成或发布 settings.bundle.js，设置前端与存储实现全部来自 PreferencePanes Release。

不再需要独立设置模块。唯一的 `web.js` 规则处理任意合法 `/settings/{module}` 以及 `index.mjs`、`navigation.mjs`；Enhanced 的 `api.js` 规则只处理固定的 `POST /api/get|set|delete`，`/api/Enhanced` 由本模块直接返回 BoxJS。存储请求使用 form 编码和完整 `@root.path`，字段授权来自当前 Enhanced 版本的 BoxJS JSON。

dev 工作流用一次 Gist API 更新业务脚本、JSON、配置响应和订阅；旧 settings.dev.bundle.js 已完成迁移删除。正式版文件由 Release 工作流一起上传，URL 固定到对应 tag。dev 按现有业务脚本惯例滚动更新；通用 API 独立升级，不和业务配置版本绑定。

App 中的 Biliverse 入口仍由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。要使用页面保存的值，选择 PersistentStore；业务请求按现有 setENV 读取，缺失设置仍用默认值，空数组保留。完整接入和读写说明见托管仓库的 settings/README.md。

配置探测的响应头 `X-PreferencePanes-Version` 与本次脚本构建版本一致：dev 为 `dev.<commit>`，正式版为发布版本。主页只发送 HEAD，不读取设置。Loon 使用原生 `rewrite_v2` Mock 与响应头动作，需要 Loon 3.5.1 或更新版本。

设置请求同时匹配 `biliverse.github.io` 与 `app.bilibili.com`。配置仍由 Enhanced 的同版 Gist / Release 提供；通用模块页面只由 Enhanced 安装的 `web.js` 提供，Global、Redirect、ADBlock 不再携带前端规则。Enhanced 还映射 Biliverse 主页、主页唯一的 `index.mjs` 和五张透明前景图标；该页面脚本直接调用 Bilibili 官方 JSBridge SDK，并使用 PreferencePanes 提供的客户端无关网页组件。
