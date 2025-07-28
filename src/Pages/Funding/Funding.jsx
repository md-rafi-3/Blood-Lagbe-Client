import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import FundingTable from './FundingTable';


const stripePromise = loadStripe("pk_test_51RpWZ4ClCGqGKxwQVpw8H9QsQFDNGVbQL2e16MbOXDZRP79FIlROk7jbTeVSPEpZMCeYjSEtCgV0enDS8tJLoFqc00B3ABsvov");

const Funding = () => {
    const axiosSecure=useAxiosSecure()
    const [page,setPage]=useState(1)
     const [totalPages,setTotalPages]=useState(1)
    
    const fetchFunding=async(page)=>{
        const res=await axiosSecure.get(`/funding-data?page=${page}`)
         setTotalPages(Math.ceil(res.data.totalCount/5))
        return res.data.result
    }

    const { data:fundingData=[], isLoading, error } = useQuery({
    queryKey: ['funding',page],
    queryFn:()=>fetchFunding(page),
     keepPreviousData: true
  })

  console.log(fundingData)
    return (
        <div className="max-w-md mx-auto mt-10 px-3">
            <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>

          
          <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {fundingData.map((fund,index)=><FundingTable fund={fund} page={page} key={index} index={index}></FundingTable>)}
      
    </tbody>
  </table>
</div>
          </div>
          {/* paginaton */}

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 mb-5">
        <span>
  Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, fundingData.length + (page - 1) * 5)} of {totalPages * 5} users
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
        {/* end */}
            

           {/* Open Modal Button */}
      <button className="btn text-white btn-block bg-[#d53131]" onClick={() => document.getElementById("donation_modal").showModal()}>
        Donate Now
      </button>



        </div>
    );
};

export default Funding;