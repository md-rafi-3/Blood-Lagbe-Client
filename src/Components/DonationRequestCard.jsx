import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaHospitalUser, FaEye, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const DonationRequestCard = ({request}) => {
  

  return (
    <div className=" bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
      <div className="flex justify-between mb-3">
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">High Priority</span>
        <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">{request.status==="pending"?"Pending":"inprogress"}</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">{request.recipientName}</h2>
      <p className="text-gray-600 mb-3">Needs <span className="text-red-600 font-semibold">{request.bloodGroup}</span> blood</p>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaMapMarkerAlt />
        <p>{request.upazila}, {request.district}, {request.division}</p>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaCalendarAlt />
        <p>{request.donationDate} at {request.donationTime}</p>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaHospitalUser />
        <p>{request.hospital}</p>
      </div>
      <p className="text-gray-500 mb-4 text-sm">{request.address} - {request.message}</p>
      <div className="flex flex-col gap-2">
        <Link to={`/donation-requests-details/${request._id}`} className='btn brn-outline'> <FaEye /> View Details</Link>
        
      </div>
    </div>
  );
};

export default DonationRequestCard;
