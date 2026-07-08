import { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';

// Mock Data for demonstration
const articles = [
  { id: 1, title: "Getting Started with React", content: "React is a JavaScript library for building user interfaces..." },
  { id: 2, title: "Mastering Material-UI", content: "MUI provides robust, pre-designed components to speed up development..." },
  { id: 3, title: "Understanding State Management", content: "State in React allows components to create and manage their own data..." },
];

function PageLayout() {
  // Track the currently selected article (defaults to the first one)
  const [selectedArticle, setSelectedArticle] = useState(articles[0]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      
      {/* LEFT PANEL: Article Overview Links */}
      <Box 
        component="aside"
        sx={{ 
          width: { xs: 200, sm: 280, md: 320 }, // Responsive widths
          flexShrink: 0, 
          borderRight: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          overflowY: 'auto'
        }}
      >
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

      {/* RIGHT PANEL: Article Detail Viewer */}

    </Box>
  );
}

export default PageLayout