import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../redux/auth-slice";
import Footer from "../layout/Footer";
import Input from "../UI/Input";
import classes from "./Authentication.module.css";
import {fetchAuthRequest} from '../../lib/authFunc'
let isInitial =true
const Authentication = () => {
  const history=useHistory()
  const dispatch=useDispatch()

  const data=useSelector((state)=> state.auth.userData)
  console.log(data)

  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const enteredInputEmail = useRef();
  const enteredInputPassword = useRef();
  // const enteredInputConfirmPassword = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = enteredInputEmail.current.value;
    const enteredPassword = enteredInputPassword.current.value;
    
    console.log(enteredPassword, enteredEmail);
    dispatch(authActions.userDataHandler({
      email:enteredEmail,
      password:enteredPassword
    }))
  }
  let url;
  if (isLogin) {
    url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
  } 
  if(!isLogin && isInitial===false){
    url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
  }
  
  useEffect(()=>{
    if(isInitial){
      isInitial=false
      return
    }


    
    dispatch(fetchAuthRequest(url, data.email, data.password))
    // history.replace('/')
    
    if(isInitial===false){
      isInitial=true
      return
     }
  },[dispatch,history,url, data.email, data.password])

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
      </section>
      <Footer />
    </React.Fragment>
  );
};
export default Authentication;
