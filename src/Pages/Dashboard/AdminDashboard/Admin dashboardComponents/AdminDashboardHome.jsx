import { FaUsers, FaDollarSign, FaTint } from "react-icons/fa";
import { format } from 'date-fns';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../../Loading/Loading";
import FundingGraph from "../../../../Components/FundingGraph";
import DonationPostGraph from "../../../../Components/DonationPostGraph";

const AdminDashboardHome = () => {
  
  const axios=useAxiosSecure()
  const primaryColor = "#d53131";

  const formattedTime = format(new Date(), "EEEE, MMMM d, yyyy • hh:mm a");

      const fetchTotal=async()=>{
        const res=await axios.get("/total");
        return res.data
      }

      const { data:total=[], isLoading } = useQuery({
    queryKey: ['total'],
    queryFn: fetchTotal,
  })

  const fundingData = total?.fundingData|| [];
  const requestsData = total?.requestsData|| [];
  

  // console.log(activities)





 if (isLoading) {
     return (
      <Loading></Loading>
     );
   }
  
  

  return (
    <div className="md:px-4 px-3 space-y-6">
      {/* Welcome Banner */}
      <div
        className="rounded-xl text-white p-6 flex flex-col gap-2 relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
        <p>Here's what's happening with your blood donation platform today.</p>
        <p className="text-sm">{formattedTime}</p>
        <div className="absolute top-4 right-6 opacity-20">
          <FaTint size={100} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div  className="flex items-center shadow-md px-3 py-6 rounded-2xl gap-3 justify-center hover:shadow-lg transition-all  border border-gray-200 ">
          <div className="space-y-1">
            <p className="text-gray-500">Total Users (Donors)</p>
            <h3 className="text-3xl font-bold">{total.totalUsers}</h3>
            <p className="text-green-600 text-sm">+12% from last month</p>
          </div>
          <div className="bg-[#f8d3d3] p-3 rounded-full">
            <FaUsers color={primaryColor} size={28} />
          </div>
        </div>

        <div  className="flex items-center shadow-md px-3 py-6 rounded-2xl gap-3 justify-center hover:shadow-lg transition-all  border border-gray-200 ">
          <div className="space-y-1">
            <p className="text-gray-500">Total Funding Amount</p>
            <h3 className="text-3xl font-bold">${total.totalFunding}</h3>
            <p className="text-green-600 text-sm">+8% from last month</p>
          </div>
          <div className="bg-[#f8d3d3] p-3 rounded-full">
            <FaDollarSign color={primaryColor} size={28} />
          </div>
        </div>

        <div className="flex items-center shadow-md px-3 py-6 rounded-2xl gap-3 justify-center hover:shadow-lg transition-all  border border-gray-200 ">
          <div className="space-y-1">
            <p className="text-gray-500">Blood Donation Requests</p>
            <h3 className="text-3xl font-bold">{total.totalRequests}</h3>
            <p className="text-red-600 text-sm">5 pending approval</p>
          </div>
          <div className="bg-[#f8d3d3] p-3 rounded-full w-fit h-fit ">
            <FaTint color={primaryColor} size={28} />
          </div>
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-white shadow-md p-3 border border-gray-200 rounded-2xl">
          <h4 className="text-lg font-semibold mb-4">Funding Graph inlight</h4>
          <div className="space-y-4">
            <div className=" rounded-lg bg-gray-50">
             
            <FundingGraph data={fundingData}></FundingGraph>
              
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-md p-6 border border-gray-200 rounded-2xl">
          <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
          <DonationPostGraph data={requestsData}></DonationPostGraph>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
