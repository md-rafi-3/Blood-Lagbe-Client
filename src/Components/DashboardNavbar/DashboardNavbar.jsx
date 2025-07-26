import React, { useContext } from 'react';
import {  MdLogin, MdOutlineDashboard, MdOutlineLogin } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { LuLogOut } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { FaDroplet } from 'react-icons/fa6';
import { AuthContext } from '../../Contexts/AuthContext';

const DashboardNavbar = () => {
  const {user}=useContext(AuthContext)
 
  
   const links=<>
     <li>
    <NavLink to="/" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
      Home
    </NavLink>
  </li>
     <li>
    <NavLink to="/" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
     Donation Requests
    </NavLink>
  </li>
  
  
    </>
    return (
       <div className="navbar  bg-base-100  shadow-sm sticky top-0 z-50 md:px-10">
  <div className="navbar-start">
   
      <label htmlFor="my-drawer"  role="button" className="btn btn-ghost lg:hidden">
        <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
    </label>
    <a className=" font-bold text-xl  flex items-center "><span className='text-primary mr-1'><FaDroplet size={23} className='text-[#d53131]' />
</span>Blood<span className='text-[#d53131]'>Lagbe?</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu text-base font-medium menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end flex pr-2 md:pr-0 items-center  gap-3">
   

      {
          user ? (<div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img id="user-tooltip" src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"} alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Tooltip */}
            <Tooltip
              anchorSelect="#user-tooltip"
              place="bottom"
              content={user.displayName}
            />
            <div tabIndex={0}
              className="menu menu-sm dropdown-content border-[#3e743e20] bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <div><h3 className='text-sm'>{user?.displayName}</h3>
                <p className='text-xs'>{user?.email}</p>
              </div>
              <ul>
                {links}

                <li>
                  <Link to="/dashboard" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""} >
                    <MdOutlineDashboard /> Dashboard

                  </Link>
                </li>
                
                
              </ul>
            </div>
          </div>) : <Link to="/login">
            <button className='md:flex hidden items-center gap-1 px-3 py-3 hover:bg-[#d53131] rounded-lg hover:text-white'><MdLogin />Login</button>
          </Link>
        }
      
  
  </div>
</div>
    );
};

export default DashboardNavbar;
