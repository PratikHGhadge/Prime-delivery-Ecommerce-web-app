import { useSelector } from "react-redux";
import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    try {
      const response = await API.post("/orders", order);
      for (let i = 0; i < order.products.length; i++) {}
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (pagination) => {
    let queryString = "";
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    const response = await API.get(`/orders/all?${queryString}`);
    return {
      data: response.data.data,
      totalCount: response.data.totalCount,
    };
  }
);

export const updateOrderStatus = createAsyncThunk(
  "products/updateOrderStatus",
  async (order) => {
    const response = await API.patch(`/orders/${order.id}`, order);
    return response.data;
  }
);

export const razorpayCheckoutHandler = createAsyncThunk(
  "products/razorpayCheckoutHandler",
  async (amount) => {
    const response = await API.post("/payment/checkout", { amount: amount });
    const order = response.data.data;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_ID,
      amount: order.amount,
      currency: "INR",
      name: "Pratik Ghadge",
      description: "Test Transaction",
      image: "",
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_BASE_URL
      }payment/payment-verification`,
      prefill: {
        name: "Pratik Ghadge",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#363636",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    return order;
  }
);
