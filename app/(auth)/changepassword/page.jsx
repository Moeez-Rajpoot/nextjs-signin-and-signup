"use client";
import ChangeImage from "../../../public/img4.png";
import ActionBtn from "../signup/SignupRouteAction";
import PageLayout from "../Commonlayout";
import Form from "./form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChangePassword() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("reset")) {
      router.push('/forgetpassword');
    }
  }, [router]);
  return (
    <div>
      <PageLayout
        actiontext="Remembered Your Password ?"
        Actionbutton={ActionBtn}
        img={ChangeImage}
        text="Sign In to Explore the World Beyond Screen"
        swapSides={false}
        Heading="Change Password"
        form={<Form />}
      />
    </div>
  );
}