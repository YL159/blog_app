---
id: 4136
title: Concatenate Non-Zero Digits and Multiply by Sum II
title_slug: concatenate-non-zero-digits-and-multiply-by-sum-ii
tags: ['String', 'Math', 'Prefix Sum']
difficulty: Medium
created: 2026-07-07
---
[Leetcode 3756. Concatenate Non-Zero Digits and Multiply by Sum II](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)

Given a string of digits, and a query list of [l, r] range.
For each query, find the substr s[l, r] and its:
    digit sum ds
    new int x removing all 0's from s[l, r]
Return the product of ds and x, mod 10^9+7 as per query.

Observations:
1. Naive approach takes n^2 time, either n^2+q pre-process all substr, or qn brutal force
2. Digit sum ds is not affected by 0, and can be optimized by prefix sum with O(1) time

3. But value of x? queries are random
    => suppose s without 0 forms the biggest X, x is the value of the middle section
e.g. [1, 0, 2, 3, 0, 4, 0, 8] => X = 12348, query [1, 4] => x = 23
    => 23 = (1<23>48 - 1*10^4 - 48) // 10^2
    power 4 is the valid digits count after s[1]
    power 2 is the valid digits count between s[1] and s[4]
        => valid digits count after s[1] - valid digits count after s[4]
Even better, X's suffix will always be removed, thus consider only prefix
    => 23 = 1<23> - 1*10^2
    power 2 is the same digit count in between.
Thus:
x = pref(X[r]) - pref(X[l])*10^(valid digits count between l and r)
still O(1)

Solution:
Build a digit sum prefix array for ds term.
Build a concat value prefix array for x term.
Build a valid-digits-count-after-some-index array for 10 power calculation.
Then for each query range, construct ds, x term following the equation.

Optimization:
- [x] Use 10^9+7 mod for every term in pref to avoid large number maintenance.
- [x] Build a 10 power array to avoid repeated 10 power calculation.
- [ ] 10 power array can further be optimized by recursive doubling calculation or buffering.
- [ ] As hint suggests, mapping queries range to a modified digit str without 0.
        => reduce repeated terms in prefix and count array.


Time O(max(n, q)), space O(n)


```python
from typing import List

class Solution:
    def sumAndMultiply(self, s: str, queries: List[List[int]]) -> List[int]:

        mod = 10**9 + 7
        digits = [int(c) for c in s]
        pref_x = [0]
        pref_ds = [0]
        # prepare prefix arrays
        for d in digits:
            pref_ds.append(pref_ds[-1] if d == 0 else (pref_ds[-1]+d)%mod)
            pref_x.append(pref_x[-1] if d == 0 else (pref_x[-1]*10+d)%mod)
        # prepare rightward valid digit count array
        rcount = [0]
        count = 0
        for i in range(len(s)-1, -1, -1):
            count += digits[i] != 0
            rcount.append(count)
        rcount.reverse()
        # prepare 10 power array
        tens = [1]
        for _ in range(max(rcount[0], 1)):
            tens.append(tens[-1]*10%mod)

        # x: value of x from window, ds: digit sum
        x, ds = 0, 0
        res = []
        for l, r in queries:
            ds = pref_ds[r+1] - pref_ds[l]

            right = pref_x[r+1]
            left = (pref_x[l] * tens[rcount[l] - rcount[r+1]])%mod
            x = right - left

            res.append(x * ds % mod)

        return res
```
