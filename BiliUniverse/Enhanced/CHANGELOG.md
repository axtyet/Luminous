### 🆕 New Features
  * 新增 Biliverse 哔哩万象应用内设置入口，可直接在 Bilibili 的「我的」页面打开设置页面。
  * 完善首页定制：支持配置首页顶栏左侧按钮、顶栏右侧按钮、标签栏右侧按钮、首页标签页和底部导航栏。
  * 完善分区页定制：提供分组的完整分区与服务列表，支持国内分区、港澳台分区及其它推荐服务，并可自定义显示顺序。
  * 首页标签页与分区页快捷访问联动，支持从分区页保存快捷访问顺序并同步到首页标签栏。

### 🔄 Other Changes
  * 统一 Surge、Loon、Stash、Quantumult X 和 Shadowrocket 的设置页面、配置接口及业务脚本发布方式。
  * `[储存] 配置类型 (Storage)` 默认使用 `PersistentStore`；未显式设置时按 `database` -> `$argument` -> `PersistentStore` 合并，`Storage` 仅保留在 `$argument` 中，不再显示于 BoxJS 或动态配置页面。

### 🐛 Bug Fixes
  * 修复在 Bilibili 分区页保存或清空快捷访问后，首页标签页未按 App 内保存结果生效的问题。
  * 修复 `[首页] 标签页` 设置入口打开旧版分区页的问题。
