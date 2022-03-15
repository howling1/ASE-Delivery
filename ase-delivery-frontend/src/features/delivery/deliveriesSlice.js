import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    createDelivery,
    deleteDelivery,
    fetchDeliveries,
    fetchDeliveryById, readDeliveryDetail,
    searchDeliveriesById,
    fetchDeliveriesByBoxId, updateDelivery
} from "./deliveriesAPI";

const initialState = {};

export const loadDeliveriesAsync = createAsyncThunk(
    'delivery/fetchDeliveries',
    async (data) => {
        const resp = await fetchDeliveries(data.type, data.id);
        return resp.data;
    }
)

export const loadDeliveryByIdAsync = createAsyncThunk(
    'delivery/fetchById',
    async (id) => {
        const resp = await fetchDeliveryById(id);
        return resp.data;
    }
)

export const loadDeliveriesByBoxIdAsync = createAsyncThunk(
    'delivery/fetchByBoxId',
    async (id) => {
        const resp = await fetchDeliveriesByBoxId(id);
        return resp.data;
    }
)

export const SearchByIdAsync = createAsyncThunk(
    'delivery/searchById',
    async (id) => {
        const resp = await searchDeliveriesById(id);
        return resp.data;
    }
)

export const createDeliveryAsync = createAsyncThunk(
    'delivery/create',
    async (delivery) => {
        const resp = await createDelivery(delivery)
        console.log('created: ', resp.data)
        return resp.data;
    }
)

export const updateDeliveryAsync = createAsyncThunk(
    'delivery/update',
    async (delivery) => {
        const resp = await updateDelivery(delivery)
        console.log('updated: ', resp.data)
        return resp.data;
    }
)

export const deleteDeliveryAsync = createAsyncThunk(
    'delivery/delete',
    async(id) => {
        const resp = await deleteDelivery(id)
        console.log('deleted: ', resp.message)
    }
)

export const readDetailAsync = createAsyncThunk(
    'delivery/detail',
    async(id) => {
        const resp = await readDeliveryDetail(id)
        console.log("reading detail: ", resp.data)
        return resp.data;
    }
)

export const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {
        clearCreatedDelivery(state) {
            state.createdDelivery = null;
        },
        clearCreateError(state) {
            state.error = null;
        },
        setCreateError(state, action) {
            state.error = action.payload;
        },
        clearUpdateError(state) {
            state.updateError = null;
        },
        setUpdateError(state, action) {
            state.updateError = action.payload;
        },
        clearUpdatedDelivery(state) {
            state.updatedDelivery = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadDeliveriesAsync.fulfilled, (state, action) => {
                state.deliveries = action.payload;
            })
            .addCase(loadDeliveriesByBoxIdAsync.fulfilled, (state, action) => {
                state.deliveries = action.payload;
            })
            .addCase(SearchByIdAsync.fulfilled, (state, action) => {
                state.deliveries = action.payload;
            })
            .addCase(createDeliveryAsync.fulfilled, (state, action) => {
                state.createdDelivery = action.payload;
            })
            .addCase(createDeliveryAsync.rejected,(state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateDeliveryAsync.fulfilled, (state, action) => {
                state.updatedDelivery = action.payload;
            })
            .addCase(updateDeliveryAsync.rejected, (state, action) => {
                state.updateError = action.error.message;
            })
            .addCase(deleteDeliveryAsync.fulfilled,(state, action) => {
                window.location = '/management/deliveries/all';
            })
            .addCase(readDetailAsync.fulfilled,(state, action) => {
                state.readDetail = action.payload;
            })
            .addCase(loadDeliveryByIdAsync.fulfilled, (state, action) => {
                state.deliveryById = action.payload;
            })
    }
})

export const { clearCreatedDelivery, clearCreateError, setCreateError, clearUpdatedDelivery, clearUpdateError, setUpdateError } = deliveriesSlice.actions

export default deliveriesSlice.reducer

export const selectAllDeliveries = state => state.deliveries.deliveries

export const getDeliveryById = state => state.deliveries.deliveryById

export const createdDelivery = state => state.deliveries.createdDelivery

export const createError = state => state.deliveries.error

export const updatedDelivery = state => state.deliveries.updatedDelivery

export const updateError = state => state.deliveries.updateError

export const readDetail = state => state.deliveries.readDetail
