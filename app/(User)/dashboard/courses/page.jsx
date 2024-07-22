"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';

export default function page() {

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);
  return (
    <div>
      This is All Courses Page
    </div>
  )
}
