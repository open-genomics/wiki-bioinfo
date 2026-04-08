---
description: motif discovery 的典型算法路线：从穷举到随机化搜索与 Gibbs sampling，包括详细算法伪ocode和 worked examples。
title: "Motif discovery 的算法路线"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';


<SummaryBox
  summary="Motif discovery 算法解决的是在未知 motif 模式和位置的情况下，从一组序列中找出统计显著的局部模式。主要算法包括穷举、贪心、随机化搜索和 Gibbs sampling。"
  bullets={[
    '核心挑战是搜索空间指数增长，需要启发式方法',
    'Gibbs sampling 是最实用的方法之一，通过概率采样避免局部最优',
    'EM 算法（如 MEME）是另一种常用方法，用期望最大化估计参数'
  ]}
/>

## 是什么

在 `motif-finding.md` 里，我们把 motif 理解为“带有统计偏好的局部模式”。

而 **motif discovery** 要回答的是更进一步的问题：

> 当 motif 本身并不知道、位置也不知道时，如何从一组序列中把它“找出来”？

这使问题从“给定模型去扫描”变成了“从数据里反推模型”。

## 为什么这是一个难问题

motif discovery 很难，原因在于：

- motif 很短；
- 每条序列里 motif 出现的位置未知；
- motif 允许变异，不是固定字符串；
- 背景噪声大，短片段随机匹配很常见；
- 搜索空间指数增长。

因此，这类问题往往很难用纯粹的精确算法彻底求解，实际中经常结合：

- 穷举作为基线；
- 贪心/profile 方法；
- 随机化搜索；
- Gibbs sampling 等启发式。

## 1. 穷举搜索：概念上的基线

最直接的想法是：

- 枚举所有可能的 motif 候选；
- 在所有序列中寻找与其最匹配的位置；
- 选择总体得分最高的方案。

优点：

- 概念简单；
- 能作为“理论最直接”的基线；

缺点：

- 搜索空间太大；
- motif 越长、序列越多，代价越不可承受。

这也是为什么 motif discovery 常被拿来说明：

- bioinformatics 里的很多问题从定义上并不难理解；
- 真正困难的是计算复杂度。

**算法1：穷举搜索**

```
输入：序列集合 S = {s₁, ..., s_N}，motif 长度 L
输出：最优 motif PWM M

1. best_score = -∞, best_PWM = null
2. for each 序列 s_i:
     for each 起始位置 p in s_i (1 to |s_i| - L + 1):
        candidate = s_i[p:p+L-1]
        // 在所有序列中寻找最佳匹配位置
        positions = []
        for each 序列 s_j:
           best_pos = argmax_q score(candidate, s_j[q:q+L-1])
           positions.append(best_pos)
        // 构建 PWM
        PWM = build_PWM(S, positions, L)
        // 评估得分
        current_score = evaluate_score(S, PWM, positions)
        if current_score > best_score:
           best_score = current_score
           best_PWM = PWM
3. return best_PWM
```

**时间复杂度**：O(N · |s| · N · L · L) = O(N² · |s| · L²)，对于实际问题不可行

## 2. 贪心 / profile-style heuristic

一种常见思路是：

1. 先在部分序列中选定一个初始 motif 候选；
2. 根据当前候选构建 profile（PFM/PWM）；
3. 在下一条序列中选与 profile 最匹配的位置；
4. 持续更新 profile，直到所有序列都纳入；
5. 得到一个整体 motif 模型。

这种方法的优点是：

- 速度快；
- 容易解释；
- 很适合形成一个“逐步收敛”的教学例子；

缺点是：

- 对初始选择敏感；
- 容易陷入局部最优；
- 如果早期 profile 建偏了，后续会不断强化错误方向。

**算法2：贪心算法**

```
输入：序列集合 S，motif 长度 L
输出：motif PWM M

1. 随机选择第一条序列的某个位置作为初始 motif
2. positions = [初始位置]
3. for i = 2 to N:
     // 基于当前已选位置构建 PWM
     PWM = build_PWM(S[1:i-1], positions[1:i-1], L)
     // 在序列 s_i 中找最佳匹配位置
     best_pos = argmax_p PWM.score(s_i[p:p+L-1])
     positions.append(best_pos)
4. return build_PWM(S, positions, L)
```

