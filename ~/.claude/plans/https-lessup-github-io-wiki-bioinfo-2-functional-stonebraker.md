# 修复首页路径卡片高度不一致并组件化

## Context

首页 `index.mdx` 中"三条阅读路径"的三张卡片使用 CSS Grid 三列布局，但卡片内容长度不同（如"回到分析方向验证方法位置"比"导论"长），导致卡片高度不一致。需要将卡片组件化为独立组件，并确保高度一致。

## 修改方案

### 1. 创建 `PathCard.astro` 组件

**文件**：`src/components/docs/PathCard.astro`

```astro
---
interface Props {
  title: string;
  steps: string[];
}

const { title, steps } = Astro.props;
---

<div class="home-path-card">
  <h3>{title}</h3>
  <ol>
    {steps.map((step) => <li>{step}</li>)}
  </ol>
</div>
```

### 2. 更新 `src/styles/custom.css`

在 `.home-path-grid` 规则中添加 `align-items: stretch` 显式声明，确保三张卡片高度一致：

```css
.home-path-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;  /* 确保同行卡片等高 */
  gap: 1rem;
  margin: 2rem 0;
}
```

**原因**：虽然 `stretch` 是 Grid 的默认值，但 Starlight 主题或其他全局样式可能重置了此属性。显式声明可确保卡片在所有断点下都保持等高。

### 3. 更新 `src/content/docs/index.mdx`

导入并使用新的 `PathCard` 组件：

```astro
import PathCard from '../../components/docs/PathCard.astro';
```

将原来的 HTML 卡片替换为组件调用：

```astro
<div class="home-path-grid">
  <PathCard
    title="初学者路径"
    steps={['导论', '基础与数学', '数据与资源', '分析方向']}
  />
  <PathCard
    title="算法路径"
    steps={['导论中的算法入口', '基础与数学', '核心方法', '回到分析方向验证方法位置']}
  />
  <PathCard
    title="任务驱动路径"
    steps={['选择一个分析方向', '回看相关数据与资源', '追溯到核心方法', '再补基础与模型']}
  />
</div>
```

## 涉及文件

- `src/components/docs/PathCard.astro` (新建)
- `src/styles/custom.css` (第 236-241 行)
- `src/content/docs/index.mdx` (第 69-99 行)

## 验证方式

1. 运行 `npm run dev` 启动本地开发服务器
2. 访问首页，检查三张路径卡片是否等高
3. 调整浏览器窗口宽度，验证响应式断点（72rem、50rem）下卡片是否仍保持等高
4. 切换亮色/暗色主题，确认样式正常
5. 运行 `npm run check` 确保无类型或构建错误
