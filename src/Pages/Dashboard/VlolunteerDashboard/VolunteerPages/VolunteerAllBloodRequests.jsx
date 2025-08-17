import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaEye, FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";
import NoData from "../../../../Components/NoData";

export default function VolunteerAllBloodRequest() {
  const axiosSecure = useAxiosSecure();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queries = { text, status };

  const fetchReq = async (page, queries) => {
    const res = await axiosSecure(`/all-blood-req?page=${page}`, { params: queries });
    setTotalPages(Math.ceil(res.data.totalCount / 10));
    return res.data.result;
  };

  const { data: allReq = [], isLoading,  refetch } = useQuery({
    queryKey: ["Allreq", page, queries],
    queryFn: () => fetchReq(page, queries),
    keepPreviousData: true,
  });

  const handleStatusChange = async (newStatus, id) => {
    try {
      const res = await axiosSecure.patch(`/update-req-status/${id}`, { status: newStatus });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Status Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="md:p-6 p-2 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Blood Donation Requests</h1>
        <p className="text-sm text-gray-500">Manage all blood donation requests</p>
      </div>

      {/* Request Management */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Request Management</h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          <select
            className="select select-bordered md:w-40 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allReq.length===0?(<tr colspan='7'><NoData></NoData></tr>):(allReq.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1 + (page - 1) * 10}</td>
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

                  {/* Actions */}
                  <td>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-xs">
                        <HiDotsVertical size={18} />
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <Link to={`/donation-requests-details/${req._id}`}>
                            <button className="flex items-center gap-2">
                              <FaEye className="text-blue-500" /> View Details
                            </button>
                          </Link>
                        </li>
                        <li>
                          <details>
                            <summary className="flex items-center gap-2">
                              <FaEdit className="text-yellow-500" /> Update Status
                            </summary>
                            <div className="mt-2">
                              <select
                                className="select select-sm w-full"
                                defaultValue={req.status}
                                onChange={(e) => handleStatusChange(e.target.value, req._id)}
                              >
                                <option value="pending">Pending</option>
                                <option value="inprogress">In Progress</option>
                                <option value="done">Done</option>
                                <option value="canceled">Canceled</option>
                              </select>
                            </div>
                          </details>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, allReq.length + (page - 1) * 10)} of {totalPages * 10} requests
          </span>
          <div className="join mt-4">
            <button className="join-item btn btn-sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="join-item btn btn-sm btn-disabled">
              {page} of {totalPages}
            </button>
            <button className="join-item btn btn-sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
