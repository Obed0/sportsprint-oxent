import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Cotización',
    description: 'Comparte tu visión. Te enviamos una propuesta detallada con precios, tiempos y especificaciones a la brevedad.',
    details: ['Asesoría personalizada', 'Propuesta rápida', 'Sin compromiso'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16h16M12 22h10M12 28h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Diseño',
    description: 'Nuestro equipo crea mockups profesionales basados en tu identidad de marca. Revisiones ilimitadas hasta tu aprobación.',
    details: ['Mockups digitales', 'Revisiones ilimitadas', 'Aprobación digital'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Producción',
    description: 'Fabricación 100% interna en nuestra planta de 5,000m² con control de calidad en cada pieza y tecnología de punta.',
    details: ['Producción interna', 'Control de calidad', '5,000m² de planta'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M4 36V12l12-8v10l12-8v30H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="10" y="22" width="4" height="6" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <rect x="20" y="22" width="4" height="6" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Entrega puntual en la ubicación de tu evento. Logística nacional con rastreo en tiempo real de tu pedido.',
    details: ['Logística nacional', 'Rastreo en tiempo real', 'Entrega garantizada'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M4 28V14h20v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M24 18h8l4 6v4h-12v-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="30" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="proceso" className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden" ref={sectionRef}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-20 gap-6"
        >
          <div>
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#FF4D00] mb-4 block uppercase">
              Cómo Trabajamos
            </span>
            <h2 className="text-white leading-[0.95]">
              PROCESO SIMPLE
              <br />
              <span className="text-white/30">RESULTADOS PREMIUM</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm sm:text-base max-w-md leading-relaxed">
            De tu idea a la entrega final en 4 pasos. Sin complicaciones,
            sin sorpresas, con calidad garantizada.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-white/[0.04]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-[#FF4D00]/40 via-[#FF4D00]/20 to-[#00D4FF]/20 origin-left"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-[60px] h-[60px] bg-[#111] border border-white/[0.08] flex items-center justify-center mb-8 group-hover:border-[#FF4D00]/30 transition-colors duration-500">
                  <span className="font-accent text-sm text-white/40 group-hover:text-[#FF4D00] transition-colors duration-500">
                    {step.number}
                  </span>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="text-white/30 mb-4 group-hover:text-white/50 transition-colors duration-500">
                  {step.icon}
                </div>

                <h3 className="text-white text-xl sm:text-2xl mb-3">{step.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Details */}
                <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/30 text-xs">
                      <div className="w-1 h-1 bg-[#FF4D00]/60 rounded-full flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Production highlight bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 sm:mt-20 bg-[#111] border border-white/[0.04] p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF4D00] via-[#FF4D00]/50 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-white text-2xl sm:text-3xl mb-3">
                Producción 100% Interna
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Controlamos cada fase en nuestras propias instalaciones. Calidad consistente,
                tiempos predecibles y capacidad para cualquier escala.
              </p>
            </div>
            <div className="text-center p-4 bg-white/[0.02] border border-white/[0.04]">
              <div className="font-accent text-2xl sm:text-3xl text-white mb-1">5,000m²</div>
              <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Planta</div>
            </div>
            <div className="text-center p-4 bg-white/[0.02] border border-white/[0.04]">
              <div className="font-accent text-2xl sm:text-3xl text-white mb-1">50+</div>
              <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Profesionales</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
