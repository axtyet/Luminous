# 🪐 Biliverse: ⚙️ Enhanced

Enhanced 为 BiliBili 提供首页、分区页、我的页面及底部导航栏自定义功能，并为各代理平台生成正式版、开发版和 Rewrite 订阅。

## 配置生成

### 配置文件职责

| 文件 | 职责 | 不负责的内容 |
| --- | --- | --- |
| `arguments-builder.full.config.ts` | 每个设置项分别定义为独立的 `ArgumentItem`，最后直接组成完整 `args`；同时定义正式版输出路径，`dts` 从这里生成 `src/types.d.ts` | 不按页面建立只有一层用途的分组数组，也不负责 PreferencePanes 的特有表现 |
| `arguments-builder.config.ts` | 默认正式版构建入口；引用 `full` 的完整 `args`，生成 Surge、Loon、Egern、Stash、Quantumult X、Shadowrocket 产物及 `Biliverse.Enhanced.BoxJS.json` | 不生成 PreferencePanes 的 `url` 类型设置 |
| `arguments-builder.PreferencePanes.config.ts` | 生成 PreferencePanes 静态配置；只引用需要持久化的共享设置，并单独定义 `Home.Tab` 的 `url` 项 | 不生成模块 argument，也不包含 `Storage` |
| `arguments-builder.dev.config.ts` | 引用 `full` 的完整 `args`，使用 dev 模板和 Gist 地址生成开发版模块及 `Biliverse.Enhanced.dev.BoxJS.json` | 不定义正式版输出路径或 PreferencePanes 特有设置 |
| `arguments-builder.rewrite.config.ts` | 独立定义 Rewrite 服务端点，生成 Rewrite 专用 Surge、Loon、Egern、Stash 和 Shadowrocket 产物 | 不引用 Enhanced 业务设置 |

`arguments-builder.config.ts` 是普通的默认配置文件。直接运行 `arguments-builder build` 时，由它负责为正式版模板生成 Surge/Loon argument，并同时生成 BoxJS 静态配置，不需要额外的 release 或 BoxJS 配置文件。

`arguments-builder.full.config.ts` 只作为完整定义源供其它配置引用。目标配置中的独占选项留在目标文件内：PreferencePanes 的 `Home.Tab` 是 `url` 类型，因此保留在 `arguments-builder.PreferencePanes.config.ts`，再由 `scripts/prepare-preference-panes.mjs` 写入生成结果。

### `exclude` 边界

`@iringo/arguments-builder` 的 `exclude` 只支持 `surge`、`loon`、`boxjs` 和 `dts`，没有名为 `argument` 的作用域。需要从两种模块 argument 中排除某项时，应同时排除 `surge` 和 `loon`。

`Storage` 只用于模块 argument，在 `full` 中通过 `exclude: ["boxjs"]` 排除 BoxJS；PreferencePanes 配置也不引用它。因此 `Storage` 不会写入 BoxJS 或 PreferencePanes 的任何静态持久化配置。

### 构建命令

| 命令 | 产物 |
| --- | --- |
| `npm run build` | 正式版配置、代理模块和业务脚本 |
| `npm run build:release-args` | 正式版代理模块、BoxJS 和 PreferencePanes 配置 |
| `npm run dev` | 开发版配置、代理模块和业务脚本 |
| `npm run build:dev-args` | 开发版代理模块、BoxJS 和 PreferencePanes 配置 |
| `npm run build:preference-panes-args` | PreferencePanes 静态配置及其 `Home.Tab` URL 项 |
| `npm run build:args:rewrite` | Rewrite 专用订阅 |
| `npm run dts` | `src/types.d.ts` |

## 本地设置产物

`Biliverse.Enhanced.BoxJS.json` 是 BoxJs 聚合仓库使用的 v1 配置，其中 `Home.Tab` 使用当前页面 ID 的 `checkboxes`。`Biliverse.Enhanced.PreferencePanes.json` 是 PreferencePanes 使用的 v2 配置，其中 `Home.Tab` 是打开 `bilibili://main/regionv2` 的 URL 项。

两份配置均随正式版 Release 发布。开发版分别输出 `Biliverse.Enhanced.dev.BoxJS.json` 和 `Biliverse.Enhanced.dev.PreferencePanes.json` 到现有 Gist。模板引用与业务脚本相同版本的发布地址，`biliverse.github.io` 不托管配置快照。

App 中的 Biliverse 入口由 Enhanced 注入，地址为 [本地设置](https://biliverse.github.io/settings/)。完整页面接入和读写说明见托管仓库的 `settings/README.md`。

## 模板与 Mock

模板将当前版本的 BoxJS JSON Mock 到 `/api/Enhanced`，并安装 PreferencePanes 的固定存储 API 和整个 Biliverse 唯一的通用 `web.js`。

Surge 和 Loon 使用原生远程 JSON Mock：先拉取同版本远程资源，再将其作为本地响应。Loon 使用旧版 URL `data-path` 响应 Mock。其它平台由 `config[.dev].bundle.js` 返回同版本 JSON。

唯一的 `web.js` 规则处理合法的 `/settings/{module}`、`index.mjs` 和 `navigation.mjs`。Enhanced 的 `api.js` 只处理固定的 `POST /api/get|set|delete`；`/api/Enhanced` 由 Enhanced 模块直接返回 BoxJS 配置。

设置请求同时匹配 `biliverse.github.io` 与 `app.bilibili.com`。Global、Redirect 和 ADBlock 不携带设置前端规则。Enhanced 还映射 Biliverse 主页、唯一的 `index.mjs` 和五张透明前景图标；模块页 Header 指定的线上 `theme.css` 直接使用网站文件。

## 设置 API 与存储

Enhanced 不依赖 PreferencePanes npm 包，也不生成或发布 `settings.bundle.js`。设置前端与存储实现来自 PreferencePanes Release；页面脚本调用 Bilibili 官方 JSBridge SDK，并使用 PreferencePanes 提供的客户端无关网页组件。

存储请求使用 form 编码和完整的 `@root.path`，字段授权来自当前 Enhanced 版本的 BoxJS JSON。要使用页面保存的值，应通过模块 argument 选择 `PersistentStore`；业务请求继续由 `setENV` 合并设置，缺失值使用默认配置，空数组保持为空。

配置探测响应头 `X-PreferencePanes-Version` 与当前脚本构建版本一致：开发版为 `dev.<commit>`，正式版为发布版本。主页只发送 HEAD 请求，不读取设置。

## 发布

正式版文件由 Release 工作流上传，资源 URL 固定到对应 tag。开发版工作流通过一次 Gist API 请求更新业务脚本、JSON、配置响应和订阅；开发版继续按现有业务脚本惯例滚动更新。

通用 PreferencePanes API 独立升级，不与 Enhanced 业务配置版本绑定。旧的独立设置模块和 `settings.dev.bundle.js` 已完成迁移并删除。
