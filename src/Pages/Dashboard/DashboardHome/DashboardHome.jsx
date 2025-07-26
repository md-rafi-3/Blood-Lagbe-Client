import React from 'react';
import useRole from '../../../Hooks/useRole';
import { Navigate } from 'react-router';
import AdminDashboard from '../AdminDashboard/AdminDashboard/AdminDashboard';
import DonorDashboardHome from '../DonerDashboard/DonorDashboardComponents/DonorDashboardHome';

const DashboardHome = () => {
  const {role,loading}=useRole()
  console.log(role)
  
  
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (role === "donor") {
    return <DonorDashboardHome></DonorDashboardHome>;
  }
  if (role === "volunteer") {
    return <div>Moderator Dashboard </div>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>
  }

  return <Navigate to={"/"} />;
};

export default DashboardHome;