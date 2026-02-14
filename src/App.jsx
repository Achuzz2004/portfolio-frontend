import React, { useState, useEffect, useMemo } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState({
    profile: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });

  useEffect(() => {
    // 1. Precise Mobile Detection
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024 || navigator.maxTouchPoints > 0);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const fetchPortfolioData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes, eduRes] = await Promise.all([
          api.getProfile(),
          api.getSkills ? api.getSkills() : Promise.resolve({ results: [] }),
          api.getProjects ? api.getProjects() : Promise.resolve({ results: [] }),
          api.getExperience ? api.getExperience() : Promise.resolve({ results: [] }),
          api.getEducation ? api.getEducation() : Promise.resolve({ results: [] }),
        ]);

        setData({
          profile: profileRes.results ? profileRes.results[0] : null,
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

    // 2. Load Spline Script (standard module)
    const scriptId = "spline-viewer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.53/build/spline-viewer.js";
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

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div className="relative bg-black min-h-screen selection:bg-red-500 selection:text-white overflow-x-hidden">

      {/* 🤖 HARD-OPTIMIZED 3D BACKGROUND */}
      {!isLoading && dataLoaded && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-[calc(100%+70px)] ${isMobile ? 'scale-150' : 'scale-100'} origin-center`}>
            <spline-viewer 
              url="https://prod.spline.design/FEVuO6qGQJw8rWq8/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
              events-target="global"
              // Instead of 'hint', we use these targeted attributes:
              loading="eager"
              device-pixel-ratio={isMobile ? "1.0" : "auto"} // This is the single biggest lag-fix
              unloadable="true" 
            ></spline-viewer>
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Reduced Scanline complexity on mobile */}
          <div className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-[1] bg-[length:100%_4px] pointer-events-none ${isMobile ? 'opacity-30' : 'opacity-100'}`} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {(isLoading || !dataLoaded) ? (
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

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          background-color: black;
          /* Prevents overscroll 'rubber-banding' which jitters 3D scenes */
          overscroll-behavior-y: none;
        }

        /* Essential for Mobile Performance */
        spline-viewer {
          /* Force hardware acceleration without changing visuals */
          backface-visibility: hidden;
          perspective: 1000;
          transform: translate3d(0,0,0); 
        }

        /* Stop the browser from trying to track touch on 3D except where needed */
        @media (max-width: 1024px) {
          spline-viewer {
            pointer-events: none;
          }
          /* Only allow the head to follow touch/scroll in the hero area */
          #home {
            pointer-events: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
