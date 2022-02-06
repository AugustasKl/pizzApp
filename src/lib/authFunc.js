import { authActions } from "../redux/auth-slice";

export const fetchAuthRequest = (url, emailInput, passwordInput) => {
  return async (dispatch) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = "Auhtentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (data.idToken) {
          dispatch(authActions.loginHandler({
            token:data.idToken
          }))
          localStorage.setItem('token', data.idToken)
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};


// const calculateRemainingTime=(expirationTime)=>{
//   const currentTime=new Date().getTime()
//   // console.log(currentTime)
//   const adjExpirationTime=new Date(expirationTime).getTime()
//   const remainingDuration= adjExpirationTime-currentTime
//   console.log(remainingDuration)
// }
// calculateRemainingTime(20)