**时间复杂度**：O(N · |s| · L)

## 3. Randomized motif search

随机化方法的基本想法是：

- 不把第一次选到的 motif 当作最终答案；
- 多次随机初始化 motif 位置；
- 每次从这些位置构建 profile，再迭代更新；
- 最后保留得分最好的结果。

这样做的目的，是用多次随机重启来缓解局部最优问题。

直观上可以理解为：

- 贪心方法像“沿着当前感觉最好的方向一直走”；
- randomized motif search 则像“从多个不同起点反复尝试，再选最优的一条路”。

**算法3：随机化 motif search**

```
输入：序列集合 S，motif 长度 L，迭代次数 R
输出：最优 motif PWM M

1. best_PWM = null, best_score = -∞
2. for r = 1 to R:
     // 随机初始化
     positions = [random position in s_i for each s_i]
     PWM = build_PWM(S, positions, L)
     // 迭代改进
     repeat:
        improved = false
        for i = 1 to N:
           // 暂时移除序列 i
           temp_positions = positions without i
           temp_PWM = build_PWM(S without s_i, temp_positions, L)
           // 在序列 i 中找最佳位置
           new_pos = argmax_p temp_PWM.score(s_i[p:p+L-1])
           if new_pos != positions[i]:
              positions[i] = new_pos
              improved = true
        PWM = build_PWM(S, positions, L)
     until not improved
     // 评估当前结果
     current_score = evaluate_score(S, PWM, positions)
     if current_score > best_score:
        best_score = current_score
        best_PWM = PWM
3. return best_PWM
```

**时间复杂度**：O(R · N · I · |s| · L)，I 是每次迭代的平均改进轮数

## 4. Gibbs sampling 的直觉

Gibbs sampling 是 motif discovery 中很经典的一类随机化方法。

一个直观过程可以写成：

1. 先为每条序列随机选一个 motif 位置；
2. 暂时拿掉其中一条序列；
3. 用剩下的序列构建一个 profile；
4. 在被拿掉的序列中，根据 profile 对所有可能位置分配概率；
5. 按这个概率重新抽样一个位置；
6. 重复迭代。

与纯贪心不同，这里不是每次都选“当前最优”，而是：

- 高分位置更可能被选中；
- 但低一点的分数也不是完全没机会；

这让算法有机会跳出局部最优。

**算法4：Gibbs sampling**

```
输入：序列集合 S，motif 长度 L，迭代次数 I
输出：motif PWM M

1. // 随机初始化
2. positions = [random position in s_i for each s_i]
3. for iter = 1 to I:
     // 随机选择一条序列
     i = random integer from 1 to N
     // 暂时移除序列 i，构建 profile
     temp_positions = positions without i
     PWM = build_PWM(S without s_i, temp_positions, L)
     // 计算序列 s_i 中每个位置的概率
     for p = 1 to (|s_i| - L + 1):
        prob[p] = PWM.score(s_i[p:p+L-1])
     // 归一化概率
     prob = prob / sum(prob)
     // 按概率采样新位置
     new_pos = sample from distribution prob
     positions[i] = new_pos
4. return build_PWM(S, positions, L)
```

**时间复杂度**：O(I · |s| · L)

## Worked Example

### 示例数据

假设我们有 3 条序列，寻找长度 L = 3 的 motif：

```
序列 1: A T G C A T G C
序列 2: G T A C G T A C
序列 3: T A G C T A G C
```

### 贪心算法演示

**步骤 1：初始化**
- 随机选择序列 1 的位置 1：`ATG`
- positions = [1]

**步骤 2：处理序列 2**
- 基于 `ATG` 构建 PWM（简化：每个位置只出现一种字符）
- PWM:
  - 位置 1: A=1.0
  - 位置 2: T=1.0
  - 位置 3: G=1.0
