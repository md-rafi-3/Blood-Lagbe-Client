import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import FundingTable from './FundingTable';
import Loading from '../Loading/Loading';
import NoData from '../../Components/NoData';
import { FaDonate } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51RpWZ4ClCGqGKxwQVpw8H9QsQFDNGVbQL2e16MbOXDZRP79FIlROk7jbTeVSPEpZMCeYjSEtCgV0enDS8tJLoFqc00B3ABsvov");

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFunding = async (page) => {
    const res = await axiosSecure.get(`/funding-data?page=${page}`);
    setTotalPages(Math.ceil(res.data.totalCount / 5));
    return res.data.result;
  };

  const { data: fundingData = [], isLoading } = useQuery({
    queryKey: ['funding', page],
    queryFn: () => fetchFunding(page),
    keepPreviousData: true
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaDonate className="text-[#d53131]" /> Support Our Cause
      </h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Your contributions help us continue our mission. You can donate easily using the form below, 
        and see all recent donations in the table.
      </p>

      {/* Checkout Form */}
      <div className="bg-base-100 shadow-md rounded-lg p-5 mb-10">
        <h2 className="text-lg font-semibold mb-4">Make a Donation</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>

      {/* Donation Table */}
      <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {fundingData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    <NoData />
                  </td>
                </tr>
              ) : (
                fundingData.map((fund, index) => (
                  <FundingTable
                    fund={fund}
                    page={page}
                    key={index}
                    index={index}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {fundingData.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-600 mb-8">
          <span>
            Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, fundingData.length + (page - 1) * 5)} of {totalPages * 5} donations
          </span>
          <div className="join mt-3 md:mt-0">
            <button
              className="join-item btn btn-sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button className="join-item btn btn-sm btn-disabled">
              {page} of {totalPages}
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Donate Now Button */}
      <div >
        <button
          className="btn btn-lg text-white w-full bg-[#d53131] hover:bg-[#b32929] transition-colors"
          onClick={() => document.getElementById("donation_modal").showModal()}
        >
          <FaDonate /> Donate Now
        </button>
      </div>
    </div>
  );
};

export default Funding;
