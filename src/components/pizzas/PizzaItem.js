import classes from './PizzaItem.module.css'
import AddItemForm from '../layout/AddItemForm'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
const PizzaItem=(props)=>{
    const{title, price, ingredients, image, id}=props
    // console.log(ingredients)
    const dispatch=useDispatch()
    const addToCartHandler=(quantity)=>{
        dispatch(cartActions.importItemToCart({
            title,
            price,
            id,
            quantity:quantity,
            total:quantity*price
        }))
    }

    return(
        <li className={classes.pizzas}>
            <Link className={classes.specific} to={`/pizzas/${id}`}>
            <div className={classes.item}>
            <img className={classes.image} src={image} alt={title}/>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.ingredients}>
                {[...ingredients].join(', ')}
            </div>
                <div className={classes.price}>
                    {price} €
                </div>
            </div>
            </Link>
            <div>
                <AddItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default PizzaItem