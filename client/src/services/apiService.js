import axios from 'axios';

export const BASEURL = 'http://localhost:8000/api';

export const Axios = axios.create({
    baseURL: BASEURL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    withCredentials: true
})


const apiService = axios.create({
    baseURL: BASEURL
})

// FUNCTION TO GET TOKEN
const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        const response = await apiService.post('/auth/refresh-token', {
            refreshTkn: refresh
        });

        const newAccessToken = response.data.data.token;

        // Store on local storage
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        // Handle refresh token error
        console.log('Failed to refresh token:', error);
        throw error;  // Propagate the error to the caller
    }
};

//CREATE A REQUEST INTERCEPTOR
apiService.interceptors.request.use(async (config) => {
//     Get tokens
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}, async (error) => {
//     Handle request errors
    return Promise.reject(error)
});


//RESPONSE INTERCEPTORS
apiService.interceptors.response.use((response => response, async (error) => {
    const originalRequest = error.config;

//     CHECK FOR AN error due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            //     refrest token
            const newAccessToken = await refreshToken();

            //     Update original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            //     RETRY THE REQUEST
            return apiService(originalRequest)
        } catch (e) {
            console.log('Failed to refresh token: ', e);

            // Clear tokens
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');

            //     Redirect to login
            return Promise.reject(e)
        }
        //     handle other response errors
    }
    return Promise.reject(error);
}))

export default apiService;