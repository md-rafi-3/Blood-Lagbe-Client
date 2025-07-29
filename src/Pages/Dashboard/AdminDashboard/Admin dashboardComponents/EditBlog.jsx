import { FaArrowLeft, FaSave } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const EditBlog = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState(null);

  // Fetch blog
  const fetchBlog = async () => {
    const res = await axiosPublic.get(`/blog/${id}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlog,
  });

  useEffect(() => {
    if (data) {
      // ensure tags is a string and content is safe
      setBlog({
        ...data,
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
        content: data.content || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...blog,
        tags: blog.tags.split(",").map((tag) => tag.trim()),
      };
        delete updatedData._id;

      const res = await axiosSecure.put(`/blogs/${id}`, updatedData);
      if (res.data.matchedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Blog Updated!",
          text: "The blog has been updated successfully.",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  if (isLoading || !blog) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <Link to="/dashboard/content-management" className="btn btn-ghost mb-4 gap-2">
        <FaArrowLeft /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-2">Edit Blog</h1>
      <p className="mb-6 text-gray-500">Update the blog post</p>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-4">Blog Content</h2>

          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />

          <label className="block mb-2">Thumbnail URL</label>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            value={blog.thumbnail}
            onChange={(e) => setBlog({ ...blog, thumbnail: e.target.value })}
          />

          <label className="block mb-2">Content</label>
          <JoditEditor
            value={blog.content}
            onChange={(newContent) => setBlog({ ...blog, content: newContent })}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="font-semibold mb-3">Publish Settings</h2>
            <label>Author</label>
            <input type="text" value="Admin" readOnly className="input input-bordered w-full mb-3" />

            <label>Status</label>
            <select
              value={blog.status}
              onChange={(e) => setBlog({ ...blog, status: e.target.value })}
              className="select select-bordered w-full mb-3"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button type="submit" className="btn bg-blue-600 text-white w-full flex items-center gap-2">
              <FaSave /> Update Blog
            </button>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="font-semibold mb-3">SEO Settings</h2>
            <label>Meta Description</label>
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              value={blog.metaDescription}
              onChange={(e) => setBlog({ ...blog, metaDescription: e.target.value })}
            />
            <label>Tags</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={blog.tags}
              onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
