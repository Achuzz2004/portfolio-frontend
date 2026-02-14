import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section id="about" className="relative w-full py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
        >
          
          {/* LEFT: Portrait with connect section below */}
          <div className="relative shrink-0 flex flex-col items-center">
            {/* Portrait */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
            >
              {/* Gradient ring */}
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-red-600 to-zinc-600 rounded-full opacity-30 blur-[2px]" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
                <img
                  src={profile.photo || '/assets/placeholder.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Connect Section - Moved under profile pic */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Connect</p>
              <div className="flex items-center justify-center gap-3">
                {[
                  { icon: <FaGithub />, link: profile.github, label: "GitHub" },
                  { icon: <FaLinkedin />, link: profile.linkedin, label: "LinkedIn" },
                  { icon: <FaTwitter />, link: profile.twitter, label: "Twitter" }
                ].map((social, i) => social.link && (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-all duration-300"
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Content - No cards, clean background */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Section label */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="h-px w-8 bg-red-600/50" />
                <h4 className="text-red-600 font-medium tracking-[0.2em] uppercase text-[10px]">
                  ABOUT
                </h4>
              </div>
              
              {/* Name */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                <span className="text-red-500">{profile.name}</span>
              </h2>

              {/* Headline */}
              <p className="text-zinc-400 text-sm sm:text-base font-light mb-3">
                {profile.headline}
              </p>

              {/* Bio - With subtle blur background for better readability */}
              <div className="relative mb-6 max-w-xl mx-auto lg:mx-0">
                {/* Blur background layer */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px] rounded-lg -m-2 p-2" />
                
                {/* Bio text */}
                <p className="relative text-zinc-100 text-sm sm:text-base leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Info Grid - Clean, no cards */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-4 border-t border-white/5 text-sm">
                {[
                  { icon: <FaEnvelope className="text-red-500 text-xs" />, label: "Email", value: profile.email, link: `mailto:${profile.email}` },
                  { icon: <FaMapMarkerAlt className="text-red-500 text-xs" />, label: "Location", value: profile.location },
                  { icon: <FaPhone className="text-red-500 text-xs" />, label: "Phone", value: profile.phone, link: `tel:${profile.phone}` },
                  { icon: <FaGlobe className="text-red-500 text-xs" />, label: "Website", value: profile.website || "Available", link: profile.website }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800/50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[8px] uppercase tracking-wider text-zinc-500">{item.label}</p>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs text-zinc-300 hover:text-red-400 transition-colors block truncate max-w-[120px]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-300 block truncate max-w-[120px]">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}