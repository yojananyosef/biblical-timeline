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
  const [selectedEraForModal, setSelectedEraForModal] = useState<Era | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="min-h-[90vh] flex flex-col justify-center gap-12 max-w-7xl mx-auto w-full px-6 py-12">
      <header className="flex flex-col gap-4 text-center md:text-left">
        <motion.h2 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4"
        >
          BIBLICAL <br />
          <span className="text-intent-attention">TIMELINE</span>
        </motion.h2>
        <div className="h-2 w-32 bg-intent-action mx-auto md:mx-0 shadow-hard"></div>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
      >
        {eras.map((era) => (
          <motion.div
            key={era.name}
            variants={item}
            className="group relative flex flex-col border-structure border-black bg-white shadow-hard hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] transition-all duration-200"
          >
            {/* ERA HEADER (Arch Style) */}
            <div className="bg-black text-white p-6 text-center border-b-4 border-black">
              <h3 className="text-2xl font-black uppercase tracking-widest">{era.name}</h3>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <p className="text-lg font-bold leading-tight opacity-70 mb-8 line-clamp-3">
                {era.description}
              </p>

              {/* LISTA DE PERIODOS (TODOS) */}
              <div className="flex flex-col gap-2 mb-8 flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Periodos</span>
                {era.periods.map((period) => (
                  <button
                    key={period.name}
                    onClick={() => onSelectEra(period.firstEventId)}
                    className="flex items-center justify-between p-3 text-xs font-black uppercase tracking-widest bg-canvas border-2 border-black hover:bg-intent-action transition-colors"
                  >
                    {period.name}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
              
              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => onSelectEra(era.firstEventId)}
                  className="flex-1 bg-intent-attention text-white border-structure border-black p-4 font-black uppercase tracking-widest text-sm shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Explorar Era
                </button>
                <button 
                  onClick={() => setSelectedEraForModal(era)}
                  className="bg-white border-structure border-black p-4 shadow-hard hover:bg-canvas transition-all"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ERA MODAL - PORTALED */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedEraForModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 isolate">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEraForModal(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                style={{ zIndex: -1 }}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotate: 1 }}
                className="relative w-full max-w-4xl bg-canvas border-structure border-black shadow-hard p-8 md:p-12 overflow-y-auto max-h-[90vh] z-10"
              >
                <button 
                  onClick={() => setSelectedEraForModal(null)}
                  className="absolute top-4 right-4 p-2 bg-white border-2 border-black shadow-hard hover:bg-intent-danger hover:text-white transition-all z-50"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-6">
                    <header>
                      <span className="text-intent-attention font-black tracking-widest text-xs uppercase mb-2 block">Resumen de la Era</span>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        {selectedEraForModal.name}
                      </h2>
                      <div className="h-2 w-24 bg-intent-action shadow-hard"></div>
                    </header>
                    
                    <p className="text-lg md:text-xl font-medium leading-relaxed">
                      {selectedEraForModal.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      Periodos Clave
                    </h3>
                    <div className="flex flex-col gap-3">
                      {selectedEraForModal.periods.map((p) => (
                        <button
                          key={p.name}
                          onClick={() => {
                            onSelectEra(p.firstEventId);
                            setSelectedEraForModal(null);
                          }}
                          className="flex items-center justify-between p-4 bg-white border-2 border-black shadow-hard hover:bg-intent-action hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-left"
                        >
                          <span className="text-sm font-black uppercase tracking-widest">{p.name}</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
