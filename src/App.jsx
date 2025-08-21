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
    <div className="scroll-smooth bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      <main className="pt-20">
        <motion.section
          id="home"
          className="min-h-screen flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <Home />
        </motion.section>

        <motion.section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <About />
        </motion.section>

        <motion.section
          id="skills"
          className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <Skills />
        </motion.section>

        <motion.section
          id="education"
          className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <Education />
        </motion.section>

        <motion.section
          id="experience"
          className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <Experience />
        </motion.section>

        <motion.section
          id="projects"
          className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
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
