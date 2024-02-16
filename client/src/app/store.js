import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import authReducer from '../features/user/userSlice'
import {authApi} from "../services/authApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        cart: cartReducer,
        countries: countriesReducer,
        auth: authReducer,
    },

//     WE SET MIDDLEWARE
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});


