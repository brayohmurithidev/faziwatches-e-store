import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout, updateToken} from "../features/user/userSlice";


//define base url and endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }
})

// DEFINE CUSTOM REAUTH QUERY
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        if (result.error.status === 401) {
            console.log('trying to refresh token')
            const refreshResult = await baseQuery({
                    url: '/auth/refresh-token',
                    method: 'POST',
                    body: {
                        refreshTkn: localStorage.getItem('refresh_token')
                    }
                }, {...api}, {...extraOptions, credentials: true}
            );
            console.log('refresh', refreshResult)
            if (refreshResult.data) {
                console.log(" refresh result", refreshResult.data.data.token)
                // store new token
                localStorage.setItem('token', refreshResult.data.data.token);
                api.dispatch(updateToken(refreshResult.data.data.token))


                // Update headers with the new token
                const updatedHeaders = {
                    ...extraOptions?.headers,
                    Authorization: `Bearer ${refreshResult.data.data.token}`
                };

                // Retry the initial query with the updated token
                result = await baseQuery(args, {...api, ...extraOptions, headers: updatedHeaders});
            } else {
                console.log('refresh-error', refreshResult)
                return api.dispatch(logout())
            }
        } else {
            return api.dispatch(logout())
        }
    }
    console.log('results', result)
    return result;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
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