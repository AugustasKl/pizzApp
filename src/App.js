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

function App() {
  const dispatch=useDispatch()
  const token = localStorage.getItem('token')
  console.log(token)
// const status=useSelector((state)=>state.auth.token)
//     const kumpis =useCallback(()=>{
//     dispatch(authActions.logoutHandler())
//     dispatch(authActions.userIsLoggedIn())
//     localStorage.removeItem('token')
//     console.log('labas')
//     },[dispatch,status]) 
  
  useEffect(()=>{
    dispatch(authActions.loginHandler({
      token:token
    }))
    if(token){
      dispatch(authActions.userIsLoggedIn())
      // setTimeout(kumpis, 3000)
  }
},[dispatch, token])

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
