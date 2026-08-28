'''
Leetcode 3720. Lexicographically Smallest Permutation Greater Than Target
Given str s and target of the same length, and all lowercase English letters.
Permute letters in s so it is lexico smallest but strictly greater than target str.
If no such permutation, return empty str.

Observation & greedy strategy:
To permute s as close as target, match PREFIX of target as long as possible
    => count char frequency in s and match target from left
    => untill target[i]

Situation 1, remaining chars has at least 1 char larger than target[i]
    => put the smallest larger char at res[i]
    => and put remaining char in increasing order

situation 2, remaining chars all < target[i]
    => res[i] go back 1 char and restore freq
    => check if situation 1 appear, deal with it
if go back to i = 0 and still no larger char option, fail


Time O(n*26) is O(n), Space O(n) if consider result array
'''

import collections

class Solution:
    def lexGreaterPermutation(self, s: str, target: str) -> str:
        # construct frequency list
        book = collections.Counter(s)
        freq = [0] * 26
        a = ord('a')
        for c, cnt in book.items():
            freq[ord(c)-a] = cnt
        
        res = []
        i = 0
        # match longest prefix of target till break at i
        while i < len(target):
            idx = ord(target[i]) - a
            if freq[idx] > 0:
                res.append(target[i])
                freq[idx] -= 1
                i += 1
            else:
                break


        # define a reusable func to check from current char's idx in freq
        def find_fill(idx: int) -> bool:
            # find next available char from idx
            idx += 1
            while idx < 26 and freq[idx] == 0:
                idx += 1
            if idx == 26:
                return False
            # use 1 smallest char larger than target[i], and fill the rest
            freq[idx] -= 1
            res.append(chr(idx+a))
            i = 0
            while i < 26:
                if freq[i] > 0:
                    res.append(chr(i+a)*freq[i])
                i += 1
            return True
        

        # now res = target, or match half way
        # try to find larger char, or go back 1 char and restore
        while not find_fill(idx):
            i -= 1
            if i < 0:
                return ''
            idx = ord(target[i]) - a
            res.pop()
            freq[idx] += 1

        return ''.join(res)
