export type HomeStat = {
  value: string;
  label: string;
};

export type FeatureCard = {
  icon: string;
  title: string;
  description: string;
};

export type KnowledgeBucket = {
  icon: string;
  title: string;
  to: string;
  meta: string;
  description: string;
  children: string[];
  color: string;
};

export type LearningPath = {
  icon: string;
  title: string;
  to: string;
  audience: string;
  description: string;
  steps: string[];
};

export type BridgeCard = {
  icon: string;
  title: string;
  to: string;
  description: string;
  tags: string[];
};

export type ContributionCard = {
  icon: string;
  title: string;
  to: string;
  description: string;
};

export const homeStats: HomeStat[] = [
  { value: '80+', label: '知识页面' },
  { value: '6', label: '主入口板块' },
  { value: '14', label: '子专题' },
  { value: '∞', label: '持续演进' },
];

export const featureCards: FeatureCard[] = [
  {
    icon: '🧬',
    title: '结构优先',
    description: '从序列、比对、组装到 HMM，围绕稳定的知识主干组织内容，而非罗列工具命令。',
  },
  {
    icon: '🔗',
    title: '方法到应用',
    description: '算法、数据格式、数据库和工作流联动：从教材公式到真实分析流程一线贯通。',
  },
  {
    icon: '🌏',
    title: '中文优先',
    description: '面向中文社区的系统性生物信息学知识库，术语首次出现附英文与缩写。',
  },
  {
    icon: '📖',
    title: '开放协作',
    description: '通过 GitHub 和统一模板持续完善，像 Wiki 一样让内容和结构同步成熟。',
  },
];

export const knowledgeBuckets: KnowledgeBucket[] = [
  {
    icon: '🚀',
    title: '开始这里',
    to: '/docs/intro/',
    meta: 'Start Here',
    description: '项目简介、学习路线、贡献方式与写作规范。',
    children: ['项目简介', '学习路线', '如何贡献', '写作规范'],
    color: '#10b981',
  },
  {
    icon: '🧮',
    title: '基础与数学',
    to: '/docs/foundations/',
    meta: 'Foundations',
    description: '序列、reads、coverage、坐标系统与概率——后续一切的基石。',
    children: ['生物学基础', 'reads/coverage', '参考与注释', '图与概率'],
    color: '#6366f1',
  },
  {
    icon: '⚙️',
    title: '核心方法',
    to: '/docs/core-methods/',
    meta: 'Core Methods',
    description: '索引、比对、组装与概率模型，收敛到同一个方法主轴。',
    children: ['序列索引', '序列比对', '组装与图算法', '概率模型'],
    color: '#0ea5e9',
  },
  {
    icon: '🔬',
    title: '分析方向与案例',
    to: '/docs/applications/',
    meta: 'Applications',
    description: 'DNA-seq、RNA-seq、单细胞、长读长、空间组学等分析入口。',
    children: ['变异检测', '转录组', '单细胞', '多组学'],
    color: '#f59e0b',
  },
  {
    icon: '📚',
    title: '数据、注释与资源',
    to: '/docs/data-references/',
    meta: 'Data & References',
    description: '参考基因组、注释系统、文件格式和数据库入口。',
    children: ['参考与注释', '数据库资源', '数据格式'],
    color: '#ec4899',
  },
  {
    icon: '📝',
    title: '附录',
    to: '/docs/appendix/',
    meta: 'Appendix',
    description: '术语表、参考资料与索引，承担 Wiki 的查阅收束功能。',
    children: ['术语表', '参考资料'],
    color: '#8b5cf6',
  },
];

export const learningPaths: LearningPath[] = [
  {
    icon: '🎯',
    title: '初学者路线',
    to: '/docs/intro/roadmap',
    audience: '零基础入门',
    description: '先理解对象与流程地图，再进入索引、比对、组装和应用案例。',
    steps: ['开始这里', '基础与数学', '数据、注释与资源', '分析方向与案例'],
  },
  {
    icon: '🧠',
    title: '算法路线',
    to: '/docs/core-methods/',
    audience: '理论驱动',
    description: '从字符串、DP、图和概率模型切入，再看它们在真实工具里的位置。',
    steps: ['基础与数学', '核心方法', '应用案例'],
  },
  {
    icon: '🛠️',
    title: '实战路线',
    to: '/docs/applications/',
    audience: '任务驱动',
    description: '从 DNA-seq、RNA-seq、单细胞出发，回溯其依赖的方法和数据结构。',
    steps: ['数据与资源', '分析方向与案例', '回看核心方法'],
  },
];

export const bridgeCards: BridgeCard[] = [
  {
    icon: '📐',
    title: '字符串与动态规划',
    to: '/docs/alignment/',
    description: '编辑距离、全局/局部比对到 affine gap，read mapping 背后的数学骨架。',
    tags: ['编辑距离', 'NW / SW', 'affine gap'],
  },
  {
    icon: '🔍',
    title: '索引与快速搜索',
    to: '/docs/sequence/',
    description: 'k-mer、suffix array、BWT 到 FM-index——巨大参考序列上的快速定位。',
    tags: ['k-mer', 'BWT / FM-index', 'seeding'],
  },
  {
    icon: '🕸️',
    title: '图算法与组装',
    to: '/docs/assembly/',
    description: 'OLC 到 de Bruijn graph，重复与错误处理，把片段恢复成整体。',
    tags: ['OLC', 'de Bruijn', 'graph cleaning'],
  },
  {
    icon: '🎲',
    title: '概率模型与推断',
    to: '/docs/models/',
    description: 'HMM、PWM/PSSM 到 gene prediction，不确定性如何被形式化。',
    tags: ['HMM', 'PWM / PSSM', 'EM'],
  },
];

export const contributionCards: ContributionCard[] = [
  {
    icon: '🗺️',
    title: '查看学习路线',
    to: '/docs/intro/roadmap',
    description: '理解全站知识地图，确定新内容的层级与位置。',
  },
  {
    icon: '📋',
    title: '阅读写作规范',
    to: '/docs/intro/style-guide',
    description: '统一使用概念页、算法页、流程页模板，保证长期可维护。',
  },
  {
    icon: '🤝',
    title: '参与贡献',
    to: '/docs/intro/contributing',
    description: 'Issue + Pull Request，逐步补齐页面、图示与工作流案例。',
  },
];
