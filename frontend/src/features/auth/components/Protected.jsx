import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Protected({ children }) {
  const auth = useSelector((state) => state.auth);
  const isUserAuthenticated = auth != null && auth.isLoggedIn;
  if (!isUserAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
export default Protected;
