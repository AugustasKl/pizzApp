import classes from './PizzaItem.module.css'
import AddItemForm from '../layout/AddItemForm'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
import {motion} from 'framer-motion'


const containerVariants={
    hover:{
        scale:1.05,
        transition:{
            duration:0.3
        }
    }
  }
  


const PizzaItem=(props)=>{
    const{title, price, ingredients, image, id}=props
    
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
        <motion.li className={classes.pizzas}
            variants={containerVariants}
            whileHover='hover'
        >
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
        </motion.li>
    )
}
export default PizzaItem