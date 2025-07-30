import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2';

const DonationRequestsDetails = () => {
     const [isOpen, setIsOpen] = useState(false);
    const {user}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    const {id}=useParams()
    // console.log(id)
    const fethDetails=async(id)=>{
        const res=await axiosSecure.get(`/requests-details/${id}`);
        return res.data
    }

    const { data: details=[], isLoading, error } = useQuery({
    queryKey: ['Details',id],
    queryFn: ()=>fethDetails(id),
    
  })

  const handleDonate=(id)=>{
       const donor={
        donorName:user.displayName,
        donorEmail:user.email
       }

      //  console.log(donor)

    axiosSecure.patch(`/donate-status?id=${id}`,{donor}).then(res=>{
        // console.log(res.data)
          if(res.data.modifiedCount > 0){
      Swal.fire({
        title: ' Donation Confirmed!',
        text: 'Status changed to In Progress successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d53131',
      });
    }
    }).catch((error) => {
        // console.log(error)
        Swal.fire({
  position: "center",
  icon: "error",
  title: error.message,
  showConfirmButton: false,
  timer: 1500
});
setIsOpen(false)
    })


  }

  if(isLoading){
    return <Loading></Loading>
  }
  // console.log(details )
    return (
        <div className='max-w-7xl mx-auto py-10'>
            <div className="max-w-3xl  mx-auto bg-white shadow-md p-6 rounded-xl space-y-6" style={{
          background:
            "linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(255,252,252,1) 50%, rgba(247,226,226,1) 100%)",
        }}>
      <h2 className="text-2xl font-bold text-gray-800">Donation Request Details</h2>

      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p><span className="font-semibold">Name:</span> {details.recipientName}</p>
          <p className="mt-2 flex items-center gap-2">
            <span className="font-semibold">Blood Group:</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full font-medium">{details.bloodGroup}</span>
          </p>
          <p className="mt-2"><span className="font-semibold">Contact:</span> {details.requesterEmail}</p>
        </div>

        <div>
          <p><span className="font-semibold">Hospital:</span> {details.hospital}</p>
          <p className="mt-2"><span className="font-semibold">Address:</span> {details.address}</p>
          <p className="mt-2"><span className="font-semibold">Date & Time:</span> {details.donationDate} at {details.donationTime}</p>
        </div>
      </div>

      <div>
        <p className="font-semibold">Additional Information:</p>
        <p>{details.additionalInfo}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-block rounded-4xl bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold"
        >
          <FaHeart className="mr-2" /> Donate Now
        </button>

        
      </div>

      {/* DaisyUI Modal */}
      {isOpen && (
        <>
          <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(false)} className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Confirm Your Donation</h3>
              <div className="space-y-3">
                <div>
                  <label className="label">Donor Name</label>
                  <input
                    type="text"
                    readOnly
                    value={user.displayName}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">Donor Email</label>
                  <input
                    type="email"
                    readOnly
                    value={user.email}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-green-500 hover:bg-green-600 text-white"
                  onClick={()=>handleDonate(details._id)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
        </div>
    );
};

export default DonationRequestsDetails;