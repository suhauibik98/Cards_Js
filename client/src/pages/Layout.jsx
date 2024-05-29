import React from 'react'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Cards from '../components/Cards'
import axios from 'axios'
const Layout = () => {

    
 

  return (
    <>
<div className="parent">


  <div className="nav">
    <NavBar></NavBar>
  </div>
  <div className="side"></div>
  <div className="side1">
<Cards></Cards>
<Cards></Cards>
<Cards></Cards>
<Cards></Cards>
<Cards></Cards>
<Cards></Cards>
<Cards></Cards>
  </div>
  <div className="side2"></div>
</div>
    </>
  )
}

export default Layout
