import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cart/cartAPI";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log("hellllllllllllllllllllo");
    dispatch(resetCart({ dispatch }));
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <div>
      {params?.id && navigate("/home")}
      <main className="grid min-h-full place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold">Order successfully Placed</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order No #{params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in my Account {">"} My Order
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/home" className="text-sm font-semibold text-gray-900">
              Go back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccessPage;
