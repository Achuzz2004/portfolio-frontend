import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function App() {
  return (
    /* Added w-full and overflow-x-hidden to prevent horizontal gaps */
    <div className="w-full min-h-screen overflow-x-hidden scroll-smooth bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      <main className="pt-20 w-full">
        <motion.section
          id="home"
          className="w-full min-h-screen flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Home />
        </motion.section>

        <motion.section
          id="about"
          className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <About />
        </motion.section>

        <motion.section
          id="skills"
          className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Skills />
        </motion.section>

        <motion.section
          id="education"
          className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Education />
        </motion.section>

        <motion.section
          id="experience"
          className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Experience />
        </motion.section>

        <motion.section
          id="projects"
          className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Projects />
        </motion.section>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
}

export default App;
