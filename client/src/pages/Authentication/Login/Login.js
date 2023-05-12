import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/actions/auth.action";

import LoginAction from "./container/LoginAction";
import LoginForm from "./container/LoginForm";
import { ERROR_MSG, LOGIN_DEFAULT_FIELDS } from "./data";

const Login = ({ dispatch }) => {
  const navigate = useNavigate();
  const [loginContent, setLoginContent] = useState({ ...LOGIN_DEFAULT_FIELDS });
  const [loginError, setLoginError] = useState({ ...LOGIN_DEFAULT_FIELDS });

  const onHandleValues = (key, { target: { value } }) => {
    setLoginError((prevState) => ({ ...prevState, [key]: "" }));
    setLoginContent((prevState) => ({ ...prevState, [key]: value }));
  };

  const validate = () => {
    const error = {};
    Object.keys(loginError).forEach((key) => {
      if (!loginContent[key]) error[key] = ERROR_MSG[key];
    });
    return error;
  };

  const onHandleLogin = async (e) => {
    try {
      e.preventDefault();
      const error = validate();
      if (!Object.keys(error).length) {
        const resp = await dispatch(loginUser({ ...loginContent }));
        if (resp) navigate("/dashboard");
      } else setLoginError(error);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form onSubmit={onHandleLogin}>
      <LoginForm
        values={loginContent}
        error={loginError}
        onHandleValues={onHandleValues}
      />
      <LoginAction />
    </form>
  );
};

export default connect()(Login);
