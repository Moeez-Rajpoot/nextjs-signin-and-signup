/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { validateCnic, validateEmail, validatePhone, validateUsername } from "@/helper/validationfunctions";

const ProfileForm = ({ accesstoken, currentUserData, drop, box, setDropbox }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    cnic: "",
    dateOfBirth: "",
    gender: "Male",
  });

  useEffect(() => {
    if (currentUserData) {
      console.log("Current User Data:", currentUserData);
      const formattedDate = currentUserData.Dob ? new Date(currentUserData.Dob).toISOString().split('T')[0] : "";
      setUserDetails({
        ...userDetails,
        username: currentUserData.Username || "",
        email: currentUserData.Email || "",
        phone: currentUserData.Phone || "",
        cnic: currentUserData.Cnic || "",
        dateOfBirth: formattedDate,
        gender: currentUserData.Gender || "Male"
      });
    }
  }, [currentUserData]);

  const validateFields = () => {
    let isValid = true;

    if (validateUsername(userDetails.username)) {
      toast.error("Invalid Username", { variant: "error" });
      isValid = false;
    }
    if (validateEmail(userDetails.email)) {
      toast.error("Invalid Email", { variant: "error" });
      isValid = false;
    }
    if (validatePhone(userDetails.phone)) {
      toast.error("Invalid Phone Number", { variant: "error" });
      isValid = false;
    }
    if (validateCnic(userDetails.cnic)) {
      toast.error("Invalid CNIC", { variant: "error" });
      isValid = false;
    }
  




    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
    if (currentUserData._id === undefined) {
      toast.error("Failed to update User Data", { variant: "error" });
      return
      
    }

    const updatedUser = {
      id: currentUserData._id,
      username: userDetails.username,
      email: userDetails.email,
      phone: userDetails.phone,
      cnic: userDetails.cnic,
      dateOfBirth: userDetails.dateOfBirth,
      gender: userDetails.gender
    };

    const profileuser= localStorage.getItem("CurrenUserdbdata");
    if (profileuser) {
      const profileUserData = JSON.parse(profileuser);
      console.log( "This is paracdata : " ,profileUserData);

      if (currentUserData._id === profileUserData._id) {

        const updatedProfileUser = {
          Username: userDetails.username,
          Email: userDetails.email,
          Phone: userDetails.phone,
          Cnic: userDetails.cnic,
          Dob: userDetails.dateOfBirth,
          Gender: userDetails.gender,
        };

        console.log("Updated Profile is : ", updatedUser);
        localStorage.setItem("CurrenUserdbdata", JSON.stringify(updatedProfileUser));
        box(false);

      }
  

    }

    console.log("Updated User Data:", updatedUser); // Debugging log

    try {
      const response = await fetch("https://node-js-login-signup.vercel.app/api/user/updatedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        if (drop) handleclose();
        if (!drop) toast.success("Profile Updated successfully", { variant: "success" });
        if (drop) toast.success("User updated successfully", { variant: "success" });
      } else {
        if (!drop) toast.error("Failed to update Profile Data", { variant: "error" });
        if (drop) toast.error("Failed to update User Data", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update User Data", { variant: "error" });
    }
  };

  const handleclose = () => {
    setDropbox(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" name="username" value={userDetails.username} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="text" name="phone" value={userDetails.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">CNIC</label>
        <input type="text" name="cnic" value={userDetails.cnic} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" name="dateOfBirth" value={userDetails.dateOfBirth} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select name="gender" value={userDetails.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required>
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