import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
 <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-evenly">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/about" className="text-white">About</Link>
          <Link to="/cardForm" className="text-white">Contact</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <div className="mt-2 md:mt-0 md:flex md:items-center">
        <input 
          type="text" 
          className="mt-2 md:mt-0 px-4 py-2 w-full md:w-auto rounded-md focus:outline-none" 
          placeholder="Search..." 
        />
      </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <Link to="/" className="block px-4 py-2 text-white">Home</Link>
        <Link to="/about" className="block px-4 py-2 text-white">About</Link>
        <Link to="/contact" className="block px-4 py-2 text-white">Contact</Link>
      </div>
      {/* <div className="mt-2 md:mt-0 md:flex md:items-center">
        <input 
          type="text" 
          className="mt-2 md:mt-0 px-4 py-2 w-full md:w-auto rounded-md focus:outline-none" 
          placeholder="Search..." 
        />
      </div> */}
    </nav>      
    </>
  )
}

export default NavBar
