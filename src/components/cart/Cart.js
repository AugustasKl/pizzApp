import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useSelector } from "react-redux";
import { useState } from "react";

const Cart = () => {
  let message=<p>Your cart is currently empty</p>
  const [cartMessage, setCartMessage]=useState(true)
  const cartData=useSelector((state)=> state.cart)
  
    console.log(cartData)
    const dispatch=useDispatch()
    const closeButtonHandler=()=>{
        dispatch(cartActions.toggleCart())
    }
    const fixedCartDataAmount =cartData.totalAmount.toFixed(2)
  return (
    <Modal>
      <div className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <div className={classes.seperator} />
        <ul>
         {cartData.cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
              />
            );
          })}
        </ul>
        <div className={classes.total}>
          <span className={classes.amount}>Total Amount </span>
          <span>{fixedCartDataAmount} €</span>
        </div>
        <div className={classes.actions}>
          <button className={classes.close} onClick={closeButtonHandler}>Close</button>
          <button className={classes.order}>Order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
