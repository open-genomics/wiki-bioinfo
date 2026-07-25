# 贡献指南

感谢你考虑为 BioInfo Wiki 贡献内容。完整的贡献方式、写作规范与项目设计理念在站点内维护，避免与仓库文档双源漂移。

## 从哪里开始

- **项目概览**：[`README.md`](./README.md)
- **项目设计与内容边界**：[导论](https://lessup.github.io/wiki-bioinfo/intro/)
- **贡献方式与流程**：[如何贡献](https://lessup.github.io/wiki-bioinfo/intro/contributing/)
- **写作规范**：[写作规范](https://lessup.github.io/wiki-bioinfo/intro/style-guide/)
- **Agent 指令**：[`AGENTS.md`](./AGENTS.md)
- **架构上下文**：[`CONTEXT.md`](./CONTEXT.md)

## 本地开发

```bash
npm install
npm run dev
npm run check
```

常用命令：

- `npm run dev`：本地开发
- `npm run build`：生产构建
- `npm run check`：类型检查 + 构建
- `npm run check:links`：内部链接检查

## PR 建议包含的信息

- 解决了什么问题
- 影响了哪些页面或配置
- 是否修改了导航、组件或 workflow
- 本地如何验证
