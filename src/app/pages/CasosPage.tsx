import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { CasosExitoSection } from '../components/home/CasosExitoSection';
import { Link } from 'react-router';
import { Quote, Sparkles, CheckCircle } from 'lucide-react';
import { brandLogosMap } from '../components/ClientLogos';
import { PremiumButton } from '../components/ui/PremiumAnimations';
import { motion } from 'motion/react';

const testimonials = [
  {
    author: 'Jorge Armando Martínez Aguilera',
    role: 'Director de AllMkting & En Dónde Correr',
    quote: 'Único proveedor de kits por 3 años consecutivos. Han demostrado gran innovación tecnológica y telas de la mayor calidad para carreras con tirajes de 3,000 a 5,000 playeras por evento.',
  },
  {
    author: 'Dirección de Logística de Trotime',
    role: 'Eventos Masivos (Whirlpool, Ragasa, Magic Color Run)',
    quote: 'Aliado estratégico en la producción de kits. Tienen una capacidad de respuesta excelente ante solicitudes urgentes ("bomberazos") sin comprometer la alta calidad y puntualidad.',
  },
  {
    author: 'Representación de Dulce Menta S.A. de C.V.',
    role: 'Cliente Oficial de Fundación Kardias',
    quote: 'Fidelidad de color absoluta y precisión en los acabados de costura profesional. Gran experiencia en el manejo de artes bajo licencias oficiales (Disney, Marvel, Nickelodeon, Minecraft).',
  },
  {
    author: 'Angelica De La Orta',
    role: 'Coordinadora de Eventos en Adient México',
    quote: 'Excelente disposición para adaptarse a nuestras necesidades y plantas en toda la República. Sus kits de carrera garantizan participantes totalmente satisfechos.',
  },
  {
    author: 'Diego Parada',
    role: 'Cofundador y CEO de Fundación Vuela',
    quote: 'Proveedor de kits para la Vuela Run 2025. Mostraron una gran empatía con nuestra causa, ajustándose a presupuestos y entregando materiales de alta calidad en tiempo y forma.',
  },
];

const aaaClients = [
  'Fundación Kardias',
  'Universidad Panamericana',
  'Trotime',
  'AllMkting',
  'Adient',
  'IOS Offices',
  'IdemSport',
  'SomosRunning',
  'En Dónde Correr',
  'UNAM',
  'IPN'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function CasosPage() {
  return (
    <PageTransition>
      {/* Editorial Header */}
      <section className="pt-44 pb-16 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase mb-6 text-black select-none">
            Casos de éxito
          </h1>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-3xl font-medium">
            Conoce algunos de los eventos deportivos para los que hemos sido proveedores, entregando calidad y puntualidad en cada proyecto.
          </p>
        </div>
      </section>

      {/* Clientes AAA Grid Section */}
      <section id="clientes" className="py-10 sm:py-14 bg-[#F5F5F7] text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-x-10 sm:gap-x-14 lg:gap-x-20 gap-y-6 sm:gap-y-10 items-center max-w-[1200px] mx-auto"
          >
            {aaaClients.map((client) => {
              const LogoComponent = brandLogosMap[client];
              return (
                <motion.div
                  key={client}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" } 
                  }}
                  className="w-[130px] sm:w-[180px] lg:w-[240px] h-20 sm:h-28 flex items-center justify-center p-2 group cursor-default transition-all duration-300"
                >
                  {LogoComponent ? (
                    <div className="w-full flex items-center justify-center transition-all duration-300">
                      <LogoComponent className="w-full h-auto max-h-16 sm:max-h-20" />
                    </div>
                  ) : (
                    <span className="font-heading font-black text-center text-sm sm:text-base tracking-widest text-[#4B5563] hover:text-black transition-colors duration-300 uppercase select-none">
                      {client}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main alternating section */}
      <CasosExitoSection />

      {/* Testimonials B2B Grid */}
      <section className="py-24 bg-white text-black border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.25em] text-[#4B5563] font-bold uppercase block mb-3">
              TESTIMONIOS
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase">
              VOCES DE ORGANIZADORES LÍDERES
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {testimonials.map((test, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction="up">
                <div className="group border border-black p-8 sm:p-10 flex flex-col justify-between h-full rounded-none hover:border-[#E43537] transition-colors duration-300">
                  <div>
                    <Quote className="w-10 h-10 text-neutral-200 group-hover:text-[#E43537] group-hover:fill-[#E43537]/5 transition-all duration-300 mb-6" />
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-8 italic font-medium">
                      "{test.quote}"
                    </p>
                  </div>
                  <div className="border-t border-black/10 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider block text-black">
                      {test.author}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4B5563] block mt-1">
                      {test.role}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
export default CasosPage;
