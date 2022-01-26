import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../../assets/PizzaLogo.svg";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../cart/CartButton";
import { authActions } from "../../redux/auth-slice";

const MainNavigation = () => {
  const dispatch=useDispatch()
  const toggleCart = useSelector((state) => state.cart.cartIsShown);
  const userIsLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
 
  const logoutHandler=()=>{
    dispatch(authActions.logoutHandler())
    dispatch(authActions.userIsLoggedIn())
    dispatch(authActions.userDataHandler({
      email:'',
      password:''
    }))
  }
  return (
    <header className={classes.header}>
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
          
          {!userIsLoggedIn && ( 
            <li>
            <Link to="/auth">Login</Link>
          </li>
          )}  
            {userIsLoggedIn && (
          <li>
            <button className={classes.logout} onClick={logoutHandler}>Logout</button>
          </li>
            )}
          <li>
            <CartButton />
            {toggleCart && <Cart />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
