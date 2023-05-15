import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Header } from "../components";

const PrivateRoute = ({ children, token }) => {
  if (!token) return <Navigate to="/auth/login" />;
  return (
    <Fragment>
      <Header />
      <div>{children}</div>
    </Fragment>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({ token });

export default connect(mapStateToProps)(PrivateRoute);
