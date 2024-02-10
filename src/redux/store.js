import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authreducer from "./slice/authSlice";
import productreducer from "./slice/productSlice";
import cartreducer from "./slice/cartSlice";

const rootReducer = combineReducers({
  auth: authreducer,
  product: productreducer,
  cart: cartreducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
