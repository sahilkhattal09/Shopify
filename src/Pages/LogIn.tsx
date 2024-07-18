import LoginContainer from "../Components/UI/Containers/LoginContainer";
import Images from "../Components/Image/Images";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";
import { Link } from "react-router-dom";

export default function Login() {
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

        <div>
          <TextField label="Email" />
        </div>
        <div className="mt-10">
          <TextField label="Password " />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button shape="rounded" varient="colored" className="btn-secondary">
          Sign in
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        Dont Have an Account?{" "}
        <Link to="/signup" style={{ color: "blue" }}>
          sign Up
        </Link>
      </div>
    </LoginContainer>
  );
}
