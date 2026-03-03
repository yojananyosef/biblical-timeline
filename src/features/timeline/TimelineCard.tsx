"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Book, Quote, Info, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface BiblicalEvent {
  id: string;
  title: string;
  description: string;
  fullArticle?: string;
  verse: string;
  date: string;
  year: number;
  category: string;
  imageUrl?: string | null;
}

interface TimelineCardProps {
  event: BiblicalEvent;
  index: number;
}

export default function TimelineCard({ event, index }: TimelineCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.article 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "200px" }}
        style={{ contentVisibility: "auto" }}
        className="snap-center flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] min-h-[450px] max-h-[700px] flex flex-col gap-6"
      >
        {/* PHASE 1: ATTENTION (Date & Title) */}
        <header data-aida="attention" className="flex flex-col gap-2 flex-shrink-0">
          <span className="text-3xl md:text-5xl font-black bg-intent-action inline-block self-start px-4 py-2 border-structure border-black shadow-hard">
            {event.date}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-text-main break-words uppercase font-black tracking-tighter">
            {event.title}
          </h2>
        </header>

        {/* PHASE 2: INTEREST (Description) */}
        <section 
          data-aida="interest"
          onClick={() => setIsModalOpen(true)}
          className="flex-1 flex flex-col gap-4 bg-white border-structure border-black shadow-hard p-6 md:p-8 overflow-hidden cursor-pointer group hover:bg-canvas transition-colors relative"
        >
          <div className="absolute top-4 right-4 p-2 bg-white border-2 border-black shadow-hard group-hover:bg-intent-attention group-hover:text-white transition-all z-10">
            <Info className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2 text-intent-attention font-black uppercase tracking-widest text-xs md:text-sm">
            <Book className="w-4 h-4" />
            {event.category}
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
          <p className="text-lg md:text-xl lg:text-2xl leading-tight md:leading-snug text-text-main font-medium line-clamp-[10]">
            {event.description}
          </p>
        </div>
      </section>

        {/* PHASE 4: ACTION (Navigation Guide) */}
        <footer 
          data-aida="action"
          className="flex justify-between items-center text-[10px] font-black tracking-[0.3em] uppercase opacity-40 flex-shrink-0"
        >
          <span>Click para ver más</span>
          <span>EVENTO {index + 1}</span>
        </footer>
      </motion.article>

      {/* EVENT MODAL - PORTALED to Body to avoid z-index/transform issues */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 isolate">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                style={{ zIndex: -1 }}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl bg-canvas border-structure border-black shadow-hard flex flex-col md:flex-row overflow-hidden max-h-[90vh] z-10"
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white border-2 border-black shadow-hard hover:bg-intent-danger hover:text-white transition-all z-[110]"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Image Section (if available) */}
                {event.imageUrl && (
                  <div className="md:w-1/3 bg-black flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className={`flex-1 p-8 md:p-12 overflow-y-auto ${!event.imageUrl ? 'w-full' : ''}`}>
                  <header className="mb-8">
                    <span className="text-intent-attention font-black tracking-widest text-xs uppercase mb-2 block">
                      {event.date} • {event.category}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                      {event.title}
                    </h2>
                    <div className="h-2 w-24 bg-intent-action shadow-hard"></div>
                  </header>

                  <div className="prose prose-xl max-w-none font-medium text-text-main/90 mb-8">
                    <div 
                      dangerouslySetInnerHTML={{ __html: event.fullArticle || event.description }} 
                      className="article-content"
                    />
                  </div>

                  <div className="p-6 bg-white border-structure border-black shadow-hard mt-8">
                    <h4 className="text-lg font-black uppercase mb-4 flex items-center gap-2 text-intent-attention">
                      <ExternalLink className="w-5 h-5" />
                      Versículo de Referencia
                    </h4>
                    <p className="text-xl font-bold italic leading-relaxed">
                      "{event.verse}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
