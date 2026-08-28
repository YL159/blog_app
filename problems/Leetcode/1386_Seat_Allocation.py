'''
Leetcode 1386. Cinema Seat Allocation
Cinema has n rows of seats, and given reservedSeats shows (row, seat#) as reserved.
Each row has 10 seats [1, 10], group of 4 can only occupy [2,3,4,5] or [4,5,6,7] or [6,7,8,9] if seats not reserved.
Find the max # of groups to be seated. # of reserved seats can be very large.

Method 1, construct cinema seats and mark reserved, and collect possible groups.
Simple to implement, but requires n*10 space, which may be too large.

Method 2, sort reservedSeats by row, and use ordered indexing while examining each row.
Space can be O(1) if not considering resource used in sorting, but time is O(mlogm).

Method 3, process reserved seats, eliminate impossible group assignments from default total (2*n).
Instead of record precise seat reservation, eliminate group possibility by only looking at seat range and bit mask.

Time O(m), Space O(m)
'''

from typing import List
import collections

class Solution:
    def maxNumberOfFamilies(self, n: int, reservedSeats: List[List[int]]) -> int:
        # initially each row can have max 2 groups
        # reduce and remember it when checking reserved

        status = collections.defaultdict(list)
        while reservedSeats:
            row, seat = reservedSeats.pop()
            if seat == 1 or seat == 10:
                continue
            # [1, 1, 1] means all 3 groups are possible
            # group 0: 2345, group 1: 4567, group 2: 6789
            # optimization: bit mask with & 0b011 etc
            if row not in status:
                status[row] = [1, 1, 1]
            # some group must be 0 after removal
            if 2 <= seat <= 5:
                status[row][0] = 0
            elif 6 <= seat <= 9:
                status[row][2] = 0
            if 4 <= seat <= 7:
                status[row][1] = 0

        res = 2 * n
        for group in status.values():
            # no 1 -> all groups not possible -> eliminate 2 from total
            # at least 1 -> group 0/1 or group 1/2 possible -> eliminate 1 from total
            # can't be all 1, because prev loop made sure at least one elimination of some group
            res -= 2 - any(group)
        return res
