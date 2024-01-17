import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import { Box, Button, Grid, ImageListItem, ImageList } from "@mui/material";
import HeroCard from "../components/HeroCard";
import image1 from "../assets/images/2.png";
import image2 from "../assets/images/15.png";
import image3 from "../assets/images/3.png";
import ProductGridItem from "../components/ProductGridItem";

import gallery1 from "../assets/images/gallery-1.jpg";
import gallery2 from "../assets/images/gallery-2.jpg";
import gallery3 from "../assets/images/gallery-3.jpg";
import gallery4 from "../assets/images/gallery-4.jpg";
import gallery5 from "../assets/images/gallery-5.jpg";
import gallery6 from "../assets/images/gallery-6.jpg";

import { products } from "../utils/products";
import CountdownSale from "../components/CountdownSale";

const productCategories = ["Watches", "Men", "Ladies", "Smart Watches"];

const days = 2;

const LandingPage = (props) => {
  const [productCategory, setProductCategory] = useState("Watches");
  return (
    <>
      {/*HERO SECTION*/}
      <HeroSection />
      {/*HERO CARD SECTION*/}
      <Grid
        sx={{ width: "90%", margin: "-60px auto 60px auto" }}
        container
        spacing={2}
      >
        <Grid item xs={12} md={4}>
          <HeroCard
            name="NEW COLLECTION"
            link="Shop Collection"
            image1={image1}
            bgColor="#191919"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {" "}
          <HeroCard
            name="SIMPLE ELEGANCE"
            link="Shop Now"
            image1={image2}
            bgColor="var(--desertSand-color)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <HeroCard
            image1={image3}
            name="SPECIAL EDITION"
            link="Explore Product"
            bgColor="var(--seashell-color)"
            color="var(--lightGray-color)"
          />
        </Grid>
      </Grid>
      {/* BEST SELLING SECTION*/}
      <div className="best-selling-section section">
        <div className="title-wrapper">
          <h3>BEST SELLERS</h3>
          <div className="categories-sort">
            <ul>
              {productCategories.map((cat, index) => (
                <li key={index}>
                  <p
                    style={{
                      color:
                        productCategory === cat
                          ? "var(--desertSand-color)"
                          : "color: var(--white-color)",
                    }}
                    onClick={() => setProductCategory(cat)}
                  >
                    {cat}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
          {products.filter((prod) => prod.category.includes(productCategory)) <
          1 ? (
            <h3 style={{ marginTop: "20px" }}>No product found</h3>
          ) : (
            products
              .filter((prod) => prod.category?.includes(productCategory))
              .map((prod, index) => (
                <Grid
                  onClick={() => props.setOpen(true)}
                  key={index}
                  xs={6}
                  md={4}
                  lg={2}
                  item
                >
                  <ProductGridItem
                    image={prod.image}
                    price={prod.price}
                    title={prod.name}
                    category={prod.category}
                  />
                </Grid>
              ))
          )}
        </Grid>
      </div>

      {/*COUNT DOWN SALES*/}
      <CountdownSale />
      {/*  FEATURED PRODUCT SECTION*/}
      <div className="section">
        <div className="title-wrapper">
          <h3>FEATURED PRODUCTS</h3>
        </div>
        <Grid container rowGap={2} sx={{ height: "100%", marginTop: "30px" }}>
          <Grid
            item
            className="clearance-sale"
            md={4}
            sx={{
              maxHeight: "80vh",
              display: " flex",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "red",
              padding: "20px",
            }}
          >
            <h1>CLEARANCE SALE</h1>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {products.map((prod, index) => (
                <Grid key={index} xs={6} md={4} lg={3} item>
                  <ProductGridItem
                    image={prod.image}
                    price={prod.price}
                    title={prod.name}
                    category={prod.category}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/*    GALLERY SECTION*/}
      <Box sx={{ width: "100%", height: "auto", overflowY: "scroll" }}>
        <ImageList
          cols={3}
          gap={8}
          sx={{ "$:hover": { transform: "scale(1.5)" } }}
        >
          {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map(
            (item) => (
              <ImageListItem className="image-gallery-item" key={item}>
                <img
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  alt={item}
                  loading="lazy"
                />
              </ImageListItem>
            ),
          )}
        </ImageList>
      </Box>

      {/*    FOOTER SECTION*/}
      {/*  top footer*/}
    </>
  );
};

export default LandingPage;
