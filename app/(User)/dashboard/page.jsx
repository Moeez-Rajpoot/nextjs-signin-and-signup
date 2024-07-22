"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../utils/auth'; // Adjust the path as necessary
import Navbar from "../../../components/navbar";
import { useAppSelector } from '@/lib/hook';

export default function Page() {
  const router = useRouter();
  const State = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!State) {
      router.push('/login');
    }
  }, [State]);

  return (
    <>
      <Navbar />
      <div className="bg-slate-500 sm:py-[19.7%] flex justify-center items-center">
        This is Dashboard
      </div>
    </>
  );
}