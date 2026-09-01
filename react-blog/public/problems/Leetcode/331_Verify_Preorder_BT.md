---
id: 331
title: Verify Preorder Serialization of a Binary Tree
title_slug: verify-preorder-serialization-of-a-binary-tree
tags: ['String', 'Tree', 'Binary Tree', 'Stack']
difficulty: Medium
created: 2024-07-13
---
[Leetcode 331. Verify Preorder Serialization of a Binary Tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree)

Given a preorder string of BT including empty nodes, verify if it is 1 valid BT

Use stack to keep track of current subtree's childre status.
Any subsequent '\#' or number will fulfill or add to subtree's left/right position holder

```python
class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        pre = preorder.split(',')
        if pre[0] == '#':
            return len(pre) == 1
        # use stack to simulate current node's children status
        stack = [pre[0], pre[0]]
        for n in pre[1:]:
            if not stack:
                return False
            stack.pop()
            if n != '#':
                stack.extend([n, n])
        if stack:
            return False
        return True
```
