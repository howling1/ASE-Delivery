import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {extractCurrentUser, login, logout} from './authenticationAPI';

/*
If you are setting the cookie on a response in a login route in express backend for JWT
and are using 'httpOnly' option, you are unable to access the token from the client/react,
even when using a third party library like 'universal-cookie' or 'document.cookie'.

You will need to clear the cookie on the response from the backend e.g. when a user logs out.
 */

const initialState = {
    user: null,
    loginError: null,
}

export const loginAsync = createAsyncThunk(
    'authentication/login',
    async (user) => {
        // return the current logged-in user with email and role
        return await login(user);
    }
);

export const logoutAsync = createAsyncThunk(
    'authentication/logout',
    async () => {
        return await logout();
    }
)

export const getCurrentUserAsync = createAsyncThunk(
    'authentication/currentUser',
    async () => {
        // return the current logged-in user with email and role
        return await extractCurrentUser();
    }
)

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        clearLoginError(state, action) {
            state.loginError = null;
        },
        setLoginError(state, action) {
            state.loginError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loginError = action.error.message;
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.user = null;
                window.location = '/';
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            // used when jwt cookie is expired
            .addCase(getCurrentUserAsync.rejected, (state) => {
                state.user = null;
            })
    }
});

export const { clearLoginError, setLoginError } = authSlice.actions

export default authSlice.reducer;

export const selectCurrentUser = state => state.authentication.user

export const selectLoginError = state => state.authentication.loginError

