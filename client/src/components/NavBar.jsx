import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";
import { LOGOUT } from "../context/actions";
import "../style/navbar.scss";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAppContext();
  const Logout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <>
      <nav className="bg-black  p-4">
        <div className="container mx-auto flex items-center justify-evenly">
          <div className="text-white text-2xl font-bold">
            <Link to="/">Real</Link>
          </div>
          <div className="hidden md:flex space-x-4 ">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/about" className="text-white">
              About
            </Link>
            <Link to="/" className="text-white">
              Contact
            </Link>
            <Link to="/layout" className="text-white">
              layout
            </Link>
          </div>
          <div className="hidden md:block space-x-4">
            <Link className="text-white">
              <span onClick={Logout}>Logout</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {!isOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#fffff"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={"M4 6h16M4 12h16m-7 6h7"}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "block toggle" : "hidden"} md:hidden`}>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#fffff"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={"M6 18L18 6M6 6l12 12"}
                  />
                </svg>
              )}
              {/* d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} */}
            </button>
          </div>
          <Link to="/" className="block px-4 py-2 text-white">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 text-white">
            About
          </Link>
          <Link to="/cardForm" className="block px-4 py-2 text-white">
            Contact
          </Link>
          <Link className="text-white">
            <span onClick={Logout}>Logout</span>{" "}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
