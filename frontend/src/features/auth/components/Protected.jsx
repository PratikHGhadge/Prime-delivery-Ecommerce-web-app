import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector((state) => state.auth.isLoggedIn);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default Protected;
