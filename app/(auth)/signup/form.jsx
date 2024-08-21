"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const validateUsername = (username) => {
  if (username.trim().length === 0) {
    return "Username cannot be empty.";
  } else if (!isNaN(username.trim())) {
    return "Username must include alphabets and cannot be only numbers.";
  }
  return "";
};

const validatePassword = (password) => {
  if (password.length === 0) {
    return "Password can't be empty.";
  } else if (password.length <= 8) {
    return "Password is weak";
  }
  return "";
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+923\d{9}$/;
  if (phone.length === 0) {
    return "Phone number cannot be empty.";
  } else if (!phoneRegex.test(phone)) {
    return "Phone number must be in the format +923xxxxxxxxx";
  }
  return "";
};

const validateCnic = (cnic) => {
  if (cnic.length === 0) {
    return "CNIC cannot be empty.";
  } else if (cnic.length !== 15) {
    return "CNIC must be 15 digits long.";
  }
  return "";
};

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorno, setErrorNo] = useState("");
  const [msgcolor, setMsgColor] = useState("1");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const notify = () => toast.success("User Registered Successfully");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Password", password);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Cnic", cnic);
    formData.append("Dob", dateOfBirth);
    formData.append("Gender", gender);

    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      setUsername("");
      setSelectedFile(null);
      setPassword("");
      setEmail("");
      setPhone("");
      setCnic("");
      setDateOfBirth("");
      setGender("");
      setErrorMessage("");
      setShowError(false);
      setErrorNo("");
      setSelectedFile(null);
      setIsLoading(false);

      notify();
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateFields = () => {
    let isValid = true;

    let usernameError = validateUsername(username);
    if (usernameError) {
      setErrorMessage(usernameError);
      setShowError(true);
      setErrorNo(1);
      isValid = false;
    }

    let passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      setShowError(true);
      setMsgColor(1);
      setErrorNo(2);
      isValid = false;
    }

    let phoneError = validatePhone(phone);
    if (phoneError) {
      setErrorMessage(phoneError);
      setShowError(true);
      setErrorNo(3);
      isValid = false;
    }

    let cnicError = validateCnic(cnic);
    if (cnicError) {
      setErrorMessage(cnicError);
      setShowError(true);
      setErrorNo(4);
      isValid = false;
    }

    return isValid;
  };

  const handleUsernameCheck = (e) => {
    setErrorNo(1);
    setUsername(e.target.value.trim());
    const newUsername = e.target.value.trim();
    let usernameError = validateUsername(newUsername);
    if (usernameError) {
      setErrorMessage(usernameError);
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
  };

  const handlePasswordCheck = (e) => {
    setErrorNo(2);
    setMsgColor(1);
    setPassword(e.target.value);
    const newpassword = e.target.value;
    let passwordError = validatePassword(newpassword);
    if (passwordError) {
      setShowError(true);
      setErrorMessage(passwordError);
      return;
    } else {
      setShowError(false);
    }
    if (newpassword.length > 8 && newpassword.length <= 12) {
      setShowError(true);
      setMsgColor(2);
      setErrorMessage("Password is moderate");
    } else {
      setShowError(true);
      setMsgColor(3);
      setErrorMessage("Password is strong");
    }
  };

  const handlePhoneCheck = (e) => {
    setErrorNo(3);
    setPhone(e.target.value);
    const newphone = e.target.value;
    let phoneError = validatePhone(newphone);
    if (phoneError) {
      setShowError(true);
      setErrorMessage(phoneError);
      return;
    } else {
      setShowError(false);
    }
  };

  const handleCnicCheck = (e) => {
    setCnic(e.target.value);
    const newcnic = e.target.value;
    setErrorNo(4);
    let cnicError = validateCnic(newcnic);
    if (cnicError) {
      setErrorMessage(cnicError);
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(event.target.value);
  };

  return (
    <form
      className="flex flex-col mt-5 w-full px-5 lg:px-32"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full">
        <input
          type="file"
          onChange={handleFileChange}
          className="outline-none p-3 w-full bg-transparent border-b-2 border-white text-white"
          accept="image/*"
        />
        {selectedFile && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Preview"
              width={50} // Specify the width
              height={50} // Specify the height
              className="object-cover rounded-full"
            />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Full Name"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
        value={username}
        onChange={handleUsernameCheck}
        required
      />
      {showError && errorno === 1 && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={phone}
        onChange={handlePhoneCheck}
        required
      />
      {showError && errorno === 3 && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}

      <input
        type="text"
        placeholder="CNIC"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={cnic}
        onChange={handleCnicCheck}
        required
      />
      {showError && errorno === 4 && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        value={password}
        onChange={handlePasswordCheck}
        required
      />
      {showError && errorno === 2 && (
        <p
          className={`text-xs mt-2 ${
            msgcolor === 1
              ? "text-red-500"
              : msgcolor === 2
              ? "text-orange-500"
              : "text-green-500"
          }`}
        >
          {errorMessage}
        </p>
      )}

      <input
        type="date"
        placeholder="Date of Birth"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-slate-400 mt-3"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />

      <div className="relative mt-3">
        <select
          className="appearance-none outline-none p-3 bg-transparent border-b-2 border-white text-white w-full"
          value={gender}
          onChange={handleGenderChange}
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
