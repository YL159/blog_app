---
id: 1007
title: Numbers With Same Consecutive Differences
title_slug: numbers-with-same-consecutive-differences
tags: ['Breadth-First Search', 'Backtracking']
difficulty: Medium
created: 2025-01-23
---
[Leetcode 967. Numbers With Same Consecutive Differences](https://leetcode.com/problems/numbers-with-same-consecutive-differences)

Find all valid number of length n, that consecutive digits are of difference k

Use backtrack to traverse every possibility of each digit.
Build result if length reaches n.

```python
from typing import List

class Solution:
    def numsSameConsecDiff(self, n: int, k: int) -> List[int]:
        # for each unique start, backtrack on possible next digit
        self.k = k
        self.n = n
        self.res = []
        for start in range(1, 10):
            self.backtrack([start])
        return self.res
    
    def backtrack(self, arr: List[int]) -> None:
        if len(arr) == self.n:
            x = 0
            for a in arr:
                x *= 10
                x += a
            self.res.append(x)
            return
        last = arr[-1]
        if last + self.k <= 9:
            arr.append(last + self.k)
            self.backtrack(arr)
            arr.pop()
        if self.k != 0 and last - self.k >= 0:
            arr.append(last - self.k)
            self.backtrack(arr)
            arr.pop()
        return
```
