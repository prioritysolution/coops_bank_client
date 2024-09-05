"use client";

import Login from "@/components/auth/login";
import { useLogin } from "./Hooks";

const LoginContainer = () => {
  const { loading, loginForm, handleLoginSubmit } = useLogin();

  return (
    <Login
      loading={loading}
      form={loginForm}
      handleSubmit={handleLoginSubmit}
    />
  );
};

export default LoginContainer;
