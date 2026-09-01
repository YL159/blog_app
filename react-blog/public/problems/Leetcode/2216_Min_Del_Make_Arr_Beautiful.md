---
id: 1355
title: Minimum Deletions to Make Array Beautiful
title_slug: minimum-deletions-to-make-array-beautiful
tags: ['Array', 'Greedy', 'Stack']
difficulty: Medium
created: 2025-06-04
---
[Leetcode 2216. Minimum Deletions to Make Array Beautiful](https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful)

Given an array of ints, delete some elements to make array beautiful:
	nums[i] != nums[i+1] for all even i
	len(nums) is even

Observations:
1. result array can't have >=3 consecutive same numbers
2. min removal is to preserve as many different 'neighboring' numbers as possible

Thus use stack to eliminate unmatched even-odd pairs on the run. Guarantees 1
Greedy match any good even-odd pairs, thus removal is min. Guarantees 2
Time O(n), stack length is at most 2, thus Space O(1)

```python
from typing import List

class Solution:
    def minDeletion(self, nums: List[int]) -> int:
        stack = []
        res = 0
        for n in nums:
            if not stack:
                stack.append(n)
            elif stack[-1] == n:
                res += 1
            else:
                stack.pop()
        return res + (len(stack) != 0)
```
