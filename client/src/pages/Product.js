import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Rating, Typography} from "@mui/material";
import ProductImage from "../components/ProductImage";
import TabsPanel from "../components/TabsPanel";
import {AddShoppingCartSharp} from "@mui/icons-material";
// import ProductGridItem from "../components/ProductGridItem";
import Increment from "../components/Increment";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {CART_ADD_ITEM, getCart} from "../features/cart/cartSlice";
import {BASEURL} from "../services/apiService";

const tabsContent = [
    {tabName: "color", tabContent: "My colors"},
    {tabName: "material", tabContent: "Materials"},
    {tabName: "gender", tabContent: "genders"},
];

const Product = () => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const product = useLoaderData().data;
    const dispatch = useDispatch();
    const items = useSelector(getCart);

    const productDesc = [
        {tabName: "Description", tabContent: product?.description},
        {tabName: "Reviews (0)", tabContent: "Reviews"},
    ];

    useEffect(() => {
        if (items.find((item) => item._id === product._id)) {
            setIsAddedToCart(true);
        }
    }, [product, items]);

    // HANDLE ADD TO CART
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
        <Box
            sx={{padding: "20px", backgroundColor: "var(--card-background-color)"}}
        >
            <Grid sx={{padding: "30px"}} container spacing={2}>
                <Grid item xs={12} md={6}>
                    <ProductImage images={product?.images}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">PRODUCT ID: {product?._id}</Typography>
                    <Typography variant="h4" sx={{fontWeight: 700}}>
                        {product?.productName}
                    </Typography>
                    {/*{product?.categories?.map(category)}*/}
                    <Typography
                        variant="h6"
                        sx={{color: "#333333", fontSize: "14px", marginY: "5px"}}
                    >
                        {product?.categories?.join(", ")}
                    </Typography>
                    {product?.otherAttributes?.rating >= 1 && (
                        <Rating
                            name="read-only"
                            value={product?.otherAttributes?.rating}
                            readOnly
                        />
                    )}
                    <div
                        style={{
                            padding: "10px 0",
                            borderBottom: "2px solid var(--lightGray-color)",
                            borderTop: "2px solid var(--lightGray-color)",
                        }}
                    >
                        <Typography variant="h5" sx={{fontWeight: 600}}>
                            ${product?.price.regular}
                        </Typography>
                        {product?.price?.discounted && (
                            <Typography
                                variant="h6"
                                sx={{display: "flex", alignItems: "center", gap: "10px"}}
                            >
                                <strike>${product?.price?.discounted} </strike>
                                <span
                                    style={{
                                        backgroundColor: "var(--primary-color)",
                                        fontSize: "10px",
                                        padding: "3px 5px",
                                    }}
                                >
                  -20% OFF
                </span>
                            </Typography>
                        )}
                    </div>
                    <TabsPanel content={tabsContent}/>
                    <div style={{width: "80%", margin: "10px auto"}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                                <div
                                    style={
                                        !isAddedToCart ? {display: "none"} : {display: "block"}
                                    }
                                >
                                    <Increment
                                        product={items.find((item) => item._id === product._id)}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={10}>
                                {" "}
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    sx={{backgroundColor: "var(--primary-color)"}}
                                    startIcon={<AddShoppingCartSharp/>}
                                    className="btn"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!!isAddedToCart}
                                >
                                    ADD TO CART
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div>
                <TabsPanel content={productDesc}/>
            </div>
            {/*  FEATURED PRODUCTS*/}
            <div>
                <Typography variant="h5">FEATURED PRODUCTS</Typography>
                <Grid
                    container
                    spacing={2}
                    rowGap={2}
                    alignItems="center"
                    sx={{
                        marginTop: "10px",
                        justifyContent: {md: "left", xs: "center"},
                    }}
                >
                    {/*{products.map((prod, index) => (*/}
                    {/*  <Grid key={index} xs={6} sm={4} md={3} xl={2} item>*/}
                    {/*    <ProductGridItem product={prod} />*/}
                    {/*  </Grid>*/}
                    {/*))}*/}
                </Grid>
            </div>
        </Box>
    );
};

export default Product;

export const productLoader = async ({params}) => {
    const {id} = params;
    const res = await axios.get(`${BASEURL}/products/${id}`);
    if (!res) {
        throw new Response("Product not available", {status: 404});
    }

    return res.data;
};
