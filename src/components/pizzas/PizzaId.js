import React from "react";
import { useDispatch } from "react-redux";
import AddItemForm from "../layout/AddItemForm";
import Footer from "../layout/Footer";
import classes from "./PizzaId.module.css";
import { cartActions } from "../../redux/cart-slice";
import pepperLogo from '../../assets/pepper.svg'

const PizzaId = (props) => {
  const dispatch =useDispatch()
  const{title, image, price, hot, id}=props

  const ingredientsData=[props.ingredients].reduce(function(a,b){
    return a.concat(b).join(', ')
  },[]).slice(0,-1)

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
        <div className={classes.desc}>
          <h1>{title}</h1>
          <div className={classes.hot}>
             <span className={classes.number}> {hot>0 ? `${hot}x`: null}</span> <img src={hot ? pepperLogo : null}/>
            </div>
            </div>
          <div className={classes.ingredients}>
                {ingredientsData}
            </div>
          <div className={classes.price}>
                    {price} €
                </div>
          <div className={classes.add}>
            <AddItemForm onAddToCart={addToCartHandler} />
          </div>
        </div>
        <img className={classes.image} src={image} alt={title}/>
      </div>
      <Footer/>
    </React.Fragment>
  );
};

export default PizzaId;
