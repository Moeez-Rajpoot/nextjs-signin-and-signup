"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/user/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setEmail("");
        toast.success(
          data.message || "Password reset link sent to your email."
        );
        setEmail("");
      } else {
        setIsLoading(false);
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   const credentialsArray =
  //     JSON.parse(localStorage.getItem("signupCredentials")) || [];
  //   const credentialMatch = credentialsArray.find(
  //     (cred) =>
  //       cred.username === username &&
  //       cred.email.toLowerCase() === email.toLowerCase() &&
  //       cred.cnic === cnic
  //   );

  //   if (credentialMatch) {
  //     toast.success("Reset Successful");
  //     setTimeout(() => {
  //       router.push('/changepassword');
  //     }, 1000);

  //     localStorage.setItem("reset", true);
  //     localStorage.setItem("resetUsername", username);

  //   } else {
  //     toast.error("Invalid credentials");

  //   }
  // };
  return (
    <form
      onSubmit={handleReset}
      className="flex flex-col mt-5 w-full px-5 lg:px-32"
    >
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />

      <button
        type="submit"
        className="mb-10 sm:mb-0 bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white"
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 mr-3 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Reset Password"
        )}
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
