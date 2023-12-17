import * as Yup from "yup";
export const LoginValidateYupSchema = Yup.object({
  email: Yup.string().email("Enter the valid email address"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
});

export const signUpValidateYupSchema = Yup.object({
  email: Yup.string().email("Enter the valid email address"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
  ConfirmPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
});
export const addressValidateYupSchema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  pinCode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Invalid pin code")
    .required(),
  state: Yup.string().required(),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required(),
});
