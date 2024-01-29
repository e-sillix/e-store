import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authreducer from "./slice/authSlice";

const rootReducer = combineReducers({
  auth: authreducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
