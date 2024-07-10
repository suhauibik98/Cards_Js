import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";

const SignUp = () => {
  const [spin , setSpin] = useState(false)
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please fill this field"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please fill this field"),
      password: Yup.string()
        .required("Please fill this field")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
        ),
      phone: Yup.string()
        .required("Please fill this field")
        .matches(/^\d{10}$/, "Please enter a valid phone number (10 digits)"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSpin(true)
      try {
        const res = await axios.post(
          "http://10.10.30.19:5000/api/auth/signup",
          values
        );
        if (res.status === 201) {
          nav("/login");
        }
      } catch (e) {
        const errorData = e.response?.data?.Err;
        if (errorData) {
          // Map server validation errors to form fields
          const fieldErrors = {};
          for (const [field, message] of Object.entries(errorData)) {
            fieldErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
          }
          setErrors(fieldErrors);
        } else {
          // Handle other types of errors (e.g., network errors)
          console.log(e);
          if(e.response.data.message){
            setErrors({general:e.response.data.message})
          }
          else
          setErrors({ general: "An unexpected error occurred. Please try again." });
        }
      } finally {
        setSubmitting(false);
        setSpin(false)
      }
    },
  });

  return (
    <section className="h-full">
      {spin && <Spinner/>}
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">
              Create an account!
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  className={`text-gray-700 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your email
                </label>
                <input
                  className={`text-gray-700 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  className={`text-gray-700 border ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="tel"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className={`text-gray-700 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              {formik.errors.general && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.general}
                </div>
              )}
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                  disabled={formik.isSubmitting}
                >
                  Create an account
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/login"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Already have an account?
                <span className="text-blue-700"> Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
