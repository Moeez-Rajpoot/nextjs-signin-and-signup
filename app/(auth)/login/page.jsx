import LoginImage from "../../../public/log.svg";
import ActionBtn from "./SignupRouteAction";
import PageLayout from "../Commonlayout";
import Form from "./form"
export default function Login() {
  
  return (
    <>
      <PageLayout actiontext="New Here ?"  Actionbutton={ActionBtn} img={LoginImage} text="Please Sign Up to Stay Connected With the Updates" 
      swapSides={false}
      Heading="Sign In"
      form={<Form />}
      
      
      />
    </>
  );
}
