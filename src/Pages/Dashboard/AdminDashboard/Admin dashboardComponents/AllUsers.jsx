import { FaUsers, FaDollarSign, FaTint } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";
import NoData from "../../../../Components/NoData";

const AllUsers = () => {
  const axios=useAxiosSecure()
  const [status,setStatus]=useState("")
  const [name,setName]=useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchUsers=async(querys)=>{
   const res=await axios.get("/users", { params: querys});
   setTotalPages(Math.ceil(res.data.totalCount/5))
   return res.data.result;
  }

  const querys={
    page,
    status,
    name
  }

  const { data:users=[], isLoading, refetch  } = useQuery({
    queryKey: ['users',querys],
    queryFn: ()=>fetchUsers(querys),
    keepPreviousData: true,
  })
 
   console.log(status,name)

  // useEffect(()=>{
  //   axios.get("/users").then(res=>{
  //     console.log(res.data)
  //     setUsers(res.data)
  //   })
  // },[])

  console.log("user data",users,totalPages)
  

  
  const statusClass = (status) =>
    status === "active"
      ? "badge badge-success"
      : "badge badge-error";

  const roleClass = (role) => {
    if (role === "Admin") return "badge bg-red-500 text-white";
    return "badge bg-gray-200 text-gray-800";
  };


  const handleBlock = async (id) => {
  try {
    const res = await axios.patch(`/users/block/${id}`);
    if (res.data.modifiedCount) {
      Swal.fire("Blocked!", "User has been blocked.", "success");
      refetch();
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};

const handleUnblock = async (id) => {
  try {
    const res = await axios.patch(`/users/unblock/${id}`);
    if (res.data.modifiedCount) {
      Swal.fire("Unblocked!", "User has been unblocked.", "success");
      refetch();
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};

const handleMakeVolunteer = async (id) => {
  try {
    const res = await axios.patch(`/users/role/${id}`, { role: 'volunteer' });
    if (res.data.modifiedCount) {
      Swal.fire("Success!", "User is now a Volunteer.", "success");
      refetch();
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};

const handleMakeAdmin = async (id) => {
  try {
    const res = await axios.patch(`/users/role/${id}`, { role: 'admin' });
    if (res.data.modifiedCount) {
      Swal.fire("Success!", "User is now an Admin.", "success");
      refetch();
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};

const handleMakeDonor = async (id) => {
  try {
    const res = await axios.patch(`/users/role/${id}`, { role: 'donor' });
    if (res.data.modifiedCount) {
      Swal.fire("Success!", "User is now a Donor.", "success");
      refetch();
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};

if(isLoading){
  return <Loading></Loading>
}
  return (
    <div className="md:px-4 px-3 space-y-6">
     

      {/* All Users Table */}
      <div className="card bg-white shadow-md p-6 border border-gray-200 rounded-2xl">
        <h4 className="text-lg font-semibold mb-4">All Users</h4>
        <div className="mb-4 flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e)=>setName(e.target.value)}
            defaultValue={name}
            className="input input-bordered w-full md:w-1/2"
          />
          <select className="select select-bordered w-full md:w-1/4" defaultValue={status} onChange={(e)=>setStatus(e.target.value)}>
             <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>No.</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Blood Group</th>
                <th>Status</th>
               
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length===0?(<tr colspan='7'><NoData></NoData></tr>):(users.map((user, index) => (
                <tr key={index} className="hover">
                  <td>{(index+1)+((page-1)*5)}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-white rounded-full w-10">
                         <img src={user.avatar} alt="" />
                        </div>
                      </div>
                      <div>{user?.name}</div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>
                    <span className={roleClass(user.role)}>{user.role}</span>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-info">{user?.bloodGroup}</span>
                  </td>
                  <td>
                    <span className={statusClass(user.status)}>{user?.status==="blocked"?"Blocked":"Active"}</span>
                  </td>
                 
                <td>
  <div className="dropdown dropdown-end">
    <button tabIndex={0} className="btn btn-sm btn-outline border-none">
      ⋮
    </button>
    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48 space-y-1"
    >
      {/* Block / Unblock */}
      {user.status === 'active' ? (
        <li>
          <button className="text-red-500" onClick={() => handleBlock(user._id)}>
            🔒 Block
          </button>
        </li>
      ) : (
        <li>
          <button className="text-green-600" onClick={() => handleUnblock(user._id)}>
            🔓 Unblock
          </button>
        </li>
      )}

      {/* Make Donor */}
      {user.role !== 'donor' && (
        <li>
          <button className="text-rose-500" onClick={() => handleMakeDonor(user._id)}>
            🩸 Make Donor
          </button>
        </li>
      )}

      {/* Make Volunteer */}
      {user.role !== 'volunteer' && (
        <li>
          <button className="text-blue-500" onClick={() => handleMakeVolunteer(user._id)}>
            🤝 Make Volunteer
          </button>
        </li>
      )}

      {/* Make Admin */}
      {user.role !== 'admin' && (
        <li>
          <button className="text-purple-500" onClick={() => handleMakeAdmin(user._id)}>
            🛡️ Make Admin
          </button>
        </li>
      )}
    </ul>
  </div>
</td>


                </tr>
              )))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
  Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, users.length + (page - 1) * 5)} of {totalPages * 5} users
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
      </div>
    </div>
  );
};

export default AllUsers;
