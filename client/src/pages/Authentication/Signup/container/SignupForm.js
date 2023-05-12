import React, { Fragment } from "react";

import { FormInput } from "../../../../components";

const SignupForm = ({ values, error, onHandleValues = () => {} }) => {
  return (
    <Fragment>
      <div className="u-margin-top-40">
        <div>
          <FormInput
            title="username"
            value={values.username}
            error={error.username}
            variant="1"
            placeholder="username"
            onHandleText={onHandleValues.bind(this, "username")}
          />
        </div>
        <div className="u-margin-top-25">
          <FormInput
            title="email"
            value={values.email}
            error={error.email}
            variant="1"
            placeholder="email"
            onHandleText={onHandleValues.bind(this, "email")}
          />
        </div>
        <div className="u-margin-top-25">
          <FormInput
            title="password"
            value={values.password}
            error={error.password}
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
            error={error.confirmPassword}
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
