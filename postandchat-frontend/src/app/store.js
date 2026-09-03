import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/authSlice';
import { authApi } from "../redux/api/authApi";

export const store=configureStore({
    reducer : {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});