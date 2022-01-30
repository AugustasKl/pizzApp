import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice={
    token:null,
    isLoggedIn:false,

    
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthSlice,
    reducers:{
        loginHandler(state,action){
            state.token=action.payload.token
        },
        userIsLoggedIn(state){    
            state.isLoggedIn=!state.isLoggedIn
        },
        logoutHandler(state){
            // state.userIsLoggedIn=false
            state.token=null
        }
    }
})

export const authActions= authSlice.actions
export default authSlice