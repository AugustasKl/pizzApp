import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../redux/auth-slice";
import Footer from "../layout/Footer";
import Input from "../UI/Input";
import classes from "./Authentication.module.css";
import { fetchAuthRequest } from "../../lib/authFunc";
import { authentication } from "../../config/firebase-config";
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
// let isInitial = true;
import googleLogo from '../../assets/Google.svg'
import { cartActions } from "../../redux/cart-slice";


const Authentication = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 const cartItems=useSelector((state)=>state.cart.cartItems[0])
  const token = useSelector((state) => state.auth);
console.log(cartItems)

  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log(isLogin);
  };
  const enteredInputEmail = useRef();
  const enteredInputPassword = useRef();
  // const enteredInputConfirmPassword = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = enteredInputEmail.current.value;
    const enteredPassword = enteredInputPassword.current.value;

    // console.log(enteredPassword, enteredEmail);

    // dispatch(
    //   authActions.userDataHandler({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   })
    // );
    // dispatch(
    //   authActions.loginHandler({
    //     token: localStorage.getItem('token')
    //   })
    // )
 let url;
  if (isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
  }
  if (!isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
  }

  dispatch(fetchAuthRequest(url, enteredEmail,enteredPassword));
  history.replace("/");
  // localStorage.setItem('cartItems', JSON.stringify(cartItems))
  dispatch(authActions.emailHandler({
    email:enteredEmail
  }))
  localStorage.setItem('email', enteredEmail)
  };
  const signInWithGoogle=()=>{
    const provider=new GoogleAuthProvider()
    signInWithPopup(authentication, provider)
    .then((res)=>{
      console.log(res)
      if(res._tokenResponse.idToken){
        dispatch(authActions.userIsLoggedIn())
        dispatch(authActions.loginHandler({
          token:res._tokenResponse.idToken
        }))
        localStorage.setItem('token', res._tokenResponse.idToken)
        dispatch(authActions.emailHandler({
          email:res._tokenResponse.email
        }))
        // localStorage.setItem('cartItems', JSON.stringify(cartItems))
        history.replace('/')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <React.Fragment>
      <section className={classes.auth}>
        <div className={classes.intro}>
          <p>{isLogin ? "" : "It will take only couple of seconds!"}</p>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          {isLogin && <p>OR</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        <div className={classes.login}>
        <form onSubmit={submitFormHandler}>
          <div className={classes.input}>
            <Input
              ref={enteredInputEmail}
              className={classes.text}
              htmlFor="email"
              label="Your Email"
              input={{
                id: "email",
                type: "email",
              }}
              required
            />
          </div>
          <div className={classes.input}>
            <Input
              ref={enteredInputPassword}
              label="Your Password"
              htmlFor="password"
              input={{
                id: "password",
                type: "password",
              }}
              required
            />
          </div>
          {/* {!isLogin && (
            <div className={classes.input}>
              <Input
                // ref={enteredInputConfirmPassword}
                label="Confirm Password"
                htmlFor="confirm_password"
                input={{
                  id: "password",
                  type: "password",
                }}
                required
              />
            </div>
          )} */}
          <div>
            <button className={classes.button}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>
        </form>
       {isLogin && ( 
         <div className={classes.social}>
            <button onClick={signInWithGoogle}>
            <img src={googleLogo} alt="Google Login"/>
            <p className={classes.text}>Sign in with Google</p>
            </button>
        </div> 
       )} 
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};
export default Authentication;
