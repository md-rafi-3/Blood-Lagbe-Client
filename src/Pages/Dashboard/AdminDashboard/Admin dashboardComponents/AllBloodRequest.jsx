import React from "react";
import { FaSearch, FaEllipsisV, FaCalendarAlt } from "react-icons/fa";

export default function AllBloodRequest() {
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
                <th>Patient</th>
                <th>Blood Type</th>
                <th>Hospital</th>
                <th>Units Needed</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Required By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td>
                  <div>
                    <p className="font-semibold">Alice Johnson</p>
                    <p className="text-sm text-gray-500">+1234567890</p>
                  </div>
                </td>
                <td><span className="badge badge-neutral">O+</span></td>
                <td>City General Hospital</td>
                <td className="font-medium">3 units</td>
                <td><span className="badge badge-error">High</span></td>
                <td><span className="badge badge-warning">Pending</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> 2024-01-22</span></td>
                <td><FaEllipsisV /></td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td>
                  <div>
                    <p className="font-semibold">Bob Smith</p>
                    <p className="text-sm text-gray-500">+1234567891</p>
                  </div>
                </td>
                <td><span className="badge badge-neutral">A-</span></td>
                <td>St. Mary's Medical Center</td>
                <td className="font-medium">2 units</td>
                <td><span className="badge badge-warning">Medium</span></td>
                <td><span className="badge badge-info">Approved</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> 2024-01-25</span></td>
                <td><FaEllipsisV /></td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td>
                  <div>
                    <p className="font-semibold">Carol Brown</p>
                    <p className="text-sm text-gray-500">+1234567892</p>
                  </div>
                </td>
                <td><span className="badge badge-neutral">B+</span></td>
                <td>Metro Health Hospital</td>
                <td className="font-medium">1 units</td>
                <td><span className="badge badge-success">Low</span></td>
                <td><span className="badge badge-success">Completed</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> 2024-01-20</span></td>
                <td><FaEllipsisV /></td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td>
                  <div>
                    <p className="font-semibold">David Wilson</p>
                    <p className="text-sm text-gray-500">+1234567893</p>
                  </div>
                </td>
                <td><span className="badge badge-neutral">AB-</span></td>
                <td>Emergency Care Center</td>
                <td className="font-medium">4 units</td>
                <td><span className="badge badge-error">Critical</span></td>
                <td><span className="badge badge-warning">Pending</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> 2024-01-21</span></td>
                <td><FaEllipsisV /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
