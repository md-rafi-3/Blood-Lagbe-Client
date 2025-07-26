import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaImage,
  FaTint,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import divisions from "../../assets/Data/divisions.json";
import districts from "../../assets/Data/districts.json";
import upazilas from "../../assets/Data/upazilas.json";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { Link } from "react-router";

const SignUp = () => {
  const axiosPublic=useAxiosPublic()
  const {updateUser,createUser}=useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  const [location, setLocation] = useState({
    division: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    setFilteredDistricts(
      districts.filter((d) => d.division_id === location.division)
    );
    setLocation((prev) => ({ ...prev, district: "", upazila: "" }));
    setFilteredUpazilas([]);
  }, [location.division]);

  useEffect(() => {
    setFilteredUpazilas(
      upazilas.filter((u) => u.district_id === location.district)
    );
    setLocation((prev) => ({ ...prev, upazila: "" }));
  }, [location.district]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBBAPIKEY
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      console.log(res.data.data.url)
      setProfilePic(res.data.data.url);
    } catch (error) {
      Swal.fire(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Password validation regex:
    const password = data.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
        "error"
      );
    }

    if (password !== data.confirmPassword) {
      return Swal.fire("Mismatch", "Passwords do not match", "error");
    }

    if (!profilePic) {
      return Swal.fire("No Image", "Please upload a profile picture", "info");
    }

    const finalUserData = {
      ...data,
      division: divisions.find((d) => d.id === location.division)?.name || "",
      district: districts.find((d) => d.id === location.district)?.name || "",
      upazila: location.upazila,
      avatar: profilePic,
      role: "donor",
      status: "active",
    };

    console.log("✅ Submitted Data", finalUserData);
  
    console.log("login data",finalUserData.email,finalUserData.password)
    // Backend submit placeholder
    // await axios.post("/add-user", finalUserData)
    createUser(finalUserData.email,finalUserData.password).then((result) => {
     
     const userinfo={
      displayName:finalUserData.name,
      photoURL:finalUserData.avatar
     }
      console.log(result.user)
      if(result.user){
         updateUser(userinfo).then(()=>{
             const { password, confirmPassword, ...userData } = finalUserData;
             console.log("database data",userData)
          axiosPublic.post("/add-user",userData).then((res) => {
            console.log(res.data)
            if(res.data.insertedId){
              Swal.fire("Success", "Account created successfully!", "success")
              form.reset();
    setProfilePic("");
    setLocation({ division: "", district: "", upazila: "" });
            }
          }).catch((error) => {
            console.log(error.message)
          })

         }).catch((error) => {
          console.log(error.message)
         })
      }
    }).catch((error) => {
      console.log(error.message)
    })

   
    
  };

  const inputStyle =
    "input input-bordered w-full pl-12 focus:outline-none focus:ring-2 focus:ring-[#d53131]";
  const iconStyle =
    "absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d53131] z-10";

  return (
   <> <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mb-5 bg-white p-6 rounded-2xl shadow-lg space-y-5 mt-10"
    >
      <h2 className="text-3xl font-bold text-center text-[#d53131] mb-6">
        Donor Registration
      </h2>

      {/* Name */}
      <div>
        <label className="block mb-1 font-semibold text-[#d53131]">Full Name</label>
        <div className="relative">
          <FaUser className={iconStyle} />
          <input type="text" name="name" placeholder="Full Name" className={inputStyle} required />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-semibold text-[#d53131]">Email</label>
        <div className="relative">
          <FaEnvelope className={iconStyle} />
          <input type="email" name="email" placeholder="Email" className={inputStyle} required />
        </div>
      </div>

      {/* Avatar & Blood Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">Avatar</label>
          <div className="relative">
            <FaImage className={iconStyle} />
            <input
              type="file"
              name="avatar"
              className="file-input file-input-bordered w-full pl-12"
              required
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">Blood Group</label>
          <div className="relative">
            <FaTint className={iconStyle} />
            <select name="bloodGroup" className="select select-bordered w-full pl-12" required>
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Division, District, Upazila */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">Division</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconStyle} />
            <select
              className="select select-bordered w-full pl-12"
              required
              value={location.division}
              onChange={(e) => setLocation({ ...location, division: e.target.value })}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>{div.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">District</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconStyle} />
            <select
              className="select select-bordered w-full pl-12"
              required
              value={location.district}
              onChange={(e) => setLocation({ ...location, district: e.target.value })}
              disabled={!filteredDistricts.length}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-[#d53131]">Upazila</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconStyle} />
            <select
              className="select select-bordered w-full pl-12"
              required
              value={location.upazila}
              onChange={(e) => setLocation({ ...location, upazila: e.target.value })}
              disabled={!filteredUpazilas.length}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">Password</label>
          <div className="relative">
            <FaLock className={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={inputStyle}
              required
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer z-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-[#d53131]">Confirm Password</label>
          <div className="relative">
            <FaLock className={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className={inputStyle}
              required
              placeholder="Confirm Password"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn w-full bg-[#d53131] hover:bg-[#b12121] text-white font-semibold tracking-wide"
      >
        Register
      </button>
      <p className="text-center mt-4 text-sm">
  Already have an account?{" "}
  <Link to="/login" className="text-[#d53131] hover:underline font-medium">
    Login
  </Link>
</p>
    </form>
    {/* Already have an account */}

    </>
  );
};

export default SignUp;
