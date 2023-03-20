import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/lib/persistReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoSlice';
import loginInfoReducer from './userSlice';
import notificationReducer from './notifiCation';
// import logger from 'redux-logger';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
const middleware = [...getDefaultMiddleware({ serializableCheck: false }), logger];
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const loginPersistConfig = {
  key: 'login',
  storage,
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  reducer: {
    persistReducer: persistReducer(persistConfig, rootReducer),
    loginInfo: persistReducer(loginPersistConfig, loginInfoReducer),
  },
  middleware,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: getDefaultMiddleware =>
  // getDefaultMiddleware({
  //     serializableCheck: false,
  // }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
