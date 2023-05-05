import React, { Fragment } from "react";

import { FormInput } from "../../../../components";

const SignupForm = ({ values, onHandleValues = () => {} }) => {
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
            title="email"
            value={values.email}
            variant="1"
            placeholder="email"
            onHandleText={onHandleValues.bind(this, "email")}
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
        <div className="u-margin-top-25">
          <FormInput
            title="confirm password"
            value={values.confirmPassword}
            variant="1"
            placeholder="confirm password"
            type="password"
            onHandleText={onHandleValues.bind(this, "confirmPassword")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SignupForm;
