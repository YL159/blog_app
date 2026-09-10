import { Outlet } from "react-router-dom";
import { Box, } from "@mui/material";
import SideBar, { drawerWidth } from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";


export default function PageLayout() {
  return (
    <Box sx={{ display: 'flex' }}>

      {/* Left Sidebar, fixed */}
      <SideBar />

      {/* main content display */}
      <Box
        component="main"
        id="main-content"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </Box>
    </Box>
  )
}
