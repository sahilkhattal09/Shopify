import { useNavigate } from "react-router-dom";
import Images from "../Components/Image/Images";
import LoginContainer from "../Components/UI/Containers/LoginContainer";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SignupFormvalues {
  FirstName: string;
  LastName: string;
  email: string;
  phonenumber: string;
  Password: string;
  confirmPassword: string;
}

const initialState: SignupFormvalues = {
  FirstName: "",
  LastName: "",
  email: "",
  phonenumber: "",
  Password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  FirstName: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phonenumber: Yup.string().required("Phone number is required"),
  Password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), undefined], "Password must match")
    .required("Confirm password is required"),
});

const signupFormSubmit = (values: SignupFormvalues) => {
  console.log(values);
};

export default function Signup() {
  const navigate = useNavigate();
  const form = useFormik<SignupFormvalues>({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: signupFormSubmit,
  });

  return (
    <LoginContainer containerWidth={500}>
      <Images
        src={"/Logo/Shopmart.png"}
        alt={"shopmart logo"}
        height={250}
        width={250}
        className="mx-auto mb-4"
      />
      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-row space-x-4">
          <TextField
            label="First Name"
            name="FirstName"
            value={form.values.FirstName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={form.touched.FirstName && form.errors.FirstName}
            error={Boolean(form.errors.FirstName)}
          />
          <TextField
            label="Last Name"
            name="LastName"
            value={form.values.LastName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={form.touched.LastName && form.errors.LastName}
            error={Boolean(form.errors.LastName)}
          />
        </div>
        <div className="flex flex-row space-x-4 mt-4">
          <TextField
            type="email"
            label="Email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={form.touched.email && form.errors.email}
            error={Boolean(form.errors.email)}
          />
          <TextField
            type="number"
            label="Phone Number"
            name="phonenumber"
            value={form.values.phonenumber}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={form.touched.phonenumber && form.errors.phonenumber}
            error={Boolean(form.errors.phonenumber)}
          />
        </div>

        <div className="flex flex-row space-x-4 mt-4 mb-4">
          <TextField
            type="password"
            label="Password"
            name="Password"
            value={form.values.Password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={form.touched.Password && form.errors.Password}
            error={Boolean(form.errors.Password)}
          />
          <TextField
            type="text"
            label="Confirm Password"
            name="confirmPassword"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={
              form.touched.confirmPassword && form.errors.confirmPassword
            }
            error={Boolean(form.errors.confirmPassword)}
            showCheckmark={
              !!form.values.Password &&
              form.values.Password === form.values.confirmPassword
            }
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            shape="rounded"
            varient="colored"
            className="btn-secondary"
          >
            Sign Up
          </Button>
        </div>
      </form>

      <div className="flex justify-center mt-4">
        Have an Account?
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </LoginContainer>
  );
}
