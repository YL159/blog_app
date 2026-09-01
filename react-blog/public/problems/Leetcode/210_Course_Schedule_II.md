---
id: 210
title: Course Schedule II
title_slug: course-schedule-ii
tags: ['Depth-First Search', 'Breadth-First Search', 'Graph Theory', 'Topological Sort']
difficulty: Medium
created: 2024-09-22
---
[Leetcode 210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii)

Given a list of rerequisites, list([course, prereq]), \# of all courses.
Find a valid study sequence of these courses.

Gather list of prereq of each course, and list of unlocks of each course.
Find the starting point, a set of courses that needs no prereq
Topologically run BFS on the graph, each new learnt course reduces future courses' prereq set.
If a course's prereq is empty, we can finally learn it.

```python
from typing import List

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        courses = set(range(numCourses))
        req = {}
        unlock = {}
        for c, pre in prerequisites:
            if c not in req:
                req[c] = {pre}
            else:
                req[c].add(pre)
            if pre not in unlock:
                unlock[pre] = [c]
            else:
                unlock[pre].append(c)
        non_pre = courses - set(req.keys())
        if not non_pre:
            return []
        # topological BFS
        res = list(non_pre)
        cur, nex = list(non_pre), []
        while cur:
            for c in cur:
                if c not in unlock:
                    continue
                for unl in unlock[c]:
                    req[unl].remove(c)
                    if not req[unl]:
                        nex.append(unl)
            res.extend(nex)
            cur, nex = nex, []
        # any remainder means a loop
        if any(req.values()):
            return []
        return res
```
