import { Link } from "react-router-dom";
import Images from "../Components/Image/Images";
import LoginContainer from "../Components/UI/Containers/LoginContainer";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";

export default function Signup() {
  return (
    <LoginContainer containerWidth={500}>
      <div>
        <Images
          src={"/Logo/Shopmart.png"}
          alt={"shopmart logo"}
          height={250}
          width={250}
          className="mx-auto mb-4"
        />

        <div className="flex flex-row space-x-4">
          <TextField label=" First Name" />
          <TextField label="Last Name" />
        </div>
        <div className="flex flex-row space-x-4 mt-10">
          <TextField type="email" label="Email" />
          <TextField type="number" label="Phone Number " />
        </div>

        <div className="flex flex-row space-x-4 mt-10 mb-8">
          <TextField type="password" label="Password" />
          <TextField label="Confirm Password " />
        </div>
      </div>
      <div className="flex justify-center">
        <Button shape="rounded" varient="colored" className="btn-secondary">
          Sign Up
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        Have an Account?{" "}
        <Link to="/login" style={{ color: "blue" }}>
          sign in
        </Link>
      </div>
    </LoginContainer>
  );
}
