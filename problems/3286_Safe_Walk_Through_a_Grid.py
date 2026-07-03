'''
Leetcode 3286. Find a Safe Walk Through a Grid
Given a grid of 0/1, start with (0, 0) and walk 4-directionally to (m-1, n-1)
Step on cell with value 1 cost 1 health point
Given a starting health point, check if possible to reach target cell with positive health left

Observation:
1. Never walk on some 1 cell repeatedly, to minimize health cost
2. If step on a 1 cell, all neighboring 0 cells cost nothing
    => thus exhaust all connected 0 cells, these 1/0 cells form a layer of the same cost

BFS expand from (0, 0) with cost grid[0][0]
exhaust all cells of the same cost
each BFS iteration increase cost by 1

Time O(m*n), Space O(m*n)
'''

from typing import List

class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        m, n = len(grid), len(grid[0])

        # find only one extra layer of 1s
        def find_ones(cur: set) -> set:
            ones = set()
            for i, j in cur:
                grid[i][j] = -1
                for x, y in [(i+1, j), (i-1, j), (i, j+1), (i, j-1)]:
                    if 0 <= x < m and 0 <= y < n and grid[x][y] == 1:
                        ones.add((x, y))
            return ones

        # expand current edge ones into layer of 1/0 of the same cost
        def expand_zeros(ones: set) -> None:
            cur, nex = ones, set()
            while cur:
                # use grid itself as 'visited' grid
                for i, j in cur:
                    grid[i][j] = -1
                    for x, y in [(i+1, j), (i-1, j), (i, j+1), (i, j-1)]:
                        if 0 <= x < m and 0 <= y < n and grid[x][y] == 0:
                            nex.add((x, y))
                ones |= nex
                cur, nex = nex, set()


        cost = grid[0][0]
        # initial exhaustion of 0/1 cell layer
        one_zeros = {(0, 0)}
        expand_zeros(one_zeros)

        while one_zeros:
            if grid[-1][-1] == -1:
                return cost < health
            cost += 1
            one_zeros = find_ones(one_zeros)
            expand_zeros(one_zeros)
