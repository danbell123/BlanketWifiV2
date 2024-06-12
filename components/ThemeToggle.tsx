"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check for theme preference in local storage or default to system preference
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme === "dark";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    // Apply the theme class to the body
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Save the preference to local storage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="px-4 py-2 bg-purple-500 text-white font-bold rounded hover:bg-purple-700 transition-colors"
      onClick={toggleTheme}
    >
      Toggle {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
