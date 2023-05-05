import React from "react";

import { Button } from "../../../../components";

const SignupAction = ({ onHandleSignup = () => {} }) => {
  return (
    <div className="u-margin-top-25">
      <Button content="SUBMIT" onButtonClick={onHandleSignup} />
    </div>
  );
};

export default SignupAction;
