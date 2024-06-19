"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { GlobeDemo } from "@/components/globe/Globe";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  // Define the animation variants for the login and register forms
  const variants = {
    initial: { opacity: 0, x: 0, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { opacity: 0, x: 0, scale: 0.9, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <div className="flex flex-row gap-12 w-screen m-24 justify-center">
      <div className="w-1/3">
        <AnimatePresence mode="wait">
          {showLogin ? (
            <motion.div
              key="login"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
