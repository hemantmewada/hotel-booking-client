import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .min(5, "First name should be atleast 5 characters.")
    .max(255, "It can't be more than 255 Characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(5, "Last name should be atleast 5 characters.")
    .max(255, "It can't be more than 255 Characters."),
  email: Yup.string()
    .email("Invalid email type")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required.")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password"), null],
      "confim password should be match to password."
    ),
});
export const SignInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email type")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Password is required.")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
});

export const CreateListingSchema = Yup.object({
  streetAddress: Yup.string()
    .required("Street Address is required.")
    .min(5, "Street Address should be atleast 5 characters.")
    .max(255, "Street Address can't be more than 255 Characters."),
  aptSuite: Yup.string()
    .required("aptSuite is required.")
    .min(5, "aptSuite should be atleast 5 characters.")
    .max(255, "aptSuite can't be more than 255 Characters."),
  city: Yup.string()
    .required("City is required.")
    .min(2, "City should be atleast 2 characters.")
    .max(255, "City can't be more than 255 Characters."),
  province: Yup.string()
    .required("Province is required.")
    .min(2, "Province should be atleast 2 characters.")
    .max(255, "Province can't be more than 255 Characters."),
  country: Yup.string()
    .required("Country is required.")
    .min(2, "Country should be atleast 2 characters.")
    .max(255, "Country can't be more than 255 Characters."),
  title: Yup.string()
    .required("Title is required.")
    .min(2, "Title should be atleast 2 characters.")
    .max(255, "Title can't be more than 255 Characters."),
  description: Yup.string()
    .required("Description is required.")
    .min(2, "Description should be atleast 2 characters.")
    .max(255, "Description can't be more than 255 Characters."),
  highlight: Yup.string()
    .required("Highlight is required.")
    .min(2, "Highlight should be atleast 2 characters.")
    .max(255, "Highlight can't be more than 255 Characters."),
  highlightDescription: Yup.string()
    .required("Highlight Description is required.")
    .min(2, "Highlight Description should be atleast 2 characters.")
    .max(255, "Highlight Description can't be more than 255 Characters."),
  price: Yup.number()
    .typeError("Price must be a number.")
    .required("Price is required.")
    .min(1, "Price should be greater than 1."),
});
