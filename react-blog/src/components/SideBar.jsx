import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import TreeItem from './TreeItem.jsx';
import fileMap from "../data/fileMap.js"


// const articles = import.meta.glob('public/**/*.md');

export default function SideBar() {

  return (
    <Box component="aside">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Contents</Typography>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: 'auto'}}>
        <TreeItem node={ fileMap } />
      </Box>
    </Box>
  );
}
