import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
  IDLE: 'success',
  LOADING: 'Loading',
  ERROR: 'Error'
});


export const fetchApi = createAsyncThunk("product/fetchApi", async () => {
  const response = await fetch("https://fakestoreapi.com/products"); 
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchApi.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  }
});

export default productSlice.reducer;
