"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { isAuthenticated } from '@/utils/auth';
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
    <div>
      This is All Courses Page
    </div>
  )
}
