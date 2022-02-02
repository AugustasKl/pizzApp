import classes from "./CartButton.module.css";
import basketLogo from "../../assets/Basket.svg";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useEffect } from "react";
const CartButton = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);
  const data= useSelector((state)=>state.cart.totalAmount)
//   console.log(data)
//   console.log(Number(cartTotal.totalAmount));
  const cartTotalAmounFixed = Math.max(cartTotal.totalAmount, 0).toFixed(2);
console.log(cartTotal.cartItems)

const reducedData=cartTotal.cartItems.reduce((tot,arr)=>{
    return tot +arr.total
},0)

const reducedDataFixed = Math.max(reducedData, 0).toFixed(2);

  const numberOfCartItems = cartTotal.cartItems.reduce((curNumb, item) => {
    return curNumb + item.quantity;
  }, 0);


  const cartButtonHandler = () => {
    dispatch(cartActions.toggleCart());
    if (token) {
      dispatch(cartActions.cartMessage());
    }
  };

  useEffect(() => {
    if (cartTotal.cartItems !== []) {
      localStorage.setItem("cartItems", JSON.stringify(cartTotal.cartItems));
    }
  }, [cartTotal.cartItems]);

  const storageCartItems = JSON.parse(localStorage.getItem("cartItems"));

  console.log(storageCartItems);

  useEffect(() => {
    dispatch(
      cartActions.replaceCart({
        cartItems: storageCartItems || [],
      })
    );
 
  }, [dispatch]);

  //   dispatch(cartActions.replaceCart({
  //               cartItems: storageCartItems ||[]
  //           }))

  //   useEffect(() => {

  //       dispatch(
  //         cartActions.replaceCart({
  //           cartItems: storageCartItems || [],
  //         })
  //       );

  //   }, [dispatch]);

  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      {/* <div className={classes.logo}>
            <img src={basketLogo} className={classes.cart} alt='Header cart logo'/> */}
      <span> Order</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
      {/* </div> */}
      <div className={classes.total}>{reducedDataFixed} €</div>
    </button>
  );
};

export default CartButton;
