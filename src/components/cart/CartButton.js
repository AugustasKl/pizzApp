import classes from './CartButton.module.css'
import basketLogo from '../../assets/Basket.svg'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux/cart-slice'
const CartButton=()=>{
    const dispatch=useDispatch()
    const cartTotal=useSelector(state=>state.cart)
    // console.log(cartTotal)
    const cartTotalAmounFixed=cartTotal.totalAmount.toFixed(2)
    const numberOfCartItems=cartTotal.cartItems.reduce((curNumb, item)=>{
        return curNumb+item.quantity
    },0)

    

    const cartButtonHandler=()=>{
        dispatch(cartActions.toggleCart())
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