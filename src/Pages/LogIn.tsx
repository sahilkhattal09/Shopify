import React from "react";
import LoginContainer from "../Components/UI/Containers/LoginContainer";
import Images from "../Components/Image/Images";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const initialState: FormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const handleSubmit = (values: FormValues) => {
  console.log(values); // Handle form submission logic here
};

export default function Login() {
  const navigate = useNavigate();
  const form = useFormik<FormValues>({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

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
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              errorMessage={form.touched.password && form.errors.password}
              error={Boolean(form.errors.password)}
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
