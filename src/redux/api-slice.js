import { createSlice } from "@reduxjs/toolkit";


const initialApiState = {
  items: [],
  drinks:[],
  pizzaId:{},
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
    },
    loadPizzaId(state,action){
      state.pizzaId=action.payload.pizzaId
    }
  },
});

export const apiActions = apiSlice.actions;

export default apiSlice;
