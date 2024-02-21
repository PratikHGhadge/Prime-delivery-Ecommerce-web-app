import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { productValidateYupSchema } from "../../validations/validationSchema";
import CustomErrorMsg from "../auth/components/CustomErrorMsg";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, editProduct } from "../product/ProductListAPI";
import { useParams } from "react-router-dom";

function AdminProductForm({ initialValues, method }) {
  const dispatch = useDispatch();
  const { brands, categories } = useSelector((state) => state.products);
  const [brand, setSelectedBrand] = useState("");
  const [category, setSelectedCategory] = useState("");

  const selectBrand = (event) => {
    setSelectedBrand(event.target.value);
  };
  const selectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const { id } = useParams();

  const handelAddProduct = (values) => {
    const product = { ...values };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.thumbnail,
    ];
    product.rating = 0;
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    if (method === "POST") {
      dispatch(createProduct(product));
    } else if (method === "PATCH") {
      dispatch(editProduct(product, id));
    }
    // Add products
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Navbar>
        <div className=" border-black ">
          <div className=" my-2 border-gray-300 border-2 p-8 rounded-md  mx-auto">
            <h1 className=" text-center text-8xl text-white font-bold font-serif bg-gradient-to-br from-teal-400 via-green-400 to-lime-400 rounded-lg py-2 sm:text-4xl">
              Add New Product
            </h1>
            <div className="mt-6">
              <div className="bg-white rounded-md p-8  mx-auto lg:max-w-none">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handelAddProduct}
                  validationSchema={productValidateYupSchema}
                >
                  <Form method={method}>
                    <div>
                      <h3
                        id="contact-info-heading"
                        className="text-lg font-medium text-gray-900"
                      >
                        Product information{" "}
                      </h3>
                      <div className="mt-6">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <div className="mt-1">
                          <Field
                            type="text"
                            id="title"
                            name="title"
                            className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                          />
                          <CustomErrorMsg name={"title"} />
                        </div>
                      </div>

                      <div className="mt-4 ">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Discription
                        </label>
                        <div className="mt-1">
                          <Field
                            as="textarea"
                            type="text"
                            id="description"
                            name="description"
                            className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                          />
                          <CustomErrorMsg name={"description"} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="mt-4">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price
                          </label>
                          <div className="mt-1">
                            <Field
                              type="number"
                              id="price"
                              name="price"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"price"} />
                          </div>
                        </div>
                        <div className="mt-4 pl-4">
                          <label
                            htmlFor="discountPercentage"
                            className="block text-sm font-medium text-gray-700"
                          >
                            DiscountPercentage
                          </label>
                          <div className="mt-1">
                            <Field
                              type="number"
                              id="discountPercentage"
                              name="discountPercentage"
                              className="block w-full  border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"discountPercentage"} />
                          </div>
                        </div>
                        <div className="mt-4 pl-4">
                          <label
                            htmlFor="stock"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Stock{" "}
                          </label>
                          <div className="mt-1">
                            <Field
                              type="number"
                              id="stock"
                              name="stock"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"stock"} />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="mt-4 ">
                          <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Brand
                          </label>
                          <div className="mt-1">
                            <Field
                              as="select"
                              id="brand"
                              name="brand"
                              className="block w-full  border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            >
                              <option>--Choose brand--</option>
                              {brands.map((brand, index) => (
                                <option value={brand.value} key={index}>
                                  {brand.label}
                                </option>
                              ))}
                            </Field>
                            <CustomErrorMsg name={"brand"} />
                          </div>
                        </div>
                        <div className="mt-4 pl-4">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category
                          </label>
                          <div className="mt-1">
                            <Field
                              as="select"
                              id="category"
                              name="category"
                              className="block w-full  border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            >
                              <option>--Choose category--</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </Field>
                            <CustomErrorMsg name={"category"} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mt-6">
                          <label
                            htmlFor="thumbnail"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Thumbnail
                          </label>
                          <div className="mt-1">
                            <Field
                              type="text"
                              id="thumbnail"
                              name="thumbnail"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"thumbnail"} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="image1"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image 1
                          </label>
                          <div className="mt-1">
                            <Field
                              type="text"
                              id="image1"
                              name="image1"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"image1"} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="image2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image 1
                          </label>
                          <div className="mt-1">
                            <Field
                              type="text"
                              id="image2"
                              name="image2"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"image2"} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="image3"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image 3
                          </label>
                          <div className="mt-1">
                            <Field
                              type="string"
                              id="image3"
                              name="image3"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                            <CustomErrorMsg name={"image3"} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 font-semi-bold bg-gradient-to-br from-teal-400 via-green-500 to-lime-500 "
                    >
                      Add New Product
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default AdminProductForm;
