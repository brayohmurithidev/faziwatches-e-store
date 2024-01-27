import { createSlice } from "@reduxjs/toolkit";
import img1 from "../../assets/images/2.png";

const initialState = {
  cart: [
    {
      id: 1,
      image: img1,
      title: "Super Golden Watch- 1",
      price: 120,
      count: 2,
    },
    {
      id: 2,
      image: img1,
      title: "Super Golden Watch - 2",
      price: 120,
      count: 2,
    },
    {
      id: 3,
      image: img1,
      title: "Super Golden Watch - 3",
      price: 120,
      count: 2,
    },
    {
      id: 4,
      image: img1,
      title: "Super Golden Watch - 4",
      price: 120,
      count: 2,
    },
  ],
};

//declare slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_ADD_ITEM: (state, action) => {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.count = exists.count + 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    CART_DELETE_ITEM: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    ITEM_INCREMENT: (state, action) => {
      const prodToIncrement = state.cart.find(
        (item) => item.id === action.payload,
      );
      prodToIncrement.count += 1;
    },
    ITEM_DECREMENT: (state, action) => {
      const prodToIncrement = state.cart.find(
        (item) => item.id === action.payload,
      );

      prodToIncrement.count === 1
        ? (prodToIncrement.count = 1)
        : (prodToIncrement.count -= 1);
    },
  },
});

export const {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  ITEM_INCREMENT,
  ITEM_DECREMENT,
} = cartSlice.actions;
export const getCart = (state) => state.cart.cart;
export default cartSlice.reducer;
