"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hook';
import Navbar from '@/components/navbar';

export default function Page() {
  const router = useRouter();
  const State = useAppSelector((state) => state.auth.isLoggedIn);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!State) {
      router.push('/login');
    }
  }, [State, router]);

  useEffect(() => {
    const userdp = localStorage.getItem('Userdp');
    if (userdp) {
      // Remove any extra quotes from the URL
      const cleanedUserdp = userdp.replace(/^"|"$/g, '');
      setImage(cleanedUserdp);
    }
  }, []);

  return (
    <>
      <Navbar Profile={image} />
      <div>
        This is All Courses Page
      </div>
    </>
  );
}