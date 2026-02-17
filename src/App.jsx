import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "./api/api";

// Components
import OptimizedLoader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Education from "./pages/Education";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState({
    profile: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes, eduRes] =
          await Promise.all([
            api.getProfile(),
            api.getSkills
              ? api.getSkills()
              : Promise.resolve({ results: [] }),
            api.getProjects
              ? api.getProjects()
              : Promise.resolve({ results: [] }),
            api.getExperience
              ? api.getExperience()
              : Promise.resolve({ results: [] }),
            api.getEducation
              ? api.getEducation()
              : Promise.resolve({ results: [] }),
          ]);

        setData({
          profile: profileRes.results
            ? profileRes.results[0]
            : null,
          skills: skillsRes.results || [],
          projects: projectsRes.results || [],
          experience: expRes.results || [],
          education: eduRes.results || [],
        });

        setDataLoaded(true);
      } catch (err) {
        console.error("Data fetch failed", err);
        setDataLoaded(true);
      }
    };

    fetchPortfolioData();

    // Load Spline Script
    const scriptId = "spline-viewer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.12.53/build/spline-viewer.js";
      document.body.appendChild(script);
    }

    const hasSeenIntro = sessionStorage.getItem("introSeen");
    if (hasSeenIntro) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("introSeen", "true");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative bg-black min-h-screen selection:bg-red-500 selection:text-white overflow-x-hidden overflow-y-auto">

      {/* 3D BACKGROUND */}
      {!isLoading && dataLoaded && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[calc(100%+70px)] scale-150 md:scale-100 origin-center transition-transform duration-1000">
            <spline-viewer
              url="https://prod.spline.design/FEVuO6qGQJw8rWq8/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            ></spline-viewer>
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] z-[1] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 md:opacity-100" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {isLoading || !dataLoaded ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]"
          >
            <OptimizedLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navbar />

            <main className="w-full">

              <section id="home" className="min-h-screen">
                <Home profile={data.profile} />
              </section>

              <section id="about">
                <About profile={data.profile} />
              </section>

              <section id="skills">
                <Skills skills={data.skills} />
              </section>

              <section id="experience">
                <Experience experience={data.experience} />
              </section>

              <section id="education">
                <Education education={data.education} />
              </section>

              <section id="projects">
                <Projects projects={data.projects} />
              </section>

            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        section {
          scroll-margin-top: 80px;
        }

        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default App;