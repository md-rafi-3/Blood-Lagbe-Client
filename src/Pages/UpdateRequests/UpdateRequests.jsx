import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import divisions from "../../assets/Data/divisions.json";
import districts from "../../assets/Data/districts.json";
import upazilas from "../../assets/Data/upazilas.json";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const UpdateRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [donationDate, setDonationDate] = useState(null);



   const fetchRequest=async(id)=>{
    const res=await axiosSecure.get(`/requests-details/${id}`)
    return res.data
   }
  // fetch request data
  const { data: req=[], isLoading, refetch } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: () => fetchRequest(id)
  });

  const [status,setStatus]=useState(req.status)

  // Pre-fill division, district, and date when data is loaded
  useEffect(() => {
    if (req) {
      const divisionId = divisions.find(d => d.name === req.division)?.id;
      const districtId = districts.find(d => d.name === req.district)?.id;

      setSelectedDivision(divisionId || "");
      setSelectedDistrict(districtId || "");
      setDonationDate(req.donationDate ? new Date(req.donationDate) : null);
    }
  }, [req]);

  const filteredDistricts = districts.filter(
    (district) => district.division_id === selectedDivision
  );

  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrict
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      recipientName: form.recipientName.value,
      division: divisions.find(d => d.id === selectedDivision)?.name,
      district: districts.find(d => d.id === selectedDistrict)?.name,
      upazila: form.recipientUpazila.value,
      hospital: form.hospital.value,
      address: form.address.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: donationDate?.toISOString().split("T")[0],
      donationTime: form.donationTime.value,
      message: form.message.value,
      createdAt:req.createdAt,
      status:status,
      requesterEmail:req.requesterEmail,
      requesterName:req.requesterName
    };

    console.log(updatedData)

    try {
      const res = await axiosSecure.put(`/donation-requests/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Request updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message,
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Blood Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="recipientName"
          defaultValue={req?.recipientName}
          required
          className="input input-bordered w-full"
          placeholder="Recipient Name"
        />

        {/* Division */}
        <select
          name="recipientDivision"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Division</option>
          {divisions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="recipientDistrict"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          name="recipientUpazila"
          required
          defaultValue={req?.upazila}
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Hospital */}
        <input
          type="text"
          name="hospital"
          defaultValue={req?.hospital}
          required
          className="input input-bordered w-full"
          placeholder="Hospital Name"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          defaultValue={req?.address}
          required
          className="input input-bordered w-full"
          placeholder="Full Address"
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          required
          defaultValue={req?.bloodGroup}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Donation Date */}
        <DatePicker
          selected={donationDate}
          onChange={(date) => setDonationDate(date)}
          className="input input-bordered w-full"
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          required
        />

        {/* Donation Time */}
        <input
          type="time"
          name="donationTime"
          defaultValue={req?.donationTime}
          className="input input-bordered w-full"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          rows="4"
          defaultValue={req?.message}
          required
          className="textarea textarea-bordered w-full"
          placeholder="Explain in detail..."
        ></textarea>

        <div className="text-center">
          <button className="btn btn-primary" disabled={req.status==="inprogress"} >Update Request</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequest;
