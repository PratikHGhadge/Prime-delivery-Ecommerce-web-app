import React from "react";
import AdminOrders from "../features/admin/components/AdminOrders";
import Navbar from "../features/navbar/Navbar";

function AdminOrdersPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </div>
  );
}

export default AdminOrdersPage;
