

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FETCH } from "../context/actions";
import { useAppContext } from "../context/context";

const Login = () => {
  const {userSlice,dispatch} = useAppContext()
  const nav = useNavigate();

  const [handErr , setHandErr] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
  });

  const handleLogin = async (values, { setSubmitting }) => {
    const { email, password } = values;
    const User = { email, password };
    
    try {
      const res = await axios.post("http://192.168.0.100:5000/api/auth/login", User);
      dispatch({type : FETCH,payload: res.data})
      const {token} = res.data;
      console.log(userSlice);
      const { isAdmin } = res?.data;
      if (isAdmin) {
        nav("/");
      } else if (res.status === 200) {
        nav("/layout");
      }
      
      localStorage.setItem("token",JSON.stringify(token))
    } 
    
    catch (err) {
      if(err.response.status === 400){
        setHandErr(true)
      }
      
    } finally {
      setHandErr(false)
      setSubmitting(false);
    }
  };

  return (
    <section className="h-full">
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="mt-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address
                    </label>
                    <Field
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                    {handErr&&<span className="text-red-600 text-sm mt-1">Your Email is not valid</span>}
                  </div>
                  <div className="mt-4 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                    </div>
                    <Field
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                                        {handErr&&<span className="text-red-600 text-sm mt-1">Your Pssword is not valid</span>}

                    <Link
                      to="#"
                      className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
