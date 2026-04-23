# CLAUDE.md

## 项目

BioInfo Wiki：面向中文社区的生物信息学体系化知识库。

## 规范入口

- **长期规范**：`openspec/specs/`
- **Agent 摘要**：`AGENTS.md`
- **Copilot 指令**：`.github/copilot-instructions.md`

## 必守规则

- 保持 6 个顶层入口稳定
- 中文优先，术语首次出现附英文和缩写
- closeout-first：优先收敛、清理、统一，不继续堆功能和工程复杂度
- 修改文档、配置、组件或 workflow 后运行 `npm run check`

## OpenSpec 流程

```text
/opsx:propose → /opsx:apply → /opsx:archive
```

仓库级治理、目录整理、workflow 收敛、AI 协作规则修改都走 OpenSpec。
