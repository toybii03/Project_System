import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Adjust if your backend URL is different
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
