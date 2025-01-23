import { useNavigate } from "react-router-dom";
import Images from "../Components/Image/Images";
import SignupContainer from "../Components/UI/Containers/SignupContainer";
import TextField from "../Components/UI/Textfield/Textfield";
import Button from "../Components/UI/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastMessage } from "../Modules/toast";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Services/api/authApi"; // Import signup action
import { RootState } from "../app/store/store";

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
  FirstName: Yup.string()
    .max(15, "First Name must be at most 15 characters long")
    .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
    .required("First Name is required"),

  LastName: Yup.string()
    .max(15, "Last Name must be at most 15 characters long")
    .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  phonenumber: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$|^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Please enter a valid phone number"
    )
    .required("Phone number is required"),
  Password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), undefined], "Password must match")
    .required("Confirm password is required"),
});

const signupFormSubmit = async (
  values: SignupFormvalues,
  dispatch: any,
  navigate: any
) => {
  try {
    const action = await dispatch(signup(values)); // Perform signup action
    if (action.meta.requestStatus === "fulfilled") {
      toastMessage({
        message: "Sign-up successful! ",
        type: "success",
      });
      navigate("/login"); // Redirect to signin page
    } else {
      const errorMessage =
        action.payload?.message || "Sign-up failed! Please try again.";
      toastMessage({
        message: errorMessage,
        type: "error",
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    toastMessage({
      message: "An error occurred during signup. Please try again.",
      type: "error",
    });
  }
};

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const form = useFormik<SignupFormvalues>({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      form.setTouched({
        FirstName: true,
        LastName: true,
        email: true,
        phonenumber: true,
        Password: true,
        confirmPassword: true,
      });
      signupFormSubmit(values, dispatch, navigate);
    },
  });

  return (
    <SignupContainer containerWidth={500}>
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
            type="tel"
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
            type="password"
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
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            shape="rounded"
            varient="colored"
            className="btn-secondary flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loader border-white border-4 border-t-transparent rounded-full w-4 h-4 animate-spin mr-2"></span>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
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
    </SignupContainer>
  );
}
