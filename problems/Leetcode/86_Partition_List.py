'''
Leetcode 86. Partition List
Go through the linked list and group nodes with value < x before nodes >= x.
Then concatenate them in original order.

Maintain 2 linked list of lesser and no-lesser than x in traversing order/
Then concatenate them.
Time O(n), Space O(1)
'''

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head, x: int):
        if not head:
            return head
        less_h = ListNode()
        less_t = less_h
        more_h = ListNode()
        more_t = more_h
        node, pre = head, head
        while node:
            # collect less than x nodes sequentially
            if node.val < x:
                if pre.val >= x or less_t == less_h:
                    less_t.next = node
                less_t = node
            # collect more than x nodes sequentially
            else:
                if pre.val < x or more_t == more_h:
                    more_t.next = node
                more_t = node
            pre = node
            node = node.next
        # construct the whole list
        more_t.next = None
        less_t.next = more_h.next
        return less_h.next
    