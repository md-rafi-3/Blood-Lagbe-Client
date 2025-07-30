import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router";
import { HiDotsVertical } from "react-icons/hi";
import { FaEye, FaEdit, FaTrash, FaSearch, FaCalendarAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { TiDelete } from 'react-icons/ti';
import Loading from '../../../Loading/Loading';

const MyDonationRequest = () => {
    const axiosSecure=useAxiosSecure()
    const [page, setPage] = useState(1)
        const [totalPages, setTotalPages] = useState(1);
        const [text,setText]=useState("")
        const [status,setStatus]=useState("")


    const fetchRequests=async(page)=>{
        const res=await axiosSecure.get(`/my-requests?page=${page}`);
         setTotalPages(Math.ceil(res.data.totalCount/10))
        return res.data.result;
    }

    const { data:requests=[], isLoading,refetch } = useQuery({
    queryKey: ['requests',page],
    queryFn: ()=>fetchRequests(page),
     keepPreviousData: true
  })

      
    // ✅ Delete Request Function
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/delete-request/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your request has been deleted.", "success");
        refetch()
      }
    }
  };

  // ✅ Update Status Function
  const handleStatusChange = async (id) => {
    const res = await axiosSecure.patch(`/update-req-status/${id}`, { status: "canceled" });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Status has been updated.", "success");
      refetch()
    }
  };

    if(isLoading){
      return <Loading></Loading>
    }
//   console.log("my requests",requests)
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
                    <input type="text" placeholder="Search requests..." defaultValue={text} onChange={(e)=>setText(e.target.value)} className="input input-bordered w-full pl-10" />
                  </div>
                  <select className="select select-bordered md:w-40 w-full" defaultValue={status} onChange={(e)=>setStatus(e.target.value)}>
                
                 <option value="">All</option>
                 <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
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
                        <th>Donor Info</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 */}
                     {requests.map((req,index)=>( <tr key={index}>
                      <td>{(index+1)+((page-1)*10)}</td>
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
                         <td><span>{req.donor?req.donor.donorName:"Not Available"}</span><br /><span>{req.donor?req.donor.donorEmail:"Not Available"}</span></td>
                        <td>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-xs">
          <HiDotsVertical size={18} />
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {/* View Details */}
          <li>
            <Link to={`/donation-requests-details/${req._id}`}>
              <button className="flex items-center gap-2">
                <FaEye className="text-blue-500" />
                View Details
              </button>
            </Link>
          </li>

          {/* Edit Request */}
          <li>
            <Link to={`/dashboard/update-requests/${req._id}`}>
              <button className="flex items-center gap-2">
                <FaEdit className="text-green-500" />
                Edit
              </button>
            </Link>
          </li>

          {/* Delete Request */}
          {req.status !=="inprogress"&&<li>
            <button
              onClick={() => handleDelete(req._id)}
              className="flex items-center gap-2"
            >
              <FaTrash className="text-red-500" />
              Delete
            </button>
          </li>}

          {/* Update Status */}
         {req.status !=="inprogress"||req.status !=="canceled"&&<li>
             <button
              onClick={() => handleStatusChange(req._id)}
              className="flex items-center gap-2"
            >
             <TiDelete />
              Cancel
            </button>
            </li>}
        </ul>
      </div>
    </td>
                      </tr>))}
        
                      
                    </tbody>
                  </table>
                </div>
                {/* pagination */}
                 <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
          Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, requests.length + (page - 1) * 5)} of {totalPages * 5} users
        </span>
                  <div className="join mt-4">
              {/* Previous Button */}
              <button
                className="join-item btn btn-sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
        
              {/* Page Number Info */}
              <button className="join-item btn btn-sm btn-disabled">
                {page} of {totalPages}
              </button>
        
              {/* Next Button */}
              <button
                className="join-item btn btn-sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
                </div>
                {/* pagination end */}
              </div>
            </div>
    );
};

export default MyDonationRequest;