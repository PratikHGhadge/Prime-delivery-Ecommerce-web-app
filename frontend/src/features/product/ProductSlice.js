import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilterAndPage,
  fetchAllCategories,
  fetchAllBrands,
  fetchProductById,
  createProduct,
  editProduct,
} from "./ProductListAPI";
import { discountedPrice } from "../../app/constants";
const initialState = {
  value: 0,
  products: [],
  status: "idle",
  totalItem: 0,
  brands: [],
  categories: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // sorting slice action
    sortProducts: (state, action) => {
      const sortOption = action.payload;
      if (sortOption === "lowToHigh") {
        state.products.sort((a, b) => discountedPrice(a) - discountedPrice(b));
      } else if (sortOption === "highToLow") {
        state.products.sort((a, b) => discountedPrice(b) - discountedPrice(a));
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
      state.products = action.payload.data.data;
      state.totalItem = action.payload.data.totalCount;
    });
    builder.addCase(fetchProductsByFilterAndPage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAndPage.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload.data.data;
      state.totalItem = action.payload.data.totalCount;
    });
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.status = "idle";
      state.categories = action.payload;
      // const exists = state.filters.some((obj) => obj.id === action.payload.id);
      // if (!exists) {
      //   state.filters.push(action.payload);
      // }
    });
    builder.addCase(fetchAllBrands.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.status = "idle";
      state.brands = action.payload;
      // const exists = state.filters.some((obj) => obj.id === action.payload.id);
      // if (!exists) {
      //   state.filters.push(action.payload);
      // }
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = "idle";
      state.selectedProduct = action.payload.data;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.status = "idle";
      state.products.push(action.payload);
    });
    builder.addCase(editProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const productId = action.payload.data.id;
      console.log(action.payload.data.id);
      state.products[state.products.findIndex((e) => e.id == productId)] =
        action.payload.data;
      state.status = "idle";
    });
  },
});

// Export the sortProducts action
export const { sortProducts, updateTotalProducts } = productSlice.actions;

export default productSlice;
