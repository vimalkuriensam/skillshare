import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/auth") navigate("/auth/login");
  }, [pathname]);

  return <div>Login</div>;
};

export default Login;
