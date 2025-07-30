import React from 'react';
import useRole from '../../../Hooks/useRole';
import { Navigate } from 'react-router';
import AdminDashboard from '../AdminDashboard/AdminDashboard/AdminDashboard';
import DonorDashboardHome from '../DonerDashboard/DonorDashboardComponents/DonorDashboardHome';
import VolunteerDashboardHome from '../VlolunteerDashboard/VolunteerPages/VolunteerDashboardHome';

const DashboardHome = () => {
  const {role,loading}=useRole()
  // console.log(role)
  
  
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (role === "donor") {
    return <DonorDashboardHome></DonorDashboardHome>;
  }
  if (role === "volunteer") {
    return <VolunteerDashboardHome></VolunteerDashboardHome>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>
  }

  return <Navigate to={"/"} />;
};

export default DashboardHome;