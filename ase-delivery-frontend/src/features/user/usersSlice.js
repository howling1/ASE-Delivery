import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createUser, deleteUser, fetchUser, fetchUsers, searchUsers, updateUser} from "./usersAPI";


const initialState = {};

export const loadUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const resp = await fetchUsers();
        return resp.data;
    }
)

export const loadUserByIdAsync = createAsyncThunk(
    'users/fetchUser',
    async (id) => {
        const resp = await fetchUser(id);
        return resp.data;
    }
)

export const searchUsersByIdOrEmailAsync = createAsyncThunk(
    'users/searchUsers',
    async (text) => {
        const resp = await searchUsers(text);
        return resp.data;
    }
)

export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (newUser) => {
        const resp = await createUser(newUser)
        return resp.data;
    }
)

export const updateUserAsync = createAsyncThunk(
    'users/updateUser',
    async (newUser) => {
        const resp = await updateUser(newUser)
        return resp.data;
    }
)

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        await deleteUser(id)
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(loadUserByIdAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(searchUsersByIdOrEmailAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(deleteUserAsync.fulfilled, (state) => {
                window.location = '/management/users'
            })
    }
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users.users

export const selectUserDetail = state => state.users.user

// TODO: add global error state if needed
export const selectError = state => state.users.error
