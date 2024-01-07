import React from "react";
import Navbar from "../navbar/Navbar";
import { productValidateYupSchema } from "../../validations/validationSchema";
import CustomErrorMsg from "../auth/components/CustomErrorMsg";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

function AdminProductForm() {
  const dispatch = useDispatch();
  const { brands, categories } = useSelector((state) => state.products);
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
  const handelAddProduct = (values) => {
    console.log("hello");
    console.log(JSON.stringify(values));
    // add products
    dispatch();
    // Add products
  };
  return (
    <div>
      <Navbar>
        <div className=" border-black ">
          <div className="bg-gray-200 my-2 border-gray-300 border-2 p-8 rounded-md  mx-auto">
            <h1 className="text-3xl  text-gray-900 sm:text-4xl">
              Add Products
            </h1>
            <div className="mt-6">
              <div className="bg-white rounded-md p-8  mx-auto lg:max-w-none">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handelAddProduct}
                  validationSchema={productValidateYupSchema}
                >
                  <Form method="POST">
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
                            type="name"
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
                            <select
                              type="text"
                              id="brand"
                              name="brand"
                              className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            >
                              <option>--Choose brand--</option>
                              {brands.map((brand) => (
                                <option value={brand.value}>
                                  {brand.label}
                                </option>
                              ))}
                            </select>
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
                            <select
                              type="text"
                              id="category"
                              name="category"
                              className="block w-full  border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            >
                              <option>--Choose category--</option>
                              {categories.map((category) => (
                                <option value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
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
                      className="bg-custom-darkblue2 border border-transparent rounded-md shadow-sm mt-4 text-sm font-medium text-white hover:bg-custom-darkblue1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 py-2 px-4"
                    >
                      Add Product
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
