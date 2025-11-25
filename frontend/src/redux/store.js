import {    configureStore, combineReducers    } from "@reduxjs/toolkit";
import {    persistReducer, persistStore    } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./slices/postSlice";

const rootReducer = combineReducers({
  post: postReducer,
  users: usersReducer,
  theme2: themeReducer,

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "post"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);