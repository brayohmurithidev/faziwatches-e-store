import React, {useEffect, useRef, useState} from "react";
import Toolbar from "../components/Toolbar";
import {Divider} from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MenuDrawer from "../components/MenuDrawer";
import {Home, Shop} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

const menus = [
    {
        name: "Home",
        icon: <Home/>,
        url: "/",
    },
    {
        name: "Shop",
        icon: <Shop/>,
        url: "/products",
    },
];

const MainLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const topMostSectionRef = useRef(null)

    useEffect(() => {
        if (topMostSectionRef.current) {
            const sectionHeight = topMostSectionRef.current.clientHeight;
            console.log('Header height ', sectionHeight)
        }
    }, [topMostSectionRef]);

    return (
        <>
            <div className="App">
                <div className='topmost-section' ref={topMostSectionRef}>
                    <Toolbar/>
                    <Divider sx={{backgroundColor: "var(--lightGray-color)"}}/>
                    {/*HEADER SECTION*/}
                    <Header/>
                    {/*NAVBAR SECTION*/}
                    <Navbar menus={menus} open={openDrawer} setOpen={setOpenDrawer}/>
                </div>

                <Outlet/>
                <Footer/>
            </div>
            <MenuDrawer menus={menus} open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    );
};

export default MainLayout;
