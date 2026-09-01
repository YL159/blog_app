---
id: 1442
title: Number of Operations to Make Network Connected
title_slug: number-of-operations-to-make-network-connected
tags: ['Depth-First Search', 'Breadth-First Search', 'Graph Theory', 'Union-Find']
difficulty: Medium
created: 2024-04-25
---
[Leetcode 1319. Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected)

Find min operations to make computer graph connected, use existing cables(edges)

\# of edges should be at least n-1, then computer group - 1 is the minimum operation needed to connect them all

```python
from typing import List

class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        if len(connections) < n-1:
            return -1
        # make adjacency map of computers
        g = {i: set() for i in range(n)}
        for a, b in connections:
            g[a].add(b)
            g[b].add(a)
        
        group = 0
        visited = [False for _ in range(n)]
        for i in range(n):
            if visited[i]:
                continue
            group += 1
            visited[i] = True
            level, _level = {i}, set()
            # BFS traverse computers in a group
            while level:
                candidates = set()
                for c in level:
                    candidates |= g[c]
                for nex in candidates:
                    if not visited[nex]:
                        _level.add(nex)
                        visited[nex] = True
                level, _level = _level, set()
        # just return computer cluster-1
        return group-1
```
