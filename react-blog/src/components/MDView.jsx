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
renderer.code = ({text, lang}) => {
  const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLang }).value;
  return `<pre class="hljs ${validLang}">${highlighted}</pre>`;
}

// render link as usual, added new page and security
renderer.link = ({href, text}) => {
  return `<a href="${href}" title="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

// const renderer = {
//   paragraph(text) {
//     // render link as usual
//     if (text.tokens.some(t => t.type === 'link')) {
//       return `<p>${this.parser.parseInline(text.tokens)}</p>`
//     }
//     // render paragraph preserving space and tabs
//     return `<p class="pre-like">${text.text}</p>\n`;
//   }
// };

// marked.use({ renderer });

renderer.paragraph = function ({tokens, text}) {
  // render link as usual
  if (tokens.some(t => t.type === 'link')) {
    return `<p>${this.parser.parseInline(tokens)}</p>`
    }
    // render paragraph preserving space and tabs
    return `<p class="pre-like">${text}</p>\n`;
  }

// render images
renderer.image = ({href, title, text}) => {
  return `<img src="${href}" alt="${text}" title="${title}" style="max-width: 100%; height: auto;" />`;
}

// inject renderer into marked
marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
});


function MDView({ mdContent }) {

  const contentEle = useMemo(() => {
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
      {contentEle}
    </div>
  );
}

export default MDView;