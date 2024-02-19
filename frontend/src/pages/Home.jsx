import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
        <ProductList />
      </Navbar>
    </div>
  );
};

export default Home;
