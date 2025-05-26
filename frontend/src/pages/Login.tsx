import { useState } from "react";
import axios from "../api/axios"; // Your custom Axios instance
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("/login", { email, password });

      const token = res.data.token;
      if (!token) {
        setError("Login failed: No token returned.");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Set token for future Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;
