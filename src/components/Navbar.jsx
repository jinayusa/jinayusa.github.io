// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, User, Folder, Mail, Sun, Moon, FileText } from "lucide-react";
import Logo from "./Logo";

function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.theme;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefers);
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
  };

  return (
    <button
      onClick={toggle}
      className={`rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition ${className}`}
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/projects", label: "Projects", icon: <Folder size={18} /> },
    { to: "/experience", label: "Experience", icon: <Mail size={18} /> },
    { to: "/about", label: "About", icon: <User size={18} /> },
    { to: "/contact", label: "Contact", icon: <Mail size={18} /> },
    
  ];

  const NavLinks = ({ onClick, className }) => (
    <ul className={className}>
      {navItems.map(({ to, label }) => (
        <li key={label}>
          <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition 
              ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`
            }
          >
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 px-6 flex items-center justify-between 
                 backdrop-blur bg-white/70 dark:bg-black/50 shadow-sm"
    >
      {/* Logo */}
      <Logo />

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <ul className="flex space-x-6 text-sm font-medium tracking-wide">
          {navItems.map(({ to, label }) => (
            <li key={label} className="relative">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `inline-block pb-1 transition-colors duration-200 ease-in-out
                   text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`relative z-10 ${
                        isActive ? "text-black dark:text-white font-semibold" : ""
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full
                        transition-all duration-300 ease-in-out
                        ${isActive ? "bg-black dark:bg-white" : "bg-transparent group-hover:bg-gray-400"}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
          title="View Resume"
        >
          <FileText size={18} />
        </a>
        <ThemeToggle className="ml-4" />
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-white/20 dark:bg-white/10 backdrop-blur p-2 border 
                   border-white/30 hover:shadow-md transition focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {open && (
          <div
            className="absolute right-0 mt-3 w-56 rounded-xl 
           backdrop-blur-sm md:backdrop-blur 
           bg-white/90 dark:bg-black/90 
           p-4 shadow-2xl flex flex-col gap-4 
           border border-white/20 animate-fade-in z-50"
          >
            <ThemeToggle />
            <NavLinks
              onClick={() => setOpen(false)}
              className="flex flex-col gap-2 [&>li]:text-sm [&>li]:rounded-lg [&>li]:px-3 [&>li]:py-2 
                       [&>li:hover]:bg-white/50 dark:[&>li:hover]:bg-white/10"
            />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center py-2 rounded-md border border-white/30 
                         hover:bg-white/50 dark:hover:bg-white/10 transition"
              title="View Resume"
            >
              <FileText size={18} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
