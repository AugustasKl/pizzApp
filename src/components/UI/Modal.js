import ReactDom from "react-dom";
import React from "react";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { orderActions } from "../../redux/order-slice";

const Backdrop = () => {
  const dispatch = useDispatch();
  const backdropHandler = () => {
    dispatch(cartActions.toggleCart());
    dispatch(
      orderActions.toggleOrderHandler({
        orderIsShown: false,
      })
    );
  };
  return <div className={classes.backdrop} onClick={backdropHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElment = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop />, portalElment)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElment
      )}
    </React.Fragment>
  );
};

export default Modal;
