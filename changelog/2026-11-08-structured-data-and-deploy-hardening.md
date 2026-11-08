# 2026-11-08 JSON-LD 转义与 Pages 部署加固

## JSON-LD

首页 JSON-LD 由 frontmatter 描述拼接后经 `set:html` 原样输出；描述中出现
`</script>` 可闭合脚本。现在对序列化结果把 `<` 转义为 `\u003c`。

## Pages 部署

- workflow 级权限收窄为 `contents: read`；`pages: write` / `id-token: write`
  只授予 deploy job，构建步骤不再持有部署凭据。
- `workflow_run` 触发增加 `event == push` 与
  `head_repository.full_name == github.repository` 校验，避免 PR CI 驱动特权部署。
- checkout 使用 `workflow_run.head_sha`，部署本次 CI 实际验证过的提交。

## 验证

`npm run check`：astro check、175 页构建、`check:head`（175 页元数据）、
`check:rendered`（30,915 条站内链接）全部通过。
