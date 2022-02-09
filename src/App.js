import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AllPizzas from "./pages/AllPizzas";
import AllDrinks from "./pages/AllDrinks";
import PizzaDetail from "./pages/PizzaDetail";
import Auth from "./pages/Auth";
import AboutUs from "./pages/AboutUs";
import NoPizzaFound from "./components/pizzas/NoPizzaFound";
import { useDispatch, useSelector} from "react-redux";
import { useCallback, useEffect } from "react";
import { authActions } from "./redux/auth-slice";
import { cartActions } from "./redux/cart-slice";

function App() {
  const dispatch=useDispatch()
  const token = localStorage.getItem('token')

const status=useSelector((state)=>state.auth.token)

    //creating timedOut logout with callback function
    const timedOutLogout =useCallback(()=>{
    dispatch(authActions.logoutHandler())
    localStorage.removeItem('token')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('email')
    dispatch(authActions.emailHandler({
      email:''
    }))
    dispatch(cartActions.replaceCart({
      cartItems:[]
    }))
  },[dispatch,status]) 
  

  //Getting token from local storage and dispatching to state
  useEffect(()=>{
    dispatch(authActions.loginHandler({
      token:token
    }))
    // if token is received logout after certain time
    if(token){
      setTimeout(timedOutLogout, 600000)
  }
},[dispatch, token, timedOutLogout])


  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/pizzas" exact>
          <AllPizzas />
          </Route>
          <Route path="/pizzas/:pizzaId">
            <PizzaDetail />
        </Route>
        <Route path="/drinks">
          <AllDrinks />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/about-us">
          <AboutUs/>
        </Route>
        <Route path='*'>
          <NoPizzaFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
