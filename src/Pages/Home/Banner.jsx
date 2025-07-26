import React from "react";
import { useNavigate } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-[70vh] text-[#d53131]"
      style={{
        background: "linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(255,252,252,1) 50%, rgba(247,226,226,1) 100%)",
      }}
    >
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-6">
            <Typewriter
              words={[
                "Save Lives, Donate Blood!",
                "Be a Hero, Donate Today!",
                "Find and Help Those in Need!"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>

          <p className="mb-6 text-lg text-gray-700">
            Join our community of donors and make a difference.  
            Search for donors or register to donate blood.
          </p>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="btn border-none text-white"
              style={{ backgroundColor: "#d53131" }}
            >
              Join as a Donor
            </button>
            <button 
              onClick={() => navigate("/search-donors")}
              className="btn border-none text-white"
              style={{ backgroundColor: "#d53131" }}
            >
              Search Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
