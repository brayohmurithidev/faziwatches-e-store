import React from "react";
import { Box, Button, Drawer, Grid, Rating, Typography } from "@mui/material";
import TabsPanel from "./TabsPanel";
import { AddShoppingCartSharp } from "@mui/icons-material";
import ProductImage from "./ProductImage";
import { products } from "../utils/products";
import ProductGridItem from "./ProductGridItem";

const tabsContent = [
  { tabName: "color", tabContent: "My colors" },
  { tabName: "material", tabContent: "Materials" },
  { tabName: "gender", tabContent: "genders" },
];

const productDesc = [
  { tabName: "Description", tabContent: "Prod description" },
  { tabName: "Reviews (0)", tabContent: "Reviews" },
];

const drawerWidth = "90vw";
const ProductDrawer = (props) => {
  return (
    <Drawer
      open={props.open}
      sx={{
        width: drawerWidth,
        backgroundColor: "var(--primary-color)",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          // backgroundColor: "var(--primary-color)",
          // color: "var(--white-color)",
        },
      }}
      anchor={"right"}
      onClose={() => props.setOpen(false)}
    >
      <Grid sx={{ padding: "30px" }} container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProductImage />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">STYLE ID: RMA2031</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            SOLITAIRE ENGAGEMENT RINGS PLATINUM
          </Typography>
          <Rating name="read-only" value={4} readOnly />
          <div
            style={{
              padding: "10px 0",
              borderBottom: "2px solid var(--lightGray-color)",
              borderTop: "2px solid var(--lightGray-color)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              $3,000
            </Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <strike>$5000 </strike>
              <span
                style={{
                  backgroundColor: "var(--desertSand-color)",
                  fontSize: "10px",
                  padding: "3px 5px",
                }}
              >
                -20% OFF
              </span>
            </Typography>
          </div>
          <TabsPanel content={tabsContent} />
          <div style={{ width: "80%", margin: "10px auto" }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<AddShoppingCartSharp />}
              className="btn"
            >
              ADD TO CART
            </Button>
          </div>
        </Grid>
      </Grid>

      <div>
        <TabsPanel content={productDesc} />
      </div>
      {/*  FEATURED PRODUCTS*/}
      <div>
        <Typography variant="h5">FEATURED PRODUCTS</Typography>
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
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
