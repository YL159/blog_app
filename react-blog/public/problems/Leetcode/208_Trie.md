---
id: 208
title: Implement Trie (prefix tree)
title_slug: implement-trie-prefix-tree
tags: ['String', 'Hash Table', 'Design', 'Trie']
difficulty: Medium
created: 2024-01-12
---
[LeetCode 208. Implement Trie (prefix tree)](https://leetcode.com/problems/implement-trie-prefix-tree)

Iteratively add char as layer dictionary keys. End word with int entry 0: 1

```python
class Trie:

    def __init__(self):
        self.book = {}

    def insert(self, word: str) -> None:
        cur_book = self.book
        for w in word:
            if w not in cur_book:
                cur_book[w] = {}
            cur_book = cur_book[w]
        # insert integer 0 key as word termination
        cur_book[0] = 1

    def search(self, word: str) -> bool:
        cur_book = self.book
        for w in word:
            if w not in cur_book:
                return False
            cur_book = cur_book[w]
        return cur_book.get(0, 0)

    def startsWith(self, prefix: str) -> bool:
        cur_book = self.book
        for w in prefix:
            if w not in cur_book:
                return False
            cur_book = cur_book[w]
        return True
```
