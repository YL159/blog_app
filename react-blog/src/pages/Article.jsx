import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MDView from '../components/MDView.jsx';
import InfoBar from '../components/InfoBar.jsx';
// parse markdown front-matter
import matter from 'gray-matter';
// slug to markdown file mapping database
import { buildPathMap } from '../utils/treeUtils.js';

const pathMap = buildPathMap();

// Define rendered component of problem markdown file content
export default function Article({ filePath }) {
  const [mdFileContent, setMDFileContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  // Get md file by current path in pathMap database, decode non-ascii chars
  const decodedPath = decodeURIComponent(useLocation().pathname);
  // console.log("decodedPath: ", decodedPath);
  const mdfile = filePath || pathMap[decodedPath]?.file;

  if (!mdfile) {
    return <div>No mathcing file for path: {decodedPath}</div>
  }
  // remove base url tail '/'. mdfile starts with '/'
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    // Fetch the file from the public directory
    async function fetchMD() {
      try {
        const response = await fetch(base + mdfile);
        if (!response.ok) {
          throw new Error(`${mdfile} file fetch error`);
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

  // console.log("metaData is ", metaData)
  return (
    <>
      <h1>{metaData.title}</h1>
      <InfoBar {...metaData} />
      <MDView mdContent={mdFileContent} />
    </>
  );
}
