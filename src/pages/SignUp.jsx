import React, { useState } from "react";
import "../styles/Register.scss";
import Input from "../components/Input";
import { useFormik } from "formik";
import { SignUpSchema } from "../validations/schemas";
import axios from "axios";
import { conf } from "../config/conf";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, state) => {
        const formData = new FormData();
        if (profile) {
          formData.append("profile", profile);
        }
        for (const key in values) {
          formData.append(key, values[key]);
        }
        register(formData, state);
      },
    });

  // register api
  const register = async (formData, state) => {
    toast.loading("Loading...");
    try {
      const { data } = await axios.post(
        `${conf.API_URL}/auth/sign-up`,
        formData
      );
      if (data.status) {
        toast.dismiss();
        toast.success(data.message);
        state.resetForm();
        navigate("/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response.data.message);
      console.log(error);
    }
  };

  // remove profile photo
  const handleRemoveProfile = () => {
    setProfile(null);
    document.getElementById("profile").value = "";
  };
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <Input
            name="firstName"
            placeholder="Enter first name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.firstName}
            error={errors.firstName}
          />
          <Input
            name="lastName"
            placeholder="Enter last name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.lastName}
            error={errors.lastName}
          />
          <Input
            name="email"
            placeholder="Enter email "
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            type="email"
          />
          <Input
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            type="password"
          />
          <Input
            name="confirmPassword"
            placeholder="Enter confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            type="password"
          />
          <input
            className="d-none"
            name="profile"
            id="profile"
            onChange={(e) => setProfile(e.target.files[0])}
            type="file"
          />
          <label htmlFor="profile">
            <img src="./assets/addImage.png" alt="upload profile photo" />
            Upload your profile photo
          </label>
          {profile && (
            <>
              <img
                style={{ borderRadius: "10px" }}
                width="120px"
                src={URL.createObjectURL(profile)}
                alt="Uploaded profile photo"
              />
              <span
                className="text-white cursor-pointer"
                onClick={handleRemoveProfile}
              >
                Remove Profile
              </span>
            </>
          )}
          <button type="submit">Sign up</button>
          <p className="text-white text-center">
            Already registered, Click to <Link to="/sign-in">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
