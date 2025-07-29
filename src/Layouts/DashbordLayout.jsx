import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { FaHome, FaUser, FaSignOutAlt, FaUsers, FaFileAlt, FaPlusCircle, FaListAlt } from 'react-icons/fa';
import { MdOutlineBloodtype } from 'react-icons/md';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Contexts/AuthContext';
import { RiMenu3Fill } from 'react-icons/ri';
import DashboardNavbar from '../Components/DashboardNavbar/DashboardNavbar';
import Swal from 'sweetalert2';

const DashbordLayout = () => {
  const {role}=useRole()
  const {userSignOut}=useContext(AuthContext)
  const navigate=useNavigate()
  // console.log(user)
   const handleSignOut=()=>{
    
   Swal.fire({
  title: "Are you sure?",
  text: "You will be logged out from your account.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, log me out!",
  cancelButtonText: "Cancel"
}).then((result) => {
  if (result.isConfirmed) {
    userSignOut().then(() => {
      Swal.fire({
  position: "center",
  icon: "success",
  title: "Logged Out Successfully!",
  showConfirmButton: false,
  timer: 1500
});

   setTimeout(()=>navigate("/login"),1500)
    }).catch((error) => {
        Swal.fire({
  position: "center",
  icon: "error",
  title: error.message,
  showConfirmButton: false,
  timer: 1500
});
    })
  }
});
   }

  const adminLinks = <>
   
      {/* 🔸 Dashboard Home Page */}
      <li>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaHome /> Dashboard Home
        </NavLink>
      </li>
      {/* profile */}
      <li>
        <NavLink
          to="/dashboard/profile"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaUser />
 Profile
        </NavLink>
      </li>

      {/* 🔸 All Users Page */}
      <li>
        <NavLink
          to="/dashboard/all-users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaUsers /> All Users
        </NavLink>
      </li>

      {/* 🔸 All Blood Donation Requests */}
      <li>
        <NavLink
          to="/dashboard/all-blood-donation-request"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <MdOutlineBloodtype /> All Blood Requests
        </NavLink>
      </li>

      {/* 🔸 Content Management Page */}
      <li>
        <NavLink
          to="/dashboard/content-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaFileAlt /> Content Management
        </NavLink>
      </li>

      {/* 🔸 Add Blog Page */}
      <li>
        <NavLink
          to="/dashboard/add-blog"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaPlusCircle /> Add Blog
        </NavLink>
      </li>

      {/* 🔸 Logout Button */}
      <li>
        <NavLink
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-red-500 hover:bg-red-100 transition"
        >
          <FaSignOutAlt /> Logout
        </NavLink>
      </li>
  </>

  const donorLinks = <>
    {/* 🔸 Donor Dashboard Home Page */}
    <li>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <FaHome /> Dashboard Home

      </NavLink>
    </li>

    <li>
        <NavLink
          to="/dashboard/profile"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaUser />
 Profile
        </NavLink>
      </li>

    {/* 🔸 My Donation Requests Page */}
    <li>
      <NavLink
        to="/dashboard/my-donation-requests"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <FaListAlt /> My Donation Requests
      </NavLink>
    </li>

    {/* 🔸 Create New Donation Request */}
    <li>
      <NavLink
        to="/dashboard/create-donation-request"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <FaPlusCircle /> Create Donation Request
      </NavLink>
    </li>

    {/* 🔸 Logout Button */}
    <li>
      <NavLink
       onClick={handleSignOut}
        
        className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-red-500 hover:bg-red-100 transition"
      >
        <FaSignOutAlt /> Logout
      </NavLink>
    </li>

  </>



  const volunteerLinks = <>
    {/* 🔸 Volunteer Dashboard Home Page */}
    <li>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <FaHome /> Dashboard Home
      </NavLink>
    </li>


     <li>
        <NavLink
          to="/dashboard/profile"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive ? 'bg-[#d53131] text-white' : 'hover:bg-gray-100 text-gray-800'
            }`
          }
        >
          <FaUser />
 Profile
        </NavLink>
      </li>
    {/* 🔸 All Blood Donation Requests Page (Volunteer limited permissions) */}
    <li>
      <NavLink
        to="/dashboard/volunteer-all-blood-donation-request"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <MdOutlineBloodtype /> All Blood Requests
      </NavLink>
    </li>

    {/* 🔸 Content Management (volunteer can't publish/delete) */}
    <li>
      <NavLink
        to="/dashboard/content-management"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
            ? 'bg-[#d53131] text-white'
            : 'hover:bg-gray-100 text-gray-800'
          }`
        }
      >
        <FaFileAlt /> Content Management
      </NavLink>
    </li>

    {/* 🔸 Logout */}
    <li>
      <NavLink
         onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-red-500 hover:bg-red-100 transition"
      >
        <FaSignOutAlt /> Logout
      </NavLink>
    </li>
  </>



  return (
    
    <div>
      <DashboardNavbar></DashboardNavbar>
      <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <div className="p-4">
          
          
          <Outlet />
         
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-white text-gray-800 space-y-2 shadow-lg">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-[#d53131] p-2 rounded-full">
                <FaHome className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#d53131]">Dashboard</h2>
                <p className="text-sm text-gray-500"> {
            role === "admin" ? "Admin Panel": role === "donor" ? "donor Panel" : role === "volunteer" ?"Volunteer Panel": null
          }</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          {
            role === "admin" ? adminLinks : role === "donor" ? donorLinks : role === "volunteer" ? volunteerLinks : null
          }




        </ul>
      </div>
    </div>
    </div>
  );
};

export default DashbordLayout;
