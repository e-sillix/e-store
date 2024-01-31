// redux/slice/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const initialState = {
  all_products: [],
  status: "idle", // or "loading", "succeeded", "failed"
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "allproduct/fetchProducts",
  async () => {
    const productCollectionRef = collection(db, "product");
    try {
      const data = await getDocs(productCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filterData;
    } catch (error) {
      console.error(error);
      throw error; // This will be treated as a rejected action
    }
  }
);

const productslice = createSlice({
  name: "allproduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all_products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productslice.reducer;
