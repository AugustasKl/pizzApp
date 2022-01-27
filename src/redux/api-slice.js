import { createSlice } from "@reduxjs/toolkit";

const initialApiState = {
  items: [],
  drinks:[]
};
const apiSlice = createSlice({
  name: "api",
  initialState: initialApiState,
  reducers: {
    loadItems(state, action) {
       state.items=action.payload.items
    },
    loadDrinks(state, action){
        state.drinks=action.payload.drinks
    }
  },
});

export const apiActions = apiSlice.actions;

export default apiSlice;
