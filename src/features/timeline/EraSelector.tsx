"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Info, X, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

interface Era {
  name: string;
  description: string;
  firstEventId: string;
  periods: { name: string; firstEventId: string }[];
}

interface EraSelectorProps {
  eras: Era[];
  onSelectEra: (eventId: string) => void;
}

export default function EraSelector({ eras, onSelectEra }: EraSelectorProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-start gap-8 max-w-7xl mx-auto w-full px-6">
      <header className="flex flex-col gap-2 text-center md:text-left">
        <motion.h2 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"
        >
          BIBLICAL <span className="text-intent-attention">TIMELINE</span>
        </motion.h2>
        <div className="h-2 w-32 bg-intent-action mx-auto md:mx-0 shadow-hard"></div>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {eras.map((era) => (
          <motion.div
            key={era.name}
            variants={item}
            className="group relative flex flex-col border-structure border-black bg-white shadow-hard hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] transition-all duration-200"
          >
            {/* ERA HEADER (Arch Style) */}
            <div className="bg-black text-white px-6 py-4 text-center border-b-4 border-black">
              <h3 className="text-2xl font-black uppercase tracking-widest">{era.name}</h3>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <p className="text-lg font-bold leading-tight opacity-70 mb-8 line-clamp-3">
                {era.description}
              </p>

              {/* LISTA DE PERIODOS (TODOS) */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Periodos</span>
                {era.periods.map((period) => (
                  <button
                    key={period.name}
                    onClick={() => onSelectEra(period.firstEventId)}
                    className="flex items-center justify-between p-3 text-xs font-black uppercase tracking-widest bg-canvas border-2 border-black hover:bg-intent-action transition-colors text-left"
                  >
                    {period.name}
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
