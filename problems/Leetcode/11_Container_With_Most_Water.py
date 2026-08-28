'''
Leetcode 11. Container With Most Water
Given a list of bar heights, spanning across x-axis [0, len(height)-1] int points.
Any 2 bars and space in between forms a container.
Find the max volume of those containers.

Observation:
Combination of all 2 bars is of O(n^2) order
But if 2 bars are taller than some bars within, we don't consider those shorter bars
because they will definitely produce smaller container
    => Find taller bars to increase the chance of bigger container

Thus we can start from two ends, and find taller bars while moving two pointers closer
Record max container on the way.
Time O(n), Space O(1)
'''

from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height)-1
        res = 0
        while left < right:
            res = max(res, min(height[left], height[right])*(right-left))
            # keep the taller bar, move the other closer
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return res
    