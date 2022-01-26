import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice={
    token:null,
    isLoggedIn:false,
    userData:{
        email:'',
        password:''
    },
    userChanged:false
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthSlice,
    reducers:{
        userDataHandler(state,action){
            state.userData={
                email:action.payload.email,
                password:action.payload.password
            }
        },
        loginHandler(state,action){
            state.token=action.payload.token
        },
        userIsLoggedIn(state){    
            state.userChanged=true
            state.isLoggedIn=!state.isLoggedIn
        },
        logoutHandler(state){
            state.userIsLoggedIn=false
            state.token=null
        }
    }
})

export const authActions= authSlice.actions
export default authSlice