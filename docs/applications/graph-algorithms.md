---
sidebar_position: 17
description: 图算法在生物信息学中的应用：从基因组组装的 de Bruijn graph 到系统发育树构建的完整图论视角。
pagination_label: 图算法
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# 图算法在生物信息学中的应用

<SummaryBox
  summary="图算法提供了一种统一的框架来理解和解决生物信息学中的复杂问题，从基因组组装到系统发育分析，图结构无处不在。"
  bullets={[
    '理解如何将生物学问题转化为图问题是关键的第一步',
    '图的类型（有向/无向、加权/无权）决定了适用的算法',
  ]}
/>

## 为什么图算法重要

生物信息学中的许多问题天然具有图结构：

- **序列关系**：reads 之间的重叠可以表示为图
- **进化关系**：物种之间的进化关系形成树状结构
- **调控网络**：基因调控网络是复杂的图结构
- **蛋白相互作用**：蛋白质相互作用网络

图算法的价值在于：

- **统一视角**：不同的问题可以用相同的图算法框架理解
- **成熟工具**：图论有丰富的理论成果和算法库
- **可视化**：图结构便于直观理解和分析
- **可扩展性**：图算法往往具有良好的并行化潜力

## 图的基本概念

### 图的表示

**邻接矩阵**：
```
    A   B   C
A [ 0   1   0 ]
B [ 1   0   1 ]
C [ 0   1   0 ]
```

**邻接表**：
```
A: [B]
B: [A, C]
C: [B]
```

**选择准则**：
- 稠密图：邻接矩阵
- 稀疏图：邻接表（生物信息学中常见）

### 图的类型

| 类型 | 特征 | 生物信息学应用 |
|-----|------|--------------|
| 无向图 | 边无方向 | 蛋白质相互作用网络 |
| 有向图 | 边有方向 | de Bruijn graph，调控网络 |
| 加权图 | 边有权重 | 序列比对得分图 |
| 树 | 无环连通图 | 系统发育树 |
| 有向无环图（DAG） | 有向无环 | 依赖关系图，贝叶斯网络 |
| 超图 | 边连接多个顶点 | 多序列比对关系 |

## 核心图算法

### 1. 图遍历（Graph Traversal）

#### 深度优先搜索（DFS）

**算法**：
```
DFS(v):
  标记 v 为已访问
  对于 v 的每个邻居 u:
    如果 u 未访问:
      DFS(u)
```

**应用**：
- 连通分量检测
- 拓扑排序
- 路径查找

**复杂度**：O(V + E)

#### 广度优先搜索（BFS）

**算法**：
```
BFS(v):
  队列 Q = [v]
  标记 v 为已访问
  当 Q 非空:
    u = Q.dequeue()
    对于 u 的每个邻居 w:
      如果 w 未访问:
        标记 w 为已访问
        Q.enqueue(w)
```

**应用**：
- 最短路径（无权图）
- 连通性分析
- 层次结构构建

**复杂度**：O(V + E)

### 2. 最短路径（Shortest Path）

#### Dijkstra 算法（加权图）

**问题**：找到单源最短路径（非负权重）

**算法**：
```
Dijkstra(G, s):
  初始化距离：d[s] = 0, d[v] = ∞ (v ≠ s)
  优先队列 PQ = {(0, s)}
  当 PQ 非空:
    (d[u], u) = PQ.extract_min()
    对于 u 的每个邻居 v:
      如果 d[u] + w(u,v) < d[v]:
        d[v] = d[u] + w(u,v)
        PQ.insert((d[v], v))
```

**复杂度**：O((V + E) log V) 使用优先队列

**应用**：
- 序列比对中的最优路径
- 网络流分析
- 距离计算

#### Floyd-Warshall 算法（全源最短路径）

**问题**：计算所有顶点对之间的最短路径

**递推公式**：
$$
d_{ij}^{(k)} = \min(d_{ij}^{(k-1)}, d_{ik}^{(k-1)} + d_{kj}^{(k-1)})
$$

**复杂度**：O(V³)

**应用**：
- 系统发育距离矩阵
- 网络分析

### 3. 最小生成树（Minimum Spanning Tree, MST）

#### Prim 算法

**问题**：找到连接所有顶点的最小权重边集合

**算法**：
```
Prim(G):
  选择任意顶点 s
  MST = {s}
  当 MST 顶点数 < V:
    找到连接 MST 和外部顶点的最小权重边 (u, v)
    将 v 加入 MST
```

**复杂度**：O(E log V)

