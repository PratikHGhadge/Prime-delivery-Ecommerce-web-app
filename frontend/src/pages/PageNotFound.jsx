import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <div>
      <main className=" min-h-[100vh] bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
        <div className=" shadow-lg bg-white pb-24 lg:mx-64 mx-auto rounded-lg ">
          <div className="flex justify-center">
            <img className="h-96 " src="/assets/pagenotfound.jpeg" alt="" />
          </div>
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/home"
                  className="w-full bg-red-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
                >
                  go back to home
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
