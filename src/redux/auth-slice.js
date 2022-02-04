import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice={
    token:null,
    email:''
    
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthSlice,
    reducers:{
        loginHandler(state,action){
            state.token=action.payload.token
        },
        logoutHandler(state){
            // state.userIsLoggedIn=false
            state.token=null
        },
        emailHandler(state,action){
            state.email=action.payload.email
        }
    }
})

export const authActions= authSlice.actions
export default authSlice