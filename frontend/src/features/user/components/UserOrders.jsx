import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrders } from "../userAPI";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";

function UserOrders() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUserOrders());
  }, []);
  const orders = useSelector((state) => state.user.orders);
  return (
    <div>
      {/* {console.log(orders)} */}
      {orders.map((order, index) => (
        <div className="border-black " key={index}>
          {/* {console.log(order)} */}
          <div className="bg-white my-2 rounded-lg  p-8  mx-auto">
            <h1 className="text-3xl font-extrabold text tracking-tight text-gray-900 sm:text-4xl">
              Order # {index + 1}
            </h1>
            <h3 className=" text-gray-900 ">Order status : {order.status}</h3>

            <div className="mt-6">
              <section aria-labelledby="cart-heading ">
                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200 bg-gray-50 p-4 shadow-inner rounded-lg px-8"
                >
                  {order.products[0].map((product) => (
                    <li key={product.product.id} className="flex py-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.product.thumbnail}
                          alt={product.title}
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <Link
                                to={`/product-detail/:${product.product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.product.title}
                              </Link>
                              <div className="flex justify-center items-center mb-4 mt-4">
                                <span className="mr-2 text-black">
                                  Quantity:{product.quantity}
                                </span>
                              </div>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              {discountedPrice(product.product)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500"></p>
                          <p className="mt-1 text-sm text-gray-500"></p>
                        </div>

                        <div className="mt-4 flex-1 flex items-end justify-between">
                          <p className="flex items-center text-sm text-gray-700 space-x-2"></p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section aria-labelledby="summary-heading" className="mt-4">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>
                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">
                        Subtotal
                      </dt>
                      <dd className="ml-4 text-base font-medium text-gray-900">
                        {order.totalSum}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">
                        total items in order
                      </dt>
                      <dd className="ml-4 text-base font-medium text-gray-900">
                        {order.totalItem}
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>
              {/* shipping address */}
              <section className="bg-white rounded-md mt-2 p-4">
                <h2>Shipping Address</h2>
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress[0].name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress[0].street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress[0].phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress[0].city}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress[0].state}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress[0].pinCode}
                    </p>
                  </div>
                </li>
              </section>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
