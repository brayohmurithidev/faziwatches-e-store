import React from "react";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// IMAGES IMPORT
import img1 from "../assets/images/2.png";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";

const ProductGridItem = ({ product }) => {
  return (
    <Paper elevation={3} className="product-item-wrapper">
      <Link to={`/products/${product?.id}`}>
        <Box
          className="product-item-image"
          sx={{
            backgroundImage: `url(${product?.images[0]})`,
            height: "200px",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgb(255, 255, 255)",
            backgroundSize: "cover",
            position: "relative",
          }}
        ></Box>
        <Box
          sx={{
            // height: "45%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            padding: "24px 8px 8px",
            color: "var(--white-color)",
            lineHeight: "18px",
            gap: "0.1rem",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", textAlign: "center", color: "#333" }}
          >
            {product?.categories?.toString()}
            {/*{product?.categories.map((cat, index) => (*/}
            {/*  <span key={index}>{cat} </span>*/}
            {/*))}*/}
          </Typography>
          <Typography>{product?.title}</Typography>
          <Typography sx={{ color: "var(--primary-color)" }}>
            ${product?.price}
          </Typography>
          {/*Price before*/}
          <Typography sx={{ fontSize: "12px" }}>
            <strike>Ksh. 4,820</strike>
          </Typography>
          <Button
            sx={{
              color: "var(--white-color)",
              marginTop: "10px",
              "&:hover": {
                color: "var(--primary-color)",
                backgroundColor: "transparent",
              },
            }}
            startIcon={<AddShoppingCart />}
          >
            Add To Cart{" "}
          </Button>

          <IconButton
            sx={{
              position: "absolute",
              top: "-16px",
              right: "11px",
              borderRadius: "50%",
              backgroundColor: "var(--card-background-color)",
            }}
          >
            <FavoriteBorder
              sx={{
                color: "var(--primary-color)",
              }}
            />
          </IconButton>
        </Box>
      </Link>

      {/*    category*/}
      {/*<div className="product-item-content">*/}
      {/*  /!*IMage*!/*/}
      {/*  <Box onClick={() => handleClick(product)}>*/}
      {/*    <img src={product?.images[0]} width="60%" alt={product?.title} />*/}
      {/*    <p>*/}
      {/*      {product?.categories.map((cat, index) => (*/}
      {/*        <span key={index}>{cat} </span>*/}
      {/*      ))}*/}
      {/*    </p>*/}
      {/*    /!*    Title*!/*/}
      {/*    <h4>{product?.title}</h4>*/}
      {/*    /!*    Price*!/*/}
      {/*    <h6>{product?.price}</h6>*/}
      {/*  </Box>*/}

      {/*  /!*    Add to cart*!/*/}
      {/*  <button>Add To Cart</button>*/}
      {/*</div>*/}
    </Paper>
  );
};

export default ProductGridItem;
