---
title: Contributing Guide
description: Contribution workflow, content standards, and collaboration guidelines for BioInfo Wiki
---

BioInfo Wiki adopts an open-source collaboration model, continuously accumulating content through GitHub's Issue and Pull Request mechanisms. This page describes the contribution process, content standards, and priority directions.

## 1. Contribution Process

### 1.1 Preparation

1. **Read Relevant Documentation**:
   - [About This Project](./about.md) — Understand the knowledge base's positioning and philosophy
   - [Learning Roadmap](../../intro/roadmap.md) — Understand gaps in the current knowledge structure
   - [Writing Standards](../../intro/style-guide.md) — Master page templates and terminology standards

2. **Confirm Contribution Direction**:
   - Check existing Issues to find tasks of interest
   - Or open a new Issue to propose new/modified content, waiting for maintainer feedback

### 1.2 Submit Changes

1. Fork this repository and create a feature branch
2. Modify documents, illustrations, or code according to the [Writing Standards](../../intro/style-guide.md)
3. Local validation:

```bash
npm install
npm run dev    # Local preview
npm run check  # Check links and format
```

4. Submit a Pull Request, explaining:
   - Modification goals and problems solved
   - Specific pages affected
   - Whether new images/components/directory structures are added
   - Validation methods and test results

## 2. Priority Directions for Content Contribution

Currently, the following content is prioritized:

| Priority | Direction | Specific Examples |
|----------|-----------|-------------------|
| **High** | Basic bridging pages | reads, coverage, reference genomes, file formats |
| **High** | Algorithm mainline pages | Indexing structures, alignment algorithms, assembly graphs, probabilistic models |
| **Medium** | Workflow pages | DNA-seq, RNA-seq, metagenomic analysis pipelines |
| **Medium** | Data resource pages | Database entry points, version selection, object mapping |
| **Low** | Decorative optimizations | Modifications with purely visual improvements without substantive content gains |

## 3. Content Quality Standards

### 3.1 Required Elements

Each knowledge page should include at least:

- [ ] **Clear topic positioning** — What this page is about, who it's for
- [ ] **Problem background** — Why this topic is worth discussing
- [ ] **Core concepts or methods** — Key models, algorithms, or processes
- [ ] **Examples or illustrations** — worked example, flowcharts, or comparison tables
- [ ] **References** — Cited papers, textbooks, or official documentation
- [ ] **Related page links** — Cross-references within the site, forming a knowledge network

### 3.2 Writing Principles

- **Problem-first**: Explain what problem to solve before presenting the method
- **Explain relationships**: Explain connections between concepts rather than stacking terminology
- **Formalized expression**: Use formulas, pseudocode, or diagrams for clear description when needed
- **Tool mapping**: Explain how algorithmic ideas manifest in practical tools
- **Annotate limitations**: Explain method premises, assumptions, and scope of application

### 3.3 Terminology and Format

- Body text uses English; key terms can be annotated with Chinese equivalents
- Database, software, and classic algorithm names remain in English
- Prioritize `.md` format, use `.mdx` when interactive components are needed
- Images go in `public/img/illustrations/` or `public/img/figures/`, ensuring readability in dark mode

## 4. Technical Contribution

### 4.1 Components and Styles

- Prioritize reusing existing components in `src/components/docs/`
- New components should maintain simplified APIs for subsequent document reuse
- Style modifications should prioritize using `src/styles/custom.css`

### 4.2 Site Configuration

- When adding or renaming pages, synchronously check `astro.config.mjs` sidebar configuration
- After modification, run `npm run check` to validate links and configuration

## 5. Review and Merge

Maintainers will review PRs as soon as possible, focusing on:

- Content accuracy and technical correctness
- Compatibility with the existing knowledge system
- Compliance with writing standards and terminology standards
- Whether necessary cross-links are supplemented

Small modifications (such as typos, link corrections) are usually merged quickly; larger content additions may require multiple rounds of discussion.

## 6. Related Pages

- [About This Project](./about.md) — Knowledge base positioning and philosophy
- [Learning Roadmap](../../intro/roadmap.md) — Knowledge structure planning
- [Writing Standards](../../intro/style-guide.md) — Detailed templates and format specifications
- [中文版](../../intro/contributing.md) — 中文版本
