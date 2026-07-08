import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// render markdown file content and highlight code blocks
import MDView from '../components/MDView.jsx';
// parse markdown front-matter
import matter from 'gray-matter';

// slug to markdown file mapping database
import titleMap from '../data/titleMap.js'

import InfoBar from '../components/InfoBar.jsx';


// Define rendered component of problem markdown file content
function Problem({ mdfile = "" }) {
  const [mdFileContent, setMDFileContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  if (!mdfile) {
    const path = useLocation().pathname.split('/').filter((x) => x)
    const fileData = path.reduce((curMap, key) => curMap[key], titleMap)
    mdfile = fileData["file"]
  }


  useEffect(() => {
    // Fetch the file from the public directory
    async function fetchMD() {
      try {
        const response = await fetch(`${mdfile}`);
        if (!response.ok) {
          throw new Error(mdfile + " file fetch error");
        }
        const content = await response.text();

        const { data: mdData, content: mdContent } = matter(content);
        setMetaData(mdData);
        setMDFileContent(mdContent);
      } catch (err) {
        console.error("Error loading markdown:", err)
      };
    }
    fetchMD();
  }, [mdfile]);
  

  return (
    <>
      <h1>{metaData.title}</h1>
      <InfoBar {...metaData} />
      <MDView mdContent={mdFileContent} />
    </>
  );
}

export default Problem;