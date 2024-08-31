import LoginContainer from "../Components/UI/Containers/LoginContainer";
import Images from "../Components/Image/Images";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toastMessage } from "../Modules/toast";

interface FormValues {
  email: string;
  Password: string; // Capitalized 'P' here
}

const initialState: FormValues = {
  email: "",
  Password: "", // Capitalized 'P' here
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  Password: Yup.string() // Capitalized 'P' here
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .required("Password is required"),
});

const SignInFormSubmit = async (values: FormValues, navigate: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signin",
      values
    );
    console.log("Sign-in response:", response.data);
    if (response.data.message === "Sign in successful") {
      toastMessage({
        message: "Sign in successful!",
        type: "success",
      });

      localStorage.setItem("FirstName", response.data.FirstName);
      navigate("/dashboard");
    } else {
      toastMessage({
        message: "Sign in failed!",
        type: "error",
      });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    toastMessage({
      message: "An error occurred during signin. Please try again.",
      type: "error",
    });
  }
};

export default function Login() {
  const navigate = useNavigate();
  const form = useFormik<FormValues>({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => SignInFormSubmit(values, navigate),
  });

  return (
    <LoginContainer containerWidth={430}>
      <div>
        <Images
          src={"/Logo/Shopmart.png"}
          alt={"shopmart logo"}
          height={250}
          width={250}
          className="mx-auto mb-4"
        />

        <form onSubmit={form.handleSubmit}>
          <div>
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
          </div>
          <div className="mt-12">
            <TextField
              type="password"
              label="Password"
              name="Password" // Capitalized 'P' here
              value={form.values.Password} // Capitalized 'P' here
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              errorMessage={form.touched.Password && form.errors.Password}
              error={Boolean(form.errors.Password)}
            />
          </div>
          <div className="flex justify-center mt-16">
            <Button
              type="submit"
              shape="rounded"
              varient="colored"
              className="btn-secondary"
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          Don't Have an Account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </div>
    </LoginContainer>
  );
}
