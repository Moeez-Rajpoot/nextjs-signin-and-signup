import ChangeImage from "../../../public/img4.png";
import ActionBtn from "../signup/SignupRouteAction";
import PageLayout from "../Commonlayout";
import Form from "./form";

export default function changepassword() {
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
