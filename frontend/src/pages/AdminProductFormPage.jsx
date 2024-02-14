import React from "react";
import AdminProductForm from "../features/admin/AdminProductForm";

function AdminProductFormPage() {
  const initialValues = {
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    thumbnail: "",
    brand: "",
    category: "",
  };
  return (
    <div>
      <AdminProductForm initialValues={initialValues} method={"POST"} />
    </div>
  );
}

export default AdminProductFormPage;
