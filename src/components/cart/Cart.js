import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import StripeCheckoutButton from "../stripe/StripeCheckoutButton";
import { motion } from "framer-motion";

//Framer Motion animations
const containerVariants = {
  hidden: {
    opacity: 0,
    translateX: -30,
  },
  visible: {
    opacity: 1,
    translateX: 0,

    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
const listVariants = {
  hidden: {
    opacity: 0,
    translateX: 30,
  },
  visible: {
    opacity: 1,
    translateX: 0,

    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "18px 2px 15px 5px #yellow",
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      yoyo: Infinity,
    },
  },
};

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state)=>state.auth.token)

  const closeButtonHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  const openLoginHanhdler = () => {
    dispatch(cartActions.toggleCart());
    history.push("/auth");
  };

//total price of cartItems
  const reducedData=cartItems.reduce((tot,arr)=>{
    return tot +arr.total
},0)
const reducedDataFixed = Math.max(reducedData, 0).toFixed(2);


  return (
    <Modal>
      <div className={classes.cart}>
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          Your Shopping Cart
        </motion.h2>
        <motion.ul variants={listVariants} initial="hidden" animate="visible">
          {cartItems.map((item) => {
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
        <motion.div
          className={classes.total}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className={classes.amount}>Total Amount </span>
          <span>{reducedDataFixed} €</span>
        </motion.div>
        <div className={classes.actions}>
          <button className={classes.close} onClick={closeButtonHandler}>
            Close
          </button>
           <StripeCheckoutButton total={reducedDataFixed} /> 
          {!token && (
            <p className={classes.message}>
              We are sorry but You have to be logged in order to complete Your
              Purchase
            </p>
          )}
          {!token && (
            <motion.button
              onClick={openLoginHanhdler}
              variants={buttonVariants}
              whileHover="hover"
            >
              Login
            </motion.button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
