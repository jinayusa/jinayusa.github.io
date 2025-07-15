import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Logo() {
  const [isHovered, setHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(saved === "dark" || (!saved && prefersDark));

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <NavLink to="/" aria-label="Homepage">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-12 h-12 overflow-hidden rounded-md bg-transparent text-black dark:text-white font-extrabold text-2xl flex items-center justify-center transition-colors"
      >
        {/* Animated Water Fill */}
        <motion.div
          initial={{ top: '100%' }}
          animate={{ top: isHovered ? '0%' : '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className={`absolute left-0 w-full h-full z-0 ${
            isDarkMode ? "bg-cyan-500" : "bg-cyan-400"
          }`}
        />

        {/* Logo content */}
        <img
          src="/jlogo.png"
          alt="Logo"
          className="relative z-10 w-8 h-8 object-contain"
        />
      </motion.div>
    </NavLink>
  );
}
