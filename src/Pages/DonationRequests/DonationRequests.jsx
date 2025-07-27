import React from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import DonationRequestCard from '../../Components/DonationRequestCard';

const DonationRequests = () => {
    const axiosPublic=useAxiosPublic()
    const fetchRequests=async()=>{
        const res=await axiosPublic.get("/all-requests");
        return res.data
    }

    const { data: requestes=[], isLoading, error } = useQuery({
    queryKey: ['allRequests'],
    queryFn: fetchRequests,
  })
  console.log(requestes)
    return (
        <div>


            <div>
                {requestes.map(request=><DonationRequestCard request={request}></DonationRequestCard>)}
            </div>
            
        </div>
    );
};

export default DonationRequests;