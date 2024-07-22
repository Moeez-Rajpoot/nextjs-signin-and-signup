"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../utils/auth'; // Adjust the path as necessary
import Navbar from "../../../components/navbar";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="bg-slate-500 sm:py-[19.7%] flex justify-center items-center">
        This is Dashboard
      </div>
    </>
  );
}