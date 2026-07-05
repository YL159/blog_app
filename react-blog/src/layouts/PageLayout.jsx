import {Link, Outlet} from "react-router-dom";
import SideBar from "../components/SideBar";
import { Box } from "@mui/material";

function PageLayout() {
  return (
    <>
      <header>Under Problem folder</header>
      <SideBar />
      <Outlet />
    </>
  )
}

export default PageLayout