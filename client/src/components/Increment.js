import React from "react";
import { IconButton } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ITEM_DECREMENT, ITEM_INCREMENT } from "../features/cart/cartSlice";

const Increment = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="item-counter">
      <IconButton onClick={() => dispatch(ITEM_INCREMENT(product._id))}>
        <ArrowDropUp />
      </IconButton>

      <p>{product?.count}</p>
      <IconButton
        onClick={() =>
          product?.count === 1 ? null : dispatch(ITEM_DECREMENT(product._id))
        }
      >
        <ArrowDropDown />
      </IconButton>
    </div>
  );
};

export default Increment;
