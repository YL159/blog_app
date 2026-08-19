'''
Leetcode 2958. Length of Longest Subarray With at Most K Frequency
Given an int arr nums and int k, find the length of longest subarr, with each element's freq <= k.

Think in incremental right idx, the longest subarr can be as far as with left idx = 0
To include n = nums[right], n frequency must be <= k, thus must exclude some left-most n to achieve
    => record each n's idx in a list, and find the correct left/previous idx for each right idx

Method 2 improves the above by using deque for each n's idx
    => whild holding their idx, the length also tells included freq of n
    => save memory, each n's list has length <= k
But due to deque's internal structure, the memory cost in practice may not be always better.

Time O(n), Space O(n)
'''

from typing import List
import collections

class Solution:
    # Method 1, complete idx list
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        # record position list of each # sequentially
        pos = collections.defaultdict(list)
        # the end of prefix to be excluded
        prev = -1
        res = 0
        for i, n in enumerate(nums):
            pos[n].append(i)
            # if current n's freq exceeds k, find the new pref idx before k times of n
            if len(pos[n]) > k:
                prev = max(prev, pos[n][len(pos[n])-k-1])
            res = max(res, i - prev)
        return res


    # Method 2, use deque to save mem
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        # same idea, use deque for each #'s postion list to save mem
        pos = {}
        left = -1
        res = 0
        for i, n in enumerate(nums):
            if n not in pos:
                pos[n] = collections.deque([i])
            else:
                pos[n].append(i)
            # deque holds included n's idx, thus length is count
            if len(pos[n]) > k:
                # update left as max with popped idx
                left = max(left, pos[n].popleft())
            res = max(res, i - left)
        return res