import { configureStore } from "@reduxjs/toolkit";
// import { contactsReduser } from "./contactsSlice";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { persistContactReducer } from "./contactsSlice";

export const store = configureStore({
    reducer: {
        contacts: persistContactReducer,
        // filter: "",
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
    
})

export const persistor = persistStore(store);