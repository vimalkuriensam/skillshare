import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import LoginAction from "./container/LoginAction";
import LoginForm from "./container/LoginForm";
import LoginText from "./container/LoginText";
import { LOGIN_DEFAULT_FIELDS } from "./data";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loginContent, setLoginContent] = useState({ ...LOGIN_DEFAULT_FIELDS });
  const [loginError, setLoginError] = useState({ ...LOGIN_DEFAULT_FIELDS });

  useEffect(() => {
    if (pathname == "/auth") navigate("/auth/login");
  }, [pathname]);

  const onHandleLogin = () => {};

  const onHandleValues = (key, { target: { value } }) => {
    setLoginError((prevState) => ({ ...prevState, [key]: "" }));
    setLoginContent((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <div>
      <div className="auth__block auth__blockTopLeft"></div>
      <div className="auth__formContainer">
        <form className="auth__form">
          <LoginForm values={loginContent} onHandleValues={onHandleValues} />
          <LoginAction onHandleLogin={onHandleLogin} />
        </form>
        <LoginText />
      </div>
    </div>
  );
};

export default Login;
