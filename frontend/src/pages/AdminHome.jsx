import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const userRole = useSelector((state) => state.user.userInfo?.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "user") {
      navigate("/home");
    }
  }, [userRole]);
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
};

export default AdminHome;
