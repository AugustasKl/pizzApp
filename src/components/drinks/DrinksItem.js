import classes from "./DrinksItem.module.css";
import AddItemForm from "../layout/AddItemForm";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import {motion} from 'framer-motion'

//Framer motion animations
const containerVariants={
  hover:{
      scale:1.05,
      transition:{
          duration:0.3
      }
  }
}

const DrinksItem = (props) => {
  const dispatch = useDispatch();
  const { id, image, title, price } = props;

  //add drinksItem to the cart
  const addToCartHandler = (quantity) => {
    dispatch(
      cartActions.importItemToCart({
        id,
        price,
        title,
        quantity: quantity,
        total: quantity * price,
      })
    );
  };

  return (
    <motion.li className={classes.drinks}
    variants={containerVariants}
    whileHover='hover'>
      <div className={classes.item}>
        <img className={classes.image} src={image} alt={title} />
        <div className={classes.title}>{props.title}</div>
        <div className={classes.price}>{price} €</div>
      </div>
      <div className={classes.add}>
        <AddItemForm onAddToCart={addToCartHandler} />
      </div>
    </motion.li>
  );
};
export default DrinksItem;
