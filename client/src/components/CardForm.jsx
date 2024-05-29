import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";

const CardForm = () => {
const [title , setTitle] = useState("")
const [description , setdescription] = useState("")
const [phone , setPhone] = useState("")
const nav = useNavigate()


 const handlerSubmit = async (e)=>{
    e.preventDefault()
const data = {title , description , phone}
try{
const res = await axios.post("http://192.168.0.131:5000/cardForm",data)

if(res.status === 201){
    nav("/layout")
}
}
catch(err){
    console.log(err);
}
 }

  return (
    <>
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handlerSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         onChange={e=>setdescription(e.target.value)}
         ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e=>setPhone(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>

    </>
  )
}

export default CardForm
