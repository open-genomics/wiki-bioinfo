export type HomeStat = {
  label: string;
  detail: string;
};

export type HighlightCard = {
  title: string;
  illustration: 'knowledge-map' | 'alignment-grid' | 'community-workflow';
  description: string;
  badge: string;
};

export type KnowledgeBucket = {
  title: string;
  to: string;
  meta: string;
  description: string;
  children: string[];
  nextStep: string;
};

export type LearningPath = {
  title: string;
  to: string;
  audience: string;
  description: string;
  steps: string[];
};

export type BridgeCard = {
  title: string;
  description: string;
  bullets: string[];
};

export type ContributionCard = {
  title: string;
  to: string;
  description: string;
};

export const homeStats: HomeStat[] = [
  {
    label: '6 个主入口',
    detail: '首页、navbar、footer 和 sidebar 围绕同一套顶层结构组织。',
  },
  {
    label: '方法到应用',
    detail: '从字符串、图、概率模型一路连到 DNA-seq、RNA-seq 与更多分析方向。',
  },
  {
    label: '开放协作',
    detail: '通过 GitHub、编辑链接和统一模板持续完善内容。',
  },
];

export const highlightCards: HighlightCard[] = [
  {
    title: '稳定的信息架构',
    illustration: 'knowledge-map',
    badge: '导航主干',
    description:
      '先建立耐用的顶层分类，再把细分主题逐步纳入二三级结构，避免目录过早膨胀。',
  },
  {
    title: '算法、数据与流程联动',
    illustration: 'alignment-grid',
    badge: '方法到任务',
    description:
      '不把算法、数据格式、数据库和工作流割裂开来，而是把它们组织成可回溯的知识链路。',
  },
  {
    title: '像 Wiki 一样持续演进',
    illustration: 'community-workflow',
    badge: '开放协作',
    description:
      '页面、图示、组件和导航一起演进，让内容增长时结构也同步成熟。',
  },
];

export const knowledgeBuckets: KnowledgeBucket[] = [
  {
    title: '开始这里',
    to: '/docs/intro/',
    meta: 'Start Here',
    description: '项目简介、学习路线、贡献方式与写作规范，帮助读者快速建立全站心智模型。',
    children: ['项目简介', '学习路线', '如何贡献', '写作规范'],
    nextStep: '先看学习路线，再进入 Foundations 或 Core Methods。',
  },
  {
    title: '基础与数学',
    to: '/docs/foundations/',
    meta: 'Foundations',
    description: '先理解序列、reads、coverage、坐标系统、图与概率，这些是后续算法和流程的共同语言。',
    children: ['基础对象', 'reads/coverage', '坐标与注释', '图与概率'],
    nextStep: '读完这层后进入 Core Methods 更顺滑。',
  },
  {
    title: '核心方法',
    to: '/docs/core-methods/',
    meta: 'Core Methods',
    description: '把序列表示、索引、比对、组装与概率模型收敛到同一个方法主轴下。',
    children: ['序列表示与索引', '序列比对', '组装与图算法', '概率模型与模式识别'],
    nextStep: '方法层是通往 Applications 的主干桥梁。',
  },
  {
    title: '分析方向与案例',
    to: '/docs/applications/',
    meta: 'Applications',
    description: '围绕 DNA-seq、RNA-seq、单细胞、表观组、长读长、空间组学等任务，组织应用层入口与案例。',
    children: ['工作流与案例', '变异检测', '转录组 / 单细胞', '多组学与临床解释'],
    nextStep: '如果你是问题驱动学习者，可以直接从这里切入，再回看方法层。',
  },
  {
    title: '数据、注释与资源',
    to: '/docs/data-references/',
    meta: 'Data & References',
    description: '把参考基因组、注释系统、文件格式和数据库入口放到同一层次理解。',
    children: ['参考与注释', '数据库资源', '常见数据格式'],
    nextStep: '这层是连接方法页和真实分析稳定性的关键。',
  },
  {
    title: '附录',
    to: '/docs/appendix/',
    meta: 'Appendix',
    description: '术语、参考资料和后续可扩展的索引型内容，承担 wiki 的收束与查阅功能。',
    children: ['术语表', '参考资料'],
    nextStep: '适合查词、补索引和统一引用。',
  },
];

export const learningPaths: LearningPath[] = [
  {
    title: '初学者路线',
    to: '/docs/intro/roadmap',
    audience: '先建立整站地图',
    description: '先理解对象、数据格式与流程地图，再进入索引、比对、组装和应用案例。',
    steps: ['开始这里', '基础与数学', '数据、注释与资源', '分析方向与案例'],
  },
  {
    title: '算法路线',
    to: '/docs/core-methods/',
    audience: '围绕教材主线',
    description: '从字符串、动态规划、图和概率模型切入，再反推这些方法在真实工具里的位置。',
    steps: ['基础与数学', '核心方法', '应用案例'],
  },
  {
    title: '实战路线',
    to: '/docs/applications/',
    audience: '围绕分析任务',
    description: '从 DNA-seq、RNA-seq、单细胞和其他应用问题出发，再回头追溯其依赖的方法和数据结构。',
    steps: ['数据、注释与资源', '分析方向与案例', '回看核心方法'],
  }
];

export const bridgeCards: BridgeCard[] = [
  {
    title: '字符串与动态规划',
    description: '从编辑距离、全局/局部比对到 affine gap，理解 read mapping 与局部精细比对背后的数学骨架。',
    bullets: ['编辑距离', 'Needleman–Wunsch / Smith–Waterman', 'affine gap'],
  },
  {
    title: '索引与快速搜索',
    description: '从 k-mer、suffix array、BWT 到 FM-index，理解为什么真实工具能在巨大参考序列上快速定位。',
    bullets: ['k-mer', 'BWT / FM-index', 'seeding'],
  },
  {
    title: '图算法与组装',
    description: '从 overlap 到 de Bruijn graph，再到重复、错误与图清理，把局部片段恢复成整体结构。',
    bullets: ['OLC', 'de Bruijn graph', 'graph cleaning'],
  },
  {
    title: '概率模型与统计推断',
    description: '从 HMM、PWM/PSSM 到表达定量和 gene prediction，理解不确定性如何被形式化。',
    bullets: ['HMM', 'PWM / PSSM', 'quantification / DE'],
  },
];

export const contributionCards: ContributionCard[] = [
  {
    title: '查看学习路线',
    to: '/docs/intro/roadmap',
    description: '先理解全站知识地图，再决定新内容应该放在哪个层级与板块。',
  },
  {
    title: '阅读写作规范',
    to: '/docs/intro/style-guide',
    description: '统一使用概念页、算法页、流程页与二级目录页模板，保证长期可维护。',
  },
  {
    title: '参与贡献',
    to: '/docs/intro/contributing',
    description: '通过 Issue 和 Pull Request 逐步补齐页面、图示、索引结构与工作流案例。',
  },
];
