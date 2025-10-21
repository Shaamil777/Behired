import axios from "axios";
import { getToken } from "../utils/tokenUtils";

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

// ✅ Request interceptor: attach token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // get token from utils/localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Response interceptor for auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — Token may be invalid or expired.");
      // Optional: clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);


export default api