import React from "react";
import Input from "../components/Input";
import "../styles/Login.scss";
import { useFormik } from "formik";
import { SignInSchema } from "../validations/schemas";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { conf } from "../config/conf";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";

const initialValues = {
  email: "",
  password: "",
};
const SignIn = () => {
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values, state) => {
        login(values, state);
      },
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // login api
  const login = async (values, state) => {
    toast.loading("Loading...");
    try {
      const { data } = await axios.post(
        `${conf.API_URL}/auth/sign-in`,
        values,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.status) {
        toast.dismiss();
        toast.success(data.message);
        dispatch(
          setLogin({
            user: data.data,
            token: data.token,
          })
        );
        navigate("/");
        // state.resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <Input
            error={errors.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            touched={touched.email}
            value={values.email}
            placeholder="Enter email address"
            type="email"
          />
          <Input
            error={errors.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            touched={touched.password}
            value={values.password}
            placeholder="Enter password"
            type="password"
          />
          <button type="submit">SUBMIT</button>
          <p className="text-white text-center">
            Haven't Register, Click to <Link to="/sign-up">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
