import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTerminal,
  FaDownload,
  FaMicrochip,
} from "react-icons/fa";

export default function Home({ profile = {} }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const RESUME_DOWNLOAD_URL =
    "https://drive.google.com/uc?export=download&id=1MH4DD2vg8j8ayAhO2b2vVNcIJfxFyfcR";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nameArray = profile.name
    ? profile.name.split(" ")
    : ["Yadhu", "Krishna"];

  const firstName = nameArray[0];
  const lastName = nameArray.slice(1).join(" ");

  return (
    <div className="relative w-full min-h-screen bg-transparent text-white overflow-hidden font-sans pt-20 md:pt-24">
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] p-6 sm:p-10 md:p-12 pointer-events-none">
        
        {/* HEADER */}
        <div className="flex justify-between items-start w-full">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : {}}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-red-600 animate-pulse rounded-full shadow-[0_0_10px_#dc2626]" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-black">
                Welcome to My Digital Domain
              </span>
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-red-600 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : {}}
            className="text-right font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-tight"
          >
            Loc: {profile.location || "Remote"}
            <br />
            Id: {profile.email ? profile.email.split("@")[0] : "User_01"}
          </motion.div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-center px-4"
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] break-words">
              {firstName}
              <span className="block sm:inline text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                {" "}
                {lastName}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 flex flex-col items-center gap-4"
            >
              <p className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase text-white flex items-center gap-3 text-center">
                <FaMicrochip className="text-red-600 shrink-0" />
                {profile.headline || "AI/ML + Full Stack Developer"}
              </p>

              <p className="max-w-xl text-xs text-zinc-500 font-mono italic tracking-widest leading-relaxed text-center">
                //{" "}
                {profile.bio ||
                  "Crafting digital experiences with precision and passion."}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 pb-4">
          
          {/* Social Links */}
          <div className="flex gap-8 pointer-events-auto">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600 transition transform hover:scale-110"
              >
                <FaGithub size={20} />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600 transition transform hover:scale-110"
              >
                <FaLinkedin size={20} />
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-red-600 transition transform hover:scale-110"
              >
                <FaTerminal size={20} />
              </a>
            )}
          </div>

          {/* Resume Button */}
          <motion.a
            href={RESUME_DOWNLOAD_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-sm relative overflow-hidden pointer-events-auto"
          >
            <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
              <FaDownload /> Download Resume
            </span>
          </motion.a>
        </div>
      </div>

      {/* Frame Corners */}
      <div className="absolute top-24 left-6 w-12 h-12 border-t border-l border-red-600/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-red-600/40 pointer-events-none" />
    </div>
  );
}