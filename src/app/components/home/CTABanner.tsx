import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal } from '../ScrollReveal';

export function CTABanner() {
  return (
    <section id="contacto" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative Neon Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF6663] to-transparent" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#FF6663] opacity-5 filter blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center flex flex-col items-center">
        <ScrollReveal duration={0.7} direction="up">

          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.95] max-w-4xl mx-auto mb-6">
            ¿LISTO PARA ELEVAR LA EXPERIENCIA DE TU CARRERA?
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Agenda una consulta técnica con nuestros especialistas. Resolveremos dudas sobre tejidos, calibración de color sublimado, modelado de tallas y planificaremos la logística completa de entrega de tus kits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link
              to="/cotizar"
              className="group flex items-center justify-center gap-2 bg-[#FF6663] text-black hover:bg-white hover:text-black text-sm font-bold tracking-widest uppercase px-10 py-5 border border-[#FF6663] hover:border-white transition-all duration-300 shadow-[4px_4px_0px_#000] hover:shadow-[4px_4px_0px_#FF6663]"
            >
              Agendar Consulta de Manufactura
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/tecnologia-textil"
              className="flex items-center justify-center bg-transparent text-white hover:bg-white hover:text-black text-sm font-bold tracking-widest uppercase px-10 py-5 border border-white transition-all duration-300"
            >
              Ver Tecnologías Textiles
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-neutral-500 text-xs font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FF6663]" /> Propuesta a la Medida
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FF6663]" /> Muestras Textiles Gratis
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
