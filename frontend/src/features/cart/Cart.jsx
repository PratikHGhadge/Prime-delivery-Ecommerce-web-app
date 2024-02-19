import React, { useEffect, useState } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, deleteItem } from "./cartAPI";
import { useNavigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";

function Cart() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.cartItems);
  const [totalSum, setTotalSum] = new useState(0);
  const dispatch = useDispatch();
  const handleQuantityChange = (e, product) => {
    dispatch(updateCart({ id: product.id, quantity: +e.target.value }));
  };
  const handelDeleteItem = (productId) => {
    dispatch(deleteItem(productId));
  };
  const calculateTotalSum = (products) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += discountedPrice(products[i].product) * products[i].quantity;
    }
    return sum;
  };
  useEffect(() => {
    setTotalSum(calculateTotalSum(products));
  }, [products]);
  useEffect(() => {}, [handelDeleteItem]);

  useEffect(() => {}, [handleQuantityChange]);
  return (
    <>
      {!products.length && navigate("/home")}
      <div className="max-w-5xl  bg-gray-200 mx-auto py-16 px-4 rounded-lg  sm:px-14 ">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl ">
          Shopping Cart
        </h1>

        <form className="mt-12 ">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b bg-white px-6 rounded-lg border-gray-200 divide-y divide-gray-200"
            >
              {products.map((product) => (
                <li key={product?.product.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product?.product.thumbnail}
                      alt={product?.product.title}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <Link
                            to={`/product-detail/:${product?.product.id}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product?.product.title}
                          </Link>
                          <div className="flex justify-center items-center mb-4 mt-4">
                            <span className="mr-2">Quantity:</span>
                            <select
                              className="block w-16 px-2 py-1 mt-1 text-sm leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white"
                              value={product?.quantity}
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
                          {discountedPrice(product.product) * product.quantity}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500"></p>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>

                    <div className="mt-4 flex-1 flex items-end justify-between">
                      <p className="flex items-center text-sm text-gray-700 space-x-2">
                        {product?.product.inStock ? (
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
                          {product?.product.inStock
                            ? "In stock"
                            : `Will ship in ${product?.product.leadTime}`}
                        </span>
                      </p>
                      <div className="ml-4">
                        <button
                          type="button"
                          className="text-sm font-medium hover:text-red-500"
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
                className="w-full bg-red-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
              >
                Checkout
              </Link>
            </div>

            <div className="mt-6 text-sm text-center">
              <p>
                or{" "}
                <Link
                  to={"/home"}
                  className="text-black font-medium hover:text-red-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

export default Cart;
