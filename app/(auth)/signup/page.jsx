import RegImage from "../../../public/register.svg";
import ActionBtn from "./SignupRouteAction";
import PageLayout from "../Commonlayout";
import Form from "./form";


export default function SignUp() {
  return (
    <div className="lg:min-h-[100vh] lg:h-fit">
      <PageLayout actiontext="Already Have an Account ?"  Actionbutton={ActionBtn} img={RegImage} text="Please Sign In to Explore the World Beyond the screen"
      swapSides={true}
      Heading="Sign Up"
      form={<Form />}
      /> 
    </div>
  )
}
