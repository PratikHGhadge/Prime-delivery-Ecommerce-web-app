import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cart/cartAPI";
import { resetOrder } from "../features/order/orderSlice";
import { motion } from "framer-motion";

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    dispatch(resetCart({ dispatch }));
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <div>
      {/* {params?.id && navigate("/home")} */}
      <main className=" min-h-[100vh] bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
        <div className=" shadow-lg bg-white pb-24 lg:mx-64 mx-auto rounded-lg ">
          <div className="flex justify-center">
            <img className="h-full " src="/assets/ordersuccess.gif" alt="" />
          </div>
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thank you for ordering!
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can check your order in my Account {">"} My Order
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/orders"
                  className="w-full border  border-slate-700 rounded-md shadow-sm py-3 px-4 text-base font-medium text-black bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
                >
                  View Order
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/home"
                  className="w-full bg-red-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccessPage;
