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

    // Load Spline Script Once
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
    <div className="relative bg-black min-h-screen overflow-x-hidden">

      {/* SPLINE BACKGROUND */}
      {!isLoading && dataLoaded && (
        <div className="fixed inset-0 z-0">

          <spline-viewer
            url="https://prod.spline.design/FEVuO6qGQJw8rWq8/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: "auto"
            }}
          ></spline-viewer>

          {/* Overlays (non-interactive) */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.12)_0%,transparent_70%)] pointer-events-none"></div>

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
            className="relative z-20"
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

      {/* Smooth Scroll Fix */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        section {
          scroll-margin-top: 80px;
        }
      `}</style>

    </div>
  );
}

export default App;