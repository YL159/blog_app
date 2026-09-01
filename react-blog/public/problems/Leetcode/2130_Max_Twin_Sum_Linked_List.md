---
id: 2236
title: Maximum Twin Sum of a Linked List
title_slug: maximum-twin-sum-of-a-linked-list
tags: ['Two Pointers', 'Stack', 'Linked List']
difficulty: Medium
created: 2024-10-12
---
[Leetcode 2130. Maximum Twin Sum of a Linked List](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list)

ith node twins with (n-1-i)th node. [1,2,3,4] => 1-4, 2-3 are twins.
Return the max sum of twin node values

O(1) space solution requires reverse the 2nd half linked list, and loop from both's head.
Use slow/fast pointers to locate list mid point
Then reverse the 2nd half using 3 ref technique carefully

```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow, fast = head, head.next
        while fast.next:
            slow = slow.next
            fast = fast.next.next
        # left is the head of 2nd half
        left = slow.next
        slow.next = None
        if not left.next:
            return head.val + left.val
        mid = left.next
        left.next = None
        
        # reverse the 2nd half
        while mid.next:
            right = mid.next
            mid.next = left
            left, mid = mid, right
        mid.next = left

        # collect pair sums
        res = head.val + mid.val
        l, r = head, mid
        while l:
            res = max(res, l.val + r.val)
            l, r = l.next, r.next
        return res
```
