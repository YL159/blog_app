---
id: 3150
title: Shortest and Lexicographically Smallest Beautiful String
title_slug: shortest-and-lexicographically-smallest-beautiful-string
tags: ['String', 'Sliding Window']
difficulty: Medium
created: 2026-08-26
---
[Leetcode 2904. Shortest and Lexicographically Smallest Beautiful String](https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string)

Given a binary str s and int k >= 1. Beautiful substr of s: has exactly k '1'
Find the lexico smallest AND shortest such beautiful substr of s

Observation:
1. Beautiful substr => sliding window maintaining exactly k '1'
2. Shortest beautiful substr => both sides stripped of excessive '0's
    => starts and ends with '1'
3. When same length, lexico smallest binary str <=> smallest decimal value represented
    => maintain the decimal value and length of the window


Sliding window for shortest k '1' substr, both ends should be 1
    => we care only '1's, thus extract '1' indices arr
Record value of window binary and its position in s
    => inferred by left pointer and window length
    => value maintained by examining window edge change, shift/subtraction accordingly

Record logic:
when new shortest beautiful window appear, update saved values and position
when same shortest window, compare for smaller value and update position
same shortest length and same lexico, but different position
    => same original substr, no effect on answer

Time O(n) if considering power shifting as O(1) operation
Space O(n) can be optimized to O(1) without '1' position arr

```python
class Solution:
    def shortestBeautifulSubstring(self, s: str, k: int) -> str:
        # get '1' indices array
        ones = []
        for i, c in enumerate(s):
            if c == '1':
                ones.append(i)
        
        if len(ones) < k:
            return ''

        if k == 1:
            return '1'
        
        # now k >= 2, and at least one beautiful substr
        value = 1
        position = 0
        record = float('inf')
        length = float('inf')
        l, r = 0, 1
        while r < len(ones):
            # right pointer move one, shift and update value
            value <<= ones[r] - ones[r-1]
            value += 1
            # accommodate not beautiful intial iterations
            if r - l + 1 < k:
                r += 1
                continue
            # now substr is beautiful, check and decide if recording or not
            cur_length = ones[r] - ones[l] + 1
            if cur_length < length or cur_length == length and value < record:
                record = value
                length = cur_length
                position = l
            # left pointer will move one
            # subtract current left '1' represented power value
            value -= 1 << cur_length - 1

            l += 1
            r += 1
        
        return s[ones[position]:ones[position+k-1]+1]
```
