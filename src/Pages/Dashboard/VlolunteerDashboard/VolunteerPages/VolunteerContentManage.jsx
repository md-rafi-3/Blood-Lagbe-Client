import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../../../../Components/BlogCard";
import Swal from "sweetalert2";



export default function VolunteerContentManage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const axiosSecure=useAxiosSecure()

  const fetchBlogs=async()=>{
    const res=await axiosSecure.get("/all-blogs");
    return res.data;
  }

  const { data:blogs=[], isLoading, error ,refetch} = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })


  


 

  

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-sm text-gray-500">
            Manage blog posts and content
          </p>
        </div>
        <Link to="/dashboard/add-blog">
          <button className="btn bg-[#d53131] text-white">
            <FaPlus className="mr-2" /> Add Blog
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl  p-4 shadow space-y-4">
        <div className="flex flex-wrap gap-4 justify-start  items-center">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input input-bordered w-full md:w-1/3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="select select-bordered "
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            {blogs.map(blog=><BlogCard blog={blog} key={blog._id} ></BlogCard>)}
          
           {/* card container */}
        </div>
      </div>
    </div>
  );
}
