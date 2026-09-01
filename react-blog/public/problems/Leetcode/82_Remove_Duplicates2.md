---
id: 82
title: Remove Duplicates from Sorted List II
title_slug: remove-duplicates-from-sorted-list-ii
tags: ['Two Pointers', 'Linked List']
difficulty: Medium
created: 2024-01-14
---
[LeetCode 82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii)

Remove duplicate node like related problem I, remember those duplicates
2nd pass remove those nodes in-place

```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # in-place 2 passes
        if not head:
            return head
        # remove duplicates, remember the values that duplicate
        dup = set()
        prev, cur = head, head.next
        while cur:
            while cur and prev.val == cur.val:
                cur = cur.next
                dup.add(prev.val)
            prev.next = cur
            prev = cur
            if cur:
                cur = cur.next
                
        # remove the nodes exist in records
        while head and head.val in dup:
            head = head.next
        prev, cur = head, head
        while cur:
            if cur.val in dup:
                prev.next = cur.next
            else:
                prev = cur
            cur = cur.next

        return head
```
