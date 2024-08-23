"use client";
import { useEffect, useState } from "react";
import ForgetPassAction from "./FormForgetAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { setUserData } from "@/lib/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { login } from "@/lib/features/auth/authSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast.success("Login Successful");
  const Router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); 

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/dashboard/users');
    }
  }, [isLoggedIn, Router]); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const credentials = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("https://nodejs-login-signup.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      if (data) {
        setIsLoading(false);
        dispatch(setUserData(data.accesstoken));
        dispatch(login());


        localStorage.setItem("accessToken", data.accessToken);

        notify();
        setTimeout(() => {
          Router.push('/dashboard/users');
        }, 1000);
      } else {
        setIsLoading(false);
        toast.error(error.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      toast.error(error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col mt-52 w-full px-5 lg:px-32">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
          required
        />
        <button
          type="submit"
          className="bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-blue-700"
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
            "Sign In"
          )}
        </button>
      </form>
      <ForgetPassAction />
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
    </>
  );
}

export default LoginForm;