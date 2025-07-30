import React from 'react';
import errorLottie from '../../assets/errorPage.json';
import Lottie from 'lottie-react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';



const Error = () => {
  return (
      <div>
        
        <Navbar></Navbar>
         <div className="flex flex-col justify-center items-center  ">
      <div className="w-[300px] md:w-[500px]">
        <Lottie animationData={errorLottie} loop={true} />
      </div>

      <NavLink to="/"><button className='btn bg-[#d53131] text-white'><FaHome />Back to home</button></NavLink>
    </div>

      </div>
  );
};

export default Error;