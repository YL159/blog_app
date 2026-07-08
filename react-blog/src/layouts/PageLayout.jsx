import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Box,  } from "@mui/material";
import titleMap from "../data/titleMap";



function PageLayout() {
  return (
    <>
      <SideBar />
      <div>
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  )
}

export default PageLayout