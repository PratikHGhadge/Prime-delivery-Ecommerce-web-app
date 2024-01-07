import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedAdmin({ children }) {
  const user = useSelector((state) => state.auth.isLoggedIn);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (user && user.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return children;
}
export default ProtectedAdmin;