- 在序列 2 中扫描：
  - 位置 1 `GTA`: score = 0 (G≠A, T=T, A≠G)
  - 位置 2 `TAC`: score = 0 (T≠A, A≠T, C≠G)
  - 位置 3 `ACG`: score = 1 (A=A, C≠T, G=G)
  - 位置 4 `CGT`: score = 1 (C≠A, G≠T, T≠G)
  - 位置 5 `GTA`: score = 0
  - 位置 6 `TAC`: score = 0
- 选择最佳位置 3 `ACG`（得分 1）
- positions = [1, 3]

**步骤 3：处理序列 3**
- 基于位置 [1, 3] 构建更新后的 PWM：
  - 序列 1 位置 1: `ATG`
  - 序列 2 位置 3: `ACG`
  - PFM:
    - 位置 1: A=2
    - 位置 2: T=1, C=1
    - 位置 3: G=2
  - PWM（使用伪计数）:
    - 位置 1: A 高权重
    - 位置 2: T 和 C 中等权重
    - 位置 3: G 高权重
- 在序列 3 中扫描，选择最佳位置
- positions = [1, 3, best_pos]

**步骤 4：构建最终 PWM**
- 基于所有位置构建最终 PWM

### Gibbs Sampling 演示

**步骤 1：随机初始化**
- positions = [2, 5, 3]
  - 序列 1 位置 2: `TGC`
  - 序列 2 位置 5: `GTA`
  - 序列 3 位置 3: `AGC`

**步骤 2：第一次迭代**
- 随机选择序列 1
- 暂时移除序列 1，用序列 2 和 3 构建 PWM
- 在序列 1 中计算每个位置的概率分布
  - 位置 1 `ATG`: 基于 PWM 计算得分
  - 位置 2 `TGC`: 基于 PWM 计算得分
  - ...
- 归一化得到概率分布，按概率采样新位置
- 假设采样得到位置 4

**步骤 3：继续迭代**
- 重复步骤 2，每次随机选择一条序列更新位置
- 多次迭代后收敛到稳定的 motif

## 复杂度对比

| 算法 | 时间复杂度 | 优点 | 缺点 |
|------|-----------|------|------|
| 穷举 | O(N²·|s|·L²) | 保证全局最优 | 不可行 |
| 贪心 | O(N·|s|·L) | 快速 | 局部最优 |
| 随机化 | O(R·N·I·|s|·L) | 多次重启 | 可能仍局部最优 |
| Gibbs | O(I·|s|·L) | 概率采样 | 收敛速度未知 |

其中 N 是序列数，|s| 是平均序列长度，L 是 motif 长度，R 是重启次数，I 是迭代次数。

## 5. 这些方法如何与 PWM / PSSM 连接

motif discovery 的输出常常不是一句“找到了字符串 TATAAA”，而是：

- 一个 PFM；
- 一个 PWM / PSSM；
- 一个序列 logo；

也就是说，discovery 算法的本质是在“找一个好模型”，而不只是找一个短串。

之后，这个模型就可以用于：

- 扫描新的序列；
- 对候选片段打分；
- 与背景分布比较；
- 和其他实验数据结合解释。

## 6. 与真实数据分析的关系

在真实生物学场景里，motif discovery 结果通常还要结合：

- 背景碱基分布；
- 进化保守性；
- ChIP-seq / ATAC-seq 等实验信号；
- 基因表达或调控信息；

否则，高分 motif 可能只是统计上看起来“像”，但并不一定有真实生物学作用。

## 常见误区

### motif discovery 一定能给出唯一正确答案

不一定。不同初始化、不同背景模型、不同参数都可能导致不同结果。

### 找到高分 motif 就说明发现了真实调控元件

不是。它只是生成了一个候选模式，还需要上下文和实验支持。

### 随机化算法不可靠

随机化方法并不等于随意，它们往往是为了在巨大搜索空间中更有效地寻找高质量近似解。

## 相关页面

- [Motif 寻找](./motif-finding.md)
- [PWM 与 PSSM](./pwm-pssm.md)
- [隐马尔可夫模型](./hmm.md)
