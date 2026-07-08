import { useMemo } from 'react';
// render markdown file content and highlight code blocks
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
// use global parser to remove html etc. tags
import parse, { domToReact } from 'html-react-parser';


// Define markdown renderer for code block and images

const renderer = new marked.Renderer();

// handle code block highlights
renderer.code = ({ text, lang }) => {
  const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLang }).value;
  return `<pre class="hljs ${validLang}">${highlighted}</pre>`;
}

// render link, added new page and security
renderer.link = ({ href, text }) => {
  return `<a href="${href}" title="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

// render paragraph preserving space and tabs
renderer.paragraph = function ({ tokens }) {
  return `<p class="pre-like">${this.parser.parseInline(tokens)}</p>\n`;
}

// render images
renderer.image = ({ href, title, text }) => {
  return `<img src="${href}" alt="${text}" title="${title}" style="max-width: 100%; height: auto;" />`;
}

// inject renderer into marked
marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
});


function MDView({ mdContent }) {

  const mdStr = useMemo(() => {
    // Remove html, head, body tags from the parsed content
    return parse(marked.parse(mdContent), {
      replace: (domNode) => {
        if (domNode.name === 'html' || domNode.name === 'head' || domNode.name === 'body') {
          return <>{domToReact(domNode.children)}</>
        }
      }
    });
  }, [mdContent]);
  return (
    <div>
      {mdStr}
    </div>
  );
}

export default MDView;