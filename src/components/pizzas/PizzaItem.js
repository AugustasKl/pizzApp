import classes from './PizzaItem.module.css'
import AddItemForm from '../layout/AddItemForm'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
import {motion} from 'framer-motion'
import pepperLogo from '../../assets/pepper.svg'
import { useCallback, useEffect } from 'react'

const containerVariants={
    hover:{
        scale:1.05,
        transition:{
            duration:0.3
        }
    }
  }
  


const PizzaItem=(props)=>{

    
    const data =useSelector((state)=>state.cart.cartItems)
    const reducedData=data.reduce((tot,arr)=>{
        return tot +arr.total
    },0)
    const reducedDataFixed = Math.max(reducedData, 0).toFixed(2);
    const{title, price, ingredients, image, hot, id}=props
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
            <div className={classes.desc}>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.hot}>
             <span className={classes.number}> {hot>0 ? `${hot}x`: null}</span> <img src={hot ? pepperLogo : null}/>
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
            <div>
                <AddItemForm onAddToCart={addToCartHandler}/>
            </div>
        </motion.li>
    )
}
export default PizzaItem