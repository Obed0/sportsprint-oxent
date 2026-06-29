import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ScrollReveal } from '../ScrollReveal';
import { PremiumButton, TextReveal, ParallaxImage } from '../ui/PremiumAnimations';
import heroImg from '../../../imports/Gemini_Generated_Image_h21rm5h21rm5h21r.webp';

function NeonGrid() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-20 overflow-hidden">
      {/* CSS grid pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 102, 99, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 102, 99, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Pulsing neon dots at key grid intersections */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#FF6663] rounded-full blur-[2px] animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-[#FF6663] rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#FF6663] rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute top-3/4 left-4/5 w-1.5 h-1.5 bg-[#FF6663] rounded-full blur-[1px] animate-ping" style={{ animationDuration: '6s' }} />
    </div>
  );
}

export function HomeHero() {
  const metrics = [
    { value: '500+', label: 'Eventos Realizados', sub: 'Maratones y carreras nacionales' },
    { value: '100%', label: 'Producción Interna', sub: 'Control de calidad absoluto' },
    { value: 'No. 1', label: 'En Pedidos Masivos', sub: 'Con la mayor capacidad en México' },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-36 pb-8 overflow-hidden bg-black text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={heroImg}
          alt="Corredores de maratón y producción deportiva"
          className="opacity-40 filter brightness-90 contrast-110"
          yOffset={60}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 z-10 pointer-events-none" />
      </div>
      <NeonGrid />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 my-auto flex flex-col justify-center">
        <ScrollReveal direction="up" duration={0.8}>

          {/* Heading */}
          <h1 className="font-heading font-black text-5xl sm:text-7xl xl:text-8xl tracking-tighter leading-[0.9] uppercase mb-6 text-white select-none max-w-6xl">
            <TextReveal text="Artículos Para Tus" />
            <br />
            <TextReveal text="Eventos Deportivos" />
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base sm:text-xl max-w-2xl leading-relaxed mb-8 font-medium">
            Producimos playeras, morrales, medallas, y más productos de alta calidad para organizadores de carreras, marcas deportivas y eventos running.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <PremiumButton
              to="/cotizar"
              text="Cotizar Proyecto"
              icon={<ArrowRight size={14} />}
              variant="white"
              className="w-full sm:w-auto text-center shrink-0"
            />
            <PremiumButton
              to="/catalogo"
              text="Ver Portafolio"
              variant="secondary"
              className="w-full sm:w-auto text-center shrink-0"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Metrics & Scroll Indicator Overlay at the bottom */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 border-t border-white/10 pt-8 mt-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 items-end">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-full flex flex-col text-left cursor-default select-none border-l border-white/10 pl-4 group pb-4 border-b border-white/10 md:border-b-0 md:pb-0"
              >
                <span className="font-heading font-black text-4xl sm:text-5xl tracking-tight leading-none mb-1 text-white select-none group-hover:text-[#FF6663] transition-colors duration-300">
                  {metric.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">
                  {metric.label}
                </span>
                <span className="text-[10px] text-white/40 font-medium tracking-wide">
                  {metric.sub}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Scroll Indicator Icon */}
        <div className="flex justify-center mt-6">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1"
          >
            <div className="w-1.5 h-1.5 bg-sp-accent rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
