import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { Form, Link } from "react-router-dom";

// payments icons
import mpesa from "../assets/icons/mpesa.png";
import mastercard from "../assets/icons/mastercard.png";
import visa from "../assets/icons/visa.png";
import paypal from "../assets/icons/paypal.png";
import Increment from "../components/Increment";
import { useDispatch, useSelector } from "react-redux";
import { CART_DELETE_ITEM, getCart } from "../features/cart/cartSlice";

const payments = [mpesa, visa, paypal, mastercard];

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [prefferedMethod, setPrefferedMethod] = useState("");
  // GET CARTS
  const items = useSelector(getCart);

  // REMEOVE ITEM
  const handleDelete = (id) => {
    dispatch(CART_DELETE_ITEM(id));
  };

  // USE EFFECT TO CALCULATE TOTAL CASH
  useEffect(() => {
    const total = items.reduce(
      (total, item) => total + item.price * item.count,
      0,
    );
    setTotal(total.toFixed(2));
  }, [items]);

  return (
    <div className="cart">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="cart-items-main">
            <h1>Checkout</h1>
            <Divider sx={{ backgroundColor: "#333" }} />
            {items.length === 0 ? (
              <div>You haven't added anything </div>
            ) : (
              <div className="cart-items-wrapper">
                {items.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <div className="cart-img-text">
                      <div
                        className="item-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="item-content">
                        <h3 className="item-title">{item.productName}</h3>
                        <p className="item-price">${item.price}</p>
                      </div>
                    </div>
                    <div className="item-action">
                      <Increment product={item} />

                      <div className="item-delete">
                        <IconButton onClick={() => handleDelete(item._id)}>
                          <Clear sx={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="back-to-shopping">
              <Link to="/products">
                <Button className="cart-btn">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="checkout-main">
            <h1>CART SUMMARY</h1>
            <Divider />
            <div className="cart-subtotal">
              <div className="subtotals">
                <p>Subtotal</p>
                <p>${total}</p>
              </div>

              <p>Delivery fees not included yet.</p>
            </div>
            <Divider />
            <div className="payment-methods">
              <p>We accept:</p>
              <div
                className="accepted-payments"
                style={{
                  gridTemplateColumns: `repeat(${payments.length}, 1fr)`,
                }}
              >
                {payments?.map((pay, index) => (
                  <div
                    key={index}
                    className="payment-mode"
                    style={{ backgroundImage: `url(${pay})` }}
                  ></div>
                ))}
              </div>
            </div>
            <Divider />
            <div className="checkout-button-wrapper">
              <Button
                onClick={() => setIsLoggedIn(true)}
                sx={{
                  backgroundColor: "var(--accent-color)",
                  color: "var(--white-color)",
                  "&:hover": {
                    color: "#000",
                  },
                }}
                variant="contained"
                fullWidth
                disabled={total === "0.00"}
              >
                Checkout (${total})
              </Button>
            </div>
          </div>

          {/*  PAYMENT*/}
          {isLoggedIn && (
            <div className="payment-processing">
              <div className="select-mode">
                <p>Select Preferred payment:</p>

                <FormControl variant="standard" fullWidth>
                  <InputLabel id="paymentLabel">Preferred Payment</InputLabel>
                  <Select
                    value={prefferedMethod}
                    labelId="paymentLabel"
                    onChange={(e) => setPrefferedMethod(e.target.value)}
                  >
                    {["M-pesa", "Paypal", "MasterCard", "Visa"]?.map(
                      (pay, index) => (
                        <MenuItem key={index} value={pay}>
                          {pay}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </div>

              {/*  Payment details  conditional based on mode selected*/}
              {prefferedMethod !== "" && (
                <div className="payment-details">
                  <Divider />
                  <div className="payment-form">
                    {prefferedMethod === "M-pesa" ? (
                      <Form>
                        <FormControl fullWidth size="small">
                          <TextField
                            type="text"
                            placeholder="e.g 2547016134387"
                          />
                        </FormControl>
                        <Button
                          sx={{
                            backgroundColor: "var(--accent-color)",
                            color: "var(--white-color)",
                            "&:hover": {
                              color: "#000",
                            },
                            marginTop: "10px",
                            textAlign: "center",
                          }}
                          variant="contained"
                        >
                          Pay Now
                        </Button>
                      </Form>
                    ) : (
                      <div className="">
                        <p style={{ marginBottom: "30px" }}>Payment</p>

                        <Form>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              {" "}
                              <FormControl fullWidth size="small">
                                <TextField
                                  label=" Credit Card Numberl"
                                  type="text"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              {" "}
                              <FormControl>
                                <TextField label="Expiry Month" type="text" />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              {" "}
                              <FormControl>
                                <TextField label="Year" type="text" />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              {" "}
                              <FormControl>
                                <TextField label="CVC Code" type="text" />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <p>On the back</p>
                            </Grid>
                          </Grid>

                          <Button
                            sx={{
                              backgroundColor: "var(--accent-color)",
                              color: "var(--white-color)",
                              "&:hover": {
                                color: "#000",
                              },
                              marginTop: "10px",
                              textAlign: "center",
                            }}
                            variant="contained"
                          >
                            Pay Now
                          </Button>
                        </Form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
