"use client";
import { useEffect, useState } from "react";
import ForgetPassAction from "./FormForgetAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = () => toast.success("Login Successful");
  const notifyError = () => toast.error("Invalid email or password");
  const Router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      Router.push('/dashboard/users');
    }
  }, []);

  
  const handleLogin = (e) => {
    e.preventDefault();

    const credentialsArray =
      JSON.parse(localStorage.getItem("signupCredentials")) || [];
    const credentialMatch = credentialsArray.find(
      (cred) =>
        cred.email.toLowerCase() === email.toLowerCase() &&
        cred.password === password
    );

    if (credentialMatch) {
      // Inside the handleLogin function after successful authentication
      localStorage.setItem("useremail",  email);
      localStorage.setItem("isLoggedIn", "true");
      notify();

    

      
      setTimeout(() => {
        Router.push('/dashboard/users');
      }, 1000);
    } else {
      notifyError();
    }

    setEmail("");
    setPassword("");
  };


  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col mt-5 w-full px-5 lg:px-32">
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
        <button type="submit" className="bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
          Sign In
        </button>
      </form>
     <ForgetPassAction/>

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
