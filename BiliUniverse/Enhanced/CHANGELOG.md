# v0.6.4

### 🛠️ Bug Fixes

  * 修复 Stash 打开应用内设置时首页白屏的问题。由于 Stash 的 `transparent` URL Rewrite 无法像本地 Mock 一样将响应指定为 `text/html`，现将设置首页映射到官网直接提供的 HTML 文件作为兼容方案（workaround），避免 GitHub Release 的 302 跳转和附件响应影响 WebView 加载。

### 🙏 Acknowledgements

  * 感谢 [@007Mini](https://github.com/007Mini) 在 [#18](https://github.com/Biliverse/Enhanced/pull/18) 中报告并修复 Stash 设置首页白屏问题。
