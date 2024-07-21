"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {AcmeLogo} from "./logo";
import UserImage from "../public/user2.jpg";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { clearUserData } from '../Redux/Reducers/UserData';
// import { LogOutState } from '../Redux/Reducers/Loginstate';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);



  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "w-full text-center text-white font-roboto hover:bg-gray-700 p-5 rounded bg-gray-700"
      : "w-full text-center text-white font-roboto hover:bg-gray-700 p-5 rounded";

  return (
    <>
      <nav
        id="navbar"
        className=" bg-slate-800 p-1 fixed top-0 w-full z-10 flex items-center justify-between shadow-md"
      >
        {/* <Image width={50} height={50} id="Logo" src={Logo} alt="Company Logo" className="h-12 w-12 ml-3" /> */}
        <AcmeLogo  />
        <div className="flex items-center">
          <button
            className="hamburger block md:hidden px-3 py-2 rounded text-white"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
          <div
            className={`menu ${
              isOpen ? "flex" : "hidden"
            } md:flex items-center justify-end flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-[#01bf96d6] md:bg-transparent`}
            style={{ zIndex: 9 }}
          >
            <ul className="flex flex-col md:flex-row list-none w-full md:w-auto">
              <li className="flex sm:text-white items-center sm:mt-0  justify-center sm:mb-7 mt-2 md:mb-0 md:mr-9">
                <Link href="/dashboard/users" className={getNavLinkClass}>
                  Users <i className="fa-solid fa-users"></i>
                </Link>
              </li>
              <li className="flex items-center mt-2 sm:mt-0 sm:text-white   justify-center sm:mb-7  md:mb-0  md:mr-9">
                <Link href="/dashboard/addcourse" className={getNavLinkClass}>
                  Add Course <i className="fa-solid fa-plus"></i>
                </Link>
              </li>
              <li className="flex justify-center items-center sm:mt-0 sm:text-white sm:mb-7 mt-2 md:mb-0 md:mr-9">
                <Link href="/dashboard/courses" className={getNavLinkClass}>
                  Courses <i className="fa-brands fa-discourse"></i>
                </Link>
              </li>
              <div className="relative flex items-center sm:mt-2 sm:mr-8 justify-center mt-3 mb-2 ">
                <Image
                  src={UserImage}
                  alt="User"
                  className=" h-9 w-9 rounded-full cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute -right-8 top-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-20">
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <a
                      
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Log Out
                    </a>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
