import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../../assets/PizzaLogo.svg";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../cart/CartButton";
import { authActions } from "../../redux/auth-slice";
import { cartActions } from "../../redux/cart-slice";
import OrderDetails from "./OrderDetails";
import {motion} from 'framer-motion'

const MainNavigation = () => {
  const dispatch=useDispatch()
  const sendRequest=useSelector((state)=>state.auth.sendRequest)
  const toggleCart = useSelector((state) => state.cart.cartIsShown);
  const cartData=useSelector((state)=>state.cart.cartItems)
  const userIsLoggedIn=useSelector((state)=>state.auth)
  const orderIsShown= useSelector((state)=>state.order.orderIsShown)
  // const emptyArray= cartData.splice(0,cartData.length)
  // console.log(emptyArray)

  console.log(cartData)
 console.log(userIsLoggedIn)
 const logoutHandler=()=>{
   
   dispatch(authActions.logoutHandler())
   dispatch(authActions.userIsLoggedIn())
   dispatch(cartActions.cartMessage())
   dispatch(authActions.emailHandler({
    email:''
  }))
   localStorage.removeItem('token')
  //  localStorage.removeItem('cartItems')
   // dispatch(authActions.userDataHandler({
     //   email:'',
     //   password:''
     // }))
     // dispatch(authActions.sendRequest())
      }
      // setTimeout(logoutHandler, 3000)
  return (
    <motion.header
     className={classes.header}
     initial={{y:'100vw'}}
     animate={{y:0}}
    //  transition={{stiffness:10}}
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
          
          {!userIsLoggedIn.token && ( 
            <li>
            <Link to="/auth">Login</Link>
          </li>
          )}  
             {userIsLoggedIn.token  && (
          <li>
            <button className={classes.logout} onClick={logoutHandler}>Logout</button>
          </li>
            )}
          <li>
            <CartButton />
            {toggleCart && <Cart /> }
           {orderIsShown && <OrderDetails/>} 
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default MainNavigation;
