import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressValidateYupSchema } from "../../../validations/validationSchema";
import CustomErrorMsg from "../../auth/components/CustomErrorMsg";
import { Formik, Form, Field } from "formik";
import { updateUser } from "../userAPI";

function UserProfile() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const addresses = useSelector((state) => state.user.userInfo.address);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const handelEditAddress = (index) => {
    setSelectedAddress(addresses[index]);
  };
  const handelAddress = () => {};
  const handelDeleteItem = (index) => {
    dispatch(updateUser({ ...user, address: user.address.splice(index, 1) }));
  };
  useEffect(() => {
    // initialValues = selectedAddress;
  }, [addresses, handelEditAddress]);
  const initialValues = selectedAddress || {
    name: "",
    street: "",
    city: "",
    pinCode: "",
    state: "",
    phone: "",
  };
  return (
    <div className=" border-black ">
      <h1 className="text-3xl  text tracking-tight text-gray-900 sm:text-4xl">
        My Profile
      </h1>
      <div className="bg-gray-200 my-2 border-gray-300 border-2 p-8 rounded-md  mx-auto">
        <h1 className="text-3xl  text-gray-900 sm:text-4xl">Name : New Name</h1>
        <h3 className=" text-gray-900 ">email : pratikhg.2001@gmail.com</h3>

        <div className="mt-6">
          <div className="bg-white rounded-md p-8  mx-auto lg:max-w-none">
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
                      className="bg-custom-darkblue2 border border-transparent rounded-md shadow-sm py-0 px-0 text-sm font-medium text-white hover:bg-custom-darkblue1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 py-2 px-4"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
          {/* shipping address */}
          {addresses.map((address, index) => (
            <section key={index} className="bg-white rounded-md mt-2 p-4">
              <h2>Shipping Address</h2>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {address.city}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.pinCode}
                  </p>
                  <div className="flex ">
                    <button
                      type="button"
                      className="text-sm bg-gray-300 px-4 py-1 rounded-sm  mx-1 font-medium text-custom-blue hover:text-blue-500"
                      onClick={(e) => {
                        handelEditAddress(index);
                      }}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="text-sm font-medium text-custom-blue hover:text-blue-500 bg-gray-300 px-4 py-1 rounded-sm  mx-1 "
                      onClick={(e) => {
                        handelDeleteItem(index);
                      }}
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </li>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
