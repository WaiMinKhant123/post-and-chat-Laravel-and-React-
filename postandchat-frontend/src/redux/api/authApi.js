import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logoutState } from '../slices/authSlice';

const baseQuery= fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        credentials: 'include',
        prepareHeaders:(headers,{getState})=>{
          const token=getState().auth.token;
            if(token){
                headers.set('Authorization',`Bearer ${token}`);
            }
            headers.set('Accept','application/json');
            return headers;
        },
    });
        
const baseQueryWithReauth=async (args ,api, extraOptions) =>{
    let result =await baseQuery(args,api,extraOptions);


if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: '/refresh', method: 'POST' }, api, extraOptions);
    
if (refreshResult.data) {
    api.dispatch(setCredentials(refreshResult.data));

    result = await baseQuery(args, api, extraOptions);
    } else {
        api.dispatch(logoutState());
    }
  }
        return result;
};

    export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register:builder.mutation({
        query:(userData)=>({
            url: '/register',
            method:'POST',
            body:userData,
        }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation ,useRegisterMutation} = authApi;