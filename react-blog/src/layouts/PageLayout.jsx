import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Box, } from "@mui/material";
import titleMap from "../data/titleMap";



function PageLayout() {
  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      height: '100vh', 
      gap: 5,
      boxSizing: 'border-box'}}>
      {/* Left Sidebar, fixed */}
      <SideBar />
      {/* main content display */}
      <Box component="main" sx={{ flex: 1, overflowY: 'auto'}}>
        <Breadcrumbs />
        <Outlet />
      </Box>
    </Box>
  )
}

export default PageLayout