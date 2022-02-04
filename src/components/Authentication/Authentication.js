import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../redux/auth-slice";
import Footer from "../layout/Footer";
import Input from "../UI/Input";
import classes from "./Authentication.module.css";
import { fetchAuthRequest } from "../../lib/authFunc";
import { authentication } from "../../config/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googleLogo from "../../assets/Google.svg";

const Authentication = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //Switching between login and signup properties
  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //Getting user input
  const enteredInputEmail = useRef();
  const enteredInputPassword = useRef();

  //Login and Signup Handler
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = enteredInputEmail.current.value;
    const enteredPassword = enteredInputPassword.current.value;

    //1)if isLogin is true user sends signsIn request, if not user sends signsUp request

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDjTL1GI_FBga1VjFhS20d5eiyvYiD_HU";
    }
    // 2) depending on state request is being sent to authFunc.js to thunk fetchAuthRequest funciont
    dispatch(fetchAuthRequest(url, enteredEmail, enteredPassword));
    history.replace("/");

    //3) after login/signup user's data is stored to localStorage and Redux state
    dispatch(
      authActions.emailHandler({
        email: enteredEmail,
      })
    );
    localStorage.setItem("email", enteredEmail);
  };

  //SignIn with Google account
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        if (res._tokenResponse.idToken) {
          dispatch(
            authActions.loginHandler({
              token: res._tokenResponse.idToken,
            })
          );
          localStorage.setItem("token", res._tokenResponse.idToken);
          dispatch(
            authActions.emailHandler({
              email: res._tokenResponse.email,
            })
          );
          localStorage.setItem("email", res._tokenResponse.email);
          history.replace("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

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
            <div>
              <button className={classes.button}>
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
          </form>
          {isLogin && (
            <div className={classes.social}>
              <button onClick={signInWithGoogle}>
                <img src={googleLogo} alt="Google Login" />
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
