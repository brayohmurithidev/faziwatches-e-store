import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { Card, Divider, Grid, Paper } from "@mui/material";
import Header from "./Header";
import Navbar from "./Navbar";
import MenuDrawer from "./MenuDrawer";
import { Home, Settings, Shop } from "@mui/icons-material";
import HeroSection from "./HeroSection";
import HeroCard from "./HeroCard";
import image1 from "../assets/images/2.png";
import image2 from "../assets/images/15.png";
import image3 from "../assets/images/3.png";
import ProductGridItem from "./ProductGridItem";
import prod1 from "../assets/images/22.png";
import prod2 from "../assets/images/619.png";
import prod3 from "../assets/images/black_men_watch.png";
import prod4 from "../assets/images/3.png";

const products = [
  {
    name: "Gold fancy lady slim watch",
    image: prod1,
    category: ["Ladies", "Watches"],
    price: "$100.00",
    gallery: [],
  },
  {
    name: "Silver slim Watch",
    image: prod2,
    category: ["Men", "Watches"],
    price: "$117.00",
    gallery: [],
  },
  {
    name: "Leather Quality watch",
    image: prod3,
    category: ["Men", "Watches"],
    price: "$78.00",
    gallery: [],
  },
  {
    name: "Army metrics watch",
    image: prod4,
    category: ["Men", "Watches"],
    price: "$163.00",
    gallery: [],
  },
];

const menus = [
  {
    name: "Home",
    icon: <Home />,
    url: "#",
  },
  {
    name: "About",
    icon: <Settings />,
    url: "#",
  },
  {
    name: "Shop",
    icon: <Shop />,
    url: "#",
  },
];

const productCategories = ["Watches", "Men", "Ladies", "Smart Watches"];

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [productCategory, setProductCategory] = useState("Men");

  return (
    <>
      <Paper elevation={5} className="App">
        <Toolbar />
        <Divider sx={{ backgroundColor: "var(--lightGray-color)" }} />
        <Header />
        <Navbar menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
        <HeroSection />
        <Grid
          sx={{ width: "90%", margin: "-60px auto 60px auto" }}
          container
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <HeroCard image1={image1} bgColor="#191919" />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            <HeroCard image1={image2} bgColor="var(--desertSand-color)" />
          </Grid>
          <Grid item xs={12} md={4}>
            <HeroCard
              image1={image3}
              bgColor="var(--seashell-color)"
              color="var(--lightGray-color)"
            />
          </Grid>
        </Grid>
        {/* BEST SELLING*/}
        <div className="best-selling-section section">
          <div className="title-wrapper">
            <h3>BEST SELLERS</h3>
            <div className="categories-sort">
              <ul>
                {productCategories.map((cat, index) => (
                  <li key={index}>
                    <a
                      style={{
                        color:
                          productCategory == cat
                            ? "var(--desertSand-color)"
                            : "color: var(--white-color)",
                      }}
                      onClick={() => setProductCategory(cat)}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/*<div className="best-selling-product-wrapper">*/}
          <Grid
            container
            spacing={2}
            rowGap={2}
            alignItems="center"
            sx={{
              marginTop: "10px",
              justifyContent: { md: "left", xs: "center" },
            }}
          >
            {products
              .filter((prod) => prod.category.includes(productCategory))
              .map((prod, index) => (
                <Grid key={index} xs={6} md={4} lg={2} item>
                  <ProductGridItem
                    image={prod.image}
                    price={prod.price}
                    title={prod.name}
                    category={prod.category}
                  />
                </Grid>
              ))}
          </Grid>
          {/*</div>*/}
        </div>
      </Paper>
      <MenuDrawer menus={menus} open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Layout;
