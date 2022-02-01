import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AllPizzas from "./pages/AllPizzas";
import AllDrinks from "./pages/AllDrinks";
import PizzaDetail from "./pages/PizzaDetail";
import Auth from "./pages/Auth";
import NoPizzaFound from "./components/pizzas/NoPizzaFound";
import { useDispatch, useSelector} from "react-redux";
import { fetchAllData } from "./lib/api";
import { useCallback, useEffect } from "react";
import { authActions } from "./redux/auth-slice";
import { cartActions } from "./redux/cart-slice";

function App() {
  const dispatch=useDispatch()
  const token = localStorage.getItem('token')
  // const cartItems=JSON.parse(localStorage.getItem('cartItems'|| [] ))
const status=useSelector((state)=>state.auth.token)
const data=useSelector((state)=>state.auth.isLoggedIn)
console.log(data)


    const kumpis =useCallback(()=>{
    dispatch(authActions.logoutHandler())
    dispatch(authActions.userIsLoggedIn())
    dispatch(cartActions.cartMessage())
    localStorage.removeItem('token')
    localStorage.removeItem('cartItems')
    dispatch(authActions.emailHandler({
      email:''
    }))
    console.log('labas')
  },[dispatch,status]) 
  
  useEffect(()=>{
    dispatch(authActions.loginHandler({
      token:token
    }))
    if(token){
      setTimeout(kumpis, 60000000)
  }
},[dispatch, token, kumpis])

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
        <Route path='*'>
          <NoPizzaFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
