import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import authReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        countries: countriesReducer,
        auth: authReducer
    },
});


