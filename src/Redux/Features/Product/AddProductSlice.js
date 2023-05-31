import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const createProduct = createAsyncThunk(
  "/api/v1/product/create",
  async (product, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/api/v1/product/create`,
        product,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);

//  slice for the product
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.status = "loading.....";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [createProduct.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default ProductSlice.reducer;
