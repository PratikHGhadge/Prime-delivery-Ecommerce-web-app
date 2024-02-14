import React, { useEffect, useState } from "react";
import AdminProductForm from "../features/admin/AdminProductForm";
import { useParams } from "react-router-dom";
import API from "../services/API";

function AdminEditProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await API.get(`/products/${id}`);
      if (response) {
        setProduct(response);
        setIsLoading(false);
        setInitialValues({
          title: response.data.data.title,
          description: response.data.data.description,
          price: response.data.data.price,
          discountPercentage: response.data.data.discountPercentage,
          stock: response.data.data.stock,
          thumbnail: response.data.data.thumbnail,
          brand: response.data.data.brand,
          category: response.data.data.category,
          image1: response.data.data.images[0],
          image2: response.data.data.images[1],
          image3: response.data.data.images[2],
        });
      }
    }
    fetchData();
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <AdminProductForm initialValues={initialValues} method={"PATCH"} />
      ) : (
        <AdminProductForm initialValues={initialValues} method={"PATCH"} />
      )}
      {}
    </>
  );
}

export default AdminEditProductForm;
