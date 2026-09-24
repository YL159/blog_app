'''
Leetcode 1658. Minimum Operations to Reduce X to Zero
Given a positive int nums, and int X, take either head or tail int from nums to subtract from X
Find min # of ints that makes X exactly 0, or -1 if not possible

Method 1, 2-sum of prefix/suffix
Non-overlapping prefix sum + suffix sum = X
    => find 2 items in prefix arr and suffix arr sums to X
Thus similar to 2-sum problem, use dictionary to remember suffix sum and index
Then iterate prefix sum to find min total length, check validity
Time O(n), Space O(n)

Method2, tight subarr sum
One step further, it is equivalent to ask a subarr of nums that sums to target = sum(nums) - X
All nums are positive => at most 1 position before right end of some subarr that makes sum(subarr) = target
    => use 2 pointer to keep track of left-right window
    => window size = 0 means the whole nums sums to X
Time O(n), Space O(1)
'''

import collections
from typing import List

class Solution:
    # Method 1, 2-sum for nums prefix/suffix sum
    def minOperations(self, nums: List[int], x: int) -> int:
        s = sum(nums)
        suff = collections.defaultdict(int)
        suff[s] = 0
        for i, n in enumerate(nums):
            s -= n
            suff[s] = i + 1
        
        res, p = len(nums)+1, 0
        for i, n in enumerate(nums):
            if p > x:
                break
            if x - p in suff:
                res = min(res, i+len(nums)-suff[x-p])
            p += n
        return res if res <= len(nums) else -1


    # Method 2, equivalent: find max len of subarr sums to total-x
    def minOperations(self, nums: List[int], x: int) -> int:
        l = r = 0
        total = sum(nums) - x
        if total < 0:
            return -1
        cur = 0
        max_len = -1
        while r < len(nums):
            cur += nums[r]
            while cur > total and l <= r:
                cur -= nums[l]
                l += 1
            if cur == total:
                max_len = max(max_len, r - l + 1)
            r += 1
        if max_len == -1:
            return -1
        return len(nums) - max_len