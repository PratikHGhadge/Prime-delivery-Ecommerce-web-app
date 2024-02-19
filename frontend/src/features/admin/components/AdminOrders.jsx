import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../order/orderAPI";
import Pagination from "../../product/components/Pagination";

function AdminOrders() {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const { orders, totalOrders } = useSelector((state) => state.order);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrders(pagination));
  }, [dispatch, page]);
  const handelShow = function () {};

  const handlePage = (newPage) => {
    const pagination = { _page: newPage, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrders(pagination));
    setPage(newPage);
  };

  const handelUpdate = async function (e, order) {
    order = { ...order, status: e.target.value };
    await dispatch(updateOrderStatus(order));
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
    }
  };
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg my-6">
        <table className="min-w-max w-full rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order Number</th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-center">Total Amount</th>
              <th className="py-3 px-6 text-center">Shipping Address</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2"></div>
                    <span className="font-medium">{index + 1}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  {order.products[0].map((product) => (
                    <div className="flex item-center">
                      <div className="mr-2">
                        <img
                          className="h-6 w-6 hover:scale-125 rounded-full"
                          src={product.product.thumbnail}
                        />
                      </div>
                      <span>
                        {product.product.title}
                        {"(" + product.quantity + ")"}
                      </span>
                    </div>
                  ))}
                </td>

                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    {order.totalSum}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="">
                    <div>{order.selectedAddress[0].name}</div>
                    <div>{order.selectedAddress[0].street}</div>
                    <div>{order.selectedAddress[0].city}</div>
                    <div>
                      {order.selectedAddress[0].state}
                      {"-" + order.selectedAddress[0].pinCode}
                    </div>
                    <div>{order.selectedAddress[0].phone}</div>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  {/* <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                    {order.status}
                  </span> */}

                  <select
                    name=""
                    id=""
                    value={order.staus}
                    onChange={(e) => handelUpdate(e, order)}
                    className={`${chooseColor(
                      order.status
                    )} py-1 px-3 rounded-full text-md`}
                  >
                    <option value="pending">{order.status}</option>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg
                        onClick={(e) => handelShow(order)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          page={page}
          setPage={setpage}
          handlePage={handlePage}
          totalItem={totalOrders}
        />
      </div>
    </div>
  );
}

export default AdminOrders;
