import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header, Loader } from "../components";
import {
  Auth as AuthPage,
  Dashboard as DashboardPage,
  Login as LoginPage,
  Signup as SignupPage,
} from "../pages";
import customHistory from "../utils/history/history";
import CustomRouter from "./CustomRouter";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <CustomRouter history={customHistory}>
      <Loader />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </CustomRouter>
  );
};

export default AppRoutes;
