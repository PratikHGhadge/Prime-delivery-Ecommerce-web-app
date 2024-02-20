import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../userAPI";
import AddAddress from "./AddAddress";

function UserProfile() {
  const addresses = useSelector((state) => state.user.userInfo.addresses);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const handelEditAddress = (index) => {
    setSelectedAddress(addresses[index]);
  };
  const handelAddress = async (values) => {
    dispatch(updateUser({ ...user, addresses: [...user.addresses, values] }));
  };

  useEffect(() => {
    // initialValues = selectedAddress;
  }, [addresses, handelEditAddress]);
  const initialValues = {
    name: "",
    street: "",
    city: "",
    pinCode: "",
    state: "",
    phone: "",
  };
  return (
    <div className=" border-black ">
      <h1 className="font-bold bg-gradient-to-br from-teal-400 via-green-400 to-lime-400  rounded-md shadow-sm text-center p-2 text-5xl mx-2 md:mx-0  text-white focus:ring-offset-gray-50 ">
        My Profile
      </h1>
      <div className="bg-gray-50 my-2 border-gray-300 border-2 p-8 rounded-md  mx-auto">
        <h1 className="text-3xl font-bold  text-gray-900 sm:text-4xl">
          {/* Name : {addresses[0].name} */}
          console.log(addresses)
        </h1>
        <h3 className=" text-gray-900 ">email : {user.email}</h3>

        <div className="mt-6 bg-white p-4 rounded-md">
          <AddAddress
            handelAddress={handelAddress}
            initialValues={initialValues}
          />
          {/* shipping address */}
          {addresses.map((address, index) => (
            <section key={index} className="bg-white rounded-md mt-2 p-4">
              <h2>Shipping Addresses</h2>
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
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="text-sm font-medium text-custom-blue hover:text-blue-500 bg-gray-300 px-4 py-1 rounded-sm  mx-1 "
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
