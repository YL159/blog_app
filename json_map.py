from pathlib import Path
import json

MARKDOWN_DIR = Path('./react-blog/public/')
JS_DIR = Path('./react-blog/src/data/')

book = {}

for folder in MARKDOWN_DIR.glob('*/'):
    if folder.name not in book:
        book[folder.name] = {}
    for md_file in folder.glob('*.md'):
        with md_file.open() as f:
            for line in f:
                if line.startswith("title_slug"):
                    title_slug = line.split(':')[1]
                    book[folder.name][title_slug.strip()] = md_file.name
                    break

with (JS_DIR / "titleMap.js").open('w') as f:
    f.write("export default ")
    json.dump(book, f, indent=4)