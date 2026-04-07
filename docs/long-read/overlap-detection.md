---
sidebar_position: 5
description: 重叠检测算法的详细实现，包括 Minimap 的 minimizer 采样、MHAP 的 MinHash 和完整 worked example。
pagination_label: 重叠检测算法
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# 重叠检测算法

<SummaryBox
  summary="重叠检测是长读长组装的核心第一步：它从海量 reads 中高效找到可能拼接的 read 对，为后续的布局和共识构建基础。"
  bullets={[
    '核心挑战是 O(n²) 的全对全比较，必须通过索引和启发式方法降维',
    'Minimap 的 minimizer 和 MHAP 的 MinHash 是两种主流降维策略',
  ]}
/>

## 是什么

重叠检测算法解决以下问题：

> 给定 N 条长 reads，找出所有满足重叠长度和相似度阈值的 read 对。

对于长读长数据，直接进行全对全比对的时间复杂度是 O(n²)，对于百万级 reads 不可行。因此，现代算法通过降维、索引和启发式搜索将复杂度降低到近线性。

## 要解决什么生物信息学问题

在实际生物信息学应用中，重叠检测适合的场景包括：

- **de novo 组装**：构建 read-read overlap 图作为组装起点
- **纠错**：通过重叠区域的共识提高单条 read 质量
- **haplotype phasing**：识别来自同一单倍型的 reads
- **重复区域解析**：通过长跨度 overlap 穿越重复序列

## 数学模型

### 问题形式化

设 reads 集合为 $R = \{r_1, r_2, \ldots, r_n\}$，每条 read $r_i$ 是长度为 $L_i$ 的字符串。

定义 read $r_i$ 和 read $r_j$ 的重叠满足：

1. **重叠长度** ≥ L_min（如 1 kb）
2. **相似度** ≥ S_min（如 90%）
3. **方向一致性**（同向或反向互补）

### 目标

找到所有满足条件的 read 对 $(i, j)$，使得 $overlap(r_i, r_j)$ 为真。

## Minimap 算法

Minimap 是当前最广泛使用的长读长比对和重叠检测工具，其核心是 **minimizer 采样**。

### Minimizer

给定序列 S、窗口大小 w 和 k-mer 大小 k，minimizer 定义为：

对于每个窗口 S[i:i+w]，计算该窗口内所有 k-mer 的哈希值，选择哈希值最小的 k-mer 作为该窗口的 minimizer。

$$
\text{minimizer}(S[i:i+w]) = \arg\min_{j \in [i, i+w-k+1]} \text{hash}(S[j:j+k])
$$

### 索引构建

1. 对每条 read 提取所有 minimizers
2. 构建 minimizer → (read_id, position) 的倒排索引
3. 共享 minimizer 的 read 对作为候选

### 过滤与验证

1. **共线性检查**：候选 read 对的 minimizer 位置应呈线性关系
2. **局部比对**：对通过过滤的候选进行精确比对验证
3. **阈值筛选**：保留满足长度和相似度要求的重叠

## MHAP 算法

MHAP（MinHash Alignment Protocol）使用 **MinHash** 签名估计 Jaccard 相似度。

### MinHash 原理

对于集合 A 和 B，Jaccard 相似度定义为：

