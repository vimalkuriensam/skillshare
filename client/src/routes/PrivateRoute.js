import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, token }) => {
  if (!token) return <Navigate to="/auth/login" />;
  return children;
};

const mapStateToProps = ({ auth: { token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
