import { authActions } from "../redux/auth-slice";

// export const fetchAuthRequest = (url, emailInput, PasswordInput) => {
//   return async (dispatch) => {
//     const fetchRequest = async () => {
//       const response = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify({
//           email: emailInput,
//           password: PasswordInput,
//           returnSecureToken: true,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Authentication Failed");
//       }
//       const data = await response.json();
//       return data;
//     };
//     try {
//       const authData = await fetchRequest();
//       console.log('lol')
//       console.log(authData)
//       dispatch(
//         authActions.loginHandler({
//           token: authData.idToken,
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
export const fetchAuthRequest = (url, emailInput, passwordInput) => {
  return async (dispatch) => {
  fetch(url,{
    method:"POST",
    body:JSON.stringify({
      email:emailInput,
      password:passwordInput,
      returnSecureToken:true
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res=>{
    if(res.ok){
      return res.json()
      console.log(res)
    }else{
      return res.json().then(data=>{
        let errorMessage='Auhtentication failed'
        // if(data && data.error && data.error.message){
          //   errorMessage=data.error.message
          // }
          // alert(errorMessage)
          throw new Error(errorMessage)
        }
        )
      }
    }).then((data)=>{
      // const expirationTime=new Date(new Date().getTime() + (+data.expiresIn*1000)) 
      console.log(data)
  // authCtx.login(data.idToken,expirationTime.toISOString())
      if(data){
        dispatch(authActions.userIsLoggedIn())
      }
        dispatch(
        authActions.loginHandler({
          token: data.idToken,
        })
      );
}).catch(err=>{
  alert(err.message)
})
  }
}