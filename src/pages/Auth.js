import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import Authentication from "../components/Authentication/Authentication"
import { authActions } from "../redux/auth-slice"


const Auth=()=>{
  // const dispatch=useDispatch()
  // const authData=useSelector((state)=>state.auth)
  // console.log(authData)
  // const dataStorage=localStorage.setItem("token",)
  // console.log(dataStorage)

    return(
        <React.Fragment>
      <Authentication/>
        </React.Fragment>
    )
}

export default Auth