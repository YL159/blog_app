import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, } from "@mui/material";
import SideBar from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";


export default function PageLayout() {
  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      minHeight: '100vh', 
      boxSizing: 'border-box'}}>

      {/* Left Sidebar, fixed */}
      <SideBar />

      {/* main content display */}
      <Box component="main" id="main-content">
        <Breadcrumbs />
        <Outlet />
        <Footer/>
      </Box>
    </Box>
  )
}
