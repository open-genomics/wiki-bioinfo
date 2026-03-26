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

- `docs/intro/`：项目介绍、学习路线、贡献说明、写作规范
- `docs/foundations/`：基础预备
- `docs/sequence/`：序列与字符串
- `docs/alignment/`：序列比对
- `docs/assembly/`：基因组组装
- `docs/phylogeny/`：系统发育
- `docs/models/`：概率模型与模式识别
- `docs/databases/`：数据库与资源
- `docs/workflows/`：分析流程
- `docs/appendix/`：附录与参考资料

## 部署说明

当前配置默认按 GitHub Pages 项目站点部署：

- `url`: `https://lessup.github.io`
- `baseUrl`: `/wiki-bioinfo/`

如果后续改为自定义域名或其他静态托管平台，可调整 `docusaurus.config.ts`。

## 参与贡献

欢迎通过 Issue 和 Pull Request 参与建设。建议先阅读：

- `docs/intro/contributing.md`
- `docs/intro/style-guide.md`
