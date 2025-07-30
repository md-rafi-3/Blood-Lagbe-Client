import React, { useState } from "react";
import { FaArrowLeft, FaSave, FaEye } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAxiosPublic from "../../../../Hooks/axiosPublic";
import Swal from "sweetalert2";
import useRole from "../../../../Hooks/useRole";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const axiosPublic=useAxiosPublic()
  const {role}=useRole()
  // console.log(role)
  const navigate=useNavigate()

  const IMAGE_BB_API_KEY = "YOUR_IMGBB_API_KEY"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = "";

      
      if (thumbnail) {
        const imgData = new FormData();
        imgData.append("image", thumbnail);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBBAPIKEY}`,
          imgData
        );
        imageURL = uploadRes.data.data.url;
      }

    
      const blogData = {
        title,
        thumbnail: imageURL,
        content,
        status,
        metaDescription,
        tags: tags.split(",").map((t) => t.trim()),
        author: "Admin",
      };


      // console.log(blogData)

      // 3. Send to your backend API
    
    axiosPublic.post("/add-blog",blogData).then(res=>{
         if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Blog Created!",
            text: "Your blog has been successfully added.",
            confirmButtonColor: "#3085d6",
          });
        }
    }).catch((error) => {
         Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
          confirmButtonColor: "#d33",
        });
      
    })

      
    } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
          confirmButtonColor: "#d33",
        });
    }
  };

  if(role==="donor"){
    return navigate("/")
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <Link to="/dashboard/content-management" className="btn btn-ghost mb-4  gap-2">
        <FaArrowLeft /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-2">Add New Blog</h1>
      <p className="mb-6 text-gray-500">Create a new blog post</p>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Blog Content Section */}
        <div className="lg:col-span-2 bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-4">Blog Content</h2>

          <label className="block mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter blog title..."
            className="input input-bordered w-full mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block mb-2">Thumbnail Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full mb-4"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <label className="block mb-2">Content</label>
          <JoditEditor value={content} onChange={(newContent) => setContent(newContent)} />
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-4">
          {/* Publish Settings */}
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="font-semibold mb-3">Publish Settings</h2>
            <label>Author</label>
            <input type="text" value={role} readOnly className="input input-bordered w-full mb-3" />

            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full mb-3"
            >
              <option value="draft">Draft</option>
              {role==="admin"&&<option value="published">Published</option>}
            </select>

            <button type="submit" className="btn bg-[#d53131] text-white w-full flex items-center gap-2">
              <FaEye /> Publish Blog
            </button>
          </div>

          {/* SEO Settings */}
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="font-semibold mb-3">SEO Settings</h2>
            <label>Meta Description</label>
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Brief description for search engines..."
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            <label>Tags</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="health, blood-donation, medical"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
