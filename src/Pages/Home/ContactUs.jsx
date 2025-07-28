import React, { useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_qvlcjef", "template_df1x899", form.current, {
        publicKey: "m5rJT5vqrxp5fZ4H2",
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for contacting us. We'll get back to you soon.",
            confirmButtonColor: "#d53131",
          });
          e.target.reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again later.",
            confirmButtonColor: "#d53131",
          });
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#d53131] mb-10">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          <div className="card bg-white shadow-xl p-6 rounded-xl" style={{
          background:
            "linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(255,252,252,1) 50%, rgba(247,226,226,1) 100%)",
        }}>
            <h3 className="text-xl font-semibold text-[#d53131] mb-4">Send us a Message</h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="btn w-full border-none text-white"
                style={{ backgroundColor: "#d53131" }}
              >
                Send Message
              </button>
            </form>
          </div>

         
          <div className="card bg-white shadow-xl p-6 rounded-xl flex flex-col justify-center" style={{
          background:
            "linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(255,252,252,1) 50%, rgba(247,226,226,1) 100%)",
        }}>
            <h3 className="text-xl font-semibold text-[#d53131] mb-4">Get in Touch</h3>
            <p className="flex items-center gap-3 mb-3 text-gray-700">
              <FaPhoneAlt className="text-[#d53131]" /> +880 1234-567890
            </p>
            <p className="flex items-center gap-3 mb-3 text-gray-700">
              <FaEnvelope className="text-[#d53131]" /> support@blooddonation.org
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-[#d53131]" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
