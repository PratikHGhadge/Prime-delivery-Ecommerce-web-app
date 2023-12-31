import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "My Orders", href: "/orders", current: true },
  { name: "Team", href: "#", current: false },
  { name: "admin Home", href: "/admin", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const noOfItem = useSelector((state) => state.cart.cartItems.length);
  const userRole = useSelector((state) => state.auth.isLoggedIn.role);
  const filteredNavigation = navigation.filter((item) => {
    // Only include the "admin Home" item if userRole is 'admin'
    return item.name !== "admin Home" || userRole === "admin";
  });
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-custom-darkblue2">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={"/home"}>
                        <img
                          className=" invisible  md:visible  relative top-2 mt-16 h-auto pb-1 w-[190px] "
                          src="./assets/logo2.png"
                          alt="prime delivery"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {filteredNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? " bg-custom-darkblue4 text-white"
                                : "text-gray-300 hover:bg-custom-darkblue4 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
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
                          className="h-6 w-6"
                          aria-hidden="true"
                          color="white"
                        />
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
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
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
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
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  bg-custom-darkblue4 p-2 text-white hover:bg-custom-darkblue4 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {filteredNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      // as="link"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-custom-darkblue4 text-white"
                          : "text-gray-300 hover:bg-custom-darkblue4 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <Link
                      to={"/Cart"}
                      className="relative ml-auto flex-shrink-0 rounded-full p-1 text-white hover:text-white "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View cart</span>
                      <span className="inline-flex relative -bottom-3 left-[7px]  items-center rounded-md bg-red-50 px-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-pink-200">
                        7
                      </span>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-custom-darkblue4 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* <img
              className="h-auto w-[160px] "
              src="./assets/logo2.png"
              alt="prime delivery"
            /> */}
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
