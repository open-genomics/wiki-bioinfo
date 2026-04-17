---
title: About This Project
description: Project origin, knowledge organization philosophy, and long-term vision of BioInfo Wiki
---

## Why Build This Knowledge Base

Imagine a graduate student just entering the field of bioinformatics. She has sequencing data, knows to use BWA for alignment and GATK for variant calling, but often encounters these confusions:

- When BWA's alignment results show biases, she doesn't know whether to adjust parameters or switch tools;
- When she reads a new paper proposing an improved algorithm, she cannot judge its essential difference from existing methods;
- When she wants to design a new analysis pipeline, she's unsure which steps are algorithmic cores and which are just engineering implementations.

The root of these confusions is the same:**insufficient understanding of underlying algorithmic principles**.

Many bioinformatics textbooks and practical guides fall into two extremes: either they only teach tool usage ("press this button to get that result"), or they go deep into mathematical proofs without connecting to biological problems. BioInfo Wiki tries to walk a third path:**starting from problems, using algorithmic ideas as the main thread, connecting biological motivation, computational models, and practical tools into a continuously readable knowledge narrative**.

## Core Philosophy of Knowledge Organization

### Start from Problems, Not Tools

We don't start with "how to use BWA," but first ask "why do we need sequence alignment," "what is the computational essence of the alignment problem," and "under what assumptions do different alignment strategies work." Understanding these, tool selection and parameter tuning become natural consequences.

### Build Connections Between Knowledge

Bioinformatics knowledge is not isolated points. Dynamic programming is used both for sequence alignment and RNA structure prediction; graph models are used both for genome assembly and phylogenetic inference. The Wiki's structural design emphasizes these lateral connections, allowing readers to establish associations between different topics.

### Stay Open and Extensible

This is not a "completed" textbook. Bioinformatics is rapidly evolving—new sequencing technologies, new algorithmic ideas, and new biological problems are constantly emerging. The open-source collaboration mechanism allows the knowledge base to evolve with the field.

## Content Coverage

Current priority knowledge sections:

| Layer | Content | Examples |
|------|------|----------|
| **Object Layer** | Biological basic objects and data representation | reads, reference genomes, annotations, file formats |
| **Model Layer** | Abstract computational models | strings, graphs, dynamic programming, probabilistic models |
| **Algorithm Layer** | Core algorithmic methods | alignment, assembly, indexing, gene prediction, phylogeny |
| **Pipeline Layer** | Actual analysis workflows | DNA-seq, RNA-seq, metagenomics |
| **Resource Layer** | Data resources and tool mapping | databases, version selection, tool principle analysis |

## What We Explicitly Don't Cover

To maintain quality and consistency, the following types of content are currently not included:

- **Tool Operation Manuals**: Specific installation steps, parameter lists, command line examples (these are better suited for official tool documentation);
- **Full Domain Coverage**: Bioinformatics has many branches; the first phase focuses on core algorithms and mainstream analysis pipelines;
- **Pure Encyclopedia Entries**: We don't pursue complete term definition stacking, but emphasize relationships between concepts and problem-solving approaches.

## How to Use This Knowledge Base

### If You're a Beginner

We recommend starting with the [Learning Roadmap](../../intro/roadmap.md) to first build an overall knowledge map, then dive into specific topics as needed. The goal is not to remember all algorithmic details, but to understand**why these methods are needed** and**what types of problems they solve**.

### If You Have Specific Questions

You can locate relevant pages through the directory or search. Each topic page strives to provide:
- Problem background and biological motivation
- Core algorithmic ideas
- Connection to tools or pipelines
- Prerequisites and further reading

### If You Want to Contribute

Refer to the [Writing Standards](./style-guide.mdx) and [Contributing Guide](./contributing.mdx). We welcome:
- Supplements and improvements to existing pages
- New knowledge point pages (especially filling gaps in the knowledge network)
- Improvements to diagrams, examples, and cross-links

## Long-term Vision

BioInfo Wiki hopes to become:

1. **A sustainable bioinformatics knowledge portal for the global community**—not just providing information, but providing structured knowledge organization;
2. **A bridge between textbooks, courses, papers, and practical tools**—helping readers switch between different knowledge forms;
3. **A collaboratively evolving knowledge network**—continuously updating with field development, rather than a static publication.

## References and Acknowledgments

This knowledge base's organization and writing style reference the following classic textbooks:

- Jones, N. C., & Pevzner, P. A. (2004). *An Introduction to Bioinformatics Algorithms*. MIT Press.
- Durbin, R., Eddy, S., Krogh, A., & Mitchison, G. (1998). *Biological Sequence Analysis*. Cambridge University Press.
- Cormen, T. H., et al. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.

The organization is inspired by the [OI Wiki](https://oi-wiki.org/) model: using clear hierarchical structures to string together knowledge points, using community collaboration mechanisms to continuously accumulate content.

## Related Pages

- [Introduction](./index.mdx) — Site entrance and navigation
- [Learning Roadmap](../../intro/roadmap.md) — Recommended learning paths
- [How to Contribute](./contributing.md) — Ways to participate in the project
- [Writing Standards](../../intro/style-guide.md) — Document style and templates
- [中文版](../../intro/about.md) — 中文版本
