import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createRequest, readRequests, readRequestsByEmail} from "./requestsAPI";

const initialState = {
    registerError: null,
};

export const createRequestAsync = createAsyncThunk(
    'requests/createRequest',
    async (request) => {
        const resp = await createRequest(request);
        return resp.data;
    }
)

export const loadRequestsAsync = createAsyncThunk(
    'requests/loadRequests',
    async () => {
        const resp = await readRequests();
        return resp.data;
    }
)

export const searchRequestsByEmailAsync = createAsyncThunk(
    'requests/searchRequests',
    async (email) => {
        const resp = await readRequestsByEmail(email);
        return resp.data;
    }
)

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers:{
        setRegisterError(state, action) {
            state.registerError = action.payload;
        },
        clearRegisterError(state, action) {
            state.registerError = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadRequestsAsync.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(searchRequestsByEmailAsync.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(createRequestAsync.fulfilled, (state) => {
                //TODO: better ways for the navigation?
                window.location = "/";
            })
            .addCase(createRequestAsync.rejected, (state, action) => {
                state.registerError = action.error.message;
            })
    }
})

export const { clearRegisterError, setRegisterError } = requestsSlice.actions

export default requestsSlice.reducer

export const selectAllRequests = state => state.requests.requests

export const selectRegisterError = state => state.requests.registerError