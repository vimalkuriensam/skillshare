import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { Title } from "../../../components";
import AuthChannel from "./container/AuthChannel";
import LoginText from "./container/LoginText";
import { DATA } from "./data";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [channelValue, setChannelValue] = useState(DATA.channelValue.login);

  useEffect(() => {
    if (pathname == "/auth") navigate("/auth/login");
  }, [pathname]);

  useEffect(() => {
    if (channelValue == DATA.channelValue.login) navigate("/auth/login");
    else navigate("/auth/signup");
  }, [channelValue]);

  const onHandleChannel = () => {
    setChannelValue((prevState) => {
      if (prevState == DATA.channelValue.login) return DATA.channelValue.signup;
      return DATA.channelValue.login;
    });
  };

  return (
    <div>
      <div className="auth__block auth__blockTopLeft"></div>
      <div className="auth__formContainer">
        <form className="auth__form">
          <Title variant="isbi-40-1 u-text-capitalize u-width-100 u-text-center">
            {DATA.WELCOME_TEXT}
          </Title>
          <AuthChannel
            channelValue={channelValue}
            onHandleChannel={onHandleChannel}
          />
          <Outlet />
        </form>
        <LoginText />
      </div>
    </div>
  );
};

export default Auth;
