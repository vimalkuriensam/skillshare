import React, { Fragment } from "react";

import { Checkbox, FormInput, Title } from "../../../../components";

const LoginForm = ({ values, onHandleValues }) => {
  return (
    <Fragment>
      <div className="u-margin-top-40">
        <div>
          <FormInput
            title="username"
            value={values.username}
            variant="1"
            placeholder="username"
            onHandleText={onHandleValues.bind(this, "username")}
          />
        </div>
        <div className="u-margin-top-25">
          <FormInput
            title="password"
            value={values.password}
            variant="1"
            placeholder="password"
            type="password"
            onHandleText={onHandleValues.bind(this, "password")}
          />
        </div>
        <div className="u-margin-top-25 u-space-between">
          <Checkbox
            id="login-reminder"
            value={values.reminder}
            checkBoxInput={onHandleValues.bind(this, "reminder")}
            variant="2"
          >
            Remember Me
          </Checkbox>
          <Title
            className="u-text-underline u-cursor-pointer"
            variant="ib-17-1"
          >
            Forgot Password
          </Title>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
