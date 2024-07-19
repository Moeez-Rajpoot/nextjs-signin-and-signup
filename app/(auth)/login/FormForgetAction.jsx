"use client";
import { useRouter } from "next/navigation"; // Correct import path
const ForgetPassAction = () => {
  const router = useRouter();

  const forgetPass = () => {
    console.log("This is the forget password page");
    router.push("/forgetpassword");
  };

  return (
    <div 
    className="flex mt-3"
    onClick={forgetPass}>

      <p className="text-white w-full mb-4 flex justify-center items-center cursor-pointer hover:underline">
        Forget Password?
      </p>
    </div>
  );
};

export default ForgetPassAction;
