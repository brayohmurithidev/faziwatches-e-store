import React from "react";
import { Paper } from "@mui/material";

const ProductGridItem = (props) => {
  return (
    <Paper elevation={2} className="product-item-wrapper">
      {/*    category*/}
      <div className="product-item-content">
        {/*IMage*/}
        <img src={props.image} width="60%" alt={props.title} />
        <p>
          {props.category.map((cat, index) => (
            <span key={index}>{cat} </span>
          ))}
        </p>
        {/*    Title*/}
        <h4>{props.title}</h4>
        {/*    Price*/}
        <h6>{props.price}</h6>
        {/*    Add to cart*/}
        <button>Add To Cart</button>
      </div>
    </Paper>
  );
};

export default ProductGridItem;
