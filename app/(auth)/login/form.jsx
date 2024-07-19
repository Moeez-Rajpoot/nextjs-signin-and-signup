import ForgetPassAction from "./FormForgetAction";

function LoginForm() {
  return (
    <>
      <form className="flex flex-col mt-5 w-full px-5 lg:px-32">
        <input
          type="email"
          placeholder="Email"
          className="outline-none p-3 bg-transparent border-b-2 border-white text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="outline-none p-3 bg-transparent border-b-2 border-white text-white mt-3"
          required
        />
        <button className="bg-transparent rounded-full hover:bg-white hover:text-blue-700 hover:font-semibold p-3 px-10 border-2 flex justify-center items-center hover:animate-pulse text-white mt-10 border-white">
          Sign In
        </button>
      </form>
     <ForgetPassAction/>
     
    </>
  );
}

export default LoginForm;
