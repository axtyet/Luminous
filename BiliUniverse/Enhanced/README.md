# 🪐 Biliverse: ⚙️ Enhanced

## 本地设置

BoxJS 设置字段由现有 arguments-builder 生成，并与本仓库业务脚本在同一次构建中发布。dev 输出 `BiliBili.Enhanced.dev.boxjs.json` 到现有 Gist；正式版输出 `BiliBili.Enhanced.boxjs.json` 到对应 Release tag。模板中的配置来源与业务脚本使用相同的发布地址，github.io 不托管配置快照。

模板同时安装版本对应的 `/configs/Enhanced` JSON Mock 和 PreferencePanes 的通用 latest API。Surge/Loon 使用原生远程 JSON Mock；其它平台的 `config[.dev].bundle.js` 只返回同版 JSON。Enhanced 不依赖 PreferencePanes npm 包，不生成或发布 settings.bundle.js，设置页与存储实现全部来自 PreferencePanes Release。

不再需要独立设置模块。模板内的通用运行规则引用 `https://github.com/NSNanoCat/PreferencePanes/releases/latest/download/api.js`，只处理模块页面、`app.mjs`、`navigation.mjs` 和 POST /api/get、set、delete。请求使用 form 完整 @root.path，不鉴权；设置字段仍从当前 Enhanced 版本的 JSON 取得。

dev 工作流用一次 Gist API 更新业务脚本、JSON、配置响应和订阅；旧 settings.dev.bundle.js 已完成迁移删除。正式版文件由 Release 工作流一起上传，URL 固定到对应 tag。dev 按现有业务脚本惯例滚动更新；通用 API 独立升级，不和业务配置版本绑定。

App 中的 Biliverse 入口仍由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。要使用页面保存的值，选择 PersistentStore；业务请求按现有 setENV 读取，缺失设置仍用默认值，空数组保留。完整接入和读写说明见托管仓库的 settings/README.md。

配置探测的响应头 `X-PreferencePanes-Version` 与本次脚本构建版本一致：dev 为 `dev.<commit>`，正式版为发布版本。主页只发送 HEAD，不读取设置。Loon 使用原生 `rewrite_v2` Mock 与响应头动作，需要 Loon 3.5.1 或更新版本。

设置请求同时匹配 `biliverse.github.io` 与 `app.bilibili.com` 的 `/configs/Enhanced` 和 PreferencePanes 通用路径。官方域名仅作为本机代理映射地址，配置仍由本模块的同版 Gist / Release 提供。Enhanced 映射 Biliverse 主页、主页唯一的 `index.mjs` 和五张透明前景图标；该页面脚本直接调用 Bilibili 官方 JSBridge SDK，并使用 PreferencePanes 提供的客户端无关网页组件。模块页面和存储 API 仍来自 PreferencePanes Release。
