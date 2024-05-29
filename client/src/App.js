import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CardForm from "./components/CardForm";
import Prodector from "./components/Prodector";
import AboutPage from "./pages/AboutPage";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/login"  element={<Login/>} />
          <Route path="/"  element={<Prodector> <Home/> </Prodector>} />
          <Route path="/layout"  element={<Prodector><Layout/></Prodector>} />
          <Route path="/about"  element={<Prodector><AboutPage/></Prodector>} />
          <Route path="/signup"  element={<SignUp/>} />
          <Route path="/cardForm"  element={<Prodector> <CardForm/> </Prodector> } />
          <Route path="*"  element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
