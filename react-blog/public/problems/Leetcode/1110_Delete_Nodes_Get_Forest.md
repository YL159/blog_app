---
id: 1207
title: Delete Nodes And Return Forest
title_slug: delete-nodes-and-return-forest
tags: ['Array', 'Hash Table', 'Depth-First Search', 'Tree', 'Binary Tree']
difficulty: Medium
created: 2024-04-14
---
[Leetcode 1110. Delete Nodes And Return Forest](https://leetcode.com/problems/delete-nodes-and-return-forest)

Delete some nodes from a binary tree, return the remaining forest as list

Use DFS to check each root and children, recursively return the remaining valid roots
Be sure to ignore the propagated 'roots' if it has an ancestor

```python
from typing import Optional, List

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        de = set(to_delete)

        def dfs(rt: TreeNode) -> List[TreeNode]:
            res = []
            children = []
            if rt.left:
                children.append(rt.left)
            if rt.right:
                children.append(rt.right)
			# if root should be removed, just append the DFS results of its children's
            if rt.val in de:
                for c in children:
                    res.extend(dfs(c))
                return res
			# root remains, check children's DFS results, and avoid the returned children 'root' nodes
            res.append(rt)
            for c in children:
                tmp = dfs(c)
                if c.val in de:
                    res.extend(tmp)
                    if c == rt.left:
                        rt.left = None
                    if c == rt.right:
                        rt.right = None
                else:
                    res.extend(tmp[1:])
            return res

        return dfs(root)
```
