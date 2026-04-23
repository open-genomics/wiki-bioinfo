## 1. OpenSpec 与治理主轴

- [x] 1.1 重写 `openspec/specs/`，把项目定位、内容治理、组件复杂度控制、OpenSpec 工作流、CI/CD 收敛、GitHub 元数据和 AI 工具链要求统一到规范单源
- [x] 1.2 创建并完善 `repo-governance`、`github-presence`、`ai-tooling` 三个新 capability，对收尾治理、对外叙事和 AI 协同流程做明确约束
- [x] 1.3 验证 OpenSpec 规范与仓库当前实现是否一致，记录并修正明显冲突点

## 2. 运行时指令与根目录文档治理

- [x] 2.1 精简重写 `AGENTS.md` 和 `CLAUDE.md`，让其只保留项目关键事实、执行入口和工具边界
- [x] 2.2 生成并定制 `copilot-instructions.md`，明确中文回复、OpenSpec 优先、`/review` 与 subagent 使用策略、closeout-first 原则
- [x] 2.3 审核并收敛 `README.md`、`CONTRIBUTING.md`、`CHANGELOG.md`、`planning/*`、`.github/*` 文档和模板，删除或合并低价值资产

## 3. 工程配置与工作流瘦身

- [x] 3.1 审核并收敛 `package.json`、`astro.config.mjs`、公共资源文件和站点覆盖逻辑，删除低 ROI 的增强项
- [x] 3.2 精简 GitHub Actions workflow，移除误导性 PR preview 和多余步骤，保留高信号 CI 与 GitHub Pages 部署链路
- [x] 3.3 补齐项目级 editor/LSP 配置，只覆盖 Astro、TypeScript、JSON、YAML、Markdown/MDX 等高频技术栈，并明确不默认引入额外 MCP

## 4. GitHub Pages 与内容目录治理

- [x] 4.1 重构 `src/content/docs/index.mdx`、`src/content/docs/intro/*` 和站点元信息层，使首页、README、GitHub about 形成一致叙事
- [x] 4.2 治理 `src/content/docs/` 的高风险入口和英文目录策略，按“保留 / 重写 / 合并 / 下线”做激进裁剪
- [x] 4.3 修正导航、交叉链接、目录结构和实际内容页之间的不一致问题

## 5. 仓库元数据、验证与归档准备

- [x] 5.1 使用 `gh` 收敛 GitHub 仓库 description、homepage URL 和 topics
- [x] 5.2 运行现有检查链路并修复收尾整治过程中暴露的真实 bug
- [x] 5.3 审核最终状态，确认仓库已达到低维护、可归档的 closeout 版本
