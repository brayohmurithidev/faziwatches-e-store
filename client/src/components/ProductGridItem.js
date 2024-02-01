import React, { useState } from "react";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// IMAGES IMPORT
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { CART_ADD_ITEM } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductGridItem = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (prod) => {
    dispatch(
      CART_ADD_ITEM({
        _id: prod._id,
        image: prod.images[0],
        productName: prod.productName,
        price: prod.price.regular,
        count: 1,
      }),
    );
    setIsAddedToCart(true);
  };

  return (
    <Paper elevation={3} className="product-item-wrapper">
      <Link to={`/products/${product?._id}`}>
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
        >
          {product?.isFeatured && (
            <Typography
              sx={{
                position: "absolute",
                top: 5,
                right: 2,
                backgroundColor: "red",
                padding: "3px 5px",
                color: "#fff",
                transform: "perspective(10px) rotateX(1deg)",
              }}
            >
              Featured
            </Typography>
          )}
        </Box>
      </Link>
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
        <Link to={`/products/${product?._id}`} style={{ color: "#fff" }}>
          <Typography>{product?.productName}</Typography>
        </Link>
        <Typography sx={{ color: "var(--primary-color)" }}>
          ${product?.price.regular}
        </Typography>
        {/*Price before*/}
        {product?.price?.discounted && (
          <Typography sx={{ fontSize: "12px" }}>
            <strike>${product?.price.discounted}</strike>
          </Typography>
        )}

        <Button
          disabled={!!isAddedToCart}
          sx={{
            color: "var(--white-color)",
            marginTop: "10px",
            "&:hover": {
              color: "var(--primary-color)",
              backgroundColor: "transparent",
            },
          }}
          startIcon={<AddShoppingCart />}
          onClick={() => handleAddToCart(product)}
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
    </Paper>
  );
};

export default ProductGridItem;
