import { createSlice } from "@reduxjs/toolkit";

const initialCartSlice = {
  cartItems: [],
  cartIsShown: false,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
      importItemToCart(state, action){
        const newItem=action.payload
         const updatedTotalAmount=state.totalAmount+newItem.price*newItem.quantity;
          const existingCartItemIndex=state.cartItems.findIndex((item)=>item.id===newItem.id)
          const existingCartItem=state.cartItems[existingCartItemIndex];
          let updatedItems
          if(existingCartItem){
              const updatedItem= {
                  ...existingCartItem,
                  quantity:existingCartItem.quantity+newItem.quantity,
              }
              updatedItems=[...state.cartItems]
              updatedItems[existingCartItemIndex]=updatedItem
          }else{
              updatedItems=state.cartItems.concat(newItem)
          }
          return{
              cartItems:updatedItems,
              totalAmount:updatedTotalAmount
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
        state.totalAmount=state.totalAmount+existingItem.price
      }
    },
    decrementItem(state, action) {
      const removableItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === removableItem
      );
      if (existingItem.quantity === 1) {
       state.cartItems= state.cartItems.filter((item) => item.id !== removableItem);
       state.totalAmount=state.totalAmount-existingItem.price
      } else {
        existingItem.quantity--;
        // existingItem.total = existingItem.total - existingItem.price;
        state.totalAmount=state.totalAmount-existingItem.price
      }
    },
    toggleCart(state) {
      state.cartIsShown = !state.cartIsShown;
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
