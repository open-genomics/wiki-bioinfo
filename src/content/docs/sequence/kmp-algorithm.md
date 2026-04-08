---
description: KMP算法详解：通过failure function避免重复比较，理解线性时间字符串匹配的核心思想。
title: "KMP算法"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';


<SummaryBox
  summary="KMP算法通过预处理模式串构建failure function，在失配时避免无谓的重复比较，是理解线性时间字符串匹配的经典算法。"
  bullets={[
    '重点理解failure function如何利用模式串自身的重复结构',
    'KMP不是生物信息学工具的完整实现，但很多索引和匹配算法的思想源头',
  ]}
/>

## 是什么

Knuth-Morris-Pratt（KMP）算法解决的是经典的精确字符串匹配问题：

> 给定文本 `T` 和模式串 `P`，在 `T` 中找出所有与 `P` 完全相同的出现位置。

与朴素扫描不同，KMP的关键创新是：当发生失配时，不是简单地回退到下一个位置重新开始，而是利用已经匹配过的信息，跳过那些肯定不会匹配的位置。

## 为什么重要

在生物信息学中，KMP的价值主要体现在：

- **算法直觉**：它展示了如何通过预处理避免重复计算，这是很多高级索引结构的共同思想
- **线性时间**：从 $O(mn)$ 优化到 $O(m+n)$，证明了字符串匹配可以在线性时间内完成
- **failure function**：这个概念在后续的Aho-Corasick、suffix automaton等算法中都有延伸

虽然现代生物信息学工具很少直接使用KMP，但它的核心思想——利用模式串自身结构避免重复比较——是理解整个字符串算法家族的关键。

## 核心思想

### 朴素扫描的问题

考虑在文本 `T = "ABABABAB..."` 中匹配模式串 `P = "ABABC"`：

```
T: A B A B A B A B ...
P: A B A B C
      ^ 失配
```

朴素扫描会：
1. 从位置0开始，匹配到第4个字符时失配（C vs B）
2. 回退到位置1重新开始
3. 重复比较前面已经匹配过的"ABAB"

问题是：我们已经知道位置1-3是"ABA"，但朴素方法没有利用这个信息。

### KMP的洞察

KMP的关键观察是：当在位置 `i` 失配时，我们已经知道 `T[i-j:i]` 与 `P[0:j]` 完全匹配。如果 `P` 的某个前缀同时也是这个匹配后缀的后缀，我们就可以利用这个信息跳过一些位置。

具体来说，如果 `P[0:j]` 的某个真前缀等于它的后缀，那么我们可以直接跳到下一个可能匹配的位置，而无需重新比较。

## Failure Function

<DefinitionList
  items={[
    {
      term: 'failure function `π[i]`',
      definition: '表示模式串 `P` 的前缀 `P[0:i]` 的最长真前缀同时也是该前缀后缀的长度。',
    },
    {
      term: '真前缀',
      definition: '不等于整个字符串的前缀。',
    },
    {
      term: '失配时跳转',
      definition: '当在位置 `i` 失配时，模式串跳转到 `π[i-1]` 位置继续比较。',
    },
  ]}
/>

### 数学定义

对于模式串 `P = p_0p_1...p_{m-1}`，定义 `π[i]` 为：

$$
\pi[i] = \max\{k < i \mid P[0:k] = P[i-k:i]\}
$$

即：`P[0:i]` 的最长真前缀同时也是该前缀后缀的长度。

### 计算failure function

**算法1：计算failure function**

```
输入：模式串 P = p_0p_1...p_{m-1}
输出：failure function π[0:m]

1. π[0] = 0
2. j = 0
3. for i = 1 to m-1:
   a. while j > 0 and P[i] ≠ P[j]:
      j = π[j-1]
   b. if P[i] == P[j]:
      j = j + 1
   c. π[i] = j
4. return π
```

**时间复杂度**：$O(m)$

**空间复杂度**：$O(m)$

### worked example

考虑模式串 `P = "ABABC"`：

| i | P[i] | j (匹配长度) | π[i] |
|---|------|-------------|------|
| 0 | A    | 0           | 0    |
| 1 | B    | 0 → 1       | 1    |
| 2 | A    | 1 → 0 → 1   | 1    |
| 3 | B    | 1 → 2       | 2    |
| 4 | C    | 2 → 0       | 0    |

得到的failure function为：`π = [0, 1, 1, 2, 0]`

## KMP匹配算法

**算法2：KMP字符串匹配**

