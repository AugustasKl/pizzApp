import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import classes from "./OrderDetails.module.css";
import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";
import mailLogo from "../../assets/Mail.svg";
import phoneLogo from "../../assets/phone.svg";
import { orderActions } from "../../redux/order-slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { cartActions } from "../../redux/cart-slice";
import {motion} from "framer-motion"
import { useCallback } from "react";

const containerVariants={
  hidden:{
    opacity:0,
    translateX:-30
  },
  visible:{
    opacity:1,
    translateX:0,
  transition:{
    delay:0.5,
    duration:1,
    ease: "easeInOut" 
  }},
}
const delayedVariants={
  hidden:{
    opacity:0,
    translateX:30
  },
  visible:{
    opacity:1,
    translateX:0,
  transition:{
    delay:1,
    duration:1,
    ease: "easeInOut" 
  }},
}
const moreDelayedVariants={
  hidden:{
    opacity:0,
    translateX:-30
  },
  visible:{
    opacity:1,
    translateX:0,
  transition:{
    delay:1.5,
    duration:1,
    ease: "easeInOut" 
  }},
}



const OrderDetails = () => {
  const history=useHistory()
  const dispatch=useDispatch()
  const billingDetails = useSelector((state) => state.order);
  const orderDetails = useSelector((state) => state.cart);

  const logout=useCallback(()=>{
    dispatch(cartActions.replaceCart({
      cartItems:[]
    }))
    localStorage.removeItem('cartItems')
  },[dispatch])
  const closeModalHandler=()=>{
    dispatch(orderActions.toggleOrderHandler({
      orderIsShown:false
    }))
    logout()
    // dispatch(cartActions.toggleCart())
    history.push('/')
  }
 
  return (
    <Modal>
      <div className={classes.information}>
        <motion.div className={classes.gratitude} variants={containerVariants} initial='hidden' animate='visible'>
          <h4> Thanks for your order, {billingDetails.name}</h4>
        </motion.div>
        <motion.div className={classes.details} variants={delayedVariants} initial='hidden' animate='visible'>
          <div className={classes.order}>
            <p> Your order</p>
            <ul>
              {orderDetails.cartItems.map((item) => {
                return (
                  <OrderItem
                    key={item.id}
                    item={{
                      id: item.id,
                      title: item.title,
                      quantity: item.quantity,
                      price: item.price,
                    }}
                  />
                );
              })}
            </ul>
          </div>
          <div className={classes.billing}>
            <p>Your order will be sent to:</p>
            <div className={classes.data}>
              {`${billingDetails.address},
               ${billingDetails.city}`}
            </div>
          </div>
        </motion.div>
        <motion.div className={classes.contact}  variants={moreDelayedVariants} initial='hidden' animate='visible'>
          <p>
            If You have any questions or any kind of feedback we would be glad
            to hear it!
          </p>
          <h5>Contact us</h5>
          <div className={classes.info}>
            <div className={classes.email}>
                <img src={mailLogo} alt='email logo contact'/>
              <a href="mailto:1111@example.com">info@pizzaapp.com</a>
            </div>
            <div className={classes.phone}>
                <img src={phoneLogo} alt='phone logo contact'/>
              <a href="tel:1234">1234</a>
            </div>
          </div>
        </motion.div>
        <div className={classes.exit}>
        <button className={classes.close} onClick={closeModalHandler}>Close</button>
      </div>
      </div>
    </Modal>
  );
};

export default OrderDetails;
