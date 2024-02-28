import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./CustomErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authAPI";
import { useNavigate } from "react-router-dom";
import { LoginValidateYupSchema } from "./../../../validations/validationSchema";

const initialValues = { email: "", password: "" };

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserToken = useSelector(
    (state) => state.auth.loggedInUserToken
  );

  useEffect(() => {
    // Check if the user is already logged in
    if (loggedInUserToken) {
      navigate("/home");
    }
  }, [loggedInUserToken]);

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

  const handleLogin = async () => {
    window.open("https://prime-delivery-ecommerce-web-app.onrender.com/auth/google", "_self");
  };

  return (
    <>
      <div className="pt-20 h-[100vh] sm:mx-auto sm:w-full mx-2  sm:max-w-md ">
        <div className="bg-gray-50 shadow rounded-3xl px-4">
          <div className="min-h-auto py-10 bg-gray-50 rounded-3xl flex flex-col justify-center sm:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <img
                className="mx-auto h-auto w-[160px] rounded-full"
                src="./assets/logo.png"
                alt="prime delivery"
              />
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-700">
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
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-red-600 hover:text-custom-darkred4"
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 hover:bg-custom-darkred4 "
                  >
                    Log in
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <Link
              to="/"
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

              <div className="mt-6">
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
                      fill="red"
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
