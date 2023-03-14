import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfoReducer";
import loginInfoReducer from "./loginInfoReducer";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,

}

const loginPersistConfig = {
    key: 'login',
    storage,
}

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
})

export const store = configureStore({
    reducer: {
        persistReducer: persistReducer(persistConfig, rootReducer),
        loginInfo: persistReducer(loginPersistConfig, loginInfoReducer);
    }
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof StorageEvent.getState>
export type AppDispatch = typeof store.dispatch;