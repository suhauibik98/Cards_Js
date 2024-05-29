import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error states
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneError("");

    let isValid = true;

    if (!name) {
      setNameError("Please fill this field");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Please fill this field");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setPasswordError("Please fill this field");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character");
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      setPhoneError("Please fill this field");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number (10 digits)");
      isValid = false;
    }

    if (!isValid) {
      return; // Do not submit if any field is invalid
    }

    const UserSignUp = {
      name,
      email,
      password,
      phone,
    };

    try {
      const res = await axios.post("http://192.168.0.100:5000/api/auth/signup", UserSignUp);

      if (res.status === 201) {
        nav("/login");
      }
    } catch (e) {
        // console.log(e);
    //   alert(e.response.data.mesg);
    //   console.log(e);

let v = Object.keys(e.response.data.Err).join(",")
      if(e.response.data.Err){
           alert(`${v} already exists`)
    }
    }
  };

  return (
    <>
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
              <p className="text-xl text-gray-600 text-center">
                Create an account!
              </p>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  className={`text-gray-700 border ${
                    nameError ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">{nameError}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your email
                </label>
                <input
                  className={`text-gray-700 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  className={`text-gray-700 border ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
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
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700`}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <div className="mt-8">
                <button
                  onClick={handleSignup}
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Create an account
                </button>
              </div>

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
    </>
  );
};

export default SignUp;
