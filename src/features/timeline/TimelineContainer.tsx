"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import TimelineCard from "./TimelineCard";
import EraSelector from "./EraSelector";
import { ChevronLeft, ChevronRight, Home, LayoutGrid, Wind, EyeOff } from "lucide-react";
import Link from "next/link";
import TimeScale from "./TimeScale";
function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface BiblicalEvent {
  id: string;
  title: string;
  description: string;
  verse: string;
  date: string;
  year: number;
  category: string;
  era: string;
  eraDescription: string;
}

interface Era {
  name: string;
  description: string;
  firstEventId: string;
  periods: { name: string; firstEventId: string }[];
}

type ViewMode = "eras" | "timeline";

export default function TimelineContainer() {
  const [events, setEvents] = useState<BiblicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("eras");
  const [activeEra, setActiveEra] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isCalmMode, setIsCalmMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(0); // Track active index efficiently without state lag
  
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate Eras and Periods from events
  const eras = useMemo(() => {
    const eraMap = new Map<string, Era>();
    const sorted = [...events].sort((a, b) => a.year - b.year);
    
    sorted.forEach((event) => {
      // FORZAR ERA SEGÚN CATEGORÍA (Mapeo Estricto)
      let finalEra = event.era;
      let finalEraDescription = event.eraDescription;

      const catNum = parseInt(event.category.split(' - ')[0]) || 0;
      
      if (catNum >= 1 && catNum <= 4) {
        finalEra = "AGE of PATRIARCHS";
        finalEraDescription = "Desde la creación hasta el establecimiento de la promesa con los patriarcas.";
      } else if (catNum >= 5 && catNum <= 8) {
        finalEra = "AGE of ISRAEL";
        finalEraDescription = "La historia de la nación judía, desde el Éxodo hasta los profetas.";
      } else if (catNum >= 9 && catNum <= 13) {
        finalEra = "AGE of CHRIST";
        finalEraDescription = "La vida de Jesús, el nacimiento de la iglesia y el cumplimiento profético.";
      }

      if (!eraMap.has(finalEra)) {
        eraMap.set(finalEra, {
          name: finalEra,
          description: finalEraDescription,
          firstEventId: event.id,
          periods: []
        });
      }
      
      const era = eraMap.get(finalEra)!;
      if (!era.periods.some(p => p.name === event.category)) {
        era.periods.push({
          name: event.category,
          firstEventId: event.id
        });
        
        // ORDENAR NUMÉRICAMENTE POR EL PREFIJO (01, 02, etc.)
        era.periods.sort((a, b) => {
          const numA = parseInt(a.name.split(' - ')[0]) || 0;
          const numB = parseInt(b.name.split(' - ')[0]) || 0;
          return numA - numB;
        });
      }
    });
    return Array.from(eraMap.values());
  }, [events]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        const sortedData = data.sort((a: BiblicalEvent, b: BiblicalEvent) => a.year - b.year);
        setEvents(sortedData);
        if (sortedData.length > 0) {
          setActiveEra(sortedData[0].era);
          setCurrentYear(sortedData[0].year);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Update active era and year on scroll
  useEffect(() => {
    if (viewMode !== "timeline" || events.length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const updateCurrentInfo = () => {
      if (!container) return;
      const { scrollLeft, scrollWidth, offsetWidth } = container;
      
      const progress = scrollLeft / (scrollWidth - offsetWidth);
      setScrollPercent(progress);

      // Optimización: Búsqueda Local O(1)
      // En lugar de escanear todos los elementos, verificamos el actual y sus vecinos
      // para ver cuál está más cerca del centro.
      const viewportCenter = window.innerWidth / 2;
      const currentIdx = activeIndexRef.current;
      
      // Elementos a verificar: actual, anterior y siguiente
      const indicesToCheck = [currentIdx, currentIdx - 1, currentIdx + 1].filter(
        i => i >= 0 && i < events.length
      );

      let bestIndex = currentIdx;
      let minDistance = Infinity;

      // Primero verificamos el actual para tener una base
      const currentEl = document.getElementById(`event-${events[currentIdx]?.id}`);
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const elCenter = rect.left + (rect.width / 2);
        minDistance = Math.abs(viewportCenter - elCenter);
      }

      // Verificamos vecinos
      for (const idx of indicesToCheck) {
        if (idx === currentIdx) continue; // Ya verificado
        
        const el = document.getElementById(`event-${events[idx]?.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.left + (rect.width / 2);
          const distance = Math.abs(viewportCenter - elCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            bestIndex = idx;
          }
        }
      }

      // Si encontramos un mejor índice, actualizamos
      if (bestIndex !== currentIdx) {
        activeIndexRef.current = bestIndex;
        const bestEvent = events[bestIndex];
        if (bestEvent) {
          setActiveEra(bestEvent.era);
          setCurrentYear(bestEvent.year);
        }
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCurrentInfo);
        ticking = true;
      }
    };

    // Wheel to horizontal scroll logic
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
        onScroll();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", onScroll, { passive: true });
    
    // Sincronización inicial
    updateCurrentInfo();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", onScroll);
    };
  }, [events, viewMode]);

  const handleSelectEra = (eventId: string) => {
    setViewMode("timeline");
    
    // Encontrar índice y actualizar ref inmediatamente
    const index = events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      activeIndexRef.current = index;
      const initialEvent = events[index];
      setCurrentYear(initialEvent.year);
      setActiveEra(initialEvent.era);
    }
    
    const checkAndScroll = () => {
      const element = document.getElementById(`event-${eventId}`);
      if (element && containerRef.current) {
        element.scrollIntoView({
          behavior: "auto",
          inline: "center",
          block: "nearest"
        });
        return true;
      }
      return false;
    };

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (checkAndScroll() || attempts > 20) {
        clearInterval(interval);
      }
    }, 30);
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Navegación Instantánea basada en índice (O(1))
      const currentIndex = activeIndexRef.current;
      let nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

      // Limites
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= events.length) nextIndex = events.length - 1;

      // 1. Actualizar estado VISUAL inmediatamente (sin esperar scroll)
      const targetEvent = events[nextIndex];
      if (targetEvent) {
        setCurrentYear(targetEvent.year);
        setActiveEra(targetEvent.era);
        activeIndexRef.current = nextIndex; // Actualizamos ref para la siguiente acción
      }

      // 2. Iniciar Scroll Suave
      const targetEl = document.getElementById(`event-${targetEvent?.id}`);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-canvas h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-black border-t-intent-action"
        />
      </div>
    );
  }

  return (
    <div className={cn(
      "relative flex-1 flex flex-col transition-colors duration-1000 overflow-hidden min-h-screen",
      isCalmMode ? "bg-stone-100" : "bg-canvas"
    )}>
      {/* Navigation Bar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center transition-all duration-700",
        isCalmMode ? "pointer-events-none" : "bg-canvas/80 backdrop-blur-sm border-b-structure border-black"
      )}>
        <div className={cn("flex gap-2 md:gap-4 transition-opacity duration-700", isCalmMode && "opacity-0")}>
          <Link href="/" className="btn-secondary flex items-center gap-2 bg-white text-xs md:text-base">
            <Home className="w-4 h-4 md:w-5 h-5" />
            <span className="hidden sm:inline">INICIO</span>
          </Link>
          {viewMode === "timeline" && (
            <button 
              onClick={() => setViewMode("eras")}
              className="btn-secondary flex items-center gap-2 bg-white text-xs md:text-base"
            >
              <LayoutGrid className="w-4 h-4 md:w-5 h-5" />
              <span className="hidden sm:inline">CAMBIAR ERA</span>
            </button>
          )}
        </div>

        {viewMode === "timeline" && (
          <div className="flex gap-2 md:gap-4 items-center">
            <button 
              onClick={() => scroll("left")}
              className={cn("btn-secondary bg-white p-2 transition-opacity duration-700", isCalmMode && "opacity-0")}
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className={cn("btn-secondary bg-white p-2 transition-opacity duration-700", isCalmMode && "opacity-0")}
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-5 h-5 md:w-6 h-6" />
            </button>
            
            {/* Floating Calm Mode Toggle Integrado */}
            <button
              onClick={() => setIsCalmMode(!isCalmMode)}
              className={cn(
                "p-2 rounded-full border-2 border-black shadow-hard transition-all duration-500 group relative pointer-events-auto",
                isCalmMode 
                  ? "bg-stone-800 text-stone-100 rotate-180 scale-110" 
                  : "bg-white text-black hover:bg-intent-action hover:text-white"
              )}
              title={isCalmMode ? "Salir del Modo Calma" : "Activar Modo Calma"}
            >
              {isCalmMode ? <EyeOff className="w-5 h-5 md:w-6 h-6" /> : <Wind className="w-5 h-5 md:w-6 h-6" />}
            </button>
          </div>
        )}
      </nav>

      {/* Eliminamos el botón fijo de antes ya que ahora está en la nav */}

      <AnimatePresence mode="wait">
        {viewMode === "eras" ? (
          <motion.div
            key="eras-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col pt-24 md:pt-32"
          >
            <EraSelector eras={eras} onSelectEra={handleSelectEra} />
          </motion.div>
        ) : (
          <motion.div
            key="timeline-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex-1 flex flex-col pt-24 md:pt-32"
          >
            {/* Timeline Scrollable Area */}
            <div 
              ref={containerRef}
              className={cn(
                "flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center gap-[5vw] px-[10vw] no-scrollbar pb-24 transition-all duration-1000",
                isCalmMode ? "gap-[15vw] brightness-95 grayscale-[0.3]" : ""
              )}
            >
              {events.map((event, index) => (
                <div 
                  key={event.id} 
                  id={`event-${event.id}`}
                  className="snap-center relative z-10"
                >
                  <TimelineCard event={event} index={index} />
                </div>
              ))}
            </div>

            {/* TimeScale Component for Progression Sense */}
            <div className={cn(
              "transition-all duration-700",
              isCalmMode ? "opacity-30 scale-95 translate-y-4" : "opacity-100"
            )}>
              <TimeScale 
                currentYear={currentYear} 
                progress={scrollPercent} 
                era={activeEra}
              />
            </div>

            {/* Background Text Decor */}
            <div className={cn(
              "fixed top-1/2 left-0 right-0 -z-10 select-none pointer-events-none -translate-y-1/2 overflow-hidden transition-opacity duration-1000",
              isCalmMode ? "opacity-0" : "opacity-[0.01] md:opacity-[0.02]"
            )}>
              <h2 className="text-[25vw] md:text-[30vw] leading-none font-black text-black whitespace-nowrap text-center">
                {activeEra.split(' ')[2] || 'HISTORIA'}
              </h2>
            </div>

            {/* Ambient Background Elements for Calm Mode */}
            <AnimatePresence>
              {isCalmMode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-200 via-stone-100 to-stone-50"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
