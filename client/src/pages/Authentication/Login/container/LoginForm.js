import React from "react";

import { FormInput, Title } from "../../../../components";
import LoginChannel from "./LoginChannel";

const LoginForm = () => {
  return (
    <form className="auth__form">
      <Title variant="isbi-40-1 u-text-capitalize u-width-100 u-text-center">
        Welcome Back
      </Title>
      <LoginChannel />
      <FormInput variant="1" placeholder="username" />
      <FormInput variant="1" placeholder="password" />
    </form>
  );
};

export default LoginForm;
