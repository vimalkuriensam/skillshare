import React, { Fragment } from "react";

import { FormInput, Title } from "../../../../components";
import LoginChannel from "./LoginChannel";

const LoginForm = () => {
  return (
    <Fragment>
      <Title variant="isbi-40-1 u-text-capitalize u-width-100 u-text-center">
        Welcome Back
      </Title>
      <LoginChannel />
      <div className="u-margin-top-45">
        <FormInput variant="1" placeholder="username" />
        <FormInput
          className="u-margin-top-25"
          variant="1"
          placeholder="password"
        />
      </div>
    </Fragment>
  );
};

export default LoginForm;
