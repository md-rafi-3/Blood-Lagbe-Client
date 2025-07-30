import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import DonationRequestCard from '../../Components/DonationRequestCard';
import { FaThLarge } from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa6';
import DonationRequestsTable from './DonationRequestsTable';
import Loading from '../Loading/Loading';
import NoData from '../../Components/NoData';

const DonationRequests = () => {
     const [view, setView] = useState('grid');
     const [page,setPage]=useState(1)
     const [totalPages,setTotalPages]=useState(1)
    const axiosPublic=useAxiosPublic()
   
    const fetchRequests=async(page)=>{
        const res=await axiosPublic.get(`/all-requests?page=${page}`);
         setTotalPages(Math.ceil(res.data.totalCount/12))
        return res.data.result;
    }

    const { data: requestes=[], isLoading } = useQuery({
    queryKey: ['allRequests',page],
    queryFn: ()=>fetchRequests(page),
     keepPreviousData: true,
  })
  console.log(requestes)
  if(isLoading){
    return <Loading></Loading>
  }
    return (
        <div className='max-w-7xl mx-auto px-3'>

             <div className='flex justify-end py-5'>
                <div className="flex items-center bg-base-200 rounded-lg">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-l-lg ${view === 'grid' ? 'bg-[#d53131] text-white' : 'text-gray-500'}`}
                        >
                            <FaThLarge />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-r-lg ${view === 'list' ? 'bg-[#d53131] text-white' : 'text-gray-500'}`}
                        >
                            <FaListUl />
                        </button>
                    </div>

             </div>

             <div className='flex justify-center items-center'>{requestes.length===0 &&<NoData></NoData>}</div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${view==="list" ?"hidden":"block"}`}>
                {requestes.map(request=><DonationRequestCard request={request}></DonationRequestCard>)}
            </div>


            <div className={`${view==="grid" ?"hidden":"block"}`}>

                  {/* Table */}
                        <div className="overflow-x-auto">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Patient</th>
                                <th>Blood Type</th>
                                <th>Hospital</th>
                                <th>Status</th>
                                <th>Required By</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                              {requestes.length===0?(<tr colspan="7"><NoData></NoData></tr>):(requestes.map((req,index)=><DonationRequestsTable req={req} page={page} key={index} index={index}></DonationRequestsTable>))}
                
                              
                            </tbody>
                          </table>
                        </div>

            </div>




            {/* paginaton */}

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 mb-5">
        <span>
  Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, requestes.length + (page - 1) * 5)} of {totalPages * 5} users
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
            
        </div>
    );
};

export default DonationRequests;