import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { Input, Text, Title } from "../../../components";

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
        <form className="auth__form">
          <Input variant="1" placeholder="username" />
          <Input variant="1" placeholder="password" />
        </form>
        <div className="auth__formText">
          <Title variant="asr-24-1 u-display-block">INTRODUCING</Title>
          <Title variant="osb-49-1 u-text-capitalize">SkillSearch</Title>
          <Text variant="ir-16-1 u-text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            pharetra egestas convallis. Maecenas interdum consectetur enim, non
            ullamcorper tellus semper nec. Quisque maximus tortor quis laoreet
            sodales. Pellentesque a aliquam nunc, quis varius sem. Integer ac
            tellus sit amet justo euismod tincidunt.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
