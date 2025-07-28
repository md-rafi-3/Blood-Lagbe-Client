import { useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const demoBlogs = [
  {
    id: 1,
    title: "The Importance of Regular Blood Donation",
    author: "Dr. Sarah Johnson",
    status: "published",
    date: "2024-01-15",
    views: 1247,
  },
  {
    id: 2,
    title: "Blood Type Compatibility Guide",
    author: "Medical Team",
    status: "draft",
    date: "2024-01-12",
    views: 0,
  },
  {
    id: 3,
    title: "How to Prepare for Blood Donation",
    author: "Nurse Mary Wilson",
    status: "published",
    date: "2024-01-10",
    views: 856,
  },
];

export default function ContentManagement() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredBlogs = demoBlogs.filter((blog) => {
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
          <button className="btn btn-error text-white">
            <FaPlus className="mr-2" /> Add Blog
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-4 shadow space-y-4">
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
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 border shadow-md rounded-xl"
            >
              <figure className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-2">{blog.title}</h2>
                <p className="text-sm text-gray-500">By {blog.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    📅 {blog.date} &nbsp; 👁️ {blog.views} views
                  </p>
                  {blog.status === "published" ? (
                    <span className="badge badge-success">Published</span>
                  ) : (
                    <span className="badge badge-warning">Draft</span>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <button className="btn btn-outline btn-sm">
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  {blog.status === "published" ? (
                    <button className="btn btn-warning btn-sm text-white">
                      Unpublish
                    </button>
                  ) : (
                    <button className="btn btn-success btn-sm text-white">
                      Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
