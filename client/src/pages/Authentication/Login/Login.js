import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import LoginAction from "./container/LoginAction";
import LoginForm from "./container/LoginForm";
import LoginText from "./container/LoginText";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loginContent, setLoginContent] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (pathname == "/auth") navigate("/auth/login");
  }, [pathname]);

  const onHandleLogin = () => {};

  return (
    <div>
      <div className="auth__block auth__blockTopLeft"></div>
      <div className="auth__formContainer">
        <form className="auth__form">
          <LoginForm />
          <LoginAction onHandleLogin={onHandleLogin} />
        </form>
        <LoginText />
      </div>
    </div>
  );
};

export default Login;
