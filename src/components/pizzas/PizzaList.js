import React from "react";
import classes from "./PizzaList.module.css";
import PizzaItem from "./PizzaItem";
import Footer from "../layout/Footer";
const PizzaList = (props) => {
  // const{id, title, ingredients, image, price}=props
  console.log(props)
  return (
    <React.Fragment>
      <div className={classes.pizzas}>
        <div className={classes.intro}>
          <h1>Our Pizzas</h1>
          <h4>We guarantee you will be impressed</h4>
        </div>
        <ul className={classes.list}>
          {props.pizzas.map((pizza)=>{
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
