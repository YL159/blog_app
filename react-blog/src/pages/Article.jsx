import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// render markdown file content and highlight code blocks
import MDView from '../components/MDView.jsx';
// parse markdown front-matter
import matter from 'gray-matter';

// slug to markdown file mapping database
import titleMap from '../data/titleMap.js'

import InfoBar from '../components/InfoBar.jsx';


// Define rendered component of problem markdown file content
function Article() {
  const [mdFileContent, setMDFileContent] = useState('Loading...');
  const [metaData, setMetaData] = useState({});

  // Get md file by current path in titleMap database
  const path = useLocation().pathname.split('/').filter((x) => x)
  const fileData = path.reduce((curMap, key) => curMap[key], titleMap)
  const mdfile = fileData["file"]
  console.log(path, mdfile)

  const { slug } = useParams();
  console.log("Problem.jsx: slug = ", slug, " mdfile = ", mdfile);

  useEffect(() => {
    // Fetch the file from the public directory
    async function fetchMD() {
      try {
        const response = await fetch(`${mdfile}`);
        if (!response.ok) {
          throw new Error(mdfile + " file fetch error");
        }
        const content = await response.text();

        const { data: mdData, content: mdContent, matter: mat } = matter(content);
        setMetaData(mdData);
        setMDFileContent(mdContent);
        console.log("metaData is ", mdData)
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