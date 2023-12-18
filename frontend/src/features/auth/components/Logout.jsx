import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOutAsync } from "../authAPI";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(signOutAsync());
  }, []);
  return <div>{!user && Navigate("/login")}</div>;
}

export default Logout;
