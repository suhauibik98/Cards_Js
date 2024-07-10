import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../context/context";
import { SETCARDS } from "../context/actions";
import Spinner from "./Spinner";

const CardForm = () => {
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({
    phone: "",
    description: "",
    title: "",
    location: ""
  });
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (location.state) {
      setInitialValues(location.state);
    }
  }, [location]);
  
  const ValidationForm = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    location: Yup.string().required("Location is required")
  });

  const handlerSubmit = async (values) => {
    setSpin(true);
    const { title, description, phone, location } = values;
    const data = { title, description, phone, location };

    // console.log(location.state);
    try {
      var res = {};
      if(initialValues?._id){
         res = await axios.put(`http://10.10.30.30:5000/api/cards/update-card/${initialValues._id}`, data);
      }
      else{
        res = await axios.post("http://10.10.30.30:5000/api/cards/add-card-form", data);
      }
      dispatch({ type: SETCARDS, payload: res.data });

      if (res.status === 201 || res.status === 200) {
        navigate("/layout");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSpin(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {spin && <Spinner />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ValidationForm}
        onSubmit={handlerSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                className={`${
                  errors.title && touched.title ? "border-red-500" : ""
                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <ErrorMessage name="title" component="div" className="text-red-600" />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                className={`${
                  errors.location && touched.location ? "border-red-500" : ""
                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <ErrorMessage name="location" component="div" className="text-red-600" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <Field
                id="description"
                name="description"
                placeholder="Enter description"
                className={`${
                  errors.description && touched.description ? "border-red-500" : ""
                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <ErrorMessage name="description" component="div" className="text-red-600" />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                className={`${
                  errors.phone && touched.phone ? "border-red-500" : ""
                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              <ErrorMessage name="phone" component="div" className="text-red-600" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              
              {initialValues?._id ? "Update" : "Create"}

            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;
