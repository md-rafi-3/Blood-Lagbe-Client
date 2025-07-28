import React from 'react';
import { FaCalendarAlt, FaEllipsisV } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router';

const DonationRequestsTable = ({req,index,page}) => {
    return (
 <tr>
              <td>{(index+1)+((page-1)*12)}</td>
                <td>
                  <div>
                    <p className="font-semibold">{req.recipientName}</p>
                    <p className="text-sm text-gray-500">{req.requesterEmail}</p>
                  </div>
                </td>
                <td><span className="badge bg-[#d53131] text-white">{req.bloodGroup}</span></td>
                <td>{req.hospital}</td>
                
                <td><span className="badge badge-warning">{req.status}</span></td>
                <td><span className="flex items-center gap-1"><FaCalendarAlt /> {req.donationDate}</span></td>
               
            
                <td><Link to={`/donation-requests-details/${req._id}`}><button className='btn btn-xs text-white bg-[#d53131] hover:bg-rose-600 '><FaEye></FaEye> Details</button></Link></td>
              </tr>
    );
};

export default DonationRequestsTable;