import ForgetImage from "../../../public/3d.png";
import ActionBtn from "../signup/SignupRouteAction";
import PageLayout from "../Commonlayout";
import Form from "./form";

export default function forgetpassword() {
  return (
    <div>
      <PageLayout
        actiontext="Remembered Your Password ?"
        Actionbutton={ActionBtn}
        img={ForgetImage}
        text="Then Lets Login In and Explore the World Beyond Screen"
        swapSides={false}
        Heading="Forget Password"
        form={<Form />}
      />
    </div>
  );
}
