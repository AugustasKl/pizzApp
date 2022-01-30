import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import classes from "./CartItem.module.css";
import { useState } from "react";

const CartItem = (props) => {
  // const [cartMessage, setCartMessage]=useState(true)
  const{title, id, price, quantity}=props.item
  if(!props){
    
  }
  const totalprice=`${price.toFixed(2)}`
  const dispatch=useDispatch()

  const incrementhandler=()=>{
    dispatch(cartActions.incrementItem({
      title:title,
      id:id,
      price:price,
      quantity:quantity,
    }))
  }
  const decrementHandler=()=>{
    dispatch(cartActions.decrementItem(id))
  }
 
  return (
    <li className={classes.item}>
      <div className={classes.info}>
        <h3>{title}</h3>
        <div className={classes.quantity}>
          <span>x {quantity}</span>
        </div>
        <div className={classes.price}>{totalprice} €</div>
      </div>
      <div className={classes.actions}>
        <button onClick={decrementHandler}>-</button>
        <button onClick={incrementhandler}>+</button>
      </div>
    </li>
  );
};
export default CartItem;
