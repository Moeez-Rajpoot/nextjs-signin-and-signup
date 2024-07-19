'use client';
import Image from "next/image";

export default function AuthLayout({Actionbutton, img , text, actiontext , swapSides , Heading , form }) {
  return (
    <div className="flex sm:overflow-hidden flex-col h-fit sm:flex-row w-screen sm:h-screen bg-gradient-to-b from-slate-900 to-indigo-600 sm:bg-gradient-to-r sm:from-slate-900 sm:to-indigo-700">
      {/* Left Side Div - Make this come first in mobile view */}
      <div id="left" className={`flex-col w-full sm:w-1/2 h-full ${swapSides ? 'sm:order-last' : 'sm:order-first'}`}>
        <div id="design-content" className="h-fit sm:h-[30%] flex flex-col justify-center items-center">
          <h1 className="text-center text-3xl font-bold text-white mt-5 sm:mt-0">
            {actiontext}
          </h1>
          <p className="text-slate-300 mt-3 font-light text-center">
            {text}
          </p>
    
          <Actionbutton />
        </div>

        <div id="design-image" className="mt-5 sm:mt-0 h-fit sm:h-[70%] flex justify-center items-center">
          <Image src={img}  alt="Login" width={550} height={550} />
        </div>
      </div>

      {/* Right Side Div - This will now come second in mobile view */}
      <div id="right" className="flex-col w-full sm:w-1/2 h-full sm:flex sm:justify-center sm:items-center">
        <h1 className="text-white font-bold text-4xl flex justify-center">
          {Heading}
        </h1>

        {form}
     
      </div>
    </div>
  );
}
