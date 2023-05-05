import React from "react";
import { Text, Title } from "../../../../components";

const LoginChannel = () => {
  return (
    <div className="auth__channelContainer">
      <div className="auth__channelActive">
        <Text variant="ib-20-2">Login</Text>
      </div>
      <div className="auth__channelInactive u-cursor-pointer">
        <Text variant="ib-20-1">Sign Up</Text>
      </div>
    </div>
  );
};

export default LoginChannel;
