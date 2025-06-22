import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import { toastMessage } from "../Modules/toast";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../Components/UI/Containers/LoginContainer";
import Button from "../Components/UI/Button/Button";
import TextField from "../Components/UI/Textfield/Textfield";
import Images from "../Components/Image/Images";
import Header from "../Components/UI/Header/Header";
import { clearError } from "../app/Slices/authSlice";
import { AppDispatch, RootState } from "../app/store/store";
import { signin } from "../Services/api/authApi";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  Password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>(); // Explicitly type dispatch
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useFormik({
    initialValues: { email: "", Password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signin(values)); // Dispatch the async thunk action
    },
  });

  // Trigger the success toast only once when the user is logged in successfully
  useEffect(() => {
    if (user) {
      console.log("Logged-in user:", user);
      toastMessage({
        message: "Sign in successful!",
        type: "success",
      });
      localStorage.setItem("FirstName", user.FirstName);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]); // Ensure this effect runs only when `user` state changes

  // Handle error message and clear it after showing the toast
  useEffect(() => {
    if (error) {
      toastMessage({
        message: error,
        type: "error",
      });
      dispatch(clearError()); // Clear the error after displaying the toast
    }
  }, [error, dispatch]);

  return (
    <>
      <Header
        className="fixed top-0 left-0 right-0 z-10"
        showHamburger={false}
      />
      <LoginContainer containerWidth={430} className="mt-24">
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
                name="Password"
                value={form.values.Password}
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
                {isLoading ? "Signing in..." : "Sign in"}
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
    </>
  );
}
