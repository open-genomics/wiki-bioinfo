---
sidebar_position: 15
description: 半全局比对详解：理解如何处理序列端部的gap，适用于read mapping和重叠检测等场景。
pagination_label: 半全局比对
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# 半全局比对

<SummaryBox
  summary="半全局比对允许序列端部存在gap，是理解read mapping和重叠检测等场景的关键算法，介于全局比对和局部比对之间。"
  bullets={[
    '重点理解半全局比对的边界条件如何与全局比对不同',
    '半全局比对在很多实际工具中是比全局比对更实用的选择',
  ]}
/>

## 是什么

半全局比对（semi-global alignment）是序列比对的一种变体，它允许序列的端部（开头或结尾）存在gap而不产生罚分。

与全局比对不同：
- **全局比对**：要求两条序列从开头到结尾完全对齐，端部gap也要罚分
- **局部比对**：只寻找最优的局部相似片段
- **半全局比对**：允许序列端部有gap，但内部gap仍需罚分

## 为什么重要

在生物信息学中，半全局比对的价值体现在：

- **Read mapping**：reads通常比参考序列短，read的端部不需要与参考序列的端部对齐
- **重叠检测**：在组装中检测reads之间的重叠时，reads的端部可能有未覆盖区域
- **序列拼接**：当两条序列有部分重叠时，半全局比对能更好地识别重叠区域
- **实际工具**：很多现代mapper的局部比对阶段使用了半全局比对的思想

## 核心思想

### 与全局比对的差异

全局比对要求两条序列完全对齐：

```
全局比对：
S1: A T G C T A G
S2: - T G C - A G
    ^ 开头gap要罚分

S1: A T G C T A G
S2: A T G C T A -
                    ^ 结尾gap要罚分
```

半全局比对允许端部gap不罚分：

```
半全局比对：
S1: A T G C T A G
S2: - T G C - A G
    ^ 开头gap不罚分

S1: A T G C T A G
S2: A T G C T A -
                    ^ 结尾gap不罚分
```

### 三种半全局比对变体

根据允许端部gap的位置，半全局比对有三种常见变体：

1. **允许S1开头gap**：适用于S1是S2的子序列情况
2. **允许S2开头gap**：适用于S2是S1的子序列情况
3. **允许两端gap**：适用于检测重叠情况

## 数学模型

<DefinitionList
  items={[
    {
      term: '状态定义',
      definition: '与全局比对相同，`dp[i][j]`表示S1前i个字符与S2前j个字符的最优比对得分。',
    },
    {
      term: '边界条件',
      definition: '与全局比对不同，某些边界条件设为0而非线性递增。',
    },
    {
      term: '最优解',
      definition: '根据具体变体，可能在最后一行、最后一列或矩阵中寻找最大值。',
    },
  ]}
/>

### 基本递推关系

递推关系与全局比对相同：

$$
  dp[i][j] = \max
  \begin{cases}
    dp[i-1][j-1] + s(x_i, y_j) & \text{匹配或替换} \\
    dp[i-1][j] + g & \text{S1插入gap} \\
    dp[i][j-1] + g & \text{S2插入gap}
  \end{cases}
$$

其中：
- $s(x_i, y_j)$ 是替换得分
- $g$ 是gap罚分

### 边界条件

不同变体的边界条件不同：

#### 变体1：允许S1开头gap

$$
\begin{aligned}
  dp[0][j] &= 0 \quad \text{（S1开头gap不罚分）} \\
  dp[i][0] &= i \cdot g \quad \text{（S2开头gap要罚分）}
\end{aligned}
$$

#### 变体2：允许S2开头gap

$$
\begin{aligned}
  dp[0][j] &= j \cdot g \quad \text{（S1开头gap要罚分）} \\
  dp[i][0] &= 0 \quad \text{（S2开头gap不罚分）}
\end{aligned}
$$

#### 变体3：允许两端gap

$$
\begin{aligned}
  dp[0][j] &= 0 \quad \text{（S1开头gap不罚分）} \\
  dp[i][0] &= 0 \quad \text{（S2开头gap不罚分）}
\end{aligned}
$$

### 最优解位置

根据变体不同，最优解的位置也不同：

- **变体1**：在最后一行 `dp[m][j]` 中寻找最大值
- **变体2**：在最后一列 `dp[i][n]` 中寻找最大值
- **变体3**：在最后一行或最后一列中寻找最大值

## 算法描述

**算法1：半全局比对（允许两端gap）**

