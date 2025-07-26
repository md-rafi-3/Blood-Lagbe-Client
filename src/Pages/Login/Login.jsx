import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await userLogin(email, password);
      if (result.user) {
        Swal.fire("Login Successful", "", "success");
        form.reset();
      }
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  const inputStyle =
    "input input-bordered w-full pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#d53131]";
  const iconStyle =
    "absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d53131] z-10";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="card w-full max-w-sm bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-[#d53131] mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-[#d53131]">Email</label>
            <div className="relative">
              <FaEnvelope className={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-[#d53131]">Password</label>
            <div className="relative">
              <FaLock className={iconStyle} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className={inputStyle}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer z-10"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot Password (Optional) */}
          <div className="text-right text-sm">
            <a className="text-[#d53131] hover:underline cursor-pointer">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-[#d53131] hover:bg-[#b12121] text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Don't have account */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signUp" className="text-[#d53131] hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
