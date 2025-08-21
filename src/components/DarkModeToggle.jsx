import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // On page load, check localStorage
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:scale-110 transition-transform"
    >
      {dark ? <BsSun size={20} /> : <BsMoon size={20} />}
    </button>
  );
}
