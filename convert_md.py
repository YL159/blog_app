from pathlib import Path
import re
import textwrap
from venv import create
from leetcode_query import query_leet
from datetime import datetime

PROBLEM_DIR = Path('./problems')
MARKDOWN_DIR = Path('./react-blog/public/problems')


# scan ./problems/ for any unrecorded or modified .py files, and convert to .md
def scan_py_files(source: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)

    count = 0
    for py_file in source.glob('*.py'):
        md_file = dest / py_file.with_suffix('.md').name
        if not md_file.exists() or py_file.stat().st_mtime > md_file.stat().st_mtime:
            count += 1
            print(f'Converting {py_file} to {md_file}')
            convert_py_to_md(py_file, md_file)
    print(f'\nConverted {count} .py files to .md files in {dest}')

    # recursively scan subfolder py files
    for folder in source.glob('*/'):
        scan_py_files(folder, dest / folder.name)


# convert .py file to .md file
def convert_py_to_md(py_file: Path, md_file: Path) -> None:
    source = title = info = ''

    with open(py_file, 'r') as f:
        _, front, code = f.read().split("'''\n", 2)
        line1, description = front.split('\n', 1)
        created = datetime.fromtimestamp(py_file.stat().st_birthtime).strftime("%Y-%m-%d")
        # avoid automatic parsing as Date obj later
        created = f'"{created}"'

        # Parse promblem title, source
        if line1.lower().startswith('leetcode') or line1[0].isnumeric():
            title = re.match(r'[\w\s]*\d+\.(.+)', line1).groups()[0]
            title = title.strip()

            title_slug = title.lower().replace(' ', '-')
            q_data = query_leet(title_slug)

            source = f'[{line1}]({q_data.url})'
            info = f'''\
            ---
            id: {q_data.id}
            title: {title}
            title_slug: {title_slug}
            tags: {q_data.tags}
            difficulty: {q_data.difficulty}
            created: {created}
            ---
            '''
        # Not Leetcode question, but from other platform
        elif ':' in line1:
            source, title = re.match(r'(\w+):(.+)', line1).groups()
            title = title.strip()
            info = f'''\
            ---
            title: {title}
            title_slug: {title.lower().replace(' ', '-')}
            created: {created}
            ---
            '''
        # Custom questions
        else:
            title = line1.strip()
            info = f'''\
            ---
            title: {title}
            title_slug: {title.lower().replace(' ', '-')}
            created: {created}
            ---
            '''
        
        info = textwrap.dedent(info)
        # escape # in description to avoid markdown header
        description = description.replace('#', '\\#')

        # keep original code block
        code_md = f'```python\n{code.strip()}\n```'
    
    with open(md_file, 'w') as f:
        source_line = f'{source}\n\n' if source else ''
        f.write(f'{info}{source_line}{description}\n{code_md}\n')




if __name__ == '__main__':

    # scan_py_files(PROBLEM_DIR/'Other', MARKDOWN_DIR/'Other')

    convert_py_to_md(PROBLEM_DIR / 'Leetcode' / '84_Largest_Rectangle_Histo.py', MARKDOWN_DIR / "Leetcode" / '84_Largest_Rectangle_Histo.md')