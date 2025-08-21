import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Education", "#education"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
  ];

  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      let current = "#home";
      links.forEach(([_, href]) => {
        const section = document.querySelector(href);
        if (section && window.scrollY >= section.offsetTop - 100)
          current = href;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
        >
          YK
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {links.map(([label, href]) => (
            <motion.a
              key={href}
              href={href}
              className={`font-semibold text-lg transition-all duration-300 ${
                active === href
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            ☰
          </button>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 py-2 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg space-y-2"
            >
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => {
                    setOpen(false);
                    document
                      .querySelector(href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block font-semibold text-lg transition-all duration-300 ${
                    active === href
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500"
                  }`}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
