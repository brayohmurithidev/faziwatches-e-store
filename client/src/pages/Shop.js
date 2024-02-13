import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import ProductGridItem from "../components/ProductGridItem";

const Shop = () => {
  let products = useLoaderData();
  const [sort, setSort] = useState("");
  const [sorted, setSorted] = useState(products);

  // EXTRACT CATEGORIES
  const categories = [
    ...new Set(products?.map((prod) => prod.categories).flat()),
  ];

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const search = new URL(document.location).searchParams.get("search");

  useEffect(() => {
    // GET SEARCH PARAMS

    const fetchprod = async () => {
      const res = await axios.get(
        search
          ? `http://localhost:8000/api/products?search=${search}`
          : `http://localhost:8000/api/products`,
      );
      products = res.data.data;
    };

    fetchprod().catch((e) => e);
  }, [search]);

  useEffect(() => {
    if (sort === "min") {
      setSorted([
        ...products.sort((a, b) => a.price.regular - b.price.regular),
      ]);
    } else if (sort === "max") {
      setSorted([
        ...products.sort((a, b) => b.price.regular - a.price.regular),
      ]);
    } else if (sorted === "") {
      setSorted(products);
    } else if (categories.includes(sort)) {
      setSorted([
        ...products?.filter((prod) => prod?.categories?.includes(sort)),
      ]);
    }
  }, [sort, sorted, products]);

  return (
    <div className="shop-wrapper">
      {/*FILTERS*/}
      <div className="product-filters">
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <p className="product-results">Showing {sorted.length} results</p>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
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
        </Box>
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

export const shopLoader = async (request) => {
  const params = new URL(request.url).searchParams;
  const search = params?.get("search");

  try {
    const res = await axios.get(
      search
        ? `http://localhost:8000/api/products?search=${search}`
        : `http://localhost:8000/api/products`,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
};
