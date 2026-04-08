---
title: 曼哈顿游客问题与 DP 统一视角
description: 以曼哈顿游客问题为切入点，理解动态规划的核心思想：子问题复用、递推关系与回溯路径。
---

import PageHeaderMeta from '@/components/docs/PageHeaderMeta.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';
import SummaryBox from '@/components/docs/SummaryBox.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<PageHeaderMeta
  section="Foundations"
  estimatedTime="20 分钟"
  difficulty="基础"
/>

# 曼哈顿游客问题与 DP 统一视角

曼哈顿游客问题是理解**动态规划**（Dynamic Programming, DP）的经典入口。它提供了一个几何直观，展示了 DP 的核心思想：把复杂问题分解为重叠子问题，通过存储子问题的解来避免重复计算。

<PrerequisitesBox>
- 理解数组和循环的基本概念
- 了解网格图的基本结构
- 推荐阅读：[动态规划基础](./dynamic-programming-basics.mdx)
</PrerequisitesBox>

---

## 问题定义

### 场景描述

想象你是一名游客，在曼哈顿网格状的道路中从**西北角**走向**东南角**。你只能向**东**（→）或向**南**（↓）移动。每条街道（边）都有一定数量的景点（权重），你希望找到一条**景点数量最多**的路径。

### 形式化定义

**输入**：
- n × m 的加权网格
- `down[i][j]`：从 (i-1, j) 向南走到 (i, j) 获得的权重
- `right[i][j]`：从 (i, j-1) 向东走到 (i, j) 获得的权重

**输出**：
- 从 (0, 0) 到 (n, m) 的路径，使总权重最大

**约束**：
- 只能向南或向东移动

---

## 核心思想：最优子结构

### 关键观察

到达任意格子 (i, j) 的最优路径，必定来自两个方向之一：
1. 从北边 (i-1, j) 向南来
2. 从西边 (i, j-1) 向东来

这意味着：

> **最优子结构**：
> 到达 (i, j) 的最优路径 = max(到达 (i-1, j) 的最优路径 + down[i][j], 
>                               到达 (i, j-1) 的最优路径 + right[i][j])

### 递推公式

```
s[i][j] = max(s[i-1][j] + down[i][j], s[i][j-1] + right[i][j])
```

其中 `s[i][j]` 表示从起点到 (i, j) 的最大权重。

---

## 算法实现

### 初始化边界

```text
MANHATTANTOURIST(n, m, down, right)
1  s[0][0] ← 0                          // 起点
2  for i ← 1 to n
3      s[i][0] ← s[i-1][0] + down[i][0]  // 第一列只能向南
4  for j ← 1 to m
5      s[0][j] ← s[0][j-1] + right[0][j] // 第一行只能向东
```

### 填充 DP 表

```text
6  for i ← 1 to n
7      for j ← 1 to m
8          s[i][j] ← max(s[i-1][j] + down[i][j], 
                          s[i][j-1] + right[i][j])
9  return s[n][m]
```

### 复杂度分析

| 维度 | 复杂度 | 说明 |
|------|-------|------|
| 时间 | O(nm) | 每个格子计算一次 |
| 空间 | O(nm) | 存储整个 DP 表 |

---

## 回溯路径

仅知道最优得分不够，还需要知道**具体路径**。

### 存储回溯指针

```text
8  for i ← 1 to n
9      for j ← 1 to m
10         if s[i-1][j] + down[i][j] > s[i][j-1] + right[i][j]
11             s[i][j] ← s[i-1][j] + down[i][j]
12             backtrack[i][j] ← "↓"    // 来自南边
13         else
14             s[i][j] ← s[i][j-1] + right[i][j]
15             backtrack[i][j] ← "→"    // 来自东边
```

### 路径重构

```text
PRINTPATH(backtrack, n, m)
1  if n == 0 and m == 0
2      return
3  if backtrack[n][m] == "↓"
4      PRINTPATH(backtrack, n-1, m)
5      output "↓"
6  else
7      PRINTPATH(backtrack, n, m-1)
8      output "→"
```

---

## 从曼哈顿到序列比对

### 惊人的对应关系

曼哈顿游客问题的结构，与**序列比对问题**有着完美的数学对应：

| 曼哈顿游客 | 全局序列比对 |
|-----------|-------------|
| 网格顶点 (i, j) | 比对前缀 (v[1..i], w[1..j]) |
| 向东移动 → | 在序列 v 中插入间隙（w 延伸） |
| 向南移动 ↓ | 在序列 w 中插入间隙（v 延伸） |
| 对角移动 ↘ | 匹配/错配 vi 与 wj |
| 边权重 | 比对得分（匹配加分，错配/间隙减分） |
| 最优路径 | 最优比对 |

### 编辑距离的 DP 表格

