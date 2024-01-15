import React from "react";
import { IconButton } from "@mui/material";
import {
  FavoriteBorder,
  LocalMall,
  Person,
  ShoppingBasket,
} from "@mui/icons-material";

const CounterIcon = () => {
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
        <IconButton>
          <div className="mainIcon">
            <div className="icon">
              <ShoppingBasket sx={{ color: "#fff" }} />
            </div>
            <div className="counterWrapper">
              <span>10</span>
            </div>
          </div>
          <p className="cart-totals">$0.00</p>
        </IconButton>
      </div>
    </div>
  );
};

export default CounterIcon;
