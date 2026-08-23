import { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';

import titleMap from "../data/titleMap.js"

// Mock Data for demonstration
const articles = [
  { id: 1, title: "Getting Started with React", content: "React is a JavaScript library for building user interfaces..." },
  { id: 2, title: "Mastering Material-UI", content: "MUI provides robust, pre-designed components to speed up development..." },
  { id: 3, title: "Understanding State Management", content: "State in React allows components to create and manage their own data..." },
];

// const articles = import.meta.glob('public/**/*.md');


function SideBar() {
  // Track the currently selected article (defaults to the first one)
  const [selectedArticle, setSelectedArticle] = useState(articles[0]);

  return (
      <Box component="aside">
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">Articles</Typography>
        </Box>

        <Divider />
        <List disablePadding>
          {articles.map((article) => (
            <ListItem key={article.id} disablePadding>
              <ListItemButton 
                selected={selectedArticle.id === article.id}
                onClick={() => setSelectedArticle(article)}
                sx={{
                  '&.Mui-selected': {
                    borderRight: '3px solid',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <ListItemText 
                  primary={article.title}  
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

  );
}

export default SideBar;