```
       0    1    2    3    ...    m
    ┌────┬────┬────┬────┬───┬────┐
  0 │ 0  │ 1  │ 2  │ 3  │   │ m  │
    ├────┼────┼────┼────┼───┼────┤
  1 │ 1  │    │    │    │   │    │
    ├────┼────┼────┼────┼───┼────┤
  2 │ 2  │    │    │    │   │    │
    ├────┼────┼────┼────┼───┼────┤
  . │ .  │    │    │    │   │    │
  . │ .  │    │    │    │   │    │
  n │ n  │    │    │    │   │Dnm │
    └────┴────┴────┴────┴───┴────┘
```

```
D(i,j) = min {
    D(i-1,j) + 1,      // 删除：向南移动
    D(i,j-1) + 1,      // 插入：向东移动
    D(i-1,j-1) + δ     // 替换/匹配：对角移动
}
```

其中 δ = 0（如果 vi = wj），否则 δ = 1。

---

## 局部比对：允许负分重置

### 与曼哈顿游客的对比

**全局比对**（Needleman-Wunsch）：
- 必须从 (0,0) 走到 (n,m)
- 对应完整网格遍历

**局部比对**（Smith-Waterman）：
- 可以从任意点开始，在任意点结束
- 允许在负值时重置为 0（开启新的子序列比对）

```
S(i,j) = max {
    0,                      // 重新开始（局部比对关键）
    S(i-1,j) - gap_penalty, // 延伸 v 中的间隙
    S(i,j-1) - gap_penalty, // 延伸 w 中的间隙
    S(i-1,j-1) + score(vi,wj) // 匹配/错配
}
```

---

## 推广：DAG 上的最长路径

### 更一般的结构

曼哈顿网格是一种特殊的**有向无环图**（DAG）：
- 所有边都从左上指向右下
- 无环（不可能回到已访问节点）

### DAG 上最长路径的通用算法

```text
LONGESTPATHINDAG(G, source, sink)
1  对 G 进行拓扑排序，得到顶点序列 v1, v2, ..., vn
2  for each vertex v
3      s[v] ← -∞
4  s[source] ← 0
5  for i ← 1 to n
6      for each edge (vi, v) in G
7          if s[vi] + weight(vi, v) > s[v]
8              s[v] ← s[vi] + weight(vi, v)
9              backtrack[v] ← vi
10 return s[sink]
```

### 生物信息学应用

| 问题 | DAG 结构 | 顶点 | 边 |
|------|---------|------|-----|
| **外显子链** | 外显子区间图 | 外显子 | 兼容连接 |
| **剪接比对** | 剪接图 | 外显子位置 | 剪接连接 |
| **肽段测序** | 谱图 | 质量值 | 氨基酸边 |

---

## 关键要点总结

<SummaryBox>
**曼哈顿游客问题的核心启示：**

1. **重叠子问题**：到达 (i,j) 的路径包含到达 (i-1,j) 或 (i,j-1) 的子路径
2. **最优子结构**：全局最优解包含局部最优子解
3. **存储复用**：用表格 s[i][j] 存储子问题解，避免指数级重复计算
4. **递推关系**：数学公式化地表达子问题间的依赖
5. **回溯指针**：记录决策过程，支持路径重构
6. **通用框架**：同一结构适用于曼哈顿游客、序列比对、DAG 最长路径等多种问题
</SummaryBox>

---

## 思考问题

1. **边界条件**：为什么第一行和第一列需要特殊初始化？

2. **空间优化**：如果只关心最优得分而不关心路径，空间复杂度能否优化到 O(min(n,m))？

3. **局部比对**：为什么局部比对允许负分重置为 0，而全局比对不允许？

4. **多重路径**：如果存在多条最优路径，如何修改算法来找出所有？

5. **仿射间隙**：如何在网格模型中表达"开启间隙"和"延伸间隙"的不同代价？

---

<RelatedLinks
  links={[
    {
      title: '动态规划基础',
      to: '/docs/foundations/dynamic-programming-basics',
      description: 'DP 的核心思想和递推关系设计。',
    },
    {
      title: '全局比对与 Needleman-Wunsch',
      to: '/docs/alignment/needleman-wunsch',
      description: 'DP 在全局序列比对中的应用。',
    },
    {
      title: '局部比对与 Smith-Waterman',
      to: '/docs/alignment/smith-waterman',
      description: '允许子序列比对的 DP 变体。',
    },
    {
      title: '半全局比对',
      to: '/docs/alignment/semi-global-alignment',
      description: '忽略末端间隙的 DP 策略。',
    },
    {
      title: '基因预测中的外显子链',
      to: '/docs/models/gene-prediction',
      description: 'DAG 上 DP 在基因预测中的应用。',
    },
  ]}
/>
