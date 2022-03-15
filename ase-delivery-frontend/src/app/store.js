import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersReducer from "../features/user/usersSlice";
import requestsReducer from "../features/request/requestsSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";
import boxesReducer from "../features/box/boxesSlice";
import deliveriesReducer from "../features/delivery/deliveriesSlice";

// BLACKLIST
const persistConfig = {
  key: 'user', 
  storage: storage, 
};

const persistedAuthenticationReducer = persistReducer(persistConfig, authenticationReducer)

export const store = configureStore({
    reducer: {
        users: usersReducer,
        requests: requestsReducer,
        authentication: persistedAuthenticationReducer,
        boxes: boxesReducer,
        deliveries: deliveriesReducer,
        //TODO: add reducers here
    },

	middleware: (getDefaultMiddleware) =>
	    getDefaultMiddleware({
	      serializableCheck: false,
	    }),
});

export const persistor = persistStore(store);
