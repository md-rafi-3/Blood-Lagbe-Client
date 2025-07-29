import React, {  useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { NavLink } from 'react-router';
import { FaDroplet } from 'react-icons/fa6';

const Footer = () => {
  const {user}=useContext(AuthContext)
  const links = <>
  <li>
    <NavLink to="/" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
   Home
    </NavLink>
  </li>

  <li>
    <NavLink to="/all-donation-requests" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
       Donation Requests
    </NavLink>
  </li>

  <li>
    <NavLink to="/searchDonors" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
     Search Donors
    </NavLink>
  </li>

  {user && (
    <li>
      <NavLink to="/funding" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
        Funding
      </NavLink>
    </li>
  )}

  <li>
    <NavLink to="/blogs" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
      Blogs
    </NavLink>
  </li>
</>
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
   <a className=" font-bold text-xl  flex items-center "><span className='text-primary '><FaDroplet size={23} className='text-[#d53131]' />
   </span>Blood<span className='text-[#d53131]'>Lagbe?</span></a>
   <p>"Your Trusted Platform for Emergency Blood Requests"</p>
  </aside>
 <ul>
  {links}
 </ul>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    );
};

export default Footer;