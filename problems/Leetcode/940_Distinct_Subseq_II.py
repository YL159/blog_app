'''
Leetcode 940. Distinct Subsequences II
Find # of unique subseq of given string s.

Clearly, adding a new char will include previous calculated # of subseqs problem results
    => DP on the # of unique subseqs using char at idx i
    => result is the sum of DP array

This hints the existence and convenience of prefix sum array of DP array
    => keep in mind of the implicit DP array
        use pref array diff for DP subarr sum query

e.g. abcc:
i = 0, a, adding 1
    => dp[0] = 1 = pref[1]
i = 1, new char b => { b, ab }, freely append to all existing subseq (pref[1])
    => dp[1] = 2 = pref[1] + 1 = pref[2] - pref[1]
    => pref[2] = 2*pref[1] + 1
i = 2, new char c => { c, ac, bc, abc }, also freely append to those in pref[2].
    => dp[2] = 4 = (1+2)+1 = (dp[0] + dp[1]) + 1 = (pref[2]) + 1
    => pref[3] = pref[2] + dp[2] = 2*pref[2] + 1
i = 3, seen char c => { cc, acc, bcc, abcc }, only append to last c's generated subseq, add 4 again
    => dp[3] = dp[2] = 4 = pref[3] - pref[2]
    => pref[4] = pref[3] + dp[2] = 2*pref[3] - pref[2], pref[2] is # of subseq before last c

e.g. caba:
i = 3, seen 'a' should only append unique subseq generated starting from prev 'a'
    => since last 'a', unique subseq end at last 'a': { a, ca }
        ending at last 'b': { cb, ab, cab, b }
    => 'a' can append these subseq, but not {c}, because it already created 'ca' with prev 'a'


We can see the dp incremental rules:
1. new unseen char can "inherit" # of unique subseq so far
    => increment is dp[i] = sum(dp[:i]) + 1 = pref[-1] + 1
2. seen char x can only append to unique subseq since the start of its prev apperance
    because prev x had already been appended to all former subseq
    attaching this x to those former subseq give no new subseq
    => increment is all unique subseq since last appearance + 1
    => dp[i] = sum(dp[x's last idx-1:i]) + 1 = pref[-1] - pref[x's last idx]  + 1

Use prefix sum array to represent above implicit dp array. Result will be prefix[-1]
Time O(n), Space O(n)

There is a method using O(1) space, dp on current # of unique subseq ending with each letter.
'''
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9+7
        # prefix sum of the dp array in comments
        pref = [0]
        ibook = {}
        for i, c in enumerate(s):
            if c not in ibook:
                # dp[i] = pref[-1] + 1
                # => pref[i+1] = pref[-1] + dp[i] = 2*pref[-1] + 1
                pref.append((2*pref[-1] + 1) % mod)
            else:
                # dp[i] = pref[-1] - pref[ibook[c]] unique subseq at prev c and onward
                # => pref[i+1] = pref[-1] + dp[i] = 2*pref[-1] - pref[ibook[c]]
                pref.append((2*pref[-1] - pref[ibook[c]]) % mod)
            # update latest idx of c
            ibook[c] = i
        return pref[-1]