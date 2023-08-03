import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

//Interceptor
// API.interceptors.request.use((req)=>{})

export default API;
