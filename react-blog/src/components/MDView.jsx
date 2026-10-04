import { useMemo } from 'react';
// render markdown file content and highlight code blocks
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
// use global parser to remove html etc. tags
import parse from 'html-react-parser';
import { Box } from '@mui/material';


// Define markdown renderer
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

// render paragraph
renderer.paragraph = function ({ tokens }) {
  return `<p>${this.parser.parseInline(tokens)}</p>\n`;
}

// render images
renderer.image = ({ href, title, text }) => {
  return `<img src="${href}" alt="${text}" title="${title}" />`;
}

// inject renderer into marked
marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
});

export default function MDView({ mdContent }) {
  // memo, marked parse content into tagged content str, then parse into react obj
  const mdStr = useMemo(() => parse(marked.parse(mdContent)), [mdContent]);

  return (
    <>
      {mdStr}
    </>
  );
}
