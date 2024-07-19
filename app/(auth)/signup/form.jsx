function SignupForm() {
  

  return (
    <form className="flex flex-col mt-5 w-full px-5 lg:px-32">
      {/* Add additional fields as needed */}
      <input
        type="text"
        placeholder="Full Name"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
        required
      />
      {/* Include other fields from LoginForm for consistency */}
      <input
        type="email"
        placeholder="Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />

      <input
        type="text"
        placeholder="CNIC"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />

      <input
        type="date"
        placeholder="Date of Birth"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-slate-400 mt-3"
        required
      />

      <div className="relative mt-3">
        <select
          className="appearance-none outline-none p-3 bg-transparent border-b-2 border-white text-white w-full"
          required
          aria-label="Select your gender"
        >
          <option className="bg-slate-800   text-white text-xl  " value="male">
            Male
          </option>
          <option className="bg-slate-800  text-white text-xl  " value="female">
            Female
          </option>
          <option className="bg-slate-800   text-white text-xl  " value="other">
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

      <button className="mb-10 sm:mb-0  bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
