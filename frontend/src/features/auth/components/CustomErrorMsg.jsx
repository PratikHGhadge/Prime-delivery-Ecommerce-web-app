import React from "react";
import { ErrorMessage } from "formik";

function CustomErrorMsg({ name }) {
  return (
    <div className="text-sm px-2 font-thin text-black ">
      <ErrorMessage name={`${name}`} />
    </div>
  );
}

export default CustomErrorMsg;
