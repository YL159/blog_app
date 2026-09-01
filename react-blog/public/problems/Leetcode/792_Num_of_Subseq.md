---
id: 808
title: Number of Matching Subsequences
title_slug: number-of-matching-subsequences
tags: ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Sorting', 'Binary Search', 'Trie']
difficulty: Medium
created: 2024-06-18
---
[Leetcode 792. Number of Matching Subsequences](https://leetcode.com/problems/number-of-matching-subsequences)

Count the number of word in given words list, that is a subsequence of given s

Validate subsequence by binary search for previous letter index in current letter index list.

```python
from typing import List
import bisect, collections

class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        # create a dict of s letter:list of its indices
        book = collections.defaultdict(list)
        for i, c in enumerate(s):
            book[c].append(i)
        
        count = 0
        for word in words:
            pre = -1
            # binary search check if there is a valid word letter trace in s
            for c in word:
                if c not in book:
                    break
                curlist = book[c]
                cur = bisect.bisect(curlist, pre)
                if cur >= len(curlist):
                    break
                pre = curlist[cur]
            else:
                count += 1
        return count
```
