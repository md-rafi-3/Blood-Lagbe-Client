import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext";
import districts from "../../../assets/Data/districts.json";
import upazilas from "../../../assets/Data/upazilas.json";
import divisions from "../../../assets/Data/divisions.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/axiosPublic";

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [donationDate, setDonationDate] = useState(null);
    const [status, setStatus] = useState("Active");

    // Blocked user check
    useEffect(() => {
        if (user?.status === "Blocked") {
            setStatus("Blocked");
        }
    }, [user]);

    // Filter districts based on selected division
    useEffect(() => {
        if (selectedDivision) {
            const filtered = districts.filter(
                (d) => d.division_id === selectedDivision
            );
            setFilteredDistricts(filtered);
            setFilteredUpazilas([]);
            setSelectedDistrict("");
        }
    }, [selectedDivision]);

    // Filter upazilas based on selected district
    useEffect(() => {
        if (selectedDistrict) {
            const filtered = upazilas.filter(
                (u) => u.district_id === selectedDistrict
            );
            setFilteredUpazilas(filtered);
        }
    }, [selectedDistrict]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "Blocked") {
            alert("You are blocked and cannot create a donation request.");
            return;
        }

        const formData = new FormData(e.target);
        const newRequest = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: formData.get("recipientName"),
            division: divisions.find((d) => d.id === formData.get("recipientDivision"))?.name,
            district: districts.find((d) => d.id === formData.get("recipientDistrict"))?.name,
            upazila: formData.get("recipientUpazila"),
            hospital: formData.get("hospital"),
            address: formData.get("address"),
            bloodGroup: formData.get("bloodGroup"),
            donationDate: donationDate?.toISOString().split("T")[0],
            donationTime: formData.get("donationTime"),
            message: formData.get("message"),
            status: "pending",
            createdAt: new Date(),
        };

        console.log(newRequest)

        try {
            const res = await axiosPublic.post("/donation-requests", newRequest);
            if (res.data.insertedId) {
                alert("Donation request created successfully");
                navigate("/dashboard/my-donation-requests");
            }
        } catch (error) {
            console.error("Error creating donation request:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10 space-y-5"
        >
            <h2 className="text-2xl font-bold text-[#d53131]">Create Donation Request</h2>

            {/* Requester Name */}
            <div>
                <label className="font-semibold">Requester Name</label>
                <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />
            </div>

            {/* Requester Email */}
            <div>
                <label className="font-semibold">Requester Email</label>
                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />
            </div>

            {/* Recipient Name */}
            <div>
                <label className="font-semibold">Recipient Name</label>
                <input
                    type="text"
                    name="recipientName"
                    required
                    className="input input-bordered w-full"
                />
            </div>

            {/* Division */}
            <div>
                <label className="font-semibold">Recipient Division</label>
                <select
                    name="recipientDivision"
                    required
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Division</option>
                    {divisions.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* District */}
            <div>
                <label className="font-semibold">Recipient District</label>
                <select
                    name="recipientDistrict"
                    required
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">Select District</option>
                    {filteredDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Upazila */}
            <div>
                <label className="font-semibold">Recipient Upazila</label>
                <select
                    name="recipientUpazila"
                    required
                    className="select select-bordered w-full"
                >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.name}>
                            {u.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Hospital */}
            <div>
                <label className="font-semibold">Hospital Name</label>
                <input
                    type="text"
                    name="hospital"
                    required
                    className="input input-bordered w-full"
                />
            </div>

            {/* Full Address */}
            <div>
                <label className="font-semibold">Full Address</label>
                <input
                    type="text"
                    name="address"
                    required
                    className="input input-bordered w-full"
                />
            </div>

            {/* Blood Group */}
            <div>
                <label className="font-semibold">Blood Group</label>
                <select name="bloodGroup" className="select select-bordered w-full" required>
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <option key={bg} value={bg}>
                            {bg}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">Donation Date</label> <br />
                    <DatePicker
                        selected={donationDate}
                        onChange={(date) => setDonationDate(date)}
                        className="input input-bordered w-full"
                        placeholderText="Select a date"
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="font-semibold">Why You Need Blood?</label>
                <textarea
                    name="message"
                    rows="4"
                    required
                    className="textarea textarea-bordered w-full"
                    placeholder="Explain in detail..."
                ></textarea>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="btn bg-[#d53131] hover:bg-[#b12b2b] text-white w-full"
                disabled={status === "Blocked"}
            >
                Submit Request
            </button>
        </form>
    );
};

export default CreateDonationRequest;
