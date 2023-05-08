import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/auth.action";
import SignupAction from "./container/SignupAction";
import SignupForm from "./container/SignupForm";

import { SIGNUP_DEFAULT_FIELDS } from "./data";

const Signup = ({ dispatch }) => {
  const navigate = useNavigate();
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

  const onHandleSignup = async (e) => {
    try {
      e.preventDefault();
      const resp = await dispatch(registerUser({ ...signupContent }));
      if (resp) navigate("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <form onSubmit={onHandleSignup}>
      <SignupForm values={signupContent} onHandleValues={onHandleValues} />
      <SignupAction onHandleSignup />
    </form>
  );
};

export default connect()(Signup);
