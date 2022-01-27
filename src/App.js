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
import { useEffect } from "react";

function App() {
  // const data=useSelector(state=>state.api.items)
  // console.log(data)
  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(fetchAllData())
  // },[dispatch])
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
