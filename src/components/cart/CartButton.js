import classes from './CartButton.module.css'
import basketLogo from '../../assets/Basket.svg'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
const CartButton=()=>{
    const dispatch=useDispatch()
    const cartTotal=useSelector(state=>state.cart)
    const token=useSelector((state)=>state.auth.token)
    console.log(cartTotal.cartItems)
    const cartTotalAmounFixed=Math.max(cartTotal.totalAmount,0).toFixed(2)
    
    const numberOfCartItems=cartTotal.cartItems.reduce((curNumb, item)=>{
        return curNumb+item.quantity
    },0)

    
    
    const cartButtonHandler=()=>{
        dispatch(cartActions.toggleCart())
        if(token){
            dispatch(cartActions.cartMessage())
        }
    }

    return(
        <button className={classes.button} onClick={cartButtonHandler}>
            {/* <div className={classes.logo}>
            <img src={basketLogo} className={classes.cart} alt='Header cart logo'/> */}
            <span> Order</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
            {/* </div> */}
            <div className={classes.total}>{cartTotalAmounFixed} €</div>
        </button>
    )
}

export default CartButton