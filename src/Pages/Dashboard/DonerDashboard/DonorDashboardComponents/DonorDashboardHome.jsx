import React from "react";
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

// 👉 Demo user
const demoUser = {
  name: "Rafi",
};

// 👉 Demo donation requests
const demoDonationRequests = [
  {
    id: "1",
    recipientName: "Abdullah",
    recipientDistrict: "Pabna",
    recipientUpazila: "Ishwardi",
    donationDate: "2025-08-01",
    donationTime: "10:30 AM",
    bloodGroup: "A+",
    status: "inprogress",
    donorName: "Rafi",
    donorEmail: "rafi@example.com",
  },
  {
    id: "2",
    recipientName: "Fatema",
    recipientDistrict: "Dhaka",
    recipientUpazila: "Mirpur",
    donationDate: "2025-08-03",
    donationTime: "02:00 PM",
    bloodGroup: "O-",
    status: "pending",
  },
  {
    id: "3",
    recipientName: "Karim",
    recipientDistrict: "Chittagong",
    recipientUpazila: "Pahartoli",
    donationDate: "2025-08-05",
    donationTime: "11:00 AM",
    bloodGroup: "B+",
    status: "done",
  },
];

export default function DonorDashboardHome() {
  const user = demoUser;
  const donationRequests = demoDonationRequests;
  const recentDonations = donationRequests.slice(0, 3);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this donation request?")) {
      console.log("Deleting request with id:", id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary text-white rounded-2xl p-6 shadow-md">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name || "Donor"} 🩸
        </h1>
        <p className="mt-1 text-sm">Manage your donation activities from here.</p>
      </div>

      {/* Recent Donation Requests */}
      {recentDonations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Recent Donation Requests</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, index) => (
                  <tr key={donation.id}>
                    <th>{index + 1}</th>
                    <td>{donation.recipientName}</td>
                    <td>{donation.recipientDistrict}, {donation.recipientUpazila}</td>
                    <td>{donation.donationDate}</td>
                    <td>{donation.donationTime}</td>
                    <td>{donation.bloodGroup}</td>
                    <td className="capitalize">{donation.status}</td>
                    <td>
                      {donation.status === "inprogress" && (
                        <div>
                          <p className="font-semibold">{donation.donorName}</p>
                          <p className="text-sm">{donation.donorEmail}</p>
                        </div>
                      )}
                    </td>
                    <td className="flex flex-wrap gap-1">
                      {donation.status === "inprogress" && (
                        <>
                          <button className="btn btn-sm btn-success tooltip" data-tip="Mark as Done">
                            <FaCheck />
                          </button>
                          <button className="btn btn-sm btn-error tooltip" data-tip="Cancel">
                            <FaTimes />
                          </button>
                        </>
                      )}
                      {(donation.status === "pending" || donation.status === "inprogress") && (
                        <Link to={`/dashboard/edit-donation/${donation.id}`}>
                          <button className="btn btn-sm btn-info tooltip" data-tip="Edit">
                            <FaEdit />
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(donation.id)}
                        className="btn btn-sm btn-warning tooltip"
                        data-tip="Delete"
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/dashboard/donation-details/${donation.id}`}>
                        <button className="btn btn-sm btn-outline tooltip" data-tip="View Details">
                          <FaEye />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-right">
            <Link to="/dashboard/my-donation-requests">
              <button className="btn btn-primary">View My All Requests</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
