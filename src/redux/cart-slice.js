import { createSlice } from "@reduxjs/toolkit";

const initialCartSlice = {
  cartItems: [],
  cartIsShown: false,
  
  cartMessage:false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
      importItemToCart(state, action){
        const newItem=action.payload
          const existingCartItemIndex=state.cartItems.findIndex((item)=>item.id===newItem.id)
          const existingCartItem=state.cartItems[existingCartItemIndex];
          let updatedItems
          if(existingCartItem){
            const updatedItem= {
              ...existingCartItem,
              quantity:existingCartItem.quantity+newItem.quantity,
              total:existingCartItem.total +(newItem.quantity*newItem.price)
            }
              updatedItems=[...state.cartItems]
              updatedItems[existingCartItemIndex]=updatedItem
          }else{
              updatedItems=state.cartItems.concat(newItem)
          }
          return{
              cartItems:updatedItems,
          }
      },
    incrementItem(state, action) {
     
      const exItem = action.payload;
      const existingItem= state.cartItems.find(
        (item) => item.id === exItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total= existingItem.price*existingItem.quantity
       
      }
    },
    decrementItem(state, action) {
      
      const removableItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === removableItem
      );
      if (existingItem.quantity === 1) {
       state.cartItems= state.cartItems.filter((item) => item.id !== removableItem);
     
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
        
      }
    },
    toggleCart(state) {
      state.cartIsShown = !state.cartIsShown;
    },
  cartMessage(state){
    state.cartMessage=!state.cartMessage
  },
  replaceCart(state,action){
  state.cartItems=action.payload.cartItems
  },
 }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
