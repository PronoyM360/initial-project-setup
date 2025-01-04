import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { AuthState, clearMessage } from "../../../app/slice/authSlice";

const HEADER_CONTENT = {
  "/auth/login": {
    title: "Yooo, Welcome Back!",
    description:
      "Login to access your account and continue your journey with us.",
  },
  "/auth/send-otp": {
    title: "Forgot Password",
    description:
      "Don't worry! It happens. Please enter the email address associated with your account.",
  },
  "/auth/match-otp": {
    title: "Match OTP",
    description:
      "A 6 digit code has been sent to your email address. This OTP will be valid for the next 3 minutes.",
  },
  "/auth/forgot-password": {
    title: "Create New Password",
    description:
      "Your New Password must be different from previously used passwords.",
  },
} as const;

const Auth: React.FC = () => {
  const { xl } = useBreakpoint();
  const { pathname } = useLocation();
  const { message } = useAppSelector(AuthState);
  const dispatch = useAppDispatch();

  const { title, description } = useMemo(
    () =>
      HEADER_CONTENT[pathname as keyof typeof HEADER_CONTENT] || {
        title: "Welcome!",
        description: "Please navigate to the appropriate page.",
      },
    [pathname]
  );

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => dispatch(clearMessage()), 10000);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <section style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          padding: "1rem",
          width: "100%",
          maxWidth: xl ? "400px" : "350px",
        }}
      >
        <AuthHeader title={title} description={description} />
        <Outlet />
        <AuthFooter />
      </div>
    </section>
  );
};

export default Auth;
