import { format } from "date-fns";
import React, { useContext } from "react";
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes, FaTint } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DonationRequestsTable from "../../../DonationRequests/DonationRequestsTable";
import Loading from "../../../Loading/Loading";


export default function DonorDashboardHome() {
  const { user } = useContext(AuthContext)
  const primaryColor = "#d53131";
  const formattedTime = format(new Date(), "EEEE, MMMM d, yyyy • hh:mm a");
  const axiosSecure = useAxiosSecure()

  const fetchRecReq = async () => {
    const res = await axiosSecure.get("/donor-rec")
    return res.data;
  }

  const { data: recentDonations = [], isLoading } = useQuery({
    queryKey: ['recRequests'],
    queryFn: fetchRecReq,
  })

  // const handleDelete = (id) => {
  //   if (confirm("Are you sure you want to delete this donation request?")) {
  //     console.log("Deleting request with id:", id);
  //   }
  // };

  console.log(recentDonations)

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div
        className="rounded-xl text-white p-6 flex flex-col gap-2 relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className="text-2xl font-bold">Welcome back, {user.displayName}!</h2>
        <p>Here's what's happening with your blood donation platform today.</p>
        <p className="text-sm">{formattedTime}</p>
        <div className="absolute top-4 right-6 opacity-20">
          <FaTint size={100} />
        </div>
      </div>

      {/* Recent Donation Requests */}
      {recentDonations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Recent Donation Requests</h2>
          {/* table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, index) => <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.recipientName}</td>
                  <td>{donation.division},{donation.district}</td>
                  <td>
                    {new Date(donation.donationDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>{donation.bloodGroup}</td>
                  <td > <div className="badge">{donation.status}</div></td>
                  <td><span>{donation.donor?donation.donor.donorName:"Not Available"}</span><br /><span>{donation.donor?donation.donor.donorEmail:"Not Available"}</span></td>
                </tr>)}
              </tbody>
            </table>
          </div>


          <div className="mt-6 text-right">
            <Link to="/dashboard/my-donation-requests">
              <button className="btn bg-[#d53131] text-white">View My All Requests</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
