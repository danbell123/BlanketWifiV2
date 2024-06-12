"use client";

import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex flex-col w-full h-full sm:max-w-md justify-center gap-2 bg-card p-8 rounded-xl">
      {showLogin ? (
        <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default LoginPage;
