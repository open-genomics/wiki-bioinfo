---
sidebar_position: 4
---

# Affine gap penalty

## 是什么

Affine gap penalty 是比对打分中非常重要的改进：它不再把每个 gap 字符都看成同样代价，而是把 gap 的代价拆成两部分：

- gap opening penalty
- gap extension penalty

这更符合很多真实场景中的直觉：开一个新 gap 往往比把已有 gap 再延长一个字符更“昂贵”。

## 要解决什么生物信息学问题

如果把 gap 中每个字符都按同一代价处理，那么一个长 indel 和多个零散小 indel 的总代价可能差不多，这常常不符合真实进化或测序错误模式。

Affine gap 的目标，就是让比对模型更合理地偏好“少量连续 gap”，而不是“大量碎片化 gap”。

## 输入与输出

- 输入：两条序列、匹配/错配打分、gap opening / extension 参数
- 输出：更符合生物学直觉的全局或局部比对得分与路径

## 核心思想 / 数学模型

一个常见的 affine gap 代价可写成：

$$
  g(k) = g_o + k \cdot g_e
$$

其中：

- `g_o` 是打开 gap 的代价；
- `g_e` 是每延长一个字符的代价；
- `k` 是 gap 的长度。

这样，当 `k` 增大时，代价会继续上升，但不会像“每个位置重新开 gap”那样增长得过快。

## worked example

如果一个 5bp 的连续缺失和五个分散的 1bp 缺失相比，affine gap 往往更倾向前者，因为：

- 前者只付一次 opening penalty；
- 后者需要反复开 gap，总代价更高。

这正是它比简单线性 gap 更合理的地方。

## 复杂度与适用前提

引入 affine gap 后，动态规划通常不再只维护一个状态矩阵，而需要区分：

- 匹配 / 替换状态；
- 在某条序列中开启或延长 gap 的状态。

因此状态更复杂，但换来的是更真实的评分模型。

## 与真实工具或流程的连接

真实比对软件几乎不会只使用最简单的编辑距离模型。Affine gap penalty 是从教学模型走向工程实践时最关键的一步之一。

## 常见误区

### gap 罚分只是在参数上调一调

不是。它改变的是动态规划状态设计和最优路径偏好。

### affine gap 一定总是更好

它通常更合理，但参数设置仍会影响结果，而且不同任务对 gap 模型的需求并不完全相同。

## 相关页面

- [编辑距离](./edit-distance.md)
- [打分矩阵与 gap 罚分](./scoring-matrices.md)
- [全局比对与局部比对](./global-local.md)
