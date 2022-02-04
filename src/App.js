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
import { fetchAllData } from "./lib/api";
import { useCallback, useEffect } from "react";
import { authActions } from "./redux/auth-slice";
import { cartActions } from "./redux/cart-slice";

function App() {
  const dispatch=useDispatch()
  const token = localStorage.getItem('token')

const status=useSelector((state)=>state.auth.token)
const data=useSelector((state)=>state.auth.isLoggedIn)



    const timedOutLogout =useCallback(()=>{
    dispatch(authActions.logoutHandler())
    dispatch(cartActions.cartMessage())
    localStorage.removeItem('token')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('email')
    dispatch(authActions.emailHandler({
      email:''
    }))
    dispatch(cartActions.replaceCart({
      cartItems:[]
    }))
    console.log('labas')
  },[dispatch,status]) 
  
  useEffect(()=>{
    dispatch(authActions.loginHandler({
      token:token
    }))

    if(token){
      setTimeout(timedOutLogout, 600000)
  }
},[dispatch, token, timedOutLogout])


// useEffect(()=>{
//   if(token){
//       dispatch(cartActions.replaceCart({
//   cartItems:cartItems
// }))
//   }
// },[cartItems, dispatch,token])



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
