import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { appReducer } from "./slice/app";
import { userReducer } from "./slice/user";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //         serializableCheck: false,
  //     }),
});
