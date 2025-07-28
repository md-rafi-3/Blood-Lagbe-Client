import React from "react";
import { FaSearch, FaEllipsisV, FaCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AllBloodRequest() {
  const axiosSecure=useAxiosSecure()

  const fetchReq=async()=>{
    const res=await axiosSecure(`/all-blood-req`);
    return res.data;
  }

  const { data:allReq=[], isLoading, error } = useQuery({
    queryKey: ['Allreq'],
    queryFn: fetchReq,
  })

  console.log("all req",allReq)
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Blood Donation Requests</h1>
        <p className="text-sm text-gray-500">Manage all blood donation requests</p>
      </div>

      {/* Request Management */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Request Management</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search requests..." className="input input-bordered w-full pl-10" />
          </div>
          <select className="select select-bordered md:w-40 w-full">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient</th>
                <th>Blood Type</th>
                <th>Hospital</th>
                <th>Status</th>
                <th>Required By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
             {allReq.map((req,index)=>( <tr>
              <td>{index+1}</td>
                <td>
                  <div>
                    <p className="font-semibold">{req.recipientName}</p>
                    <p className="text-sm text-gray-500">{req.requesterEmail}</p>
                  </div>
                </td>
                <td><span className="badge badge-neutral">{req.bloodGroup}</span></td>
                <td>{req.hospital}</td>
                
                <td><span className="badge badge-warning">{req.status}</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> {req.donationDate}</span></td>
                <td><FaEllipsisV /></td>
              </tr>))}

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
