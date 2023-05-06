import React, { Fragment, useState } from "react";

import LoginAction from "./container/LoginAction";
import LoginForm from "./container/LoginForm";
import { LOGIN_DEFAULT_FIELDS } from "./data";

const Login = () => {
  const [loginContent, setLoginContent] = useState({ ...LOGIN_DEFAULT_FIELDS });
  const [loginError, setLoginError] = useState({ ...LOGIN_DEFAULT_FIELDS });

  const onHandleLogin = () => {};

  const onHandleValues = (key, { target: { value } }) => {
    setLoginError((prevState) => ({ ...prevState, [key]: "" }));
    setLoginContent((prevState) => ({ ...prevState, [key]: value }));
  };
  return (
    <Fragment>
      <LoginForm values={loginContent} onHandleValues={onHandleValues} />
      <LoginAction onHandleLogin={onHandleLogin} />
    </Fragment>
  );
};

export default Login;
