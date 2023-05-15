import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/auth.action";
import SignupAction from "./container/SignupAction";
import SignupForm from "./container/SignupForm";
import validator from "validator";

import { ERROR_MSG, SIGNUP_DEFAULT_FIELDS } from "./data";

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

  const validate = () => {
    const error = {};
    Object.keys(signupError).forEach((key) => {
      if (!signupContent[key]) error[key] = ERROR_MSG[key];
    });
    if (!error["password"] && !error["confirmPassword"]) {
      if (signupContent.password !== signupContent.confirmPassword) {
        error["password"] = ERROR_MSG.passwordMatch;
      }
    }
    if (![error["email"]] && !validator.isEmail(signupContent.email))
      error["email"] = ERROR_MSG.invalidEmail;

    return error;
  };

  const onHandleSignup = async (e) => {
    try {
      e.preventDefault();
      const error = validate();
      if (!Object.keys(error).length) {
        const resp = await dispatch(registerUser({ ...signupContent }));
        if (resp) navigate("/");
      } else setSignupError(error);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <form onSubmit={onHandleSignup}>
      <SignupForm
        values={signupContent}
        onHandleValues={onHandleValues}
        error={signupError}
      />
      <SignupAction onHandleSignup />
    </form>
  );
};

export default connect()(Signup);
