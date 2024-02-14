import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./CustomErrorMsg";
import { useDispatch } from "react-redux";
import { loginUser } from "../authAPI";
import { useNavigate } from "react-router-dom";
import { LoginValidateYupSchema } from "./../../../validations/validationSchema";

const initialValues = { email: "", password: "" };

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await dispatch(
        loginUser({ email: values.email, password: values.password })
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <>
      <div className="pt-20 h-[100vh] sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white shadow rounded-3xl">
          <div className="min-h-auto py-10 bg-gray-50 rounded-3xl flex flex-col justify-center sm:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <img
                className="mx-auto h-auto w-[160px] rounded-full"
                src="./assets/logo.png"
                alt="prime delivery"
              />
              <h2 className="mb-6 text-center text-3xl font-extrabold text-custom-blue">
                Log in to your account
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={LoginValidateYupSchema}
            >
              <Form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name="email" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name="password" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-custom-darkblue1 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-custom-blue hover:text-custom-darkblue1"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-custom-darkblue1 "
                  >
                    Log in
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <Link
              to="/signup"
              className="font-medium text-custom-blue hover:text-custom-darkblue1"
            >
              <p className="mt-6 text-center text-sm text-gray-600">
                Or Not have an account SignUp
              </p>
            </Link>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border border-gray-300 w-full"></div>
                </div>
                <div className="relative flex item-center">
                  <span className="m-auto bg-white px-2 text-gray-500 text-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="#38a9e1"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="#38a9e1"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleLogin}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 488 512"
                      fill="#38a9e1"
                    >
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
