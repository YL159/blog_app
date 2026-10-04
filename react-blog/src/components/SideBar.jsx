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
    <>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="h6" fontWeight="bold">Contents</Typography>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <TreeItem node={fileMap} />
      </Box>
    </>
  )

  return (
    <aside>
      {/* Floating Action Button for phone (xs)*/}
      <Fab
        variant='extended'
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: 'none' },
          position: 'fixed',
          bottom: '1rem',
          left: '1rem'
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
            '& .MuiDrawer-paper': { minWidth: '40vw', maxWidth: '65vw' },
          }}
          slotProps={{ root: { keepMounted: true } }}>
          {drawer}
        </Drawer>

        {/* Permanent Drawer for bigger screen */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}>
          {drawer}
        </Drawer>

      </Box>

    </aside>
  );
}
