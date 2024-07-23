"use client";
import React, { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hook';

export default function Page() {

  const router = useRouter();
  const State =  useAppSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!State) {
      router.push('/login');
    }
  }, [router]);
  return (
    <div>
      This is Add course Page
    </div>
  )
}
