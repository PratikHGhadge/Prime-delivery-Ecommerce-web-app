import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutAsync } from "../features/auth/authAPI";

function LogoutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutAsync());
  }, []);
  return <div> User logging out.... </div>;
}

export default LogoutPage;
