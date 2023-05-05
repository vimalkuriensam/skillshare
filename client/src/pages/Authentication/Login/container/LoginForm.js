import React, { Fragment } from "react";

import { FormInput } from "../../../../components";

const LoginForm = ({ values, onHandleValues }) => {
  return (
    <Fragment>
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
