### 🔄 Other Changes
  * 设置页面资源与模块 API 分离，分别使用 PreferencePanes 1.0.0 的 `web.js` 和 `api.js`

### 🆕 New Features
  * 新增了首页、分区、我的标签页的自定义功能开关
    * 现在可以控制只修改某个特定页面的内容了

### 🔣 Dependencies
  * 升级了 `@nsnanocat/util`
    * 修复 Stash 不存在 $argument 的情况下，脚本直接错误退出的问题.
    * 新增`[储存] 配置类型 (Storage)`选项，提供如下三个选项，其中 `Argument` 为默认选项：
      * `Argument`: 优先使用来自`插件选项`与`模块参数`等，由 `$argument` 传入的配置，`$argument` 不包含的设置项由 `PersistentStore (BoxJs)` 提供。 
      * `PersistentStore`: 只使用来自 `BoxJs` 等，由 `$persistentStore` 提供的配置；
      * `database`: 只使用由作者的 `database.mjs` 文件提供的默认配置，其他任何自定义配置不再起作用。
      * `未选择/未填写`： 配置优先级依旧是 `$persistentStore (BoxJs)` > `$argument` > `database`
    * ⚠️ 注意：`[储存] 配置类型 (Storage)`选项只能经由 `$argument` 进行配置，可通过支持 `$argument` 的插件选项或模块参数进行设置。对于本就不支持 `$argument` 的 app (如 Quantumult X)，始终按照 `未选择/未填写` 模式进行处理（与旧版逻辑一致）。
  * 更新 `biome.json` 配置以适配 2.4.3 schema，并调整文件包含规则。
