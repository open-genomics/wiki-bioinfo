# BioInfo Wiki

BioInfo Wiki 是一个面向中文社区的开源生物信息学知识库项目。

它参考 OI Wiki 的信息架构与协作方式，但内容聚焦于生物信息学，尤其强调：

- 生物学对象与算法模型之间的映射
- 经典教材主线与现代分析流程之间的连接
- 文档驱动的开放协作与持续迭代

当前第一阶段采用 **Docusaurus** 构建站点骨架，目录主线参考 **《An Introduction to Bioinformatics Algorithms》**，并补充数据库、工作流与社区贡献文档。

## 本地开发

```bash
npm install
npm run start
```

默认开发地址：`http://localhost:3000/wiki-bioinfo/`

## 构建静态站点

```bash
npm run build
npm run serve
```

## 质量检查

```bash
npm run typecheck
npm run check
```

## 内容结构

当前站点围绕 6 个主入口组织：

- `docs/intro/`：开始这里（项目介绍、学习路线、贡献说明、写作规范）
- `docs/foundations/`：基础与数学（对象层、reads/coverage、坐标系统、图与概率）
- `docs/core-methods/`：核心方法，总领 `docs/sequence/`、`docs/alignment/`、`docs/assembly/`、`docs/models/`
- `docs/applications/`：分析方向与案例，总领 `docs/workflows/`、`docs/variants/`、`docs/transcriptomics/`、`docs/single-cell/`、`docs/epigenomics/`、`docs/population/`、`docs/long-read/`、`docs/spatial/`、`docs/proteomics/`、`docs/clinical-variants/`、`docs/structure-bioinfo/`、`docs/multi-omics/`、`docs/phylogeny/`、`docs/ml-bioinfo/`
- `docs/data-references/`：数据、注释与资源，并连接 `docs/databases/` 与 `docs/formats/`
- `docs/appendix/`：附录（术语、参考资料等索引型内容）

整体设计强调：先让顶层入口稳定，再持续扩展二级和三级专题。

如果你要补内容，建议优先先判断新主题属于哪个主入口，再决定放到哪一层子目录。

## 部署说明

当前配置默认按 GitHub Pages 项目站点部署：

- `url`: `https://lessup.github.io`
- `baseUrl`: `/wiki-bioinfo/`
- 目标地址：`https://lessup.github.io/wiki-bioinfo/`

仓库已经配置了 GitHub Actions 自动部署工作流：

- `/.github/workflows/deploy-pages.yml`
- 当 `master` 分支有新的 push 时，会自动构建并发布站点

### 首次启用 GitHub Pages

如果仓库还没有启用 Pages，需要在 GitHub 仓库页面完成一次设置：

1. 打开 **Settings → Pages**
2. 在 **Build and deployment** 中把 **Source** 设置为 **GitHub Actions**
3. 确认后，再向 `master` 推送一次提交，或手动触发 `Deploy GitHub Pages` workflow

### 部署验证

当自动部署启用后，可以通过以下方式验证：

```bash
npm run typecheck
npm run build
```

然后在 GitHub Actions 中检查：

- `CI` 工作流是否通过
- `Deploy GitHub Pages` 工作流是否通过

最后访问：

- `https://lessup.github.io/wiki-bioinfo/`

如果后续改为自定义域名或其他静态托管平台，可调整 `docusaurus.config.ts`。

## 参与贡献

欢迎通过 Issue 和 Pull Request 参与建设。建议先阅读：

- `docs/intro/contributing.md`
- `docs/intro/style-guide.md`
