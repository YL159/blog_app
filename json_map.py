from pathlib import Path
import json
from datetime import datetime

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
        if "title" not in info:
            print(f'{path.relative_to(PUBLIC_DIR)} has no "title" property')
        else:
            info["title_slug"] = info["title"].lower().replace(' ', '-')
        # file path relative to public dir, ready for front end fetch
        info["file"] = f"/{path.relative_to(PUBLIC_DIR).as_posix()}"
        return info


# recursively traverse markdown dir
# create dict with folder/file structure
def recur_files(root: Path, art: dict, tree: dict) -> None:
    has_id = None
    for md_file in root.glob('*.md'):
        info = file_prop(md_file)
        art[info["title_slug"]] = info
        if has_id is None and "id" in info:
            has_id = True

    # in tree dict, sort problem folder files by id increase
    # other files by created time new -> old
    tree["folderName"] = root.name
    tree["children"] = []
    for value in art.values():
        simple = {
            "path": f"/{root.relative_to(PUBLIC_DIR).as_posix()}/{value["title_slug"]}",
        }
        if "id" in value:
            simple["id"] = int(value["id"])
        else:
            simple["created"] = value["created"]
        tree["children"].append(simple)

    if has_id:
        tree["children"].sort(key=lambda d: d["id"])
    else:
        tree["children"].sort(key=lambda d: datetime.strptime(d["created"], "%Y-%m-%d"))

    
    for folder in sorted(root.glob('*/')):
        sub_folder = {}
        art[folder.name] = sub_folder
        sub_tree = {}
        tree["children"].append(sub_tree)
        recur_files(folder, sub_folder, sub_tree)
        


if __name__ == "__main__":
    articles = {}
    folder_tree = {}
    recur_files(MARKDOWN_DIR, articles, folder_tree)

    with (JS_DIR / "titleMap.js").open('w') as f:
        f.write("export default ")
        json.dump(articles, f, indent=4)
        f.write(";\n\n")

        f.write("export const folderTree = ")
        json.dump(folder_tree, f, indent=4)