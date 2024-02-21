import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts", // Change the action type to distinguish from the next action
  async () => {
    const response = await API.get("/products");
    // const totalCount = response.headers.get("X-Total-Count");
    return {
      data: response.data.data,
      totalCount: response.data.totalCount,
    };
  }
);

const fetchProductsByFilterAndPage = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({ filter, page, limit }) => {
    let queryString = "";
    for (let key in filter) {
      // Handle arrays by converting them to query string
      for (let val of filter[key]) {
        queryString += `${key}=${val}&`;
      }
    }
    // Remove the trailing '&' from the queryString
    queryString = queryString.slice(0, -1);
    queryString += `&_page=${page}&_limit=${limit}`;
    const response = await API.get(`/products?${queryString}`);
    // const totalCount = response.headers.get("X-Total-Count");
    return {
      data: response.data,
      totalCount: response.totalCount,
    };
  }
);

const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async () => {
    const response = await API.get("/categories");
    return response.data;
  }
);

const fetchAllBrands = createAsyncThunk("brands/fetchAllBrands", async () => {
  const response = await API.get("/brands");
  return response.data;
});

const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  }
);

const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    const response = await API.post(`/products/`, product);
    return response.data;
  }
);

const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product, id) => {
    console.log(product);
    const response = await API.patch(`/products/${id}`, product);
    return response.data;
  }
);

export {
  fetchAllProducts,
  fetchProductsByFilterAndPage,
  fetchAllCategories,
  fetchAllBrands,
  fetchProductById,
  createProduct,
  editProduct,
};
