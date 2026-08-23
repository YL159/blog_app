from pathlib import Path
import json

MARKDOWN_DIR = Path('./react-blog/public/')
PUBLIC_DIR = Path('./react-blog/public/')
JS_DIR = Path('./react-blog/src/data/')

# record markdown file's properties as dict
# guarantees "title_slug" & "file" property
def file_prop(path: Path) -> dict:
    with path.open() as f:
        info = {}
        dashes = 0
        for line in f:
            if dashes == 2:
                break
            if line.startswith("---"):
                dashes += 1
                continue
            tag, value = [s.strip() for s in line.split(":")]
            info[tag] = value

        # title slug derives from title (English), ready for url slug
        info["title_slug"] = info["title"].lower().replace(' ', '-')
        # file path relative to public dir, ready for front end fetch
        info["file"] = f"/{path.relative_to(PUBLIC_DIR).as_posix()}"
        return info


# recursively traverse markdown dir
# create dict with folder/file structure
def recur_files(root: Path, current: dict) -> None:
    for md_file in root.glob('*.md'):
        info = file_prop(md_file)
        current[info["title_slug"]] = info

    for folder in root.glob('*/'):
        sub_folder = {}
        current[folder.name] = sub_folder
        recur_files(folder, sub_folder)
        

book = {}
recur_files(MARKDOWN_DIR, book)

with (JS_DIR / "titleMap.js").open('w') as f:
    f.write("export default ")
    json.dump(book, f, indent=4)