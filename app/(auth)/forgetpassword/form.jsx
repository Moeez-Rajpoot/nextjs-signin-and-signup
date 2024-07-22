"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';


function ForgetPasswordForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const router = useRouter();


  
  const handleReset = (e) => {
    e.preventDefault();
    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) =>
        cred.username === username &&
        cred.email.toLowerCase() === email.toLowerCase() &&
        cred.cnic === cnic
    );

    if (credentialMatch) {
      toast.success("Reset Successful");
      setTimeout(() => {
        router.push('/changepassword');
      }, 1000);

      

      localStorage.setItem("reset", true);
      localStorage.setItem("resetUsername", username);
    } else {
      toast.error("Invalid credentials");

      
    }
  };
  return (
    <form onSubmit={handleReset} className="flex flex-col mt-5 w-full px-5 lg:px-32">
    
      <input
        onChange={(e) => setUsername(e.target.value.trim())}
        value={username}
        type="text"
        placeholder="Enter Full Name"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
        required
      />
    
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />
      <input
        type="number"
        onChange={(e) => setCnic(e.target.value)}
        value={cnic}
        placeholder="Enter Cnic"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />


      <button type="submit" className="mb-10 sm:mb-0  bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
        Reset Password
      </button>

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
    </form>
  );
}

export default ForgetPasswordForm;
