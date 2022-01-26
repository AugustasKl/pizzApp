import classes from "./DrinksItem.module.css";
import AddItemForm from "../layout/AddItemForm";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
const DrinksItem = (props) => {
  const dispatch = useDispatch();
  const { id, image, title, price } = props;
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
    <li className={classes.drinks}>
      <div className={classes.item}>
        <img className={classes.image} src={image} alt={title} />
        <div className={classes.title}>{props.title}</div>
        <div className={classes.price}>{price} €</div>
      </div>
      <div className={classes.add}>
        <AddItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default DrinksItem;
