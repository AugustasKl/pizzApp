import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import apiSlice from './api-slice'

const store = configureStore({
    reducer:{cart:cartSlice.reducer, auth:authSlice.reducer, api:apiSlice.reducer,}
})

export default store