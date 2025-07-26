import React, { useEffect, useState } from "react";
import divisions from "../../assets/Data/divisions.json";
import districts from "../../assets/Data/districts.json";
import upazilas from "../../assets/Data/upazilas.json";

const demoDonors = [
  {
    id: 1,
    name: "Rafi Ahmed",
    bloodGroup: "A+",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Mirpur",
    contact: "01700000001",
  },
  {
    id: 2,
    name: "Fatema Jahan",
    bloodGroup: "O-",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Gulshan",
    contact: "01700000002",
  },
  {
    id: 3,
    name: "Sakib Hossain",
    bloodGroup: "A+",
    division: "Rajshahi",
    district: "Pabna",
    upazila: "Ishwardi",
    contact: "01700000003",
  },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchPage() {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
  });

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const newDistricts = districts.filter(
      (d) => d.division_id === formData.division
    );
    setFilteredDistricts(newDistricts);
    setFormData((prev) => ({ ...prev, district: "", upazila: "" }));
    setFilteredUpazilas([]);
  }, [formData.division]);

  useEffect(() => {
    const newUpazilas = upazilas.filter(
      (u) => u.district_id === formData.district
    );
    setFilteredUpazilas(newUpazilas);
    setFormData((prev) => ({ ...prev, upazila: "" }));
  }, [formData.district]);

  useEffect(() => {
    const divisionName =
      divisions.find((d) => d.id === formData.division)?.name || "";
    const districtName =
      districts.find((d) => d.id === formData.district)?.name || "";
    const upazilaName = formData.upazila;

    if (
      formData.bloodGroup &&
      formData.division &&
      formData.district &&
      formData.upazila
    ) {
      const filtered = demoDonors.filter(
        (d) =>
          d.bloodGroup === formData.bloodGroup &&
          d.division === divisionName &&
          d.district === districtName &&
          d.upazila === upazilaName
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFormData({
      bloodGroup: "",
      division: "",
      district: "",
      upazila: "",
    });
    setFilteredDistricts([]);
    setFilteredUpazilas([]);
    setResults([]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filter Section */}
      <div
        className="p-6 rounded-xl shadow-md"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(255,252,252,1) 50%, rgba(247,226,226,1) 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#d53131]">
            Search for Blood Donor
          </h2>
          <button
            onClick={resetFilters}
            className="btn bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
            disabled={!filteredDistricts.length}
          >
            <option value="">Select District</option>
            {filteredDistricts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="select select-bordered w-full"
            disabled={!filteredUpazilas.length}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Section */}
      {results.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Found {results.length} Donor{results.length > 1 && "s"}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((donor) => (
              <div
                key={donor.id}
                className="card border p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-bold">{donor.name}</h3>
                <p>
                  Blood Group:{" "}
                  <span className="font-semibold">{donor.bloodGroup}</span>
                </p>
                <p>
                  Location: {donor.upazila}, {donor.district}
                </p>
                <p>Division: {donor.division}</p>
                <p>Contact: {donor.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 &&
        formData.bloodGroup &&
        formData.division &&
        formData.district &&
        formData.upazila && (
          <div className="text-center mt-6 text-gray-500">
            ❌ No donor found for the selected criteria.
          </div>
        )}
    </div>
  );
}
