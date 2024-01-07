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

export const productValidateYupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  discountPercentage: Yup.number()
    .typeError("Discount must be a number")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100%"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  brand: Yup.string(),
  category: Yup.string(),
  thumbnail: Yup.string()
    .url("Please enter a valid URL")
    .matches(/\.(jpeg|jpg|gif|png)$/, "Please enter a valid image URL")
    .required("Image URL is required"),
});
