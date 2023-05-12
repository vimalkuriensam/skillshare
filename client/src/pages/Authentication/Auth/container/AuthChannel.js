import React from "react";

import { Text } from "../../../../components";
import { DATA } from "../data";

const AuthChannel = ({
  channelValue = "login",
  onHandleChannel = () => {},
}) => {
  return (
    <div className="auth__channelContainer">
      <div
        className={`${
          channelValue == DATA.channelValue.login
            ? "auth__channelActive"
            : "auth__channelInactive"
        }`}
        onClick={onHandleChannel.bind(this, DATA.channelValue.login)}
      >
        <Text
          variant={`${
            channelValue == DATA.channelValue.login ? "ib-20-2" : "ib-20-1"
          }`}
        >
          Login
        </Text>
      </div>
      <div
        className={`${
          channelValue == DATA.channelValue.signup
            ? "auth__channelActive"
            : "auth__channelInactive"
        }`}
        onClick={onHandleChannel.bind(this, DATA.channelValue.signup)}
      >
        <Text
          variant={`${
            channelValue == DATA.channelValue.signup ? "ib-20-2" : "ib-20-1"
          }`}
        >
          Sign Up
        </Text>
      </div>
    </div>
  );
};

export default AuthChannel;
