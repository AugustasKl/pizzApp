import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../../assets/PizzaLogo.svg";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../cart/CartButton";
import { authActions } from "../../redux/auth-slice";
import { cartActions } from "../../redux/cart-slice";
import OrderDetails from "./OrderDetails";
import { motion } from "framer-motion";
import { useCallback } from "react";


const MainNavigation = () => {
  const dispatch = useDispatch();
  const toggleCart = useSelector((state) => state.cart.cartIsShown);
  const cartData = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const orderIsShown = useSelector((state) => state.order.orderIsShown);

  const logoutCallBack = useCallback(() => {
    dispatch(
      cartActions.replaceCart({
        cartItems: [],
      })
    );
    dispatch(
      authActions.emailHandler({
        email: "",
      })
    );
    dispatch(authActions.logoutHandler());
    localStorage.removeItem("cartItems");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }, [dispatch, cartData]);

  const logoutHandler = () => {
    logoutCallBack();
  };

  return (
    <motion.header
    className={classes.header}
    initial={{ y: "100vw" }}
    animate={{ y: 0 }}
    >
      <nav className={classes.nav}>
           <ul>
           <li>
             <NavLink to="/pizzas" activeClassName={classes.active}>
               Pizzas
             </NavLink>
           </li>
           <li>
             <NavLink to="/drinks" activeClassName={classes.active}>
               Drinks
             </NavLink>
           </li>
           <li>
             <Link to="/">
               <img src={logo} alt="Pizza Logo" />
             </Link>
           </li>
           {!token && (
             <li>
               <NavLink to="/auth" activeClassName={classes.active}>
                 Login
               </NavLink>
             </li>
           )}
           {token && (
             <li>
               <button className={classes.logout} onClick={logoutHandler}>
                 Logout
               </button>
             </li>
           )}
           <li className={classes.button}>
             <CartButton />
             {toggleCart && <Cart />}
             {orderIsShown && <OrderDetails />}
           </li>
         </ul>
      </nav>
    </motion.header>
  );
};

export default MainNavigation;
