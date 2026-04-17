# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive CHANGELOG.md at project root
- CONTRIBUTING.md with contribution guidelines
- GitHub issue templates and PR template
- Dependabot configuration for automated dependency updates
- .editorconfig for consistent coding style

### Fixed

- Corrected internal links with wrong file extensions (.md → .mdx)
- Fixed LaTeX syntax errors with improperly escaped braces in math expressions
- Enhanced CI workflow with proper job dependencies and caching
- Improved GitHub Pages deployment workflow with memory optimization

## [0.2.0] - 2026-04-08

### Added

- Astro 6.1 + Starlight 0.38 framework migration from Docusaurus
- 11 custom Astro components for documentation:
  - `PageHeaderMeta` — 页面元信息三栏卡片
  - `SummaryBox` — 快速概览卡片
  - `SectionNavigator` — 子主题导航网格
  - `RelatedLinks` — 延伸阅读链接网格
  - `PrerequisitesBox` — 前置知识列表
  - `ComparisonTable` — 对比表格
  - `DecisionMatrix` — 决策矩阵表格
  - `ToolMappingBox` — 工具/流程连接列表
  - `PitfallsBox` — 常见误区列表
  - `DefinitionList` — 术语定义网格
  - `WorkflowSteps` — 流程步骤卡片
- Pagefind search with improved Chinese language support
- Shiki code highlighting via Expressive Code
- KaTeX math rendering support

### Changed

- **Framework**: Docusaurus → Astro 6.1 + Starlight 0.38
- **Directory structure**:
  - `docs/` → `src/content/docs/`
  - `static/` → `public/`
  - `src/css/custom.css` → `src/styles/custom.css`
- **Build output**: `build/` → `dist/`
- **Search**: `@easyops-cn/docusaurus-search-local` → Pagefind (built-in)

### Removed

- React dependencies (`react`, `react-dom`, `@mdx-js/react`)
- Docusaurus dependencies (`@docusaurus/core`, `@docusaurus/preset-classic`)
- Prism code highlighter (replaced by Shiki)

## [0.1.0] - 2026-04-07

### Added

- Initial project structure based on Docusaurus
- Frontend interface optimization inspired by OI Wiki design
- Hero section with centered layout, gradient title, and search box
- Statistics display (80+ pages, 6 main sections, 14 sub-topics)
- Features section with 4-column card layout
- Knowledge map with icons, colors, and tag pills
- Learning roadmap with icons and audience tags
- Core methods bridge with clickable cards and tech tags
- Contribution section with icons and arrow indicators
- Global navigation optimization:
  - Search plugin with Chinese/English support
  - Navbar with hideOnScroll and glassmorphism effect
  - GitHub icon with light/dark mode adaptation
- Document page reading experience:
  - Sidebar with active link highlight
  - TOC with left vertical line indicator
  - Code blocks with unified border-radius and shadow
  - Breadcrumb with theme color highlight
  - Pagination with hover effects
- Visual system upgrade:
  - Reading progress bar
  - Back-to-top button with glassmorphism
  - Dark mode optimization (deep blue theme #0f172a)
  - Card system with unified styling
- Footer redesign with 4-column layout

### Dependencies

- `@easyops-cn/docusaurus-search-local` for local search

## Project History

### BioInfo Wiki Goals

This project aims to be a **systematic knowledge base for bioinformatics in Chinese**, designed to:

1. Fill the gap between tool tutorials and academic papers
2. Build knowledge from biological objects → models → algorithms → workflows → resources
3. Provide continuous reading experience like a textbook
4. Enable cross-referencing between concepts

### Content Statistics

- **200+ pages** covering bioinformatics fundamentals
- **6 main sections**: Introduction, Foundations, Core Methods, Applications, Data & Resources, Appendix
- **14 sub-topics** including sequence analysis, alignment, assembly, variant calling, etc.

---

For detailed migration notes, see the [`changelog/`](./changelog/) directory.
