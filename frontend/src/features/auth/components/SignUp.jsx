import React from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./CustomErrorMsg";
import { signUpValidateYupSchema } from "./../../../validations/validationSchema";
import { useDispatch } from "react-redux";
import { createUser } from "../authAPI";
import { Link, useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "", ConfirmPassword: "" };
const handleLogin = () => {
  window.open(import.meta.VITE_BASE_URL + "/auth/google", "_self");
};
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    if (values.password !== values.ConfirmPassword) {
      alert("Please Enter same password");
    }
    console.log(values);
    try {
      await dispatch(
        createUser({
          email: values.email,
          password: values.password,
          address: [],
        })
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignUp = async () => {
    window.open(import.meta.env.GOOGLE_CALLBACK_URL, "_self");
  };

  return (
    <>
      <div className="pt-20 h-[100vh] sm:mx-auto sm:w-full sm:max-w-md mx-2">
        <div className="bg-white shadow rounded-3xl ">
          <div className="min-h-auto py-10 bg-gray-50 px-2 rounded-3xl flex flex-col justify-center sm:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <img
                className="mx-auto h-auto w-[160px] rounded-full"
                src="./assets/logo.png"
                alt="prime delivery"
              />
              <h2 className="mb-6 text-center text-gray-700 text-3xl font-bold ">
                Sign in to your account
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={signUpValidateYupSchema}
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
                    <CustomErrorMsg name={"email"} />
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
                    <CustomErrorMsg name={"password"} />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="ConfirmPassword"
                      name="ConfirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name={"ConfirmPassword"} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to={"/forgot-password"}
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 hover:bg-custom-darkred41"
                  >
                    Sign in
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <p className="mt-6 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to={"/login"}
                className="font-medium text-black hover:text-red-600"
              >
                have an account Login
              </Link>
            </p>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 w">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleSignUp}
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

export default SignUp;
