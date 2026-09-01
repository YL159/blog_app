---
id: 1643
title: Number of Nodes in the Sub-Tree With the Same Label
title_slug: number-of-nodes-in-the-sub-tree-with-the-same-label
tags: ['Hash Table', 'Depth-First Search', 'Tree', 'Breadth-First Search', 'Counting']
difficulty: Medium
created: 2024-07-08
---
[Leetcode 1519. Number of Nodes in the Sub-Tree With the Same Label](https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label)

Given edges of unique-node-number tree, and labels for each node number, find the \# of same label nodes as root in each subtree

Use post order traversal to count label appearances
\# of the same label as subtree root = label count after post order on root - label count before

```python
from typing import List
import collections

class Solution:
    def countSubTrees(self, n: int, edges: List[List[int]], labels: str) -> List[int]:
        tree = collections.defaultdict(list)
        for a, b in edges:
            tree[a].append(b)
            tree[b].append(a)
        # char: int count # of char seen so far
        count = collections.defaultdict(int)
        res = [0] * n

        def postOrder(rt: int, parent: int) -> None:
            c = labels[rt]
            prev = count[c]
            count[c] += 1
            for node in tree[rt]:
                if node == parent:
                    continue
                postOrder(node, rt)
            # rt label appearance in subtree = label # difference before/after visit
            res[rt] = count[c] - prev
            return

        postOrder(0, -1)
        return res
```
