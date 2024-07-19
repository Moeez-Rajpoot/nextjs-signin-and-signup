"use client"
import { useRouter } from "next/navigation"
import React from "react"
export default function Action() {
    const router = useRouter();
    const opensignup = () => {
      console.log("This is the signup page");
        router.push("/signup");
    }
  return (
    <>
    <button
           onClick={opensignup}
            className="bg-transparent rounded-full  hover:bg-white hover:text-blue-700 hover:font-semibold hover:animate-bounce   p-3 px-10 border-2 flex justify-center items-center
                    text-white mt-3 border-white"
          >
            Sign Up
          </button>
      
    </>
  )
}
