import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import StripeCheckoutButton from "../stripe/StripeCheckoutButton";
import { motion } from "framer-motion";

const containerVariants={
  hidden:{
    opacity:0,
    translateX:-30
  },
  visible:{
    opacity:1,
    translateX:0,
  
  transition:{
    duration:1,
    ease: "easeInOut" 
  }},
}
const listVariants={
  hidden:{
    opacity:0,
    translateX:30
  },
  visible:{
    opacity:1,
    translateX:0,
  
  transition:{
    duration:1,
    ease: "easeInOut" 
  }},
}
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "18px 2px 15px 5px #yellow",
    transition: {
      duration: 1,
      ease: "easeInOut",
      yoyo: Infinity,
    },
  },
};

const Cart = () => {
  const history = useHistory();
  const cartData = useSelector((state) => state.cart);

  // console.log(cartData)
  console.log(cartData);
  const dispatch = useDispatch();
  const closeButtonHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  const openLoginHanhler = () => {
    dispatch(cartActions.toggleCart());
    history.push("/auth");
  };

  const cartTotalAmounFixed = Math.max(cartData.totalAmount, 0).toFixed(2);
  return (
    <Modal>
      <div className={classes.cart}>
        <motion.h2 variants={containerVariants} initial='hidden' animate='visible'
        >Your Shopping Cart</motion.h2>
        <motion.ul variants={listVariants} initial='hidden' animate='visible'>
          {cartData.cartItems.map((item) => {
            return (
              <CartItem
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
        </motion.ul>
        <motion.div className={classes.total} variants={containerVariants} initial='hidden' animate='visible'>
  
          <span className={classes.amount}>Total Amount </span>
          <span>{cartTotalAmounFixed} €</span>
        </motion.div>
        <div className={classes.actions}>
          <button className={classes.close} onClick={closeButtonHandler}>
            Close
          </button>
          <StripeCheckoutButton total={cartTotalAmounFixed} />
          {!cartData.cartMessage && (
            <p className={classes.message}>
              We are sorry but You have to be logged in order to complete Your
              Purchase
            </p>
          )}
          {!cartData.cartMessage && (
            <motion.button onClick={openLoginHanhler} variants={buttonVariants} whileHover="hover">Login</motion.button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
