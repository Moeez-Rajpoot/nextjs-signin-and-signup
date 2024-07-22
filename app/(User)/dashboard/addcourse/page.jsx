"use client";
import React, { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';


export default function page() {

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);
  return (
    <div>
      This is Add course Page
    </div>
  )
}
