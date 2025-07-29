import React from "react";
import { Link } from "react-router";

const PublicBlogCard = ({ blog }) => {
  return (
    <div className="card bg-white max-w-sm  shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      {/* Thumbnail */}
      <figure>
        <img
          src={blog.thumbnail}
          alt={blog.title}
         
        />
      </figure>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-500 text-sm mb-3 line-clamp-3">{blog.metaDescription}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>✍️ {blog.author}</span>
          <span
            className={`px-2 py-1 rounded text-xs ${
              blog.status === "published"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {blog.status}
          </span>
        </div>

        {/* Details Button */}
        <Link
          to={`/blogs-details/${blog._id}`}
          className="btn btn-block bg-[#d53131] text-white"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default PublicBlogCard;
