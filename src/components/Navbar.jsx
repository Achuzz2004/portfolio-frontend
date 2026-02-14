import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  // Scroll logic for active section and header blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "#home";
      links.forEach(([_, href]) => {
        const section = document.querySelector(href);
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = href;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <header 
      className={`fixed w-full z-[100] transition-all duration-500 border-b ${
        scrolled 
        ? "py-3 bg-black/80 backdrop-blur-xl border-red-600/20" 
        : "py-6 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO: Cybernetic Style */}
        <motion.a
          href="#home"
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className="relative group"
        >
          <span className="text-2xl font-black tracking-tighter text-white">
            Y<span className="text-red-600 group-hover:drop-shadow-[0_0_8px_#dc2626] transition-all">K</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
        </motion.a>

        {/* DESKTOP NAV: Minimal HUD */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map(([label, href], idx) => (
            <motion.a
              key={href}
              href={href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                active === href ? "text-red-600" : "text-zinc-400 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {active === href && (
                <motion.span 
                  layoutId="nav_active"
                  className="absolute -left-4 text-red-600"
                >
                  [
                </motion.span>
              )}
              {label}
              {active === href && (
                <motion.span 
                  layoutId="nav_active_end"
                  className="absolute -right-4 text-red-600"
                >
                  ]
                </motion.span>
              )}
            </motion.a>
          ))}
        </nav>

        {/* MOBILE MENU TRIGGER */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="text-white focus:outline-none space-y-1.5"
          >
            <motion.div 
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-white" 
            />
            <motion.div 
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[2px] bg-red-600" 
            />
            <motion.div 
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-white" 
            />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY: Full Screen System UI */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-black z-[110] flex flex-col items-center justify-center"
          >
            {/* Background Grid for Mobile Menu */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <nav className="relative flex flex-col items-center space-y-8">
              {links.map(([label, href], idx) => (
                <motion.a
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={href}
                  className={`text-3xl font-black uppercase tracking-[0.2em] ${
                    active === href ? "text-red-600" : "text-white"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {label}
                </motion.a>
              ))}
              
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setOpen(false)}
                className="mt-12 text-[10px] tracking-[0.5em] text-zinc-500 uppercase border border-zinc-800 px-6 py-2"
              >
                Close_System
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;