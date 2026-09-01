import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getTitle } from '../utils/treeUtils.js';


// File list item component
function FileItem({ node, lvl }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={node.path} sx={{ pl: lvl * 2 }}>
        <ListItemText primary={getTitle(node)} />
      </ListItemButton>
    </ListItem>
  )
}

// Recursive TreeItem for subfolder and file
function TreeItem({ node, lvl = 1 }) {
  const [isOpen, setIsOpen] = useState(lvl === 1);
  const isFolder = Array.isArray(node.children);

  if (!isFolder) {
    return <FileItem node={node} lvl={lvl} />
  }

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const folderDisplay = `${isOpen ? '📂' : '📁'} ${getTitle(node)}`;

  return (
    <Box>
      <ListItemButton onClick={toggleOpen} sx={{ pl: lvl * 2 }}>
        <ListItemText primary={folderDisplay} />
      </ListItemButton>

      {isOpen && node.children.length > 0 && (
        <List component="div" disablePadding>
          {node.children.map((child, idx) => (
            <TreeItem key={child.path || child.folderName || idx}
              node={child}
              lvl={lvl + 1} />
          ))}
        </List>
      )}
    </Box>
  );
}

export default TreeItem;