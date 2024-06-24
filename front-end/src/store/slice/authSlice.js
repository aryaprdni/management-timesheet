import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../libs/axios";

const initialAuthState = {
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN(state, action) {
            localStorage.removeItem('token');

            state.user = action.payload
            const { token } = action.payload.data.user
            console.log(token);
            setAuthToken(token)
            localStorage.setItem('token', token)
        },
        AUTH_CHECK(state, action) {
            state.user = action.payload
        }
    }
})

export const { AUTH_LOGIN, AUTH_CHECK } = authSlice.actions;
export const authReducer = authSlice.reducer;

