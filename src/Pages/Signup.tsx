import React from "react";
import LoginContainer from "../Components/LoginContainer";
import TextField from "../Components/UI/Textfield/Textfield";

export default function Signup() {
  return (
    <LoginContainer containerWidth={500}>
      <div>Signup</div>
      <TextField name="email" label="email" />
    </LoginContainer>
  );
}
