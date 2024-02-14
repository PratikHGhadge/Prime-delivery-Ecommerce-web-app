import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";

const Sale = () => {
  return (
    <div>
      <Navbar>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Sale Items
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Sample sale items */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img
                src="/sale-item1.jpg"
                alt="Sale Item 1"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">Sale Item 1</h2>
              <p className="text-gray-600 mb-4">
                $19.99{" "}
                <span className="text-sm text-gray-400 line-through">
                  $29.99
                </span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img
                src="/sale-item2.jpg"
                alt="Sale Item 2"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">Sale Item 2</h2>
              <p className="text-gray-600 mb-4">
                $14.99{" "}
                <span className="text-sm text-gray-400 line-through">
                  $24.99
                </span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img
                src="/sale-item3.jpg"
                alt="Sale Item 3"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">Sale Item 3</h2>
              <p className="text-gray-600 mb-4">
                $24.99{" "}
                <span className="text-sm text-gray-400 line-through">
                  $34.99
                </span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img
                src="/sale-item4.jpg"
                alt="Sale Item 4"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">Sale Item 4</h2>
              <p className="text-gray-600 mb-4">
                $29.99{" "}
                <span className="text-sm text-gray-400 line-through">
                  $39.99
                </span>
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Sale;
