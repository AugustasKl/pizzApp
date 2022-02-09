import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useEffect } from "react";

const CartButton = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  //total price of cart
  const reducedData = cartItems.reduce((tot, arr) => {
    return tot + arr.total;
  }, 0);
  const reducedDataFixed = Math.max(reducedData, 0).toFixed(2);

  // total count of items in the cart
  const numberOfCartItems = cartItems.reduce((curNumb, item) => {
    return curNumb + item.quantity;
  }, 0);

  const cartButtonHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  // setting cartItems to local Storage 
  useEffect(() => {
    if (cartItems !== []) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const storageCartItems = JSON.parse(localStorage.getItem("cartItems"));

  useEffect(() => {
    dispatch(
      cartActions.replaceCart({
        cartItems: storageCartItems || [],
      })
    );
  }, [dispatch]);

  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span className={classes.order}> Order</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
      <div className={classes.total}>{reducedDataFixed} €</div>
    </button>
  );
};

export default CartButton;
