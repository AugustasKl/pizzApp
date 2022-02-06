import { createSlice } from "@reduxjs/toolkit";

const initialOrderSlice = {
  name: "",
  address: "",
  city: "",
  orderIsShown: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderSlice,
  reducers: {
    nameHandler(state, action) {
      state.name = action.payload.name;
    },
    addressHandler(state, action) {
      state.address = action.payload.address;
    },
    cityHandler(state, action) {
      state.city = action.payload.city;
    },
    toggleOrderHandler(state, action) {
      state.orderIsShown = action.payload.orderIsShown;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
