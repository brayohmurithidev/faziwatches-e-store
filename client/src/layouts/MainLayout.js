import React, { useState } from "react";
import Toolbar from "../components/Toolbar";
import { Divider } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MenuDrawer from "../components/MenuDrawer";
import { Home, Settings, Shop } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const menus = [
  {
    name: "Home",
    icon: <Home />,
    url: "/",
  },
  {
    name: "About",
    icon: <Settings />,
    url: "/about",
  },
  {
    name: "Shop",
    icon: <Shop />,
    url: "/shop",
  },
];

const MainLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="App">
        <Toolbar />
        <Divider sx={{ backgroundColor: "var(--lightGray-color)" }} />
        {/*HEADER SECTION*/}
        <Header />
        {/*NAVBAR SECTION*/}
        <Navbar menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
        <Outlet />
        <Footer />
      </div>
      <MenuDrawer menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default MainLayout;
