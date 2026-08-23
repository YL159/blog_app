import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Box, } from "@mui/material";


function PageLayout() {
  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      height: '100vh', 
      boxSizing: 'border-box'}}>

      {/* Left Sidebar, fixed */}
      <SideBar />

      {/* main content display */}
      <Box component="main">
        <Breadcrumbs />
        <Outlet />
      </Box>
    </Box>
  )
}

export default PageLayout