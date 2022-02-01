import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import apiSlice from "./api-slice";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    api: apiSlice.reducer,
    ui: uiSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
