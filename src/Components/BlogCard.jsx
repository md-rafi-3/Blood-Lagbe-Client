import React from 'react';
import { FaEdit } from 'react-icons/fa';

const BlogCard = ({blog}) => {
    return (
         <div
             
              className="card bg-base-100 border shadow-md rounded-xl"
            >
              <figure className="h-40 bg-gray-100 flex items-center justify-center">
               <img src={blog.thumbnail} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-2">{blog.title}</h2>
                <p className="text-sm text-gray-500">By {blog.author}</p>
                <div className="flex items-center justify-between mt-2">
                  
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
          
    );
};

export default BlogCard;