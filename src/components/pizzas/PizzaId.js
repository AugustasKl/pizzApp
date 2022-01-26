import React from "react";
import { useDispatch } from "react-redux";
import AddItemForm from "../layout/AddItemForm";
import Footer from "../layout/Footer";
import classes from "./PizzaId.module.css";
import PopularPizzas from "./PopulaPizzas";
import { cartActions } from "../../redux/cart-slice";

const PizzaId = (props) => {
  const dispatch =useDispatch()
  const{title, image, price, ingredients, id}=props

  const addToCartHandler=(quantity)=>{
    dispatch(cartActions.importItemToCart({
        title,
        price,
        id,
        quantity:quantity,
        total:quantity*price
    }))
}

  return (
    <React.Fragment>
      <div className={classes.pizza}>
        <div className={classes.specific}>
          <h1>{title}</h1>
          <p className={classes.about}>{[...ingredients].join(', ')}</p>
          <div className={classes.price}>
                    {price} €
                </div>
          <div className={classes.add}>
            <AddItemForm onAddToCart={addToCartHandler} />
          </div>
        </div>
        <img className={classes.image} src={image} alt={title}/>
      </div>
      <PopularPizzas/>
      <Footer/>
    </React.Fragment>
  );
};

export default PizzaId;
