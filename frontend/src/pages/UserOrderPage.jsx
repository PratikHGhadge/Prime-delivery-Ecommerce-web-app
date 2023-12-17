import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <UserOrders />
      </Navbar>
    </div>
  );
}
export default ProductDetailPage;
