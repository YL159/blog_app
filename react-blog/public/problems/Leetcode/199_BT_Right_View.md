---
id: 199
title: Binary Tree Right Side View
title_slug: binary-tree-right-side-view
tags: ['Depth-First Search', 'Tree', 'Breadth-First Search', 'Binary Tree']
difficulty: Medium
created: 2024-01-16
---
[LeetCode 199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view)

BFS iterative layers

```python
from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []
        cur, nex = [root], []
        # BFS get the right most value of each layer
        while cur:
            res.append(cur[-1].val)
            nex = []
            for node in cur:
                if node.left:
                    nex.append(node.left)
                if node.right:
                    nex.append(node.right)
            cur = nex
        return res
```
