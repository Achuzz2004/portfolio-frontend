import React from 'react';
import { motion } from 'framer-motion';
import TimelineCard from '../components/TimelineCard';

// Receiving 'education' data as a prop from App.jsx
export default function Education({ education }) {
  
  if (!education || education.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center font-mono text-zinc-600 tracking-widest uppercase text-[10px]"
      >
        [ KNOWLEDGE_BASE_OFFLINE: NO_RECORDS ]
      </motion.div>
    );
  }

  return (
    <section id="education" className="relative w-full py-16 lg:py-24 bg-transparent overflow-hidden">
      {/* Subtle background gradient that moves on scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,38,38,0.03),transparent_50%)] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header - Responsive spacing matching Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 lg:mb-20 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3 md:mb-4">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-red-600"
            />
            <span className="text-red-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">
              Academia
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-[1.1]">
            Academic <span className="text-red-600 relative">
              Foundation
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600/30 origin-left"
              />
            </span>
          </h2>
        </motion.div>

        {/* Timeline Container - Responsive padding */}
        <div className="relative px-2 sm:px-4">
          {/* Animated Central Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-red-600/0 via-red-600/20 to-red-600/0"
          />

          <div className="space-y-12 md:space-y-16">
            {education.map((e, index) => (
              <motion.div
                key={e.id || index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative pl-10 sm:pl-14 group"
              >
                {/* Animated Timeline Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.15 + 0.2 }}
                  className="absolute left-0 top-2 w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center"
                >
                  {/* Pulsing background */}
                  <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '2s' }} />
                  
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-red-600/30 group-hover:border-red-600 transition-all duration-500" />
                  
                  {/* Inner dot */}
                  <motion.div 
                    whileHover={{ scale: 1.5 }}
                    className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_25px_#dc2626] transition-all duration-500"
                  />
                </motion.div>

                {/* Content Area - Clean background like Experience */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8">
                  
                  {/* Left Side: Degree, Institution & Description */}
                  <div className="flex-1">
                    {/* Date with hover effect */}
                    <motion.span 
                      whileHover={{ x: 5 }}
                      className="inline-block text-red-600/80 group-hover:text-red-600 font-mono text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors"
                    >
                      <span className="bg-red-950/30 px-2 py-1 rounded-sm">
                        {e.start_date} — {e.end_date || 'Present'}
                      </span>
                    </motion.span>
                    
                    {/* Degree with animated underline on hover */}
                    <h3 className="relative text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-red-500 transition-colors duration-300 mb-1">
                      {e.degree}
                      <motion.span 
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600/50 origin-left hidden group-hover:block"
                      />
                    </h3>
                    
                    <p className="text-base sm:text-lg text-zinc-400 font-light mb-3 sm:mb-4 group-hover:text-zinc-300 transition-colors">
                      {e.institution}
                    </p>
                    
                    {/* Description with improved readability */}
                    <motion.p 
                      initial={{ opacity: 0.7 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs sm:text-sm md:text-base text-zinc-500 leading-relaxed max-w-3xl group-hover:text-zinc-400 transition-colors"
                    >
                      {e.description}
                    </motion.p>

                    {/* Decorative Tech Detail - Reimagined */}
                    <div className="mt-4 flex gap-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 8 }}
                        transition={{ delay: index * 0.15 + 0.5 }}
                        className="h-1 bg-red-600/40 rounded-full"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ delay: index * 0.15 + 0.6 }}
                        className="h-1 bg-red-600/20 rounded-full"
                      />
                    </div>

                    {/* Mobile-only decorative element */}
                    <div className="block lg:hidden mt-4 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.3em]">
                      — Entry {index + 1} —
                    </div>
                  </div>

                  {/* Right Side: Desktop Decorative Element */}
                  <motion.div 
                    initial={{ opacity: 0, rotate: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.8, scale: 1.05 }}
                    className="hidden lg:block shrink-0 pt-8 transition-all duration-500"
                  >
                    <div className="text-[8px] font-mono text-zinc-700 uppercase vertical-text tracking-[0.4em]">
                      DEGREE_{String(index + 1).padStart(2, '0')}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Border Accent with animation */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  className="mt-6 md:mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-red-600/30 transition-all duration-1000 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating counter - visible on large screens */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="hidden xl:block fixed bottom-8 right-8 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em] rotate-90 origin-bottom-right"
        >
          {education.length} RECORDS FOUND
        </motion.div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}