import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaEllipsisV, FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const BlogCard = ({ blog, handleDelete, handleStatusToggle }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="card bg-base-100  border-2 border-gray-300 shadow-md rounded-xl relative">
      <figure className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={blog.thumbnail}
          alt="thumbnail"
          className="object-cover h-full w-full"
        />
      </figure>

      <div className="card-body space-y-2">
        <h2 className="card-title line-clamp-2">{blog.title}</h2>
        <p className="text-sm text-gray-500">By {blog.author}</p>

        <div className="flex justify-between items-center mt-2">
          {blog.status === "published" ? (
            <span className="badge badge-success">Published</span>
          ) : (
            <span className="badge badge-warning">Draft</span>
          )}

          {/* 3-dot menu button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="options"
            >
              <FaEllipsisV size={18} />
            </button>

            {menuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    navigate(`/dashboard/edit-blog/${blog._id}`);
                    setMenuOpen(false);
                  }}
                >
                  <FaEdit /> Edit
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    handleStatusToggle(
                      blog._id,
                      blog.status === "published" ? "draft" : "published"
                    );
                    setMenuOpen(false);
                  }}
                >
                  {blog.status === "published" ? (
                    <>
                      <FaEyeSlash /> Unpublish
                    </>
                  ) : (
                    <>
                      <FaEye /> Publish
                    </>
                  )}
                </li>

                <li
                  className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    handleDelete(blog._id);
                    setMenuOpen(false);
                  }}
                >
                  <FaTrash /> Delete
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
