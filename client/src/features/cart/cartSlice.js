import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

//declare slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_ADD_ITEM: (state, action) => {
      const exists = state.cart.find((item) => item._id === action.payload._id);
      if (exists) {
        exists.count = exists.count + 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    CART_DELETE_ITEM: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    ITEM_INCREMENT: (state, action) => {
      const prodToIncrement = state.cart.find(
        (item) => item._id === action.payload,
      );
      prodToIncrement.count += 1;
    },
    ITEM_DECREMENT: (state, action) => {
      const prodToIncrement = state.cart.find(
        (item) => item._id === action.payload,
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
