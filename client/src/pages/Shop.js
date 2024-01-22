import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import {
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import ProductGridItem from "../components/ProductGridItem";

const Shop = () => {
  const products = useLoaderData();
  const [sort, setSort] = useState("");
  const [sorted, setSorted] = useState(products);

  // EXTRACT CATEGORIES
  const categories = [
    ...new Set(products?.map((prod) => prod.categories).flat()),
  ];

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    if (sort === "min") {
      setSorted([...products.sort((a, b) => a.price - b.price)]);
    } else if (sort === "max") {
      setSorted([...products.sort((a, b) => b.price - a.price)]);
    } else if (sorted === "") {
      setSorted(products);
    } else if (categories.includes(sort)) {
      setSorted([
        ...products?.filter((prod) => prod?.categories?.includes(sort)),
      ]);
    }
  }, [sort]);

  return (
    <div className="shop-wrapper">
      {/*FILTERS*/}
      <div className="product-filters">
        <p className="product-results">Showing {sorted.length} results</p>

        {/*<div className="filter-select">*/}
        <FormControl variant="standard">
          <InputLabel sx={{ color: "#fff" }} id="sort">
            Sort By
          </InputLabel>
          <Select
            labelId="sort"
            label="Sort By"
            value={sort}
            onChange={handleSort}
          >
            <MenuItem value="defaultSorting">Default Sorting</MenuItem>
            <ListSubheader>Price</ListSubheader>
            <MenuItem value="min">Min</MenuItem>
            <MenuItem value="max">Max</MenuItem>
            <ListSubheader>Categories</ListSubheader>
            {categories?.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*</div>*/}
      </div>
      <Grid container spacing={2} rowGap={2} sx={{ padding: "15px" }}>
        {sorted.map((product, index) => (
          <Grid item xs={12} sm={4} md={3} xl={2} key={index}>
            <ProductGridItem product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Shop;

export const shopLoader = async () => {
  const res = await axios.get("http://localhost:4000/products");
  return res.data;
};
