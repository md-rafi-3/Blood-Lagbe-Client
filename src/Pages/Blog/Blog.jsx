import React from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import PublicBlogCard from '../../Components/DashboardNavbar/PublicBlogCard';

const Blog = () => {
  const axiosPublic = useAxiosPublic();

  const fetchBlogs = async () => {
    const res = await axiosPublic.get("/public-blogs");
    return res.data;
  };

  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ['publicBlogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[#d53131] text-lg">Failed to load blogs. Please try again later.</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="text-gray-600 text-lg">No blogs available right now.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 py-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blogs</h1>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {blogs.map((blog) => (
          <PublicBlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
