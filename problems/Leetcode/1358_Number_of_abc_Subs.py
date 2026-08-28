'''
leetcode 1358. Number of Substrings Containing All Three Characters
Find the number of substrings containing a, b, c

Method 1, left index incremental
Use matrix and index reference to keep track of current triplet of tight abc substring
And count its right options. Left option is always 1 because s contains only abc letters.

Method 2, substr right index incremental
for each end index, find other 2 letters' min last appearance index
thus from s[0] to this min index can be substr start
Time O(n), Space O(1)
'''

class Solution:

    # Method 1, left index incremental
    def numberOfSubstrings(self, s: str) -> int:
        # similar to #930, use altered sliding window
        # get the list of indices of abc respectively for easier jumping
        ref = {'a':0, 'b':1, 'c':2}
        abc = [[], [], []]
        for i in range(len(s)):
            # s has only a, b, c
            abc[ref[s[i]]].append(i)
        if not abc[0] or not abc[1] or not abc[2]:
            return 0
        cur = {0:0, 1:0, 2:0}
        last = min(abc[0][-1], abc[1][-1], abc[2][-1])
        start, res = 0, 0
        while start <= last:
            end = max(abc[0][cur[0]], abc[1][cur[1]], abc[2][cur[2]])
            # left is always 1
            # right has choices till the end of s
            res += len(s) - end
            cur[ref[s[start]]] += 1
            start += 1
        return res
    
    # Method 2, right index incremental
    def numberOfSubstrings(self, s: str) -> int:

        letters = 'abc'
        last = {}
        res = 0
        for right in range(len(s)):
            last[s[right]] = right
            # proceed only when all letters have record
            if len(last) < len(letters):
                continue
            # cur idx will be largest, won't affect min of the other letters
            res += min(last.values()) + 1
        return res