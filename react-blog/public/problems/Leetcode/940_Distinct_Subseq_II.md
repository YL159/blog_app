---
id: 977
title: Distinct Subsequences II
title_slug: distinct-subsequences-ii
tags: ['String', 'Dynamic Programming']
difficulty: Hard
created: 2025-07-04
---
[Leetcode 940. Distinct Subsequences II](https://leetcode.com/problems/distinct-subsequences-ii)

Find \# of unique subseq of given string s.

Clearly, adding a new char will incude previous calculated \# of subseqs problem results, thus DP

e.g. abcc:
	i = 0, a, adding 1
    i = 1, new subseq is b, ab. ab is based on a, adding 2 = 1+1
    i = 2, c, ac (from i=0), bc, abc (from i=1), adding 4 = (1+2)+1
	i = 3, 'c' should only append results from i=2, cc, acc, bcc, abcc, adding 4 = 4 (from i=2)
e.g. caba:
	i = 3, new 'a' should only append ca, cb, cab adding from results on prev 'a' and after
Thus let dp[i] is the \# of unique subseq ending and using s[i]
	if new char is new, dp[i] = dp[i-1] + 1, it can append to all prev subseq, and self
	if new char appeared before, append only to subseq ending at s[j] = char and onward

Use prefix sum array to represent above dp array. Result will be prefix[-1]
Time O(n), Space O(n)

There is a method using O(1) space, dp on current \# of unique subseq starting with each letter.

```python
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        # prefix sum of the implicit dp array from comments
        pref = [0]
        # record letter's last idx
        ibook = {}
        for i, c in enumerate(s):
            if c not in ibook:
                # dp[i] = pref[-1] + 1
                # => pref[i+1] = pref[-1] + dp[i] = 2*pref[-1] + 1
                pref.append(2*pref[-1] + 1)
            else:
                # dp[i] = pref[-1] - pref[ibook[c]] unique subseq at prev c and onward
                # => pref[i+1] = pref[-1] + dp[i] = 2*pref[-1] - pref[ibook[c]]
                pref.append(2*pref[-1] - pref[ibook[c]])
            # update latest idx of c
            ibook[c] = i
        return pref[-1] % (10**9+7)
```
