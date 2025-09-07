import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.REACT_APP_BACK_PROD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
