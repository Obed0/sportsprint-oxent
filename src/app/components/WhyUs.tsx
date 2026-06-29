import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M24 24l18-10M24 24v20M24 24L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4"/>
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Calidad Premium',
    stat: '1200 DPI',
    statLabel: 'Resolución',
    description: 'Sublimación de alta definición con estándar europeo. Control de calidad en cada pieza producida.',
    accent: '#FF4D00',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 12v12l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    title: 'Entrega Rápida',
    stat: '15 días',
    statLabel: 'Producción',
    description: 'Tiempos de entrega competitivos gracias a producción 100% interna. Tu evento nunca espera.',
    accent: '#00D4FF',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 12h32v28H8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 12V8h16v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '100% Personalizado',
    stat: 'Ilimitado',
    statLabel: 'Diseños',
    description: 'Diseño completamente a medida. Tu marca, tus colores, tu visión — sin restricciones ni plantillas.',
    accent: '#FF4D00',
  },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden" ref={sectionRef}>
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#FF4D00] mb-4 block uppercase">
            La Ventaja Sports Print
          </span>
          <h2 className="text-white mb-4">
            POR QUÉ
            <br />
            <span className="text-white/30">SOMOS DIFERENTES</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Producción 100% interna, tecnología de punta y un equipo dedicado a hacer de tu evento algo extraordinario.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#0F0F0F] border border-white/[0.04] p-8 sm:p-10 hover:border-white/[0.08] transition-all duration-500"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${benefit.accent}08, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-white/30 group-hover:text-white/60 transition-colors duration-500 mb-8">
                  {benefit.icon}
                </div>

                {/* Stat */}
                <div className="mb-6">
                  <div className="font-accent text-3xl sm:text-4xl text-white mb-1">{benefit.stat}</div>
                  <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{benefit.statLabel}</div>
                </div>

                {/* Accent line */}
                <div
                  className="w-8 h-[2px] mb-6 group-hover:w-12 transition-all duration-500"
                  style={{ background: benefit.accent }}
                />

                <h3 className="text-white text-xl sm:text-2xl mb-3">{benefit.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