```
输入：序列 S1 = x_1x_2...x_m，S2 = y_1y_2...y_n，替换得分函数 s，gap罚分 g
输出：最优比对得分

1. 初始化 dp[m+1][n+1]
2. // 边界条件：两端gap不罚分
3. for i = 0 to m:
   dp[i][0] = 0
4. for j = 0 to n:
   dp[0][j] = 0
5. // 填充动态规划矩阵
6. for i = 1 to m:
   for j = 1 to n:
     dp[i][j] = max(
       dp[i-1][j-1] + s(x_i, y_j),
       dp[i-1][j] + g,
       dp[i][j-1] + g
     )
7. // 在最后一行和最后一列中寻找最大值
8. best_score = max(max(dp[m][j] for j in 0..n), max(dp[i][n] for i in 0..m))
9. return best_score
```

**时间复杂度**：$O(mn)$

**空间复杂度**：$O(mn)$（可优化到 $O(\min(m,n))$）

## worked example

考虑序列 `S1 = "ATGCC"` 和 `S2 = "TGCCG"`，使用简单得分：
- 匹配：+1
- 失配：-1
- gap：-2

使用允许两端gap的半全局比对：

### 边界条件

```
      ε  T  G  C  C  G
ε     0  0  0  0  0  0
A     0
T     0
G     0
C     0
C     0
```

### 填充矩阵

```
      ε  T  G  C  C  G
ε     0  0  0  0  0  0
A     0 -1 -2 -3 -4 -5
T     0  1 -1 -2 -3 -4
G     0 -1  2  0 -1 -2
C     0 -2  0  3  1 -1
C     0 -3 -1  1  4  2
```

### 寻找最优解

在最后一行和最后一列中寻找最大值：
- 最后一行：`[0, -3, -1, 1, 4, 2]`，最大值为4
- 最后一列：`[0, -5, -4, -2, -1, 2]`，最大值为2

最优得分为4。

对应的比对为：

```
S1: A T G C C
S2: - T G C C
```

S1开头的'A'不与任何字符对齐（端部gap不罚分）。

## 应用场景

### Read Mapping

当将read比对到参考基因组时：
- read通常比参考序列短
- read的端部不需要与参考序列的端部对齐
- 使用半全局比对可以避免read端部的不必要罚分

### 重叠检测

在组装中检测reads之间的重叠：
- 两条read可能有部分重叠
- 非重叠部分应该在端部
- 半全局比对能更好地识别重叠区域

### 序列拼接

当拼接两条有重叠的序列时：
- 重叠区域应该对齐
- 非重叠的端部不需要对齐
- 半全局比对提供了合适的模型

## 与全局/局部比对的关系

| 比对类型 | 端部gap处理 | 典型应用 |
|---------|------------|---------|
| 全局比对 | 端部gap要罚分 | 比较两条完整序列 |
| 局部比对 | 可以从任意位置开始/结束 | 寻找相似片段 |
| 半全局比对 | 端部gap不罚分 | read mapping、重叠检测 |

半全局比对可以看作：
- **全局比对的推广**：放宽了端部gap的限制
- **局部比对的特例**：限制了比对必须覆盖至少一条序列的大部分

## 复杂度优化

### 空间优化

与全局比对类似，可以使用滚动数组将空间复杂度从 $O(mn)$ 降低到 $O(\min(m,n))$。

### 带状半全局比对

如果两条序列预期高度相似，可以使用带状动态规划，将复杂度降低到 $O(k \cdot \min(m,n))$，其中 $k$ 是带宽。

## 常见误区

### 半全局比对就是局部比对

不是。局部比对可以从序列的任意位置开始和结束，而半全局比对仍然要求至少覆盖一条序列的大部分。

### 半全局比对总是比全局比对好

不是。选择哪种比对方式取决于具体任务：
- 如果两条序列长度相近且需要完全比较，全局比对更合适
- 如果一条序列明显较短或只需要寻找重叠，半全局比对更合适

### 半全局比对的端部gap完全不罚分

这取决于具体实现。有些变体只允许一端gap不罚分，有些允许两端。需要根据具体应用选择合适的变体。

## 参考资料

- Durbin, R., et al. *Biological Sequence Analysis*
- Gusfield, D. *Algorithms on Strings, Trees, and Sequences*
- Pearson, W. R., & Miller, W. (1992). "Dynamic programming algorithms for biological sequence comparison"

## 相关页面

- [全局比对与局部比对](./global-local.md)
- [编辑距离](./edit-distance.md)
- [Needleman-Wunsch算法](./needleman-wunsch.md)
- [Smith-Waterman算法](./smith-waterman.md)
- [BWA与minimap2](./bwa-minimap2.md)
