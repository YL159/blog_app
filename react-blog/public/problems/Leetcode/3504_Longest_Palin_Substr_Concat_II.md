---
id: 3808
title: Longest Palindrome After Substring Concatenation II
title_slug: longest-palindrome-after-substring-concatenation-ii
tags: ['String', 'Dynamic Programming', 'Two Pointers']
difficulty: Hard
created: 2026-08-20
---
[Leetcode 3504. Longest Palindrome After Substring Concatenation II](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii)

Given string s and t, you can choose one substr from each s and t (can be empty)
And concatenate them in order (substr from s fist, then t), to form a palindrome.
Find the length of longest palindrome.

Observation:
1. This looks like LCS (longest common subsequence) problem
    => Use 2D dp in similar way to adapt to substr
    => unlike subseq, substr continuity requires only inherit left-up dp result
2. The problem of LCS-like solution is:
    s and t contributions in final palindrome are equal
    s = "hc" and t = "jooh", result is "hooh", not "hch" or "hh"
3. From 2, we can see "hooh" has "oo" center portion left when removing common contribution "h"
    => center portion must also be palindrome, and either from s or t
    => pre-calculate longest palindrome starting at each index in s to the end
        and that starting at each index in t to the start

Make a helper function to get longest palindrome length array
    => instead of traditional center expansion, we use dictionary to save char index list
    => may early exit if some earlier same char as tail can form a palindrome
Reverse t to adapt both helper function call and dp matrix traversal
When in dp traversal, non-zero dp[i][j] indicates common contribution
    => choose the max length of center palindrome at next position of i and j

Time O(max(s, t)^2), Space O(st)

```python
import collections
from typing import List

class Solution:
    def longestPalindrome(self, s: str, t: str) -> int:
        # dp matrix on s and reverse t
        # dp[i][j] is length of common substr ending at s[i] and t[j]

        # harder than #3503, pre-calculation is to include non-equal contribution
        # hc, jooh, h from 1st and ooh from 2nd

        # find len(longest_palin_substr) for each idx towards s end
        def palindrome(s: str) -> List[int]:
            res = [1] * len(s)
            # get char idx list from end to start
            book = collections.defaultdict(list)
            for i in range(len(s)-1, -1, -1):
                # traverse from tail s[i], early exit if palindrome found
                for end in book[s[i]]:
                    if check_palin(s, i, end):
                        res[i] = max(res[i], end - i + 1)
                        break
                book[s[i]].append(i)
            return res

        
        # check if s[start:end+1] is a palindrome
        def check_palin(s: str, start: int, end: int) -> bool:
            while start <= end:
                if s[start] != s[end]:
                    return False
                start += 1
                end -= 1
            return True

        
        # prepare s & t's list for internal longest palindrome
        sp = palindrome(s)
        t1 = t[::-1]
        t1p = palindrome(t1)

        # use 2d dp for current lcs
        dp = [[0] * len(s) for _ in range(len(t))]
        # consider internal palindromes first
        res = max(max(sp), max(t1p))
        for i in range(len(t)):
            for j in range(len(s)):
                lu = 0 if i == 0 or j == 0 else dp[i-1][j-1]
                if s[j] == t1[i]:
                    # current match, inherit left-up result
                    dp[i][j] = lu + 1
                # since substr continuity, mismatch reset to default 0
                
                # record only when non-zero result
                # dp[i][j] == 0 means consider only internal palindrome
                # res previously done
                if dp[i][j] > 0:
                    t_next = t1p[i+1] if i < len(t)-1 else 0
                    s_next = sp[j+1] if j < len(s)-1 else 0
                    res = max(res, max(t_next, s_next) + dp[i][j]*2)

        return res
```
