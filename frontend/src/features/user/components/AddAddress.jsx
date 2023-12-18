import React from "react";
import { addressValidateYupSchema } from "../../../validations/validationSchema";
import CustomErrorMsg from "../../auth/components/CustomErrorMsg";
import { Formik, Form, Field } from "formik";

function AddAddress({ handelAddress, initialValues }) {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handelAddress}
        validationSchema={addressValidateYupSchema}
      >
        <Form method="POST">
          <div>
            <h3
              id="contact-info-heading"
              className="text-lg font-medium text-gray-900"
            >
              Contact information
            </h3>

            <div className="mt-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <Field
                  type="name"
                  id="full-name"
                  name="name"
                  className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                <CustomErrorMsg name={"name"} />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3
              id="shipping-heading"
              className="text-lg font-medium text-gray-900"
            >
              Shipping address
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <div className="mt-1">
                  <Field
                    type="text"
                    id="street"
                    name="street"
                    autoComplete="street-address"
                    className=" block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                  />
                  <CustomErrorMsg name={"street"} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                  />
                  <CustomErrorMsg name={"city"} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <div className="mt-1">
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                  />
                  <CustomErrorMsg name={"state"} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pincode
                </label>
                <div className="mt-1">
                  <Field
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                  />
                  <CustomErrorMsg name={"pinCode"} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone no
                </label>
                <div className="mt-1">
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    autoComplete="street-address"
                    className=" block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                  />
                  <CustomErrorMsg name={"phone"} />
                </div>
              </div>
              <button
                type="submit"
                className="bg-custom-darkblue2 border border-transparent rounded-md shadow-sm py-0 px-0 text-sm font-medium text-white hover:bg-custom-darkblue1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
              >
                Add address
              </button>
              <button
                type="submit"
                className=" border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-black"
              >
                Reset
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AddAddress;
