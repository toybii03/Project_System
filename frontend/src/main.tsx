import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "./api/axios"; // Import your custom axios instance
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Set token in Axios headers if it exists
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
