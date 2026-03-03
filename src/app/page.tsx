"use client";

import { ArrowRight, BookOpen, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-24 bg-canvas gap-12 max-w-7xl mx-auto w-full">
      
      {/* 👁️ PHASE 1: ATTENTION (Hero) */}
      <section 
        data-aida="attention" 
        className="flex flex-col gap-6"
      >
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-text-main"
        >
          TIMELINE <br />
          <span className="text-intent-attention">BÍBLICO</span>
        </motion.h1>
        <p className="text-xl md:text-2xl font-medium max-w-[45ch]">
          Un viaje interactivo a través de los siglos. Desde la creación hasta el cumplimiento. 
          Diseñado con <span className="underline decoration-intent-action decoration-4">ingeniería de atención</span>.
        </p>
      </section>

      {/* 🧠 PHASE 2: INTEREST (Features Bento) */}
      <section 
        data-aida="interest"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white border-structure shadow-hard p-8 flex flex-col gap-4">
          <Clock className="w-12 h-12 text-intent-attention" />
          <h3 className="text-2xl">Cronología Precisa</h3>
          <p className="text-sm">Explora eventos en orden histórico real, con referencias teológicas y arqueológicas.</p>
        </div>
        <div className="bg-white border-structure shadow-hard p-8 flex flex-col gap-4">
          <BookOpen className="w-12 h-12 text-intent-attention" />
          <h3 className="text-2xl">Versículos Clave</h3>
          <p className="text-sm">Acceso directo a las Escrituras que fundamentan cada momento histórico.</p>
        </div>
        <div className="bg-white border-structure shadow-hard p-8 flex flex-col gap-4">
          <MapPin className="w-12 h-12 text-intent-attention" />
          <h3 className="text-2xl">Contexto Geográfico</h3>
          <p className="text-sm">Mapas e ilustraciones que sitúan cada evento en el mundo antiguo.</p>
        </div>
      </section>

      {/* ⚡ PHASE 4: ACTION (Primary CTA) */}
      <section 
        data-aida="action"
        className="flex flex-col items-center justify-center py-12 gap-12"
      >
        <div className="flex flex-col items-center gap-4">
          <Link 
            href="/timeline" 
            data-cta="primary"
            className="text-3xl md:text-4xl px-12 py-8 group"
          >
            EXPLORAR HISTORIA
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-sm font-bold uppercase tracking-widest opacity-60">
            Experiencia gratuita y abierta
          </p>
        </div>
      </section>

      {/* ❤️ PHASE 3: DESIRE (Calm Mode / Confidence) */}
      <section 
        data-aida="desire"
        className="border-structure bg-intent-attention text-white p-8 md:p-12 flex flex-col items-center text-center gap-4"
      >
        <h2 className="text-4xl">MODO CALMA DISPONIBLE!</h2>
        <p className="max-w-[50ch] opacity-90">¿Demasiado estímulo? Activa el modo calma para una lectura más profunda y reflexiva.</p>
      </section>

    </div>
  );
}
