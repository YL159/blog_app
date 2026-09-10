import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getTitle } from '../utils/treeUtils.js';

// set # of folder items to display before adding scrollbar
const MAX_DISPLAY_ITEMS = 15

const buttonSx = (lvl) => ({
  pl: lvl * 1.5,
  py: '2px',
})

// File list item component
function FileItem({ node, lvl }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={node.path} sx={buttonSx(lvl)}>
        <ListItemText className='file-txt' primary={getTitle(node)} />
      </ListItemButton>
    </ListItem>
  )
}

// Recursive TreeItem for subfolder and file
export default function TreeItem({ node, lvl = 0 }) {
  const [isOpen, setIsOpen] = useState(lvl === 1);
  const isFolder = Array.isArray(node.children);
  
  if (!isFolder) {
    return <FileItem node={node} lvl={lvl} />
  }

  
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const folderDisplay = `${isOpen ? '📂' : '📁'} ${getTitle(node)}`;
  const needScroll = node.children.length > MAX_DISPLAY_ITEMS;

  return (
    <Box>
      <ListItemButton onClick={toggleOpen} sx={buttonSx(lvl)}>
        <ListItemText className='folder-txt' primary={folderDisplay} />
      </ListItemButton>

      {isOpen && node.children.length > 0 && (
        <Box sx={ needScroll ? { maxHeight: '50dvh', overflowY: 'auto'} : {}}>
          <List component="div" disablePadding>
            {node.children.map((child, idx) => (
              <TreeItem key={child.path || child.folderName || idx}
              node={child}
              lvl={lvl + 1} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
