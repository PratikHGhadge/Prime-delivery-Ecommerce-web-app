import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./CustomErrorMsg";
import { LoginValidateYupSchema } from "../../../validations/validationSchema";

const initialValues = { email: "" };

function ForgotPassword() {
  const onSubmit = async (values) => {
    console.log(values);
    console.log("hello");
  };

  return (
    <>
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow sm:rounded-lg ">
          <div className="min-h-auto py-10 bg-gray-50 flex flex-col justify-center sm:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <img
                className="mx-auto h-auto w-[160px] rounded-full"
                src="./assets/logo.png"
                alt="prime delivery"
              />
              <h2 className="mb-6 text-center text-3xl font-extrabold text-custom-blue">
                Send your email address
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

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-custom-darkblue1 "
                  >
                    send email
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <Link
              to="/login"
              className="font-medium text-custom-blue hover:text-custom-darkblue1"
            >
              <p className="mt-6 text-center text-sm text-gray-600">
                Go back to login page
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
