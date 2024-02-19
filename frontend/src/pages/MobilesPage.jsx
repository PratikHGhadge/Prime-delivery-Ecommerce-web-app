import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE, discountedPrice } from "../app/constants";
import { StarIcon } from "@heroicons/react/20/solid";
import { fetchProductsByFilterAndPage } from "../features/product/ProductListAPI";

const MobilesPage = () => {
  const dispatch = useDispatch();
  const { products, totalItem, brands, categories } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    const newFilter = { category: ["smartphones"] };
    dispatch(
      fetchProductsByFilterAndPage({
        filter: newFilter,
        page: 1,
        limit: ITEMS_PER_PAGE,
      })
    );
  }, []);
  return (
    <div>
      <Navbar>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Sale Items
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`}>
                <div className="container mx-auto py-8 " key={product.id}>
                  <div className="relative">
                    {/* Sample sale items */}

                    <div className="bg-white p-4 shadow-md rounded-lg">
                      <span className="absolute top-0 right-0 bg-custom-red text-white px-2 py-1 rounded-bl-lg z-40">
                        {product.discountPercentage}% OFF
                      </span>

                      <img
                        src={product.thumbnail}
                        alt={product.thumbnail}
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                      <h2 className="text-lg font-semibold mb-2">
                        {product.title}
                      </h2>
                      <div className="flex justify-between">
                        <p className="text-gray-600 mb-4">
                          ${discountedPrice(product) + "   "}
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price}
                          </span>
                        </p>
                        <p className="flex  items-center mb-4 text-sm text-gray-900">
                          <div className="w-[11px] h-[11px] mr-1">
                            <StarIcon />
                          </div>
                          {product.rating}
                        </p>
                      </div>

                      <button
                        // onClick={handelAddToCart}
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r bg-red-400"
                      >
                        View product detail
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default MobilesPage;
