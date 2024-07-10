import React from 'react';
import NavBar from '../components/NavBar';
import "../style/home.scss";
import Swipper from '../components/Swipper';
import { useAppContext } from '../context/context';

const Home = () => {
const {userSlice} = useAppContext()
console.log(userSlice);
  return (
    <>
      {/* <NavBar /> */}
      <Swipper/>
      

      <div className='flex justify-center flex-col items-center gap-5'>
        <h1 className='text-center text-lg'>Home</h1>

        <div className='bg-red-100 w-52 h-52 rounded-3xl '></div>

      </div>
    </>
  );
}

export default Home;
