"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { validateCnic, validateEmail, validatePassword, validatePhone, validateUsername } from "@/helper/validationfunctions";

function SignupForm() {
  const [userDetail, setuserDetail] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    cnic: "",
    dateOfBirth: "",
    gender: "Male",
  });
  const [error, seterror] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
    cnic: false,
  });

  const errorMessage = {
    username: "Username cannot be empty or anumber or can have sign symbols.",
    password: "Password must contain one uppercase, one lowercase, one number, one special character and must be 8 characters long.",
    email: "Enter valid email address.",
    phone: "Phone number must be in the format +923xxxxxxxxx.",
    cnic: "CNIC must be in format of 34***-*******-1.",
  }


  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const notify = () => toast.info("Check Your Email address for Verification!");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (!validateFields()) {
      console.log("Validation Failed");
      setIsLoading(false);
      return;
    }
  
    console.log("Validation Passed");
    console.log(userDetail);
  
    const formData = new FormData();
    formData.append("Username", userDetail.username);
    formData.append("Password", userDetail.password);
    formData.append("Email", userDetail.email);
    formData.append("Phone", userDetail.phone);
    formData.append("Cnic", userDetail.cnic);
    formData.append("Dob", userDetail.dateOfBirth);
    formData.append("Gender", userDetail.gender);
  
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
  
    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/register", {
        method: "POST",
        body: formData,
      });

      console.log(response);
  
      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Success:", data);
      setuserDetail({
        username: "",
        password: "",
        email: "",
        phone: "",
        cnic: "",
        dateOfBirth: "",
        gender: "Male",
      });
      setSelectedFile(null);
      setIsLoading(false);
  
      notify();
      setTimeout(() => {
        Router.push("/login");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };


  const validateFields = () => {
    let isValid = true;
    
    if(error.username){
      isValid = false;
      toast.error(errorMessage.username);
      return isValid;
    }
    if(error.password){
      isValid = false;
      toast.error(errorMessage.password);
      return isValid;
    }
    if(error.email){
      isValid = false;
      toast.error(errorMessage.email);
      return isValid;
    }
    if(error.phone){
      isValid = false;
      toast.error(errorMessage.phone);
      return isValid;
    }
    if(error.cnic){
      isValid = false;
      toast.error(errorMessage.cnic);
      return isValid;
    }
    return isValid;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setuserDetail({ ...userDetail, [name]: value });
    handleError({ name, value });
  };

  const handleError = ({ name, value }) => {
    const clone = { ...error };

    switch (name) {
      case "username":
        clone.username = validateUsername(value);
        break;
      case "password":
        clone.password = validatePassword(value);
        break;
      case "cnic":
        clone.cnic = validateCnic(value);
        break;
      case "email":
        clone.email = validateEmail(value);
        break;
      case "phone":
        clone.phone = validatePhone(value);
        break;
      default:
        break;
    }
    seterror(clone);
  };

  console.log(userDetail);
  console.log(error);

  return (
    <form
      className="flex flex-col mt-5 w-full px-5 lg:px-32"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="outline-none p-3 w-full bg-transparent border-b-2 border-white text-white"
          accept="image/*"
          required
        />
        {selectedFile && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Preview"
              width={50}
              height={50}
              className="object-cover rounded-full"
            />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Full Name"
        name="username"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
        value={userDetail.username}
        onChange={handleInputChange}
        required
      />
      {error.username && (
        <p className="text-red-500 text-xs mt-2">{errorMessage.username}</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={userDetail.email}
        onChange={handleInputChange}
        required
      />
       {error.email && (
        <p className="text-red-500 text-xs mt-2">{errorMessage.email}</p>
      )}
     

      <input
        type="tel"
        placeholder="Phone Number"
        name="phone"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={userDetail.phone}
        onChange={handleInputChange}
        required
      />
      {error.phone && (
        <p className="text-red-500 text-xs mt-2">{errorMessage.phone}</p>
      )}

      <input
        type="text"
        name="cnic"
        placeholder="CNIC"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={userDetail.cnic}
        onChange={handleInputChange}
        required
      />
      {error.cnic && (
        <p className="text-red-500 text-xs mt-2">{errorMessage.cnic}</p>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={userDetail.password}
        onChange={handleInputChange}
        required
      />
      {error.password && (
        <p className="text-red-500 text-xs mt-2">{errorMessage.password}</p>
      )}


      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-slate-400 mt-3"
        value={userDetail.dateOfBirth}
        onChange={handleInputChange}
        required
      />

      <div className="relative mt-3">
        <select
          className="appearance-none outline-none p-3 bg-transparent border-b-2 border-white text-white w-full"
          name="gender"
          value={userDetail.gender}
          onChange={handleInputChange}
          required
          aria-label="Select your gender"
        >
          <option className="bg-slate-800 text-white text-xl" value="male">
            Male
          </option>
          <option className="bg-slate-800 text-white text-xl" value="female">
            Female
          </option>
          <option className="bg-slate-800 text-white text-xl" value="other">
            Other
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        className="mb-10 sm:mb-0 bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white"
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
          "Sign Up"
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

export default SignupForm;
