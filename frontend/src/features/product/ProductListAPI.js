import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts", // Change the action type to distinguish from the next action
  async () => {
    const response = await API.get("/products");
    return response.data;
  }
);

const fetchProductsByFilter = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({ filter }) => {
    let queryString = "";
    for (let key in filter) {
      // Handle arrays by converting them to query string
      for (let val of filter[key]) {
        queryString += `${key}=${val}&`;
      }
    }

    // Remove the trailing '&' from the queryString
    queryString = queryString.slice(0, -1);

    const response = await API.get(`/products?${queryString}`);
    return response.data;
  }
);

export { fetchAllProducts, fetchProductsByFilter };
