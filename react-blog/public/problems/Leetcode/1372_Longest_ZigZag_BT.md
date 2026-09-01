---
id: 1474
title: Longest ZigZag Path in a Binary Tree
title_slug: longest-zigzag-path-in-a-binary-tree
tags: ['Dynamic Programming', 'Depth-First Search', 'Tree', 'Binary Tree']
difficulty: Medium
created: 2024-04-16
---
[Leetcode 1372. Longest ZigZag Path in a Binary Tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree)

Find the longest length of a ZigZag path in BT

Use incremental method.
	for each increment:
		return the historical optimum, and the connectable optimum (for future optimum's construction)
For this case, make a well-formed DFS function on the tree to return the above

```python
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        return max(self.dfs(root))

    def dfs(self, root: Optional[TreeNode]) -> tuple:
        if not root:
            return -1, -1, -1
        a, b, c = self.dfs(root.left)
        d, e, f = self.dfs(root.right)
        # m: the longest count of zigzag without root
        m = max(a, d, b, f)
        # max_l: the longest with root from its left
        max_l = c+1
        # max_r: the longest with root from its right
        max_r = e+1
        return m, max_l, max_r
```