**应用**：
- 进化树构建（UPGMA 类似思想）
- 网络设计
- 聚类分析

#### Kruskal 算法

**算法**：
```
Kruskal(G):
  按权重排序所有边
  MST = ∅
  对于每条边 (u, v)（按权重递增）:
    如果 u 和 v 不连通:
      将 (u, v) 加入 MST
      合并 u 和 v 的连通分量
```

**复杂度**：O(E log E)

### 4. 拓扑排序（Topological Sort）

**问题**：对 DAG 的顶点进行线性排序，使得对于每条有向边 (u, v)，u 都在 v 之前。

**算法**（Kahn 算法）：
```
TopologicalSort(G):
  计算所有顶点的入度
  将入度为 0 的顶点加入队列
  当队列非空:
    u = queue.dequeue()
    输出 u
    对于 u 的每个邻居 v:
      入度[v]--
      如果入度[v] == 0:
        queue.enqueue(v)
```

**复杂度**：O(V + E)

**应用**：
- 任务调度
- 依赖关系分析
- 基因调控网络分析

### 5. 强连通分量（Strongly Connected Components, SCC）

**问题**：找到有向图中互相可达的顶点集合。

**Kosaraju 算法**：
```
Kosaraju(G):
  1. 对 G 进行 DFS，记录完成时间
  2. 反转图 G 得到 G^T
  3. 按完成时间递减顺序对 G^T 进行 DFS
  4. 每次 DFS 的顶点集合为一个 SCC
```

**复杂度**：O(V + E)

**应用**：
- 网络模块检测
- 周期性分析

## 生物信息学具体应用

### 1. 基因组组装中的图算法

#### de Bruijn Graph

**构造**：
- 顶点：(k-1)-mer
- 边：k-mer（连接前缀和后缀）

**Worked Example**：

序列：`AAGATTCTCTA`，k = 4

k-mer 列表：
- AAGA → AAG → AGA
- AGAT → AGA → GAT
- GATT → GAT → ATT
- ATTC → ATT → TTC
- TTCT → TTC → TCT
- TCTC → TCT → CTC
- CTCT → CTC → TCT
- TCTA → TCT → CTA

图结构：
```
AAG → AGA → GAT → ATT → TTC → TCT → CTC
                                    ↑
                                    └──── TCTA
```

**算法问题**：
- 欧拉路径：遍历所有边恰好一次
- 图简化：去除 tips、bubbles
- 重复解析：处理复杂分叉

#### Overlap Graph

**构造**：
- 顶点：reads
- 边：reads 之间的重叠关系

**应用**：
- 长读长组装（PacBio、Nanopore）
- OLC（Overlap-Layout-Consensus）算法

### 2. 系统发育树构建

#### 距离矩阵方法（UPGMA）

**问题**：从距离矩阵构建系统发育树。

**算法**：
```
UPGMA(D):
  初始化：每个序列为一个簇
  当簇数 > 1:
    找到距离最小的两个簇 C_i, C_j
    合并 C_i 和 C_j 为新簇 C_new
    更新距离矩阵
    记录合并操作（构建树）
```

**Worked Example**：

距离矩阵：
```
    A   B   C   D
A [ 0   5   9   9 ]
B [ 5   0  10  10 ]
C [ 9  10   0   8 ]
D [ 9  10   8   0 ]
```

步骤 1：合并 A 和 B（距离 5）
- 新簇 AB 的高度 = 5/2 = 2.5
- 更新距离：
  - d(AB, C) = (5+9)/2 = 7
  - d(AB, D) = (5+9)/2 = 7

步骤 2：合并 C 和 D（距离 8）
- 新簇 CD 的高度 = 8/2 = 4
- 更新距离：
  - d(AB, CD) = (7+7)/2 = 7

步骤 3：合并 AB 和 CD（距离 7）
- 新簇 ABCD 的高度 = 7/2 = 3.5

最终树：
```
        ┌── A
    ┌───┤
    │   └── B
────┤
    │   ┌── C
    └───┤
        └── D
```

#### 邻接法（Neighbor-Joining）

**特点**：
- 不假设分子钟
- 适用于进化速率不均匀的情况

**核心思想**：
- 最小化总树长
- 选择能够减少总树长的邻居对

### 3. 基因调控网络分析

#### 网络拓扑分析

**指标**：
- **度（Degree）**：顶点的连接数
- **度分布**：网络中度的分布
- **聚类系数（Clustering Coefficient）**：邻居之间的连接密度
- **路径长度（Path Length）**：顶点间的平均距离
- **中心性（Centrality）**：顶点的重要性

