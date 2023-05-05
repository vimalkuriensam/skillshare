import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {
  Auth as AuthPage,
  Dashboard as DashboardPage,
  Login as LoginPage,
  Signup as SignupPage,
} from "../pages";

const OutletComponent = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
