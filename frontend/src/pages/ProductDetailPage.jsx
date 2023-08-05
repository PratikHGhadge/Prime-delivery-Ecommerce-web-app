import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
}
export default ProductDetailPage;
