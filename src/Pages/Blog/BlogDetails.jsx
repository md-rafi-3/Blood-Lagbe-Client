import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosPublic from "../../Hooks/axiosPublic";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading blog details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No blog found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-5">
      <Link
        to="/blogs"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        &larr; Back 
      </Link>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-6">✍️ {blog.author}</p>

      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full rounded-lg mb-8 object-cover max-h-96"
      />

      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-3">
        {blog.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <p className="mt-6 text-sm text-gray-400">
        Status:{" "}
        <span
          className={`font-semibold ${
            blog.status === "published" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {blog.status}
        </span>
      </p>
    </div>
  );
};

export default BlogDetails;
