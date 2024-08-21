"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar';
import ProfileForm from '@/app/(User)/dashboard/users/form';

export default function Users() {
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [dropbox, setDropbox] = useState(false);
  const [deleteUser, setDeleteUser] = useState(true);
  const userState = useAppSelector((state) => state.auth.isLoggedIn);
  const accessToken = useAppSelector((state) => state.UserData.userData);
  const router = useRouter();

  useEffect(() => {
    if (!userState) {
      router.push('/login');
    }
  }, [userState, router]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/user/Getallusers", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }

    };
  
    getUsers();
  }, [accessToken, dropbox, deleteUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      console.log("accessToken", accessToken);
      try {
        const response = await fetch("http://127.0.0.1:3000/api/user/current", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setCurrentUser(data);
        localStorage.setItem("Userdp", JSON.stringify("https://salmon-tremendous-pike-190.mypinata.cloud/ipfs/"+data.IPFSUrl));
    
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, [accessToken, dispatch]);

  const handleEdit = (user) => {
    setEditUserData(user);
    setDropbox(true);
  };

  const handleDelete = async (user) => {
    console.log("user", user);
    if (user._id === currentUser._id) {
      
      toast.error("You cannot delete your own account", { variant: "error" } , { origin : "bottom-right" });
      return;
    }
    try {
      console.log("user is being deleted", user);
      const response = await fetch("http://127.0.0.1:3000/api/user/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id: user._id }),
      });

      if (response.ok) {
        setDropbox(false);
        setDeleteUser(!deleteUser);
        toast.success("User deleted successfully", { variant: "success" });
      } else {
        toast.error("Failed to delete User", { variant: "error" });
      }
    } catch (error) {
      toast.error("An error occurred while deleting User", { variant: "error" });
    }
  };

  return (
    <>
      <Navbar Profile={"https://salmon-tremendous-pike-190.mypinata.cloud/ipfs/"+currentUser.IPFSUrl} />
      <ToastContainer position='bottom-right' />
      {dropbox && (
        <div className="absolute backdrop-blur-sm top-0 right-0 w-full h-screen">
          <div className="absolute top-[20%] bg-white border-b border-2 rounded-lg z-30 right-[25%] h-fit w-[50%] p-5">
            <h1 className="w-full text-3xl text-center font-mono">Update User</h1>
            <ProfileForm accesstoken={accessToken} drop={true} currentUserData={editUserData} setDropbox={setDropbox} />
          </div>
        </div>
      )}
      <div className="container mx-auto mt-24 sm:mt-28">
        <h2 className="flex justify-center text-2xl font-semibold mb-5">All Users</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-10 mt-10 w-10 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : usersData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Username</th>
                  <th className="py-2 px-4 border-b text-center">Email</th>
                  <th className="py-2 px-4 border-b text-center">Verified</th>
                  <th className="py-2 px-4 border-b text-center">Phone</th>
                  <th className="py-2 px-4 border-b text-center">CNIC</th>
                  <th className="py-2 px-4 border-b text-center">Date of Birth</th>
                  <th className="py-2 px-4 border-b text-center">Gender</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">{user.Username}</td>
                    <td className="py-2 px-4 border-b text-center">{user.Email}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {user.isVerified ? (
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 hover:cursor-pointer" title="Verified" />
                      ) : (
                        <FontAwesomeIcon icon={faCircleXmark} className="text-red-600 hover:cursor-pointer" title="Not Verified" />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{user.Phone}</td>
                    <td className="py-2 px-4 border-b text-center">{user.Cnic}</td>
                    <td className="py-2 px-4 border-b text-center">{new Date(user.Dob).toLocaleDateString("en-GB")}</td>
                    <td className="py-2 px-4 border-b text-center">{user.Gender}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button onClick={() => handleEdit(user)} className="mr-2">
                        <FontAwesomeIcon icon={faEdit} title="Edit" />
                      </button>
                      <button onClick={() => handleDelete(user)}>
                        <FontAwesomeIcon icon={faTrash} title="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </div>
    </>
  );
}