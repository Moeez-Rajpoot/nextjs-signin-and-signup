"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

function ForgetPasswordForm() {

  const [password, setPassword] = useState("");
  const [reTypePassword, setretypePassword] = useState("");
  const router = useRouter();


  const handleretypePasswordCheck = (e) => {
    setretypePassword(e.target.value);
    if (password === e.target.value) {
      return true;
    } else {
      return false;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) => cred.username === localStorage.getItem("resetUsername")
    );
    if (password.length < 8) {
      toast.error("Password must be atleast 8 characters long");
      return;
    }
    if (password === reTypePassword) {
      credentialMatch.password = password;
      localStorage.setItem(
        "signupCredentials",
        JSON.stringify(credentialsArray)
      );
      toast.success("Password Changed Successfully");
      localStorage.removeItem("reset");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    
    } else {
      toast.error("Password do not match");

    }
  };
  
  return (
    <form onSubmit={handlePasswordChange} className="flex flex-col mt-5 w-full px-5 lg:px-32">

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />

      <input
        onChange={handleretypePasswordCheck}
        value={reTypePassword}
        type="password"
        placeholder="Retype Password"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />
      

      <button type="submit" className="mb-10 sm:mb-0  bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
        Reset Now
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
