import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { CasosExitoSection } from '../components/home/CasosExitoSection';
import { Link } from 'react-router';
import { Sparkles, CheckCircle } from 'lucide-react';
import { brandLogosMap } from '../components/ClientLogos';
import { PremiumButton } from '../components/ui/PremiumAnimations';
import { motion } from 'motion/react';

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
  'IPN',
  'Fhinix Sports',
  'Run MKT'
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
      <section className="pt-32 sm:pt-40 lg:pt-44 pb-10 sm:pb-16 bg-white text-black">
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
            className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 items-center max-w-[1250px] mx-auto"
          >
            {aaaClients.map((client) => {
              const LogoComponent = brandLogosMap[client];
              return (
                <motion.div
                  key={client}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -4,
                    transition: { duration: 0.2, ease: "easeOut" } 
                  }}
                  className="w-[145px] sm:w-[190px] lg:w-[260px] h-24 sm:h-32 flex items-center justify-center p-2 group cursor-default transition-all duration-300"
                >
                  {LogoComponent ? (
                    <div className="w-full h-full flex items-center justify-center transition-all duration-300">
                      <LogoComponent className="max-w-[95%] max-h-[70%] sm:max-h-[75%] w-auto h-auto object-contain" />
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
    </PageTransition>
  );
}
export default CasosPage;
