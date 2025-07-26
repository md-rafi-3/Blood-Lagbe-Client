import { FaUsers, FaDollarSign, FaTint } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axios=useAxiosSecure()
  

  const fetchUsers=async()=>{
   const res=await axios.get("/users");
   return res.data;
  }

  const { data:users=[], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  // useEffect(()=>{
  //   axios.get("/users").then(res=>{
  //     console.log(res.data)
  //     setUsers(res.data)
  //   })
  // },[])

  console.log("user data",users)
  

  
  const statusClass = (status) =>
    status === "Active"
      ? "badge badge-success"
      : "badge badge-error";

  const roleClass = (role) => {
    if (role === "Admin") return "badge bg-red-500 text-white";
    return "badge bg-gray-200 text-gray-800";
  };

  return (
    <div className="md:px-4 px-3 space-y-6">
     

      {/* All Users Table */}
      <div className="card bg-white shadow-md p-6 border border-gray-200 rounded-2xl">
        <h4 className="text-lg font-semibold mb-4">All Users</h4>
        <div className="mb-4 flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full md:w-1/2"
          />
          <select className="select select-bordered w-full md:w-1/4">
            <option>All Status</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Blood Type</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-white rounded-full w-10">
                          <span>{user?.name}</span>
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
                    <span className={statusClass(user.status)}>{user?.status}</span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <button className="btn btn-sm btn-ghost">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 1 to 4 of 4 users</span>
          <div className="join">
            <button className="join-item btn btn-sm">Previous</button>
            <button className="join-item btn btn-sm btn-disabled">1 of 1</button>
            <button className="join-item btn btn-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
