import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Cart = () => { 
  const history=useHistory()
  const cartData=useSelector((state)=> state.cart)
  
  // console.log(cartData.cartMessage)
    console.log(cartData)
    const dispatch=useDispatch()
    const closeButtonHandler=()=>{
        dispatch(cartActions.toggleCart())
    }

    const openLoginHanhler=()=>{
      dispatch(cartActions.toggleCart())
      history.push('/auth')
    }
    const cartTotalAmounFixed=Math.max(cartData.totalAmount,0).toFixed(2)
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
              item={{
                id:item.id,
                title:item.title,
                quantity:item.quantity,
                price:item.price,
              }}
              
              />
            );
          })}
        </ul>
        <div className={classes.total}>
          <span className={classes.amount}>Total Amount </span>
          <span>{cartTotalAmounFixed} €</span>
        </div>
        <div className={classes.actions}>
          <button className={classes.close} onClick={closeButtonHandler}>Close</button>
          <button className={classes.order} disabled={!cartData.cartMessage}>Order</button>
          {!cartData.cartMessage && <p className={classes.message}>We are sorry but You have to be logged in order to complete Your Purchase </p>}
          {!cartData.cartMessage && (<button  onClick={openLoginHanhler}>Signup</button>)}
          </div>
      </div>
    </Modal>
  );
};

export default Cart;
