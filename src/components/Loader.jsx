import React, { useState, useEffect } from "react";

export default function OptimizedLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev > 80 ? 0.5 : 1.5;
        return Math.min(prev + increment, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden font-sans">
      
      {/* 🤖 Spline Background - Scaled for Mobile */}
      <div className="absolute top-0 left-0 w-full h-[calc(100%+70px)] overflow-hidden pointer-events-none">
        <div className="w-full h-full scale-125 md:scale-100 transition-transform duration-1000">
          <spline-viewer
            url="https://prod.spline.design/TdjmVDj86FIr6wmK/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          ></spline-viewer>
        </div>
        
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.15)_0%,transparent_70%)]" />
      </div>

      {/* ⭐ THEMED HUD OVERLAY - Responsive Padding */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 pointer-events-none">
        
        {/* TOP: System Header - Responsive Text & Alignment */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 animate-pulse rounded-full shadow-[0_0_10px_#dc2626]" />
              <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] uppercase font-black text-white whitespace-nowrap">
                Initializing_Neural_Link
              </span>
            </div>
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-red-600 to-transparent" />
          </div>
          
          <div className="text-right font-mono text-[7px] sm:text-[9px] text-zinc-600 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
            Protocol: 0x99_LOAD<br/>
            <span className="hidden xs:inline">Security: Encrypted</span>
          </div>
        </div>

        {/* CENTER: Progress Display - Responsive Font Sizes */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-red-600/20 rounded-full" />
            <div className="relative text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white italic">
              {Math.floor(progress)}<span className="text-red-600">%</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full max-w-[200px] sm:max-w-xs">
            {/* Progress Bar Container - Fluid Width */}
            <div className="w-full h-[2px] bg-zinc-900 overflow-hidden relative border border-white/5">
              <div
                className="absolute inset-y-0 left-0 bg-red-600 shadow-[0_0_15px_#dc2626] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-[8px] sm:text-[10px] text-red-500 font-mono tracking-[0.3em] sm:tracking-[0.5em] uppercase animate-pulse text-center">
              {progress < 40 ? "establishing_uplink" : 
               progress < 80 ? "syncing_biometry" : "ready_for_extraction"}
            </p>
          </div>
        </div>

        {/* BOTTOM: Responsive Brackets & Meta */}
        <div className="flex justify-between items-end w-full">
           <div className="w-8 h-8 sm:w-16 sm:h-16 border-b border-l border-red-600/30" />
           <div className="text-[7px] sm:text-[9px] text-zinc-700 font-mono uppercase tracking-widest pb-1 sm:pb-2 text-center px-2">
             © 2026 Yadhu_Krishna <span className="hidden xs:inline">// Systems_Core</span>
           </div>
           <div className="w-8 h-8 sm:w-16 sm:h-16 border-b border-r border-red-600/30" />
        </div>
      </div>

      {/* Scanline Effect - Lower opacity on mobile for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-[5] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-30 md:opacity-50" />
    </div>
  );
}