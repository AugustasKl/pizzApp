import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import classes from "./CartItem.module.css";;

const CartItem = (props) => {
  const dispatch=useDispatch()
  const{title, id, price, quantity}=props.item
  const totalprice=`${price.toFixed(2)}`

  const incrementhandler=()=>{
    dispatch(cartActions.incrementItem({
      title,
      id,
      price,
      quantity,
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
