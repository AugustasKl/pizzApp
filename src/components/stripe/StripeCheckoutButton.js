import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import pizzaLogo from '../../assets/PizzaLogo.svg' 
import { cartActions } from '../../redux/cart-slice'
import { orderActions } from '../../redux/order-slice'
import OrderDetails from '../layout/OrderDetails'
import classes from './StripeCheckoutButton.module.css'

const StripeCheckoutButton=(props)=>{
    const toggleOrder= useSelector((state)=>state.order.orderIsShown)
    console.log('order')
    console.log(toggleOrder)
    const[showOrderData, setShowOrderData]=useState(false)
    const dispatch=useDispatch()
    const email=useSelector((state)=>state.auth.email)
    const priceForStripe=props.total*100
    const publishableKey='pk_test_51JmZ8vKe5XlafNv8aPjjC8bOMcd9jfVVN4iywNoPwCeVWTdSQYmNTQtTSsyjqM1XiEeaoMP3OPJ4LBKiMMpViFCR00lSQRWNDF'
    
    const onToken=(token)=>{
        console.log(token)
        dispatch(orderActions.addressHandler({
            address:token.card.address_line1,
        }))
        dispatch(orderActions.cityHandler({
            city:token.card.address_city
        }))
        dispatch(orderActions.nameHandler({
            name:token.card.name
        }))
        dispatch(orderActions.toggleOrderHandler({
            orderIsShown:true
        }))
        dispatch(cartActions.toggleCart())
    }
    return(
        <React.Fragment>
        <StripeCheckout 
        email={email}
        name='Pizza App'
        postCode={false}
        billingAddress
        zipCode={null}
        image={pizzaLogo}
        description={`Your total is ${props.total} €`}
        amount={priceForStripe}
        token={onToken}
        stripeKey={publishableKey}
        currency='EUR'
       
        >
            <button className={classes.button}>Purchase</button>
            </StripeCheckout>
        {/* {toggleOrder && <OrderDetails/>} */}
    </React.Fragment>
    )
}

export default StripeCheckoutButton