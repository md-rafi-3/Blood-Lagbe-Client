import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

const DonorCard = ({donor}) => {
  

  return (
    <div className="max-w-sm bg-red-50 border border-red-200 rounded-2xl p-4 shadow-md relative">
      <div className="absolute top-3 right-3 bg-[#d53131] text-white font-bold px-3 py-1 rounded-full shadow">
        {donor.bloodGroup}
      </div>
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-2">
        <img
          src={donor.avatar}
          alt={donor.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-red-300"
        />
   

        </div>
        <h2 className="text-xl font-bold text-gray-800">{donor.name}</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">{donor.status}</span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{donor.role}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaMapMarkerAlt />
        <p>{donor.upazila}, {donor.district}, {donor.division}</p>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaEnvelope />
        <p>{donor.email}</p>
      </div>
      <div className="flex gap-2 mt-4">
       
        <button className="flex-1 bg-[#d53131] text-white py-2 rounded-lg font-semibold shadow hover:bg-red-500">Request</button>
      </div>
    </div>
  );
};

export default DonorCard;
