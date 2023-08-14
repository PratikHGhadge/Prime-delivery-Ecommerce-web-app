import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilter } from "./ProductListAPI";

const initialState = {
  value: 0,
  products: [],
  status: "idle",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // sorting slice action
    sortProducts: (state, action) => {
      const sortOption = action.payload;
      if (sortOption === "lowToHigh") {
        state.products.sort((a, b) => a.price - b.price);
      } else if (sortOption === "highToLow") {
        state.products.sort((a, b) => b.price - a.price);
      } else if (sortOption === "sortByRatings") {
        state.products.sort((a, b) => b.rating - a.rating);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByFilter.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload;
    });
  },
});

// Export the sortProducts action
export const { sortProducts } = productSlice.actions;
export default productSlice;
