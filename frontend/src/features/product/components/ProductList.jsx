import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { sortOptions } from "./filtersData";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  fetchProductsByFilterAndPage,
  fetchAllCategories,
  fetchAllBrands,
} from "../ProductListAPI";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import Mobilefilter from "./Mobilefilter";
import { sortProducts } from "../ProductSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import DesktopFilters from "./DesktopFilters";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const { products, totalItem, filters } = useSelector(
    (state) => state.products
  );
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchProductsByFilterAndPage({
        filter,
        page,
        limit: ITEMS_PER_PAGE,
      })
    );
  }, [dispatch, page]);

  const handelFilter = (e, option, section) => {
    const newFilter = { ...filter };
    // If the filter section doesn't exist, create it
    if (!newFilter[section.id]) {
      newFilter[section.id] = [];
    }
    if (e.target.checked) {
      // Add the selected option to the filter
      newFilter[section.id].push(option.value);
    } else {
      // Remove the deselected option from the filter
      const index = newFilter[section.id].indexOf(option.value);
      if (index !== -1) {
        newFilter[section.id].splice(index, 1);
      }
      setFilter(newFilter);
    }
    // Dispatch the fetchProductsByFilter action with the updated filter
    dispatch(fetchProductsByFilterAndPage({ filter: newFilter }));
    // Update the component's state with the new filter
    setFilter(newFilter);
  };

  const handleSort = (sortOption) => {
    dispatch(sortProducts(sortOption));
  };

  const handlePage = (newPage) => {
    dispatch(
      fetchProductsByFilterAndPage({
        filter,
        page: newPage,
        limit: ITEMS_PER_PAGE,
      })
    );
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrands());
  }, []);
  return (
    <div className="bg-white pt-0">
      <div className="bg-white shadow-xl">
        <div>
          {/* Mobile filter dialog */}
          <Mobilefilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handelFilter={handelFilter}
            filters={filters}
          />

          <main className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <button
                                value={option.value}
                                onClick={(e) => handleSort(e.target.value)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Product and filter page start here */}
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilters filters={filters} handelFilter={handelFilter} />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="mx-auto max-w-2xl px-4 py-4  sm:px-6  lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      Customers also purchased
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 xl:gap-x-8">
                      {products.map((product) => (
                        <Link to={"/product-detail"}>
                          <div
                            key={product.id}
                            className="group relative border shadow-xl p-2 "
                          >
                            <div className="relative  aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <span className="absolute top-0 right-0 bg-custom-red text-white px-2 py-1 rounded-bl-lg z-40">
                              {product.discountPercentage}% OFF
                            </span>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <Link to={product.thumbnail}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {product.title}
                                  </Link>
                                </h3>
                                <p className="flex  items-center  mt-1 text-sm text-gray-900">
                                  <div className="w-[11px] h-[11px] mr-1">
                                    <StarIcon />
                                  </div>
                                  {product.rating}
                                </p>
                              </div>
                              <div>
                                <p className="line-through text-sm font-medium text-gray-400">
                                  ₹{product.price}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  ₹
                                  {Math.round(
                                    product.price -
                                      (product.price / 100) *
                                        product.discountPercentage
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* Pagination */}
          <Pagination
            page={page}
            setPage={setPage}
            totalItem={totalItem}
            handlePage={handlePage}
          />
        </div>
      </div>
    </div>
  );
}
