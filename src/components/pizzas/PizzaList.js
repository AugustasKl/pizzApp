import React from "react";
import classes from "./PizzaList.module.css";
import PizzaItem from "./PizzaItem";
import Footer from "../layout/Footer";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";


const sortPizzas = (pizzas, ascending) => {
  return pizzas.sort((pizzaA, pizzaB) => {
    if (ascending) {
      return pizzaA.price > pizzaB.price ? 1 : -1;
    } else {
      return pizzaA.price < pizzaB.price ? 1 : -1;
    }
  });
};

const PizzaList = (props) => {
  const pizzasData=[...props.pizzas]
  console.log(props.pizzas)
  const history=useHistory()
  const location=useLocation()
  const queryParams= new URLSearchParams(location.search);
  const isSortingAscending=queryParams.get('sort')==='asc'
  const sortedPizzas=sortPizzas(pizzasData, isSortingAscending)

  const changeSortingHandler=()=>{
    history.push({
      pathname:location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    })
  }

  
  return (
    <React.Fragment>
      <div className={classes.pizzas}>
        <div className={classes.intro}>
          <h1>Our Pizzas</h1>
          <h4>We guarantee you will be impressed</h4>
          <button className={classes.order} onClick={changeSortingHandler}>Sort by Price In {isSortingAscending ? 'Descending' : 'Ascending'} Order</button>
        </div>
        <ul className={classes.list}>
          {sortedPizzas.map((pizza)=>{
           return <PizzaItem
            id={pizza.id}
            key={pizza.id}
            title={pizza.title}
            ingredients={pizza.ingredients}
            image={pizza.image}
            price={pizza.price}
            />
        })}
          </ul>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default PizzaList;
