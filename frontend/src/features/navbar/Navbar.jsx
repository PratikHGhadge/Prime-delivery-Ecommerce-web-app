import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { fetchProductsByFilterAndPage } from "../../features/product/ProductListAPI";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../app/constants";

const navigation1 = [
  { name: "Admin", href: "/admin", current: false },
  { name: "Orders", href: "/admin/orders", current: false },
];

const navigation2 = [{ name: "My Orders", href: "/orders", current: false }];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const islocation = (path) => {
  const bool =
    "/admin" === path ||
    "/orders" === path ||
    "/admin/orders" === path ||
    "/home" === path ||
    "/mobiles" === path ||
    "/sale" === path;
  if (bool) {
    return "outline-none text-white bg-gray-700";
  }
  return "";
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Navbar({ children }) {
  const noOfItem = useSelector((state) => state.cart.cartItems.length);
  const userRole = useSelector((state) => state.user.userInfo?.role);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const searchText = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!searchText) return;
    const filter = { title: [searchText] };
    dispatch(
      fetchProductsByFilterAndPage({
        filter,
        page: 1,
        limit: ITEMS_PER_PAGE,
      })
    );
  }, [searchText]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[10vh] items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={"/home"}>
                        <img
                          className=" hidden md:block  w-[300px] h-[10vh] "
                          src="./assets/logo2.png"
                          alt="prime delivery"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="rounded-xl bg-red-400">
                    <div className="relative z-10 h-fit  w-fit shadow">
                      <div className="max-w-7xl mx-auto px-2 sm:px-4 ">
                        <div className="relative flex items-center justify-between h-16">
                          <div className="flex items-center px-2 lg:px-0">
                            <div className="hidden lg:block lg:ml-2">
                              <div className="flex">
                                <div className="hidden md:block">
                                  <div className=" flex items-baseline space-x-4">
                                    {userRole === "admin" &&
                                      navigation1.map((item, index) => (
                                        <Link
                                          key={index}
                                          to={item.href}
                                          className={`${
                                            location.pathname === item.href &&
                                            islocation(location.pathname)
                                          } ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                                          aria-current={
                                            item.current ? "page" : undefined
                                          }
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    {userRole === "user" &&
                                      navigation2.map((item, index) => (
                                        <Link
                                          key={index}
                                          to={item.href}
                                          className={`${
                                            location.pathname === item.href &&
                                            islocation(location.pathname)
                                          } ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                                          aria-current={
                                            item.current ? "page" : undefined
                                          }
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                  </div>
                                </div>
                                {userRole === "user" && (
                                  <Link
                                    to={"/home"}
                                    className={`${
                                      location.pathname === "/home" &&
                                      "outline-none text-white bg-gray-700"
                                    } ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                                  >
                                    {" "}
                                    Home{" "}
                                  </Link>
                                )}
                                <Link
                                  to={"/sale"}
                                  className={`${
                                    location.pathname === "/sale" &&
                                    "outline-none text-white bg-gray-700"
                                  } ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                                >
                                  {" "}
                                  Sale{" "}
                                </Link>
                                <Link
                                  to={"/mobiles"}
                                  className={`${
                                    location.pathname === "/mobiles" &&
                                    "outline-none text-white bg-gray-700"
                                  } ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                                >
                                  {" "}
                                  Mobiles{" "}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-lg w-full lg:max-w-xs">
                              <label htmlFor="search" className="sr-only">
                                Search{" "}
                              </label>
                              <div className="relative z-50">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="text"
                                  // value={inputValue}
                                  onChange={(e) => handleInputChange(e)}
                                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-200 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                  placeholder="Search"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {userRole !== "admin" && (
                        <Link
                          to={"/cart"}
                          className="relative  bottom-2 mr-2  p-1 text-gray-400 hover:text-white focus:outline-none "
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View cart</span>
                          <span className="relative -bottom-3 left-[9px] inline-flex items-center rounded-md bg-red-50 px-1 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-pink-200">
                            {noOfItem}
                          </span>
                          <ShoppingCartIcon
                            className="h-6 w-6 "
                            aria-hidden="true"
                            color="black"
                          />
                        </Link>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={"/assets/userpng.png"}
                              alt=""
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative ml-1 p-4 inline-flex items-center justify-center rounded-md  bg-custom-darkred4  text-white hover:bg-custom-darkblue4 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1  pb-3 pt-2 mx-2 flex flex-col">
                  {userRole === "admin" &&
                    navigation1.map((item, index) => (
                      <Link
                        key={index}
                        // as="link"
                        to={item.href}
                        className={`${
                          location.pathname === item.href &&
                          islocation(location.pathname)
                        }  px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  {userRole === "user" &&
                    navigation2.map((item, index) => (
                      <Link
                        key={index}
                        // as="link"
                        to={item.href}
                        className={`${
                          location.pathname === item.href &&
                          islocation(location.pathname)
                        } px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  {userRole === "user" && (
                    <Link
                      to={"/home"}
                      className={`${
                        location.pathname === "/home" &&
                        "outline-none text-white bg-gray-700"
                      }  px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                    >
                      {" "}
                      Home{" "}
                    </Link>
                  )}
                  <Link
                    to={"/sale"}
                    className={`${
                      location.pathname === "/sale" &&
                      "outline-none text-white bg-gray-700"
                    }  px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                  >
                    {" "}
                    Sale{" "}
                  </Link>
                  <Link
                    to={"/mobiles"}
                    className={`${
                      location.pathname === "/mobiles" &&
                      "outline-none text-white bg-gray-700"
                    }  px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                  >
                    {" "}
                    Mobiles{" "}
                  </Link>
                  {userNavigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className={`${
                        location.pathname === item.href &&
                        islocation(location.pathname)
                      }  px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-yellow-500 hover:text-white transition duration-150 ease-in-out cursor-pointer `}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <Link
                      to={"/Cart"}
                      className="relative ml-auto flex-shrink-0 rounded-full p-1 text-white hover:text-white "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View cart</span>
                      <span className="inline-flex relative -bottom-3 left-[7px]  items-center rounded-md bg-red-50 px-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-pink-200">
                        {noOfItem}
                      </span>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                        color="black"
                      />
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2"></div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 rounded-lg  min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
