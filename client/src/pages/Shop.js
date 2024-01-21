import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import ProductGridItem from "../components/ProductGridItem";

const Shop = () => {
  const products = useLoaderData();
  return (
    <Grid container spacing={2} rowGap={2} sx={{ padding: "15px" }}>
      {products.map((product, index) => (
        <Grid item xs={6} sm={4} md={3} xl={2} key={index}>
          <ProductGridItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Shop;

export const shopLoader = async () => {
  const res = await axios.get("http://localhost:4000/products");
  return res.data;
};
