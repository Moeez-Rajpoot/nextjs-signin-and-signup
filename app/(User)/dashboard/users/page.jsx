"use client";
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function Users() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // Retrieve users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('signupCredentials')) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Users Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-2 sm:px-4">Email</th>
                <th className="px-2 py-2 sm:px-4">Username</th>
                <th className="px-2 py-2 sm:px-4">Phone</th>
                <th className="px-2 py-2 sm:px-4">CNIC</th>
                <th className="px-2 py-2 sm:px-4">Password</th>
                <th className="px-2 py-2 sm:px-4">Date of Birth</th>
                <th className="px-2 py-2 sm:px-4">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-slate-700 hover:text-white">
                  <td className="text-center px-2 py-4 sm:px-4">{user.email}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.username}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.phone}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.cnic}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.password}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.dateOfBirth}</td>
                  <td className="text-center px-2 py-4 sm:px-4">{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}