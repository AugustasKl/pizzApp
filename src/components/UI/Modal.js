import ReactDom from "react-dom";
import React, { useCallback } from "react";
import classes from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { orderActions } from "../../redux/order-slice";

//display transperant backdrop
const Backdrop = () => {
  const orderShown = useSelector((state) => state.order.orderIsShown);
  const dispatch = useDispatch();

  const backdropCallback = useCallback(() => {
    if (orderShown) {
      dispatch(
        cartActions.replaceCart({
          cartItems: [],
        })
      );
      localStorage.removeItem("cartItems");
    }
    dispatch(cartActions.toggleCart());
    dispatch(
      orderActions.toggleOrderHandler({
        orderIsShown: false,
      })
    );
  }, [dispatch]);

  const backdropHandler = () => {
    backdropCallback();
  };
  return <div className={classes.backdrop} onClick={backdropHandler} />;
};

//display modal
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
