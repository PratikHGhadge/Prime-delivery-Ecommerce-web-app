import React, { useEffect, useState } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, deleteItem } from "../features/cart/cartAPI";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "cash", title: "cash" },
];

const address = [
  {
    name: "Pratik",
    street: "10th main",
    city: "Baramati",
    pinCode: "413209",
    state: "Maharashtra",
    phone: "7709063077",
  },
  {
    name: "Pravin",
    street: "10th main",
    city: "Baramati",
    pinCode: "413209",
    state: "Maharashtra",
    phone: "7709063077",
  },
];

function CheckOutPage() {
  const products = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [totalSum, setTotalSum] = new useState(0);
  const handleQuantityChange = (e, product) => {
    dispatch(updateCart({ id: product.id, quantity: +e.target.value }));
  };
  const handelDeleteItem = (productId) => {
    dispatch(deleteItem(productId));
  };
  const calculateTotalSum = (products) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].product.price * products[i].quantity;
    }
    return sum;
  };
  useEffect(() => {
    setTotalSum(calculateTotalSum(products));
  }, [products]);
  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div
        className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-custom-darkblue1"
        aria-hidden="true"
      />

      <main className=" relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2">
        <h1 className="sr-only">Checkout</h1>
        <section
          aria-labelledby="summary-heading"
          className=" bg-custom-blue text-white mt-28 pt-6 pb-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="bg-white p-8">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
              <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <form className="mt-12">
                <section aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>

                  <ul
                    role="list"
                    className="border-t border-b border-gray-200 divide-y divide-gray-200"
                  >
                    {products.map((product) => (
                      <li key={product.product.id} className="flex py-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                          <div>
                            <div className="flex justify-between">
                              <h4 className="text-sm">
                                <a
                                  href={`/product-detail/:${product.product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.product.title}
                                </a>
                                <div className="flex justify-center items-center mb-4 mt-4">
                                  <span className="mr-2">Quantity:</span>
                                  <select
                                    className="block w-16 px-2 py-1 mt-1 text-sm leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white"
                                    value={product.product.quantity}
                                    onChange={(e) => {
                                      handleQuantityChange(e, product);
                                    }}
                                  >
                                    {[...Array(10).keys()].map((num) => (
                                      <option key={num} value={num + 1}>
                                        {num + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </h4>
                              <p className="ml-4 text-sm font-medium text-gray-900">
                                {product.product.price}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* {product.color} */}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* {product.size} */}
                            </p>
                          </div>

                          <div className="mt-4 flex-1 flex items-end justify-between">
                            <p className="flex items-center text-sm text-gray-700 space-x-2">
                              {product.product.inStock ? (
                                <CheckIcon
                                  className="flex-shrink-0 h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ClockIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                                  aria-hidden="true"
                                />
                              )}

                              <span>
                                {product.product.inStock
                                  ? "In stock"
                                  : `Will ship in ${product.product.leadTime}`}
                              </span>
                            </p>
                            <div className="ml-4">
                              <button
                                type="button"
                                className="text-sm font-medium text-custom-blue hover:text-blue-500"
                                onClick={(e) => {
                                  handelDeleteItem(product.id);
                                }}
                              >
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
                {/* Order summary */}
                <section aria-labelledby="summary-heading" className="mt-10">
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
                          {totalSum}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-1 text-sm text-gray-500">
                      Shipping and taxes will be calculated at checkout.
                    </p>
                  </div>
                  <div className="mt-10 flex text-center">
                    <Link
                      to={"/checkout"}
                      className="w-full bg-custom-darkblue2 hover:bg-custom-darkblue1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Checkout
                    </Link>
                  </div>

                  <div className="mt-6 text-sm text-center">
                    <p>
                      or{" "}
                      <Link
                        to={"/home"}
                        className="text-custom-blue font-medium hover:text-blue-500"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
          </h2>
          <img
            className="mx-auto h-auto w-[160px] rounded-full"
            src="./assets/logo.png"
            alt="prime delivery"
          />
          <form>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <div>
                <h3
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full border-gray-300 rounded-md border p-1 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3
                  id="payment-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Payment details
                </h3>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        className="border p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
                    </div>
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
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className=" block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
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
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
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
                      <input
                        type="text"
                        id="region"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-custom-darkblue3sm:text-sm border p-1"
                      />
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
              <div className="mt-10">
                <h3
                  id="shipping-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Chose from existing address
                </h3>
                <div>
                  <ul role="list" className="divide-y divide-gray-100">
                    {address.map((person) => (
                      <li
                        key={person.email}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            // id={paymentMethod.id}
                            name="address"
                            type="radio"
                            defaultChecked
                            className="relative top-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 "
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.phone}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {person.city}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {person.state}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {person.pinCode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            defaultChecked
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                        ) : (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                        )}

                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-custom-darkblue2 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-custom-darkblue1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                >
                  Pay now
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default CheckOutPage;
