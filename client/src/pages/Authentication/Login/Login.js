import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Title } from "../../../components";

import LoginForm from "./container/LoginForm";
import LoginText from "./container/LoginText";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/auth") navigate("/auth/login");
  }, [pathname]);

  return (
    <div>
      <div className="auth__block auth__blockTopLeft"></div>
      <div className="auth__formContainer">
        <LoginForm />
        <LoginText />
      </div>
    </div>
  );
};

export default Login;
