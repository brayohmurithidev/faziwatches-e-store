import React, { useState } from "react";
import { Box, Grid, IconButton, Input } from "@mui/material";
import { Add, ArrowDropDown, ArrowDropUp, Remove } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ITEM_DECREMENT, ITEM_INCREMENT } from "../features/cart/cartSlice";

const Increment = ({ product }) => {
  const [value, setValue] = useState(product?.count);
  const dispatch = useDispatch();

  return (
    <div className="item-counter">
      <IconButton onClick={() => dispatch(ITEM_INCREMENT(product.id))}>
        <ArrowDropUp />
      </IconButton>

      <p>{product?.count}</p>
      <IconButton
        onClick={() =>
          product?.count === 1 ? null : dispatch(ITEM_DECREMENT(product.id))
        }
      >
        <ArrowDropDown />
      </IconButton>
    </div>
  );
};

export default Increment;
