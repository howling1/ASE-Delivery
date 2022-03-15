import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createBox, deleteBox, fetchBox, fetchBoxes, searchBoxes, updateBox,fetchBoxesByCustomerId , fetchBoxesByDelivererId} from "./boxesAPI";


const initialState = {};

export const loadBoxesAsync = createAsyncThunk(
    'boxes/fetchBoxes',
    async () => {
        const resp = await fetchBoxes();
        return resp.data;
    }
)

export const loadBoxByIdAsync = createAsyncThunk(
    'boxes/fetchBox',
    async (id) => {
        const resp = await fetchBox(id);
        return resp.data;
    }
)

export const loadBoxesByCustomerIdAsync = createAsyncThunk(
    'boxes/customer',
    async (id) => {
        const resp = await fetchBoxesByCustomerId(id);
        return resp.data;
    }
)

export const loadBoxesByDelivererIdAsync = createAsyncThunk(
    'boxes/deliverer',
    async (id) => {
        const resp = await fetchBoxesByDelivererId(id);
        return resp.data;
    }
)


export const createBoxAsync = createAsyncThunk(
    'boxes/createBox',
    async (newBox) => {
        const resp = await createBox(newBox)
        return resp.data;
    }
)

export const updateBoxAsync = createAsyncThunk(
    'boxes/updateBox',
    async (newBox) => {
        const resp = await updateBox(newBox)
        return resp.data;
    }
)

export const deleteBoxAsync = createAsyncThunk(
    'boxes/deleteBox',
    async (id) => {
        await deleteBox(id)
    }
)


export const searchBoxesByIdOrNameAsync = createAsyncThunk(
    'boxes/searchBoxes',
    async (text) => {
        const resp = await searchBoxes(text);
        return resp.data;
    }
)

const boxesSlice = createSlice({
    name: 'boxes',
    initialState,
    reducers: {
        clearCreatedBox(state) {
            state.createdBox = null;
        },
        clearCreationError(state) {
            state.error = null;
        },
        setCreationError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadBoxesAsync.fulfilled, (state, action) => {
                state.boxes = action.payload;
            })
            .addCase(loadBoxesByCustomerIdAsync.fulfilled, (state, action) => {
                state.boxes = action.payload;
            })
            .addCase(loadBoxesByDelivererIdAsync.fulfilled, (state, action) => {
                state.boxes = action.payload;
            })
            .addCase(loadBoxByIdAsync.fulfilled, (state, action) => {
                state.box = action.payload;
            })
            .addCase(updateBoxAsync.fulfilled, (state, action) => {
                state.createdBox = action.payload;
            })
            .addCase(updateBoxAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createBoxAsync.fulfilled, (state, action) => {
                state.createdBox = action.payload;
            })
            .addCase(createBoxAsync.rejected,(state, action) => {
                state.error = action.error.message;
            })
            .addCase(searchBoxesByIdOrNameAsync.fulfilled, (state, action) => {
                state.boxes = action.payload;
            })

    }
})

export const { clearCreatedBox, clearCreationError, setCreationError} = boxesSlice.actions

export default boxesSlice.reducer

export const createdBox = state => state.boxes.createdBox

export const selectAllBoxes = state => state.boxes.boxes

export const selectBoxDetail = state => state.boxes.box

// TODO: add global error state if needed
export const creationError = state => state.boxes.error

export const selectError = state => state.users.error