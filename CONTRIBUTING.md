# 贡献指南

感谢你考虑为 BioInfo Wiki 贡献内容。

## 贡献什么最有价值

- 文档错误修复
- 过时内容更新
- 缺失交叉链接补充
- 低质量页面重写或合并建议
- 与知识主干紧密相关的新页面建议

不鼓励：

- 纯装饰性 UI 改动
- 与现有结构关系很弱的内容扩张
- 没有明确收益的工程化堆叠

## 提交前先判断类型

### 1. 小改动

适用于错别字、链接修复、表述澄清、小范围内容补充。

流程：

1. Fork 仓库并创建分支
2. 修改内容
3. 运行 `npm run check`
4. 提交 PR

### 2. 结构性改动

适用于目录调整、首页/导论重构、workflow 设计、组件规则修改、AI 协作规则修改等。

流程：

1. 先开 Issue 或讨论
2. 使用 OpenSpec 提案（`/opsx:propose`）
3. 提案就绪后再实施（`/opsx:apply`）

## 内容规则

- 中文优先
- 术语首次出现使用“中文（English, 缩写）”
- 先解释问题与动机，再进入方法
- 保持与现有知识主干的连接
- 页面修改后同步检查相关导航和交叉链接

## 本地开发

```bash
npm install
npm run dev
npm run check
```

常用命令：

- `npm run dev`
- `npm run build`
- `npm run check`
- `npm run check:links`

## PR 建议包含的信息

- 解决了什么问题
- 影响了哪些页面或配置
- 是否修改了导航、组件或 workflow
- 本地如何验证

## 相关文档

- 项目概览：[`README.md`](./README.md)
- OpenSpec 规范：`openspec/specs/`
- 写作规范：[`src/content/docs/intro/style-guide.md`](./src/content/docs/intro/style-guide.md)
