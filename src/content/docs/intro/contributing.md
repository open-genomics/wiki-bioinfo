---
title: "如何贡献"
description: BioInfo Wiki 的贡献方式、开发流程与 OpenSpec 驱动协作入口
---

BioInfo Wiki 欢迎内容修订、结构优化、链接修复和高质量的新页面建议。

## 哪些贡献最有价值

- 修正文档错误和过时信息
- 补充缺失的交叉链接
- 改进首页、导论或板块入口的引导质量
- 围绕知识主干补充高质量页面
- 收敛低价值、重复或误导性的内容和配置

## 两类贡献方式

### 小改动

适用于错别字、链接修复、表述澄清、小范围内容修订。

1. Fork 仓库
2. 修改内容
3. 运行 `npm run check`
4. 提交 Pull Request

### 结构性改动

适用于目录调整、板块入口重构、组件规则修改、workflow 收敛、AI 协作规则修改等。

1. 先通过 Issue 或讨论说明问题
2. 使用 OpenSpec 提案（`/opsx:propose`）
3. 提案就绪后实施（`/opsx:apply`）

## 本地验证

```bash
npm install
npm run dev
npm run check
```

## 写作前的最低检查

- 这页是否解释了“为什么值得讲”
- 是否和现有知识主干建立了联系
- 是否补充了相关页面链接
- 是否需要同步更新 `astro.config.mjs` 导航

## 相关页面

- [关于本项目](./about/)
- [学习路线](./roadmap/)
- [写作规范](./style-guide/)
