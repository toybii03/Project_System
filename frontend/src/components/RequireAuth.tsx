import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
