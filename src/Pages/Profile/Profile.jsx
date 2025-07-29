import React, { useEffect, useState, useRef, useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const {updateUser}=useContext(AuthContext)
  const navigate=useNavigate()

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    role: "",
    status: "",
  });

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

 
  const originalData = useRef({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/users-role");
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          avatar: res.data.avatar || "",
          bloodGroup: res.data.bloodGroup || "",
          division: res.data.division || "",
          district: res.data.district || "",
          upazila: res.data.upazila || "",
          role: res.data.role || "",
          status: res.data.status || "",
        });
        originalData.current = res.data;
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, [axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      
      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  
  const handleEdit = () => {
    setEditable(true);
  };

  
  const handleCancel = () => {
    setFormData({
      name: originalData.current.name || "",
      email: originalData.current.email || "",
      avatar: originalData.current.avatar || "",
      bloodGroup: originalData.current.bloodGroup || "",
      division: originalData.current.division || "",
      district: originalData.current.district || "",
      upazila: originalData.current.upazila || "",
      role: originalData.current.role || "",
      status: originalData.current.status || "",
    });
    setAvatarFile(null);
    setEditable(false);
  };

  
  const uploadImageToBB = async (file) => {
    
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBBAPIKEY}`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    if (data.success) return data.data.url;
    else throw new Error("Image upload failed");
  };

  
  const handleSave = async () => {
    setLoading(true);
    try {
      let avatarUrl = formData.avatar;

      if (avatarFile) {
        avatarUrl = await uploadImageToBB(avatarFile);
      }

      const updatePayload = {
        ...formData,
        avatar: avatarUrl,
      };

    
      console.log(updatePayload)
       const updatedData={
            displayName:updatePayload.name,
            photoURL: updatePayload.avatar

        }
        console.log("updated data",updatedData)

        updateUser(updatedData)

      const res = await axiosSecure.put("/user/profile", updatePayload);

      if (res.data.modifiedCount) {
       
        
        setUser(updatePayload);
        originalData.current = updatePayload;
        setEditable(false);
        setAvatarFile(null);
        Swal.fire({
          icon: "success",
          title: "Profile updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(0);
      } 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="flex justify-end mb-4 gap-2">
        {!editable ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {loading ? "Saving..." : "Update"}
            </button>
          </>
        )}
      </div>

      <form className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <img
            src={formData.avatar || "https://via.placeholder.com/80"}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          {editable && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input file-input-bordered file-input-sm"
            />
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${
              editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Email (readonly always) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${
              editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Division */}
        <div>
          <label className="block mb-1 font-medium">Division</label>
          <input
            type="text"
            name="division"
            value={formData.division}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${
              editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${
              editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${
              editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Role (readonly) */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Status (readonly) */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
