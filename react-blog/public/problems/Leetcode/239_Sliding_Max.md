---
id: 239
title: Sliding Window Maximum
title_slug: sliding-window-maximum
tags: ['Array', 'Heap (Priority Queue)', 'Sliding Window', 'Queue', 'Monotonic Queue']
difficulty: Hard
created: 2024-01-29
---
[Leetcode 239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum)

1. Max heap of the sliding window has time complexity of O(nlogn)
because the heap maintains a relatively sorted order of many more non-max values

2. Ordered max deque has time complexity of O(n)
the deque keeps a decreasing max candidates of current window
these deque values' sequence corresponds to the order of their appearance in nums
for new number eliminate smaller previous max values untill some previous max is greater than the new one
Thus it remembers all the possible max values within the window. And the left most of deque is always the max of current window

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        # maintain the local max and future candidates, in sequential order
        # a decreasing max deque
        que = collections.deque()
        res = []
        for i, n in enumerate(nums):
            left = max(i-k+1, 0)
            while que and nums[que[-1]] <= n:
                que.pop()
            que.append(i)
            if left > que[0]:
                que.popleft()
            res.append(nums[que[0]])
        return res[k-1:]
```
