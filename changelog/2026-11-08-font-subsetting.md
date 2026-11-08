# 2026-11-08 字体子集化

## 问题

`public/fonts/` 直接发布两份完整字体：

- `ResourceHanRoundedCN-Regular.woff2`：4.7 MB
- `CodeNewRomanNerdFontMono-Regular.woff2`：2.9 MB

`unicode-range` 只能避免浏览器下载**完全用不到**的字体；中文页面必然命中
CJK 的 `U+4E00-9FFF` 等区间，因此两包合计约 7.6 MB 的字体在首次访问时
整包下载，是站点最大的单资源开销。

## 处理

- 完整字体移到 `assets/fonts/`（不进入发布产物），`public/fonts/` 只保留
  子集。
- 新增 `scripts/subset-fonts.py`：扫描 `src/` 与 Starlight 的 `en` /
  `zh-CN` 界面文案，收集实际用到的字符，用 `pyftsubset` 生成
  `public/fonts/*.woff2`，并写入字符清单
  `scripts/fonts/subset-charset.json`。
- 新增 `scripts/checks/check-font-coverage.mjs` 与 `npm run check:fonts`：
  用同一套字符来源对照清单，内容更新后忘记重新子集化时 CI 直接失败。
  `npm run check` 已包含该步骤。
- `npm run fonts:subset` 重新生成子集；需要 `fonttools` + `brotli`。

子集后体积：

| 文件 | 之前 | 之后 |
| --- | --- | --- |
| ResourceHanRoundedCN-Regular.woff2 | 4.7 MB | 251 KiB |
| CodeNewRomanNerdFontMono-Regular.woff2 | 2.9 MB | 25 KiB |

## 取舍

- 子集只覆盖当前内容用到的字符；发布后新增文案必须重跑
  `npm run fonts:subset`，否则新字符会退回系统字体。覆盖检查会阻止这种
  遗漏进入 CI。
- 没有按 unicode-range 切成多块：切片仍需处理同样的字符来源，却会让浏览器
  额外发起多个请求；按实际字符子集一次就能把体积降到最低。
- 没有直接删除自定义字体改用系统字体：会改变站点排版风格，收益与保留
  品牌字体相比不划算。

## 验证

`npm run check` 通过：字体覆盖检查、`astro check`、175 页构建、
`check:head`（175 页元数据）、`check:rendered`（30,915 条站内链接）。
`dist/fonts/` 合计 280 KiB。
