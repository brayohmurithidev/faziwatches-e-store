import React, { useState } from "react";
import Toolbar from "./Toolbar";
import { Divider, Paper } from "@mui/material";
import Header from "./Header";
import Navbar from "./Navbar";
import MenuDrawer from "./MenuDrawer";
import { Home, Settings, Shop } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ProductDrawer from "./ProductDrawer";

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

const Layout = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Paper elevation={5} className="App">
        <Toolbar />
        <Divider sx={{ backgroundColor: "var(--lightGray-color)" }} />
        {/*HEADER SECTION*/}
        <Header />
        {/*NAVBAR SECTION*/}
        <Navbar menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
        <Outlet />
        <Footer />
      </Paper>
      <MenuDrawer menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
      <ProductDrawer open={props.open} setOpen={props.setOpen} />
    </>
  );
};

export default Layout;
