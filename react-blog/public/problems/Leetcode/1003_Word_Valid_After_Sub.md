---
id: 1003
title: Check If Word Is Valid After Substitutions
title_slug: check-if-word-is-valid-after-substitutions
tags: ['String', 'Stack']
difficulty: Medium
created: 2026-09-30
---
[Leetcode 1003. Check If Word Is Valid After Substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions)

Given a str s, check if it can be generate from '' with inserting at any position with 'abc'.

There are several necessary conditions, but not sufficient:
    a) len(s) is multiple of 3
    b) count of 'a' = count of 'b' = count of 'c'
    ...
We need direct approach:

Method 1, recursively remove "abc" substr
Because "abc" is not self resembling, there is only 1 choice of removing each substr "abc"
Simple split and concat, time is O(n^2), space is O(n^2) because of generating new str s

Method 2, stack on chars, like parenthesis validation\
    => b seek stack top a, and c seek stack top b

There is an imporvement that writes less code:
resolve stack top only on letter c, append all other letters.
    => this approach gives the same time and space complexity, but can't early exit for some invalid b
Time O(n), Space O(n)

```python
class Solution:
    # Method 2, stack approach
    def isValid(self, s: str) -> bool:
        stack = []
        for c in s:
            # append 'a' no matter what
            if c == 'a':
                stack.append(c)
                continue
            # now c is 'b' or 'c'
            if c == 'b' and stack and stack[-1] == 'a':
                stack.append(c)
            elif c == 'c' and len(stack) >= 2 and stack.pop() == 'b' and stack.pop() == 'a':
                pass
            # invalid 'b' can early exit
            else:
                return False
        return len(stack) == 0
```
