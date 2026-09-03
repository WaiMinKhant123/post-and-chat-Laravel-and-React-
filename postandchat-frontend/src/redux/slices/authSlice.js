import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null
};
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            const{user,access_token}=action.payload;
            state.user=user;
            state.token=access_token;
        },
    logutState:(state)=>{
        state.user=null;
        state.token=null;
    },
    },
});

export const {setCredentials,logoutState}=authSlice.actions;
export default authSlice.reducer;