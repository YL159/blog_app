import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MDView from '../components/MDView.jsx';
import InfoBar from '../components/InfoBar.jsx';
// parse markdown front-matter
import matter from 'gray-matter';
// slug to markdown file mapping database
import { buildPathMap } from '../utils/treeUtils.js';

const pathMap = buildPathMap();

// Define rendered component of problem markdown file content
function Article() {
  const [mdFileContent, setMDFileContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  // Get md file by current path in pathMap database
  const mdfile = pathMap[useLocation().pathname].file

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
        // console.log("metaData is ", mdData)
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

export default Article;