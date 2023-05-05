import React, { Fragment } from "react";

import { FormInput, Title } from "../../../../components";
import LoginChannel from "./LoginChannel";

const LoginForm = ({ values, onHandleValues }) => {
  return (
    <Fragment>
      <Title variant="isbi-40-1 u-text-capitalize u-width-100 u-text-center">
        Welcome Back
      </Title>
      <LoginChannel />
      <div className="u-margin-top-45">
        <FormInput
          value={values.username}
          variant="1"
          placeholder="username"
          onHandleText={onHandleValues.bind(this, "username")}
        />
        <FormInput
          value={values.password}
          className="u-margin-top-25"
          variant="1"
          placeholder="password"
          type="password"
          onHandleText={onHandleValues.bind(this, "password")}
        />
      </div>
    </Fragment>
  );
};

export default LoginForm;
