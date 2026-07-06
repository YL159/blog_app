import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// render markdown file content and highlight code blocks
import MDView from '../components/MDView.jsx';
// parse markdown front-matter
import matter from 'gray-matter';

// slug to markdown file mapping database
import titleMap from '../data/titleMap.js'

import InfoBar from '../components/InfoBar.jsx';

// Define rendered component of problem markdown file content


function Problem({ mdfile = "" }) {
  const [htmlContent, setHtmlContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  if (!mdfile) {
    const { slug } = useParams();
    mdfile = titleMap.problems[slug];
  }
  // console.log("ProblemMD: mdfile = ", mdfile);

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
        setHtmlContent(mdContent);
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
      <MDView mdContent={htmlContent} />
    </>
  );
}

export default Problem;