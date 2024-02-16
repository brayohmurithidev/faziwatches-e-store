import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    userInfo: {},
    error: null,
    token,
    status: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.status = ''
            state.userInfo = null
            state.token = null
            state.error = null

        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload.data
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.status = 'succeeded';
                state.userInfo = payload.user;
                state.token = payload.token;
            }).addCase(loginUser.rejected, (state, {payload}) => {
            state.status = 'failed';
            state.error = payload
        })
    }

})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;


export const loginUser = createAsyncThunk('auth/login', async ({email, password}, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('http://localhost:8000/api/auth', {email, password});
        localStorage.setItem('token', data.token)
        return data
    } catch (e) {
        if (e.respond && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        } else {
            return rejectWithValue(e.message)
        }
    }
})