$$
J(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

MinHash 是一种概率估计方法：

1. 对每条 read 的所有 k-mer 计算哈希值
2. 选择最小的 h 个哈希值作为签名
3. 两个签名共享的最小哈希值比例近似 Jaccard 相似度

$$
\hat{J}(A, B) \approx \frac{|\text{signature}(A) \cap \text{signature}(B)|}{h}
$$

### 算法步骤

1. **签名生成**：每条 read 生成 MinHash 签名
2. **候选筛选**：签名相似度 > 阈值的 read 对进入候选
3. **精确验证**：对候选进行局部比对确认重叠

## 算法步骤

### Minimap 流程

#### 步骤 1：参数设置

- k-mer 大小 k（通常 15-21）
- 窗口大小 w（通常 10-20）
- 最小重叠长度 L_min
- 最小相似度 S_min

#### 步骤 2：Minimizer 提取

对每条 read r：

```python
for i in range(0, len(r) - w + 1):
    window = r[i:i+w]
    min_hash = min(hash(window[j:j+k]) for j in range(w - k + 1))
    minimizers.append((min_hash, i))
```

#### 步骤 3：索引构建

构建哈希表：minimizer_hash → [(read_id, position), ...]

#### 步骤 4：候选识别

遍历索引，共享至少 t 个 minimizers 的 read 对作为候选。

#### 步骤 5：共线性检查

对于候选 (rᵢ, rⱼ)：

1. 提取共享 minimizers 的位置列表 Pᵢ, Pⱼ
2. 检查 (Pᵢ, Pⱼ) 是否近似线性（通过线性回归或斜率一致性）

#### 步骤 6：精确验证

对通过检查的候选进行局部动态规划比对，计算：

- 重叠长度 L
- 相似度 S = (匹配数) / (对齐长度)
- 如果 L ≥ L_min 且 S ≥ S_min，保留该重叠

## Worked Example

### Minimap 示例

考虑两条 reads：

- r₁ = `ACGTACGTACGT`（长度 12）
- r₂ = `CGTACGTACGTA`（长度 12）

参数：k = 3, w = 5

#### 步骤 1：提取 minimizers

对于 r₁：

窗口和对应的 k-mers：

- 窗口 [0:5] = `ACGTA`：k-mers 为 ACG, CGT, GTA, TAC
  - hash(ACG) = 100, hash(CGT) = 50, hash(GTA) = 80, hash(TAC) = 120
  - minimizer = CGT（hash=50），位置 1

- 窗口 [1:6] = `CGTAC`：k-mers 为 CGT, GTA, TAC, ACG
  - hash(CGT) = 50, hash(GTA) = 80, hash(TAC) = 120, hash(ACG) = 100
  - minimizer = CGT（hash=50），位置 1

- 窗口 [2:7] = `GTACG`：k-mers 为 GTA, TAC, ACG, CGT
  - hash(GTA) = 80, hash(TAC) = 120, hash(ACG) = 100, hash(CGT) = 50
  - minimizer = CGT（hash=50），位置 4

- 窗口 [3:8] = `TACGT`：k-mers 为 TAC, ACG, CGT, GTA
  - hash(TAC) = 120, hash(ACG) = 100, hash(CGT) = 50, hash(GTA) = 80
  - minimizer = CGT（hash=50），位置 5

- 窗口 [4:9] = `ACGTA`：同窗口 0
  - minimizer = CGT（hash=50），位置 5

- 窗口 [5:10] = `CGTAC`：同窗口 1
  - minimizer = CGT（hash=50），位置 6

- 窗口 [6:11] = `GTACG`：同窗口 2
  - minimizer = CGT（hash=50），位置 7

r₁ 的 minimizers（去重后）：[(CGT, 1), (CGT, 4), (CGT, 5), (CGT, 6), (CGT, 7)]

对于 r₂（类似分析）：
r₂ 的 minimizers：[(CGT, 0), (CGT, 3), (CGT, 4), (CGT, 5), (CGT, 6)]

#### 步骤 2：共享 minimizer 检测

r₁ 和 r₂ 共享 minimizer CGT，因此是候选对。

#### 步骤 3：共线性检查

共享 minimizer 位置：
- r₁: [1, 4, 5, 6, 7]
- r₂: [0, 3, 4, 5, 6]

计算斜率：位置差大致为 1，呈线性关系，通过检查。

#### 步骤 4：精确比对

进行局部比对：

```
r₁: ACGTACGTACGT
r₂:  CGTACGTACGTA
```

比对结果：
- 重叠长度：11
- 匹配数：10
- 相似度：10/11 ≈ 90.9%

如果 L_min = 10, S_min = 90%，则保留该重叠。

## 复杂度分析

### Minimap

#### 时间复杂度

- Minimizer 提取：O(N · L)，N 为 read 数，L 为平均 read 长度
- 索引构建：O(N · L/w)，w 为窗口大小
- 候选识别：O(M · d)，M 为 minimizer 数，d 为平均倒排列表长度
- 精确验证：O(C · L)，C 为候选对数

总时间复杂度：O(N · L + C · L)

在实际情况中，$C \ll N^2$，因此接近线性。

#### 空间复杂度

- 存储 minimizers：O(N · L/w)
- 倒排索引：O(N · L/w)

总空间复杂度：O(N · L/w)

### MHAP

#### 时间复杂度

- 签名生成：O(N · L · k)，k 为 k-mer 大小
- 候选筛选：O(N · h · log N)，h 为签名大小
- 精确验证：O(C · L)

总时间复杂度：O(N · L · k + C · L)

#### 空间复杂度

- 存储签名：O(N · h)

总空间复杂度：O(N · h)

## 与真实工具或流程的连接

### Minimap2

Minimap2 是当前最流行的长读长比对工具，它扩展了原始 Minimap：

- **多种模式**：mapping、overlap、assembly
- **种子策略**：支持 minimizer 和其他索引
- **链式比对**：高效的 seed-chain-align 流程
- **适配性**：自动调整参数适应不同数据类型

### 应用场景

- **Canu 组装器**：使用 Minimap 进行重叠检测
- **Flye 组装器**：使用 Minimap 进行 read 比对
- **纠错工具**：Racon、Medaka 等依赖 Minimap 的重叠信息
- **SV 检测**：Sniffles2 等使用 Minimap2 进行 read 比对

## 常见误区

### Minimizer 越多越好

不是。过多的 minimizer 会增加索引大小和候选对数，反而降低效率。需要根据数据特征调整窗口大小。

### 相似度阈值越高越好

不是。过高的阈值会遗漏真实重叠，特别是对于高错误率的数据。需要平衡敏感性和特异性。

### MinHash 和 Minimap 互斥

不是。两种方法可以结合使用，MinHash 用于粗筛，Minimap 用于精确验证。

### 重叠检测只用于组装

不是。重叠检测还用于纠错、phasing、质量控制等多种场景。

## 算法优化

### 并行化

- **分布式索引**：将 reads 分片，并行构建索引
- **GPU 加速**：利用 GPU 并行计算 minimizer 哈希
- **多线程验证**：并行进行候选对的精确比对

### 内存优化

- **压缩索引**：使用压缩编码存储 minimizer
- **分批处理**：将大数据集分批处理
- **磁盘溢出**：当内存不足时使用磁盘存储部分索引

### 启发式优化

- **自适应窗口**：根据 GC 含量调整窗口大小
- **质量过滤**：先过滤低质量 reads 减少计算量
- **层级筛选**：多级阈值逐步筛选候选

## 参考资料

- Li, H. (2018). Minimap2: pairwise alignment for nucleotide sequences. *Bioinformatics*, 34(18), 3094-3100.
- Berlin, K., et al. (2015). Assembling large genomes with single-molecule sequencing and locality-sensitive hashing. *Nature biotechnology*, 33(6), 623-630.
- Roberts, M., et al. (2004). Reducing storage requirements for biological sequence comparison. *Bioinformatics*, 20(18), 3363-3369.

## 相关页面

- [长读长组装](./long-read-assembly.md)
- [Minimap2 比对算法](./minimap2-alignment.md)
- [consensus 算法](./consensus-algorithm.md)
- [序列比对基础](../alignment/index.md)
