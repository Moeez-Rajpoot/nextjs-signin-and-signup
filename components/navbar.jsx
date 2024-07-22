"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AcmeLogo } from "./logo";
import UserImage from "../public/user2.jpg";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/hook";
import { logout } from "@/lib/features/auth/authSlice";
import { clearUserData } from "@/lib/features/auth/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    // localStorage.removeItem("isLoggedIn");
    dispatch(logout());
    dispatch(clearUserData());
    // localStorage.removeItem("useremail");
    // router.push("/login");
  };

  const getLinkClass = (path) => {
    return pathname === path
      ? "flex py-3 sm:px-4 text-slate-900 items-center sm:mt-0 justify-center sm:mb-7 mt-2 md:mb-0 md:mr-5 bg-slate-300 rounded-sm"
      : "flex py-3 sm:px-4 text-white items-center sm:mt-0 justify-center sm:mb-7 mt-2 md:mb-0 md:mr-5 hover:bg-slate-400 hover:rounded-sm hover:animate-pulse";
  };

  return (
    <>
      <nav
        id="navbar"
        className="bg-slate-800 p-1 fixed top-0 w-full z-10 flex items-center justify-between shadow-md"
      >
        <AcmeLogo />
        <div className="flex items-center">
          <button
            className="hamburger block md:hidden px-3 py-2 rounded text-white"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
          <div
            ref={mobileMenuRef}
            className={`menu ${
              isOpen ? "flex" : "hidden"
            } md:flex items-center justify-end flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-slate-700 md:bg-transparent`}
            style={{ zIndex: 9 }}
          >
            <ul className="flex flex-col md:flex-row list-none w-full md:w-auto">
              <li className={getLinkClass("/dashboard/users")}>
                <Link href="/dashboard/users" onClick={handleLinkClick}>
                  Users <i className="fa-solid fa-users"></i>
                </Link>
              </li>
              <li className={getLinkClass("/dashboard/addcourse")}>
                <Link href="/dashboard/addcourse" onClick={handleLinkClick}>
                  Add Course <i className="fa-solid fa-plus"></i>
                </Link>
              </li>
              <li className={getLinkClass("/dashboard/courses")}>
                <Link href="/dashboard/courses" onClick={handleLinkClick}>
                  Courses <i className="fa-brands fa-discourse"></i>
                </Link>
              </li>
              <div className="relative flex items-center sm:mt-2 sm:mr-8 justify-center mt-3 mb-2">
                <Image
                  src={UserImage}
                  alt="User"
                  className="h-9 w-9 rounded-full cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute -right-8 top-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-20"
                  >
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Profile
                    </Link>

                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Link>
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
