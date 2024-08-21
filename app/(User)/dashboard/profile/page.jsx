"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../../../components/navbar";
import ProfileForm from "../users/form";
import { useAppSelector } from "@/lib/hook";

const Profile = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector((state) => state.UserData.userData);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("Userdp")));
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {

        const response = await fetch("http://127.0.0.1:3000/api/user/current", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log("Current user  : ", data);
        setCurrentUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (accessToken) {
      getCurrentUser();
    }
  }, [accessToken, currentUser]);

  return (
    <>
      <Navbar Profile={currentUser} />
      <div className="mt-36 sm:mt-5 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white -mt-20 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-2xl font-roboto font-bold mb-6 text-gray-900 text-center">Profile</h1>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-10 w-10 text-gray-600"
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
            </div>
          ) : (
            currentUserData && (
              <ProfileForm accesstoken={accessToken} drop={false} currentUserData={currentUserData} />
            )
          )}
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