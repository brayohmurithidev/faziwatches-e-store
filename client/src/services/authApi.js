import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


//define base url and endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            console.log(token)
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: '/users/profile',
                method: 'GET'
            })
        })
    })
})


//export hooks for usage in component
export const {useGetUserDetailsQuery} = authApi