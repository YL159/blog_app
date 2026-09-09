# Blog with React & markdown
You're welcome to visit this blog [Tiny Glade](https://yl159.github.io/blog_app/)

React ^19.2.7, vite ^8.1, python ^3.14

## Story
This repository was initially for sharing some interesting Leetcode questions. But what if they can be more presentable using web view? What if I can share other works and make it a blog portfolio?

The project automates `.py` -> `.md` customized transformation, and use github pages and actions to deploy static react frontend website.

## Rules
`convert_md.py` recursively handles `problems/` folder transformation:
 - Leetcode question `.py` starts with doc string ''' Leetcode [copy of question title]\newline...'''. e.g. ''' Leetcode 1. Two Sum\n...'''.
 - Other question `.py` starts with ''' [source]: [title]\n...''', or just ''' [title]\n...'''.
 - Leetcode questions may initiate additional info query to Leetcode.
 - Only handles new and updated `.py` files.

`json_map.py` recursively collect all `.md` files' metadata for frontend:
 - Expect `title: string`, `created: datetime` property from each markdown file.
 - Script generated `.md` files ensures the above.
 - File name starting with '\_' ("_*.md") are ignored.

## Run local server
```bash
cd react-blog
npm run dev
```
Default `localhost:5173`