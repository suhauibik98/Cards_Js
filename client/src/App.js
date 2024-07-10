import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import CardForm from "./components/CardForm";
import Prodector from "./components/Prodector";
import AboutPage from "./pages/AboutPage";
import NavBar from "./components/NavBar";



function App() {
  return (
    <>
      <Router>
    {/* <Prodector><NavBar></NavBar></Prodector> */}
        <Routes>
          <Route path="/" index  element={<Prodector><NavBar></NavBar> <Home/> </Prodector>} />
          <Route path="/layout"  element={<Prodector><NavBar></NavBar><Layout/></Prodector>} />
          <Route path="/about"  element={<Prodector><NavBar></NavBar><AboutPage/></Prodector>} />
          <Route path="/cardForm"  element={<Prodector><NavBar></NavBar> <CardForm/> </Prodector> } />
          <Route path="/signup"  element={<SignUp/>} />
          <Route  path="/login"  element={<Login/>} />
          <Route path="*"  element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
