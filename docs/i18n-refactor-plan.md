# 多语言架构重构计划

## 问题诊断

当前内容结构存在严重重复：

| 位置 | 文件数量 | 状态 |
|------|----------|------|
| `src/content/docs/*` | 215 | ✅ 主要中文内容（当前活跃） |
| `src/content/docs/zh/*` | 206 | ❌ 完全重复，浪费空间 |
| `src/content/docs/en/*` | 9 | ⚠️ 部分英文翻译 |

## 重复验证

执行以下命令验证了重复：
```bash
diff src/content/docs/alignment/index.mdx src/content/docs/zh/alignment/index.mdx
# 输出为空 = 文件完全相同
```

## 影响

1. **构建问题**: `astro.config.mjs` 只配置了 `root: zh-CN` locale，`zh/` 和 `en/` 内容不会被构建
2. **维护成本**: 每次更新需要同步多处
3. **仓库膨胀**: 约 200 个多余文件
4. **SEO 问题**: 重复内容不利于搜索引擎优化

## 建议方案

### 方案 A: 激进清理（推荐）

**步骤**:
1. 删除 `src/content/docs/zh/` 目录
2. 保留 `src/content/docs/en/` 作为英文内容
3. 更新 `astro.config.mjs` 添加 `en` locale
4. 更新相对路径以支持多语言

**优点**: 
- 清理彻底
- 架构清晰

**缺点**:
- 需要更新所有内部链接
- 大改动需要测试

### 方案 B: 渐进迁移

**步骤**:
1. 保持现状
2. 创建自动化脚本同步 `zh/` 内容（如果有更新）
3. 逐步完善 `en/` 内容
4. 长期规划统一架构

**优点**:
- 改动小，风险低

**缺点**:
- 重复问题持续存在
- 技术债务累积

## 配置修改

如采用方案 A，需更新 `astro.config.mjs`：

```javascript
locales: {
  root: {
    label: '简体中文',
    lang: 'zh-CN',
  },
  en: {
    label: 'English',
    lang: 'en',
  },
},
```

## 链接更新示例

中文内容保持现有链接格式：
```md
[序列比对](../alignment/)
```

英文内容需要添加语言前缀：
```md
[Sequence Alignment](../../en/alignment/)
```

## 执行计划

1. **备份**: 创建分支 `refactor/i18n-cleanup`
2. **删除**: 移除 `zh/` 目录
3. **更新配置**: 修改 astro.config.mjs
4. **测试构建**: `npm run build`
5. **更新文档**: 修改贡献指南说明多语言规范
6. **合并**: 通过 PR 审核后合并

## 文件清单

```
# 待删除（完全重复）
src/content/docs/zh/ (206 files)

# 待保留（根级中文内容）
src/content/docs/alignment/*
src/content/docs/assembly/*
...
src/content/docs/workflows/*

# 待完善（英文内容）
src/content/docs/en/alignment/index.mdx
src/content/docs/en/assembly/index.mdx
src/content/docs/en/core-methods/index.mdx
src/content/docs/en/index.mdx
src/content/docs/en/intro/about.md
src/content/docs/en/intro/contributing.md
src/content/docs/en/intro/index.mdx
src/content/docs/en/models/index.mdx
src/content/docs/en/sequence/index.mdx
```

---

Generated: 2026-04-17