**应用**：
- 识别关键调控因子
- 模块检测
- 网络比较

#### 社区检测（Community Detection）

**方法**：
- **模块度优化（Modularity Optimization）**：最大化社区内部连接
- **标签传播（Label Propagation）**：基于邻居标签更新
- **谱聚类（Spectral Clustering）**：基于拉普拉斯矩阵的特征向量

### 4. 蛋白质相互作用网络

#### 网络分析

**应用**：
- 功能预测：基于邻居的功能
- 复合物检测：密集连接的子图
- 疾病基因识别：中心性高的节点

**算法**：
- 最大团检测（Maximal Clique Detection）
- 密集子图挖掘
- 中心性计算（PageRank, Betweenness）

## 图算法优化

### 1. 启发式剪枝

**思想**：根据启发式规则提前剪除不可能的解。

**应用**：
- 组装图简化
- 系统发育树搜索空间缩减

### 2. 近似算法

**思想**：在多项式时间内找到近似最优解。

**示例**：
- 最小生成树近似
- 聚类近似

### 3. 并行化

**策略**：
- 图遍历并行化
- 最短路径并行计算
- 分布式图处理（如 Pregel, GraphX）

### 4. 压缩表示

**方法**：
- 稀疏矩阵存储
- 图压缩（如 WebGraph）
- 增量更新

## 复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 | 适用场景 |
|-----|-----------|-----------|---------|
| DFS/BFS | O(V + E) | O(V) | 连通性、遍历 |
| Dijkstra | O((V + E) log V) | O(V) | 单源最短路径 |
| Floyd-Warshall | O(V³) | O(V²) | 全源最短路径 |
| Prim/Kruskal | O(E log V) | O(V + E) | 最小生成树 |
| 拓扑排序 | O(V + E) | O(V) | DAG 排序 |

## 与真实工具的连接

### 组装工具

- **SPAdes**：基于 de Bruijn graph，使用多 k-mer 策略
- **Canu**：基于 overlap graph，用于长读长
- **Flye**：基于 repeat graph，处理复杂重复

### 系统发育工具

- **MEGA**：实现 UPGMA、NJ 等方法
- **RAxML**：最大似然树构建，使用启发式搜索
- **MrBayes**：贝叶斯系统发育，MCMC 采样

### 网络分析工具

- **Cytoscape**：网络可视化和分析
- **igraph**：图算法库
- **NetworkX**：Python 图分析库

## 常见误区

### 图越大，算法越慢

不一定。算法复杂度取决于顶点数 V 和边数 E 的关系。稀疏图（E ≈ V）的算法可能比稠密图（E ≈ V²）快很多。

### 最短路径总是唯一的

不是。可能存在多条相同长度的最短路径。

### 树总是最优的

不是。树结构可能丢失某些信息（如水平基因转移）。

### 图算法只能用于静态图

不是。动态图算法可以处理随时间变化的图。

## 实践建议

### 算法选择

1. **明确问题**：是路径问题、连通性问题还是优化问题？
2. **图的性质**：有向/无向、加权/无权、稀疏/稠密？
3. **规模**：顶点数和边数的量级？
4. **需求**：精确解还是近似解？实时性要求？

### 实现技巧

1. **选择合适的数据结构**：邻接表 vs 邻接矩阵
2. **利用稀疏性**：生物信息学中的图通常是稀疏的
3. **预处理**：必要时进行图简化
4. **可视化**：小规模图的可视化有助于调试

### 调试策略

1. **小规模测试**：用手算小例子验证
2. **中间输出**：打印中间状态
3. **边界条件**：测试空图、单点图等
4. **已知答案**：用已知结果的案例测试

## 练习

1. 构造序列 `ABCABD` 的 de Bruijn graph（k = 3）
2. 手动运行 Dijkstra 算法找到最短路径
3. 实现一个简单的 DFS 来检测连通分量
4. 比较 Prim 和 Kruskal 算法在不同图上的性能

## 参考资料

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT press.
- Pevzner, P. A. (2000). *Computational molecular biology: an algorithmic approach*. MIT press.
- Jones, N. C., & Pevzner, P. A. (2004). *An introduction to bioinformatics algorithms*. MIT press.

## 相关页面

- [de Bruijn graph 组装](../assembly/de-bruijn.md)
- [OLC 组装](../assembly/olc.md)
- [系统发育与进化](../phylogeny/index.md)
- [算法总览](./algorithms-overview.md)
- [动态规划算法](./dynamic-programming.md)
