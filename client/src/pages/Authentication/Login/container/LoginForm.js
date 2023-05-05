import React from "react";
import { Input } from "../../../../components";

const LoginForm = () => {
  return (
    <form className="auth__form">
      <Input variant="1" placeholder="username" />
      <Input variant="1" placeholder="password" />
    </form>
  );
};

export default LoginForm;
