import React from "react";
import { IconButton } from "@mui/material";
import { FavoriteBorder, Person, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

const CounterIcon = () => {
  const items = useSelector(getCart);
  return (
    <div className="CounterIconsWrapper">
      <div className="icon1">
        <IconButton>
          <Person sx={{ color: "#fff" }} />
        </IconButton>
      </div>
      <div className="icon1">
        <IconButton>
          <div className="mainIcon">
            <div className="icon">
              <FavoriteBorder
                sx={{
                  color: "#fff",
                }}
              />
            </div>
            <div className="counterWrapper">
              <span>0</span>
            </div>
          </div>
        </IconButton>
      </div>
      <div className="icon1">
        <Link to="/cart">
          <div className="mainIcon">
            <div className="icon">
              <ShoppingBasket sx={{ color: "#fff" }} />
            </div>
            <div className="counterWrapper">
              <span>{items.length}</span>
            </div>
          </div>
          <p className="cart-totals">$0.00</p>
        </Link>
      </div>
    </div>
  );
};

export default CounterIcon;
