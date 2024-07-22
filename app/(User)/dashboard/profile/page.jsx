"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../../../components/navbar";
import { useAppSelector } from "@/lib/hook";

const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userData = useAppSelector((state) => state.UserData.userData);
 
  useEffect(() => {
    if(!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (userData) {
      setEmail(userData);
      const credentialsArray = JSON.parse(localStorage.getItem("signupCredentials")) || [];
      const userProfileData = credentialsArray.find((cred) => cred.email === userData);
      if (userProfileData) {
        setUsername(userProfileData.username || "");
        setPhone(userProfileData.phone || "");
        setCnic(userProfileData.cnic || "");
        setPassword(userProfileData.password || "");
        setDateOfBirth(userProfileData.dateOfBirth || "");
        setGender(userProfileData.gender || "Male");
      }
    } else {
      router.push("/login");
    }
  }, [userData, router]);

  const validateFields = () => {
    let isValid = true;

    if (username.trim().length === 0) {
      toast.error("Username cannot be empty.");
      isValid = false;
    } else if (!isNaN(username.trim())) {
      toast.error("Username must include alphabets and cannot be only numbers.");
      isValid = false;
    }

    const phoneRegex = /^\+923\d{9}$/;
    if (phone.length === 0) {
      toast.error("Phone number cannot be empty.");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be in the format +923xxxxxxxxx");
      isValid = false;
    }

    if (cnic.length === 0) {
      toast.error("CNIC cannot be empty.");
      isValid = false;
    } else if (cnic.length !== 15) {
      toast.error("CNIC must be 15 digits long.");
      isValid = false;
    }

    if(password.length === 0) {
      toast.error("Password cannot be empty.");
      isValid = false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Prevent submission if fields are not valid
    }

    const updatedUser = {
      username,
      email,
      phone,
      cnic,
      password,
      dateOfBirth,
      gender,
    };

    const credentialsArray = JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find((cred) => cred.email === email);
    if (credentialMatch) {
      credentialMatch.username = updatedUser.username;
      credentialMatch.phone = updatedUser.phone;
      credentialMatch.cnic = updatedUser.cnic;
      credentialMatch.password = updatedUser.password;
      credentialMatch.dateOfBirth = updatedUser.dateOfBirth;
      credentialMatch.gender = updatedUser.gender;
      localStorage.setItem("signupCredentials", JSON.stringify(credentialsArray));
    }

    toast.success("Profile updated successfully");
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 sm:mt-5 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white -mt-20 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-2xl font-roboto font-bold mb-6 text-gray-900 text-center">Profile</h1>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value.trim())} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
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
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                Update Profile
              </button>
            </div>
          </form>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Profile;
