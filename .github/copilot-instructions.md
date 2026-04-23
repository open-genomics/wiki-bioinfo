# Copilot Instructions for BioInfo Wiki

## 回复语言

- 默认使用中文回复
- 面向读者的文档以中文为主；只有在确有必要时提供中英双语

## 项目定位

- 这是一个面向中文社区的生物信息学体系化知识库
- 优先维护知识主干、阅读路径和交叉引用，不把内容写成工具操作手册
- 保持 6 个顶层入口稳定，不重做顶层信息架构

## 规范优先级

1. 用户要求
2. `openspec/specs/`
3. `AGENTS.md`
4. `CLAUDE.md`
5. 其他文档

## 工作方式

- 结构性改动先走 OpenSpec：`/opsx:propose` → `/opsx:apply` → `/opsx:archive`
- 优先做减法和收敛：删除、合并、下线低价值或误导性资产
- 修改文档、配置、组件或 workflow 后运行 `npm run check`
- 关键里程碑优先使用 `/review`
- subagent 用于批量审计和高噪音检查
- 默认不要常态化使用 `/fleet`

## 工程取舍

- `astro.config.mjs` 是站点导航、base 路径和语言启用策略单源
- 不增加没有明确收益的 workflow、PWA、MCP、插件或装饰性覆盖逻辑
- 项目级 editor/LSP 配置只覆盖 Astro、TypeScript、JSON、YAML、Markdown/MDX 等高频栈

## docs 目录治理

- 首页和 `intro/` 优先治理
- 使用“保留 / 重写 / 合并 / 下线 / 延后不动”处理内容漂移
- 英文内容若未维护，就不要保留“看似支持、实际失真”的状态
