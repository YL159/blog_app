import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import parse, { domToReact } from 'html-react-parser';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import titleMap from '../titleMap.js'

import InfoBar from './InfoBar';

// Define rendered component of problem markdown file content

const marked = new Marked(
  // extension handle code block highlights
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
)

const renderer = {
  paragraph(text) {
    // render link as usual
    if (text.tokens.some(t => t.type === 'link')) {
      return `<p>${this.parser.parseInline(text.tokens)}</p>`
    }
    // render paragraph preserving space and tabs
    return `<p class="pre-like">${text.text}</p>\n`;
  }
};

marked.use({ renderer });


function ProblemMD({ mdfile = "" }) {
  const [htmlContent, setHtmlContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  if (!mdfile) {
    const { slug } = useParams();
    mdfile = titleMap.problems[slug];
  }
  console.log("ProblemMD: mdfile = ", mdfile);

  useEffect(() => {
    // Fetch the file from the public directory
    async function fetchMD() {
      try {
        const response = await fetch(`/problems/${mdfile}`);
        if (!response.ok) {
          throw new Error(mdfile + " file fetch error");
        }
        const content = await response.text();
        const { data: mdData, content: mdContent } = matter(content);

        setMetaData(mdData);
        const contentStr = marked.parse(mdContent);
        const contentEle = parse(contentStr, {
          replace: (domNode) => {
            // Remove html, head, body tags from the parsed content
            if (domNode.name === 'html' || domNode.name === 'head' || domNode.name === 'body') {
              return <>{domToReact(domNode.children)}</>
            }
          }
        });
        setHtmlContent(contentEle);
      } catch (err) {
        console.error("Error loading markdown:", err)
      };
    }
    fetchMD();
  }, [mdfile]);

  return (
    <>
      <h1>{metaData.title}</h1>
      <InfoBar tags={metaData.tags} difficulty={metaData.difficulty} />
      <div>{htmlContent}</div>
    </>
  );
}

export default ProblemMD;