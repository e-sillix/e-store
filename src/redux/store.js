import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authreducer from "./slice/authSlice";
import productreducer from "./slice/productSlice";

const rootReducer = combineReducers({
  auth: authreducer,
  product: productreducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
