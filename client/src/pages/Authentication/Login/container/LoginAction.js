import React from "react";

import { Button } from "../../../../components";

const LoginAction = ({ onHandleLogin = () => {} }) => {
  return (
    <div className="u-margin-top-25">
      <Button content="SUBMIT" onButtonClick={onHandleLogin} />
    </div>
  );
};

export default LoginAction;
