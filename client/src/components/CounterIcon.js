import React from "react";
import {IconButton} from "@mui/material";
import {FavoriteBorder, Person, ShoppingBasket} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCart} from "../features/cart/cartSlice";
import ProfileMenu from "./ProfileMenu";

const CounterIcon = () => {
    const cart = useSelector(getCart);
    const items = cart.cart || cart
    return (
        <div className="CounterIconsWrapper">
            <div className="icon1">
                <IconButton>
                    <div className="mainIcon">
                        <div className="icon">
                            <FavoriteBorder
                                sx={{
                                    color: "#fff",
                                    fontSize: "32px",
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
                            <ShoppingBasket sx={{color: "#fff", fontSize: "32px"}}/>
                        </div>
                        <div className="counterWrapper">
                            <span>{items?.length}</span>
                        </div>
                    </div>
                    <p className="cart-totals">$0.00</p>
                </Link>
            </div>
            <div className="icon1">
                <IconButton className="profile-icon">
                    <Person sx={{color: "#fff", fontSize: "32px"}}/>
                    <div className="dropdown-menu">
                        <ProfileMenu/>
                    </div>
                </IconButton>
            </div>
        </div>
    );
};

export default CounterIcon;
