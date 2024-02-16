import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import authReducer from '../features/user/userSlice'
import {authApi} from "../services/authApi";
// PERSIST IMPORTS
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth', authApi.reducerPath, 'countries'],
    version: 1,
    serialize: (data) => JSON.stringify(data), // default serialization
    deserialize: (data) => JSON.parse(data), // default deserialization
}

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
    countries: countriesReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
//     WE SET MIDDLEWARE
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export const persistor = persistStore(store)


