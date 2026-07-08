from pathlib import Path
import json

MARKDOWN_DIR = Path('./react-blog/public/')
JS_DIR = Path('./react-blog/src/data/')
PUBLIC_DIR = Path('./react-blog/public/')

book = {}

for folder in MARKDOWN_DIR.glob('*/'):
    if folder.name not in book:
        book[folder.name] = {}
    sub_folder = book[folder.name]
    for md_file in folder.glob('*.md'):
        with md_file.open() as f:
            dashes = 0
            info = {}
            for line in f:
                if dashes == 2:
                    break
                if line.startswith("---"):
                    dashes += 1
                    continue
                tag, value = [s.strip() for s in line.split(":")]
                info[tag] = value
            info["file"] = f"/{md_file.relative_to(PUBLIC_DIR).as_posix()}"
            sub_folder[info["title_slug"]] = info

with (JS_DIR / "titleMap.js").open('w') as f:
    f.write("export default ")
    json.dump(book, f, indent=4)