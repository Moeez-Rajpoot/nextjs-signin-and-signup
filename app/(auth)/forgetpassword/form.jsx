function ForgetPasswordForm() {
  

  return (
    <form className="flex flex-col mt-5 w-full px-5 lg:px-32">
      {/* Add additional fields as needed */}
      <input
        type="text"
        placeholder="Enter Full Name"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
        required
      />
      {/* Include other fields from LoginForm for consistency */}
      <input
        type="email"
        placeholder="Enter Email"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />
      <input
        type="tel"
        placeholder="Enter Phone Number"
        className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
        required
      />


      <button className="mb-10 sm:mb-0  bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
        Reset Password
      </button>
    </form>
  );
}

export default ForgetPasswordForm;
