import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { api } from "../api/api";

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfile()
      .then(data => {
        if (data?.results?.length > 0) {
          setProfile(data.results[0]);
        } else {
          setProfile(data);
        }
      })
      .catch(() => setProfile(null));
  }, []);

  if (!profile) return null;

  return (
    <motion.footer
      className="relative w-full bg-transparent border-t border-white/5 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        
        {/* Main footer content - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Brand Section - Full width on mobile, left aligned on all devices */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-left"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
              {profile.name ? (
                <span className="text-red-600">{profile.name}</span>
              ) : (
                <span className="text-red-600">PORTFOLIO</span>
              )}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xs pr-4">
              {profile.headline || "Building digital experiences with passion and precision."}
            </p>
            
            {/* Decorative line - left aligned */}
            <div className="w-12 h-px bg-red-600/50 mt-4" />
          </motion.div>

          {/* Contact Info - Center aligned on mobile, left on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-left"
          >
            <h4 className="text-red-600 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-3 sm:mb-4">
              Contact
            </h4>
            
            <div className="space-y-2 sm:space-y-3">
              {profile.email && (
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-red-500 transition-colors group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 group-hover:border-red-600/30 transition-all flex-shrink-0">
                    <FaEnvelope size={10} sm:size={12} className="text-red-500/70 group-hover:text-red-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono truncate max-w-[180px] sm:max-w-[200px]">{profile.email}</span>
                </a>
              )}
              
              {profile.phone && (
                <a 
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-red-500 transition-colors group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 group-hover:border-red-600/30 transition-all flex-shrink-0">
                    <FaPhone size={10} sm:size={12} className="text-red-500/70 group-hover:text-red-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono">{profile.phone}</span>
                </a>
              )}
              
              {(profile.address || profile.location) && (
                <div className="flex items-center gap-2 sm:gap-3 text-zinc-400 group">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 flex-shrink-0">
                    <FaMapMarkerAlt size={10} sm:size={12} className="text-red-500/70" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono line-clamp-1">
                    {profile.address || profile.location}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Social & Copyright - Right aligned on desktop, left on mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-left lg:text-right sm:col-span-2 lg:col-span-1"
          >
            <h4 className="text-red-600 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-3 sm:mb-4">
              Connect
            </h4>
            
            {/* Social Links - Left aligned on all devices */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {profile.github && (
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/30 border border-white/5 transition-all duration-300"
                  title="GitHub"
                >
                  <FaGithub size={14} sm:size={16} />
                </motion.a>
              )}
              
              {profile.linkedin && (
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/30 border border-white/5 transition-all duration-300"
                  title="LinkedIn"
                >
                  <FaLinkedin size={14} sm:size={16} />
                </motion.a>
              )}
              
              {profile.twitter && (
                <motion.a
                  href={profile.twitter}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/30 border border-white/5 transition-all duration-300"
                  title="Twitter"
                >
                  <FaTwitter size={14} sm:size={16} />
                </motion.a>
              )}
            </div>

            {/* Copyright - Left aligned on mobile, right on desktop */}
            <div className="text-left lg:text-right">
              <div className="text-zinc-600 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                <span>© {new Date().getFullYear()}</span>
                <span className="mx-1.5 sm:mx-2 text-red-600/50">|</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 font-bold">
                  {profile.name || 'PORTFOLIO'}
                </span>
              </div>
              
              <p className="text-[7px] sm:text-[8px] text-zinc-800 mt-1.5 sm:mt-2 font-mono tracking-[0.2em]">
                DESIGN & CODE • {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 sm:mt-8 lg:mt-10 h-px w-full bg-gradient-to-r from-transparent via-red-600/20 to-transparent origin-left"
        />

        {/* Floating signature - Centered */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-3 sm:mt-4 text-[7px] sm:text-[8px] font-mono text-zinc-800 uppercase tracking-[0.3em] sm:tracking-[0.5em]"
        >
          {profile.name?.toUpperCase() || 'PORTFOLIO'} • {new Date().getFullYear()}
        </motion.div>
      </div>
    </motion.footer>
  );
}