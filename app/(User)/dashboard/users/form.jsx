/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProfileForm = ({ accesstoken, currentUserData, drop, setDropbox }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    if (currentUserData) {
      setUsername(currentUserData.Username || "");
      setEmail(currentUserData.Email || "");
      setPhone(currentUserData.Phone || "");
      setCnic(currentUserData.Cnic || "");
      setDateOfBirth(currentUserData.Dob ? currentUserData.Dob.split("T")[0] : "");
      setGender(currentUserData.Gender || "Male");
    }
  }, [currentUserData]);

  const validateFields = () => {
    let isValid = true;

    if (username.trim().length === 0) {
      toast.error("Username cannot be empty.");
      isValid = false;
    } else if (!isNaN(username.trim())) {
      toast.error("Username cannot be a number.");
      isValid = false;
    }

    let phoneRegex = /^\923\d{9}$/;
    if (phone.length === 0) {
      toast.error("Phone number cannot be empty.");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be a valid Pakistani number.");
      isValid = false;
    }

    if (cnic.length === 0) {
      toast.error("CNIC cannot be empty.");
      isValid = false;
    } else if (cnic.toString().length !== 15) {
      toast.error("CNIC must be a valid 15-digit number.");
      isValid = false;
    }

    // Add more validations as needed

    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Prevent submission if fields are not valid
    }

    const updatedUser = {
      id: currentUserData._id,
      username,
      email,
      phone,
      cnic,
      dateOfBirth,
      gender,
    };

    console.log("Updated User Data:", updatedUser); // Debugging log

    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/updatedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        { drop && handleclose() }
        { !drop && toast.success("Profile Updated successfully", { variant: "success" }); }
        { drop && toast.success("User updated successfully", { variant: "success" }); }
      } else {
        { !drop && toast.error("Failed to update Profile Data", { variant: "error" }); }
        { drop && toast.error("Failed to update User Data", { variant: "error" }) };
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update User Data", { variant: "error" });
    }
  };

  const handleclose = () => {
    setDropbox(false);
  }

  return (
    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">CNIC</label>
        <input type="number" value={cnic} onChange={(e) => setCnic(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
          Update Profile
        </button>
        {drop && <button onClick={handleclose} className="w-full py-2 px-4 mt-3 bg-red-600 text-white font-bold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300">
          Cancel
        </button>}
      </div>
    </form>
  );
};

export default ProfileForm;