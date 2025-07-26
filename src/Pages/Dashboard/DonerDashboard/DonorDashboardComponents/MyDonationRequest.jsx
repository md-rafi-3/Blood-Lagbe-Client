import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyDonationRequest = () => {
    const axiosSecure=useAxiosSecure()
    const fetchRequests=async()=>{
        const res=await axiosSecure.get("/my-requests");
        return res.data;
    }

    const { data:requests=[], isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequests,
  })

  console.log("my requests",requests)
    return (
        <div>
            
        </div>
    );
};

export default MyDonationRequest;