```
输入：文本 T = t_0t_1...t_{n-1}，模式串 P = p_0p_1...p_{m-1}
输出：所有匹配位置

1. 预处理：计算failure function π
2. j = 0  // 模式串中的当前匹配位置
3. for i = 0 to n-1:
   a. while j > 0 and T[i] ≠ P[j]:
      j = π[j-1]  // 失配时跳转
   b. if T[i] == P[j]:
      j = j + 1
   c. if j == m:
      // 找到完整匹配
      输出匹配位置 i - m + 1
      j = π[j-1]  // 继续寻找下一个匹配
```

**时间复杂度**：$O(n + m)$

**空间复杂度**：$O(m)$

### worked example

在文本 `T = "ABABABABC"` 中匹配 `P = "ABABC"`：

```
T: A B A B A B A B C
P: A B A B C
   ^ 匹配 j=0→1

T: A B A B A B A B C
P:   A B A B C
     ^ 匹配 j=1→2

T: A B A B A B A B C
P:     A B A B C
       ^ 匹配 j=2→3

T: A B A B A B A B C
P:       A B A B C
         ^ 匹配 j=3→4

T: A B A B A B A B C
P:         A B A B C
           ^ 失配，j = π[3] = 2

T: A B A B A B A B C
P:         A B A B C
             ^ 失配，j = π[1] = 1

T: A B A B A B A B C
P:           A B A B C
               ^ 匹配 j=1→2

...继续...
```

最终在位置4找到匹配：`"ABABC"`

## 复杂度分析

### 时间复杂度

- **预处理**：计算failure function需要 $O(m)$ 时间
- **匹配**：主循环中，文本指针 `i` 只向前移动，模式串指针 `j` 通过failure function跳转，总的比较次数不超过 $2n$
- **总体**：$O(n + m)$

### 为什么是线性时间

关键在于：
- 文本指针 `i` 在外层循环中只增不减
- 模式串指针 `j` 通过failure function跳转，但每次跳转都会让 `j` 减小
- `j` 的总增加次数不超过 $n$，总减少次数也不超过 $n$
- 因此总操作次数是 $O(n)$

## 与其他算法的比较

| 算法 | 预处理时间 | 匹配时间 | 空间 | 特点 |
|------|-----------|---------|------|------|
| 朴素扫描 | $O(1)$ | $O(mn)$ | $O(1)$ | 简单但慢 |
| KMP | $O(m)$ | $O(n+m)$ | $O(m)$ | 最坏情况线性，适合多次匹配同一模式 |
| Boyer-Moore | $O(m+|\Sigma|)$ | $O(n/m)$ 平均 | $O(|\Sigma|)$ | 实际中通常最快，适合大字母表 |
| Rabin-Karp | $O(m)$ | $O(n+m)$ 平均 | $O(1)$ | 哈希方法，适合多模式匹配 |

## 在生物信息学中的位置

KMP本身在现代生物信息学工具中不常直接使用，但：

- **思想传承**：Aho-Corasick算法（多模式匹配）扩展了failure function的思想
- **索引基础**：suffix automaton、suffix array等高级结构都利用了类似的预处理思想
- **教学价值**：是理解"如何避免重复计算"的经典案例

在实际的生物序列搜索中，更常见的是：
- 基于k-mer的索引（如BWA、minimap2）
- 基于后缀的索引（如FM-index）
- 这些方法在预处理阶段构建复杂索引，查询时达到亚线性时间

## 常见误区

### KMP总是最快的

不是。在实际应用中：
- Boyer-Moore在大多数情况下更快
- 基于索引的方法（如FM-index）在多次查询时优势明显
- KMP的价值在于理论保证和教学意义

### failure function就是模式串的重复结构

不完全是。failure function捕捉的是"前缀同时也是后缀"的结构，但不是所有重复结构都能被failure function充分利用。

### KMP可以直接用于近似匹配

不能。KMP是精确匹配算法。要处理近似匹配（允许mismatch、gap），需要其他方法如动态规划、seed-and-extend等。

## 参考资料

- Knuth, D. E., Morris, J. H., & Pratt, V. R. (1977). "Fast pattern matching in strings"
- Cormen, T. H., et al. *Introduction to Algorithms*, Chapter 32
- Gusfield, D. *Algorithms on Strings, Trees, and Sequences*

## 相关页面

- [精确字符串匹配](./exact-string-matching.md)
- [Trie与多模式匹配](./trie-and-multi-pattern-matching.md)
- [Boyer-Moore算法](./boyer-moore-algorithm.md)
- [索引结构概览](./indexing.md)
