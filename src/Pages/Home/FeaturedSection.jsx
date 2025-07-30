import React from "react";
import { FaHeartbeat, FaHandsHelping, FaTint } from "react-icons/fa";

const features = [
  {
    icon: <FaHeartbeat className="text-4xl text-[#d53131]" />,
    title: "Save Lives",
    description: "Your single donation can save up to three lives. Become a real-life hero today!",
  },
  {
    icon: <FaHandsHelping className="text-4xl text-[#d53131]" />,
    title: "Easy to Connect",
    description: "Find donors and recipients quickly with our smart search and request system.",
  },
  {
    icon: <FaTint className="text-4xl text-[#d53131]" />,
    title: "Safe & Trusted",
    description: "All donors are verified to ensure safe and reliable blood donations.",
  },
];

const FeaturedSection = () => {
  return (
    <section
      className="py-16"
      
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-[#d53131] mb-10">
          Why Donate Blood with Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl p-6 hover:shadow-2xl transition rounded-xl"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#d53131] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
