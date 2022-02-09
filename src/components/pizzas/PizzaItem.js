import classes from './PizzaItem.module.css'
import AddItemForm from '../layout/AddItemForm'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
import {motion} from 'framer-motion'
import pepperLogo from '../../assets/pepper.svg'

//framer motion animations
const containerVariants={
    hover:{
        scale:1.05,
        transition:{
            duration:0.3
        }
    }
  }
  
const PizzaItem=(props)=>{
    const dispatch=useDispatch()
    const{title, price, ingredients, image, hot, id}=props
  
    //adding selected pizza item to the cart
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
            <div className={classes.desc}>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.hot}>
             <span className={classes.number}> {hot>0 ? `${hot}x`: null}</span> <img src={hot ? pepperLogo : null} />
            </div>
            </div>
            <div className={classes.ingredients}>
                {[...ingredients].join(', ')}
            </div>
                <div className={classes.price}>
                    {price} €
                </div>
            </div>
            </Link>
            <div className={classes.btn}>
                <AddItemForm onAddToCart={addToCartHandler}/>
            </div>
        </motion.li>
    )
}
export default PizzaItem