"use client";

import { motion } from "framer-motion";

interface TimeScaleProps {
  currentYear: number;
  progress: number;
  era: string;
}

export default function TimeScale({ currentYear, progress, era }: TimeScaleProps) {
  const formatYear = (y: number) => {
    return `${Math.abs(y)} ${y < 0 ? 'BC' : 'AD'}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-black text-white z-[60] flex flex-col border-t-4 border-intent-action">
      {/* Indicator Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-intent-action z-10 shadow-[0_0_15px_rgba(255,222,89,0.5)]"></div>

      {/* Era Label */}
      <div className="absolute top-2 left-6 bg-white text-black px-4 py-1 font-black text-xs uppercase tracking-[0.2em] shadow-hard z-20">
        {era || "Exploring History"}
      </div>

      {/* Year Label Center */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-5 bg-black border-2 border-intent-action px-6 py-2 z-20 shadow-hard flex items-center justify-center">
        <span className="text-2xl font-black tracking-tighter text-intent-action tabular-nums">
          {formatYear(currentYear)}
        </span>
      </div>

      {/* Ruler Ticks (Simulated with repeating gradient or loop) */}
      <div className="flex-1 flex items-end pb-4 relative overflow-hidden">
        <motion.div 
          className="flex gap-12 px-[50vw] transition-transform duration-75"
          style={{ transform: `translateX(${-progress * 100}%)` }}
        >
          {/* We'll use a CSS pattern for ticks for performance */}
          <div className="absolute inset-0 w-[5000%] h-full opacity-30"
            style={{ 
              backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 100%',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
            }}
          ></div>
        </motion.div>
      </div>

      {/* Progress Fill */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1.5 bg-intent-action origin-left"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
