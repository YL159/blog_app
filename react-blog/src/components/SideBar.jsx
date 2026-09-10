import { useState } from 'react';
import { Box, Drawer, Fab, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TreeItem from './TreeItem.jsx';
import fileMap from "../data/fileMap.js"


export const drawerWidth = 280;

export default function SideBar() {
  // MUI responsive Drawer template, with style tweak
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  }

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen((value) => !value);
  };

  const drawer = (
    <Box component="aside">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Contents</Typography>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <TreeItem node={fileMap} />
      </Box>
    </Box>
  )

  return (
    <>
      {/* Floating Action Button for phone (xs)*/}
      <Fab
        variant='extended'
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          display: { sm: 'none' }
        }}
        color='primary'
        aria-label='open drawer'
      >
        <MenuIcon />
      </Fab>

      <Box
        component="nav"
        sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0 } }}
      >
        {/* Temporary Drawer toggle for small screen */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 'auto',
              maxWidth: '80vw'
            },
          }}
          slotProps={{
            root: { keepMounted: true },
          }}>
          {drawer}
        </Drawer>

        {/* Permanent Drawer for bigger screen */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}>
          {drawer}
        </Drawer>

      </Box>

    </>
  );
}
