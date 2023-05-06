import React, { Fragment, useState } from "react";
import SignupAction from "./container/SignupAction";
import SignupForm from "./container/SignupForm";

import { SIGNUP_DEFAULT_FIELDS } from "./data";

const Signup = () => {
  const [signupContent, setSignupContent] = useState({
    ...SIGNUP_DEFAULT_FIELDS,
  });
  const [signupError, setSignupError] = useState({
    ...SIGNUP_DEFAULT_FIELDS,
  });

  const onHandleValues = (key, { target: { value } }) => {
    setSignupError((prevState) => ({ ...prevState, [key]: "" }));
    setSignupContent((prevState) => ({ ...prevState, [key]: value }));
  };

  const onHandleSignup = () => {}
  return (
    <Fragment>
      <SignupForm values={signupContent} onHandleValues={onHandleValues} />
      <SignupAction onHandleSignup={onHandleSignup} />
    </Fragment>
  );
};

export default Signup;
