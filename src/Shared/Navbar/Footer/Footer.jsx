import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { AuthContext } from "../../../Contexts/AuthContext";
import { NavLink } from "react-router";

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);
  const { user } = useContext(AuthContext);

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-donation-requests"
          end
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Donation Requests
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/searchDonors"
          end
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Search Donors
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/funding"
            end
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : ""
            }
          >
            Funding
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/blogs"
          end
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  const socialLinks = (
    <>
      <a
        href="https://www.facebook.com"
        target="#"
        className="text-gray-600 hover:text-blue-500"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.x.com"
        target="#"
        className="text-gray-600 hover:text-sky-400"
      >
        <FaTwitter />
      </a>
      <a
        href="https://www.instagram.com"
        target="#"
        className="text-gray-600 hover:text-pink-500"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.linkedin.com"
        target="#"
        className="text-gray-600 hover:text-blue-700"
      >
        <FaLinkedinIn />
      </a>
    </>
  );

  return (
    <footer className="bg-base-200 text-base-content py-8 md:px-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Website Info */}
        <div className="flex flex-col justify-start">
          <a className="font-bold text-2xl flex items-center">
            <span className="text-primary ">
              <FaDroplet size={23} className="text-[#d53131]" />
            </span>
            Blood<span className="text-[#d53131]">Lagbe?</span>
          </a>
          <p className="text-sm mt-2">
            Donate Blood, Save Life. Join our mission to connect donors with
            recipients.
          </p>
          {/* Social Icons */}
          <ul className="flex justify-start md:justify-start mt-6 space-x-6 text-xl">
            {socialLinks}
          </ul>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col space-y-2 justify-start md:justify-start">
          <ul>{links}</ul>
        </div>

        {/* Policies */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <button onClick={() => handleOpen("privacy")} className="link link-hover">
            Privacy Policy
          </button>
          <button onClick={() => handleOpen("terms")} className="link link-hover">
            Terms & Conditions
          </button>
          <button onClick={() => handleOpen("cookies")} className="link link-hover">
            Cookie Policy
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-[#00000010] pt-4">
        © {new Date().getFullYear()} BloodLagbe? | All Rights Reserved
      </div>

      {/* Modals */}
      {openModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-2">
              {openModal === "privacy" && "Privacy Policy"}
              {openModal === "terms" && "Terms & Conditions"}
              {openModal === "cookies" && "Cookie Policy"}
            </h3>

            {/* Privacy Policy */}
            {openModal === "privacy" && (
              <div className="text-sm space-y-3">
                <p>
                  At <b>BloodLagbe?</b>, we value your privacy. We only collect
                  necessary personal details such as name, email, and blood group
                  to connect donors and recipients.
                </p>
                <p>
                  Your data will never be sold or shared with unauthorized third
                  parties. We use secure technologies to protect your information.
                </p>
                <p>
                  By using our platform, you consent to the collection and use of
                  your information in accordance with this Privacy Policy.
                </p>
              </div>
            )}

            {/* Terms & Conditions */}
            {openModal === "terms" && (
              <div className="text-sm space-y-3">
                <p>
                  By accessing <b>BloodLagbe?</b>, you agree to use our platform
                  responsibly and only for genuine blood donation purposes.
                </p>
                <p>
                  Misuse of the platform (fake requests, spam, or fraudulent
                  activity) may result in account suspension.
                </p>
                <p>
                  We are not responsible for direct donor-recipient interactions
                  outside the platform. Always verify before donating blood.
                </p>
              </div>
            )}

            {/* Cookie Policy */}
            {openModal === "cookies" && (
              <div className="text-sm space-y-3">
                <p>
                  <b>BloodLagbe?</b> uses cookies to enhance your browsing
                  experience and provide personalized services.
                </p>
                <p>
                  Cookies help us remember your preferences, improve performance,
                  and analyze website traffic.
                </p>
                <p>
                  You can disable cookies in your browser settings, but some
                  features may not work properly without them.
                </p>
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </footer>
  );
};

export default Footer;
