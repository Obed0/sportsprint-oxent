import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgTrotime from '../imports/carrera_whirlpool.jpg';
import imgAllMkting from '../imports/Gemini_Generated_Image_j2spr7j2spr7j2sp.webp';
import imgVuela from '../imports/Gemini_Generated_Image_xdio20xdio20xdio.webp';

const cases = [
  {
    id: 1,
    event: 'Carreras Whirlpool & Ragasa',
    client: 'TROTIME MONTERREY',
    participants: '+7,000',
    image: imgTrotime,
    deliverables: ['4,000 kits de corredores Whirlpool', '3,000 playeras Ragasa', 'Logística integral express'],
    quote: 'Aliado estratégico en la producción de kits. Tienen una capacidad de respuesta excelente ante solicitudes urgentes ("bomberazos") sin comprometer la calidad.',
  },
  {
    id: 2,
    event: 'Woman’s 5k & Ajolotito 5k',
    client: 'ALLMKTING & EN DÓNDE CORRER',
    participants: '3K - 5K',
    image: imgAllMkting,
    deliverables: ['Playeras sublimadas micro-mesh', 'Morrales y buffs de corredor', 'Medallas conmemorativas'],
    quote: 'Único proveedor de kits por 3 años consecutivos. Destacan por su gran calidad, telas de alto rendimiento e innovación tecnológica.',
  },
  {
    id: 3,
    event: 'Vuela Run 2025',
    client: 'FUNDACIÓN VUELA',
    participants: 'Kids & Adults',
    image: imgVuela,
    deliverables: ['Kits oficiales completos', 'Coordinación logística directa', 'Soporte a causas sociales'],
    quote: 'Gran empatía con nuestra causa, adaptándose a nuestro presupuesto y entregando materiales de alta calidad en tiempo y forma.',
  },
];

// Testimonial marquee items
const testimonials = [
  '"Único proveedor por 3 años. Telas de primer nivel" — AllMkting',
  '"Aliado clave en kits masivos y solicitudes urgentes" — Trotime',
  '"Fidelidad de color absoluta y precisión en costura" — Dulce Menta',
  '"Kits de alta calidad y entregas siempre a tiempo" — Adient',
  '"Gran empatía con causas sociales y presupuestos" — Fundación Vuela',
];

export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="casos" className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden" ref={sectionRef}>
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#FF4D00] mb-4 block uppercase">
            Casos de Éxito
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="text-white leading-[0.95]">
              EVENTOS QUE
              <br />
              <span className="text-white/30">CONFÍAN EN NOSOTROS</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base max-w-md leading-relaxed">
              Más de 500 eventos realizados con éxito. Cada proyecto es una oportunidad
              para superar expectativas.
            </p>
          </div>
        </motion.div>

        {/* Featured Cases */}
        <div className="space-y-12 sm:space-y-16">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center group"
            >
              {/* Image - 3 cols */}
              <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[16/9] overflow-hidden bg-[#111] relative">
                  <ImageWithFallback
                    src={caseStudy.image}
                    alt={caseStudy.event}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 via-transparent to-transparent" />

                  {/* Participant count overlay */}
                  <div className="absolute bottom-6 left-6 glass-strong px-4 py-3">
                    <div className="font-accent text-xl text-white">{caseStudy.participants}</div>
                    <div className="text-[10px] tracking-[0.15em] text-white/40 uppercase">participantes</div>
                  </div>
                </div>
              </div>

              {/* Content - 2 cols */}
              <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">{caseStudy.client}</div>
                <h3 className="text-white text-2xl sm:text-3xl mb-5">{caseStudy.event}</h3>

                {/* Quote */}
                <div className="border-l-2 border-[#FF4D00]/40 pl-5 mb-6">
                  <p className="text-white/50 text-sm italic leading-relaxed">
                    "{caseStudy.quote}"
                  </p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2">
                  <div className="text-[10px] tracking-[0.2em] text-white/25 uppercase mb-3">Entregables</div>
                  {caseStudy.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/40 text-sm">
                      <div className="w-1 h-1 bg-[#FF4D00]/50 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 sm:mt-24 relative overflow-hidden py-6 border-y border-white/[0.04]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10" />

          <div className="flex animate-marquee-fast whitespace-nowrap">
            {doubledTestimonials.map((t, i) => (
              <span key={i} className="mx-12 text-sm text-white/[0.15] italic">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
