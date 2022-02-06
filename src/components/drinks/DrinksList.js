import React from "react";
import classes from "./DrinksList.module.css";
import DrinksItem from "./DrinksItem";
import Footer from "../layout/Footer";




const DrinksList = (props) => {
  
  return (
    <React.Fragment>
      <div className={classes.drinks}>
        <div className={classes.intro}>
          <h1>Drinks</h1>
          <h4>To go with your pizza!</h4>
        </div>
        <ul className={classes.list}>
          {props.drinks.map((drink)=>{
           return <DrinksItem
            id={drink.id}
            key={drink.id}
            title={drink.title}
            image={drink.image}
            price={drink.price}
            />
        })}
          </ul>
          <p className={classes.message}>*-All drinks are 0.5L</p>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default DrinksList;