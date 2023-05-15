import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header, Loader, SideNav } from "../components";
import {
  Auth as AuthPage,
  Dashboard as DashboardPage,
  Login as LoginPage,
  Profile as ProfilePage,
  RecruiterDashboard as RecruiterDashboardPage,
  Settings as SettingsPage,
  Signup as SignupPage,
} from "../pages";
import { USER_TYPES } from "../utils/data";
import customHistory from "../utils/history/history";
import CustomRouter from "./CustomRouter";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = ({ type }) => {
  return (
    <CustomRouter history={customHistory}>
      <Loader />
      <div className="header__container">
        <SideNav />
        <div className="u-width-100">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    type == USER_TYPES.RECRUITER
                      ? "/recruiter-dashboard"
                      : "/dashboard"
                  }
                  replace
                />
              }
            />
            <Route
              path="/recruiter-dashboard"
              element={
                <PrivateRoute>
                  <RecruiterDashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </CustomRouter>
  );
};

const mapStateToProps = ({
  auth: {
    user: { type = USER_TYPES.USER },
  },
}) => ({ type });

export default connect(mapStateToProps)(AppRoutes);
