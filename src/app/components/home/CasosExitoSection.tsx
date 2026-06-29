import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Link } from 'react-router';
import { ArrowRight, X } from 'lucide-react';
import { PremiumButton, ParallaxImage, StaggerContainer, StaggerItem } from '../ui/PremiumAnimations';
import { motion, AnimatePresence } from 'motion/react';

import imgTrotime from '../../../imports/race_women.webp';
import imgAllMkting from '../../../imports/carreras/IMGL1361.webp';
import imgVuela from '../../../imports/carreras/IMGL1534.webp';

const cases = [
  {
    id: 'ios-offices',
    tag: 'IOS OFFICES',
    title: 'Carrera IOS',
    participants: 'Carrera IOS (8,000 participantes)',
    quote: 'SportsPrint demostró un nivel sobresaliente de profesionalismo y compromiso en la producción masiva de nuestros kits. Su entrega en tiempo y forma fue clave para el correcto desarrollo del evento, reflejándose directamente en la satisfacción y experiencia de los 8,000 corredores.',
    briefQuote: 'Demostró un nivel sobresaliente de profesionalismo y compromiso',
    deliverables: [],
    image: imgVuela,
    align: 'left',
    objectPosition: 'center 48%',
  },
  {
    id: 'allmkting',
    tag: 'ALLMKTING & EN DÓNDE CORRER',
    title: 'Operación Multievento Continua',
    participants: 'Operación multievento continua (3,000 a 5,000 kits por carrera, incluyendo Woman\'s 5k y Pandas Race)',
    quote: 'A lo largo de tres años como nuestro proveedor exclusivo, han destacado por su innovación tecnológica, uso de telas de la mayor calidad y precisión logística. Un aliado responsable, comprometido y fiel cumplidor de sus tareas que siempre está a la altura de eventos masivos.',
    briefQuote: 'Un aliado responsable, comprometido y fiel cumplidor...',
    deliverables: [],
    image: imgAllMkting,
    align: 'right',
    objectPosition: 'center 45%',
  },
  {
    id: 'trotime',
    tag: 'TROTIME',
    title: 'Alianza Estratégica Multimarca',
    participants: 'Alianza estratégica multimarca (Eventos de 1,500 a 4,000 participantes como Whirlpool y Ragasa)',
    quote: 'Un aliado clave en la producción textil personalizada que destaca por su puntualidad y alta capacidad de respuesta. Confiamos plenamente en ellos para resolver solicitudes urgentes de forma eficiente y bajo entregas oportunas, sin comprometer jamás el acabado final.',
    briefQuote: 'Confiamos plenamente en ellos para resolver solicitudes urgentes...',
    deliverables: [],
    image: imgTrotime,
    align: 'left',
    objectPosition: 'center 52%',
  },
];

export function CasosExitoSection({ minimal = false }: { minimal?: boolean }) {
  const [activeCase, setActiveCase] = useState<typeof cases[0] | null>(null);

  if (minimal) {
    return (
      <section className="py-24 bg-white text-black border-b border-neutral-200 select-none">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left side: Header (sticky on desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <ScrollReveal direction="up">
                <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] uppercase mb-8">
                  EVENTOS QUE CONFÍAN EN NOSOTROS
                </h2>

                <Link
                  to="/casos-de-exito"
                  className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black border-b-2 border-black pb-1 hover:border-sp-accent transition-colors w-fit"
                >
                  <span>VER TODOS LOS CASOS</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right side: Clean list of races with separators */}
            <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10">
              {cases.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.15} direction="up">
                  <div
                    id={item.id}
                    className="border-b border-black/10 pb-8 lg:pb-10 last:border-b-0 last:pb-8 lg:last:pb-10 scroll-mt-32"
                  >
                    {/* Index & Tag */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-heading font-black text-xs text-neutral-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] text-[#4B5563] font-bold uppercase">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mb-1">
                      {item.title}
                    </h3>

                    {/* Participants */}
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-6">
                      {item.participants}
                    </span>

                    {/* Testimonial Quote */}
                    <div className="border-l-2 border-black pl-4 py-0.5 mb-6">
                      <p className="text-base font-semibold italic text-black leading-relaxed">
                      "{item.briefQuote}"
                      </p>
                      <button
                        onClick={() => setActiveCase(item)}
                        className="inline-flex items-center gap-1 text-xs font-black tracking-widest uppercase text-black border-b border-black/30 hover:border-black pb-0.5 transition-colors cursor-pointer mt-3"
                      >
                        VER MÁS
                      </button>
                    </div>

                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>

        {/* Modal/Overlay Portal */}
        <AnimatePresence>
          {activeCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCase(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              />
              
              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white text-black p-8 sm:p-10 max-w-xl w-full border border-black/10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveCase(null)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors cursor-pointer p-1"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#4B5563] font-bold uppercase block mb-1">
                    {activeCase.tag}
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase leading-tight mb-1">
                    {activeCase.title}
                  </h3>
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                    {activeCase.participants}
                  </span>
                </div>

                {/* Full Testimonial */}
                <div className="border-l-4 border-black pl-5 py-1 my-2">
                  <p className="text-base sm:text-lg font-semibold italic text-black leading-relaxed">
                    "{activeCase.quote}"
                  </p>
                </div>

                {/* Modal Footer / Close button */}
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setActiveCase(null)}
                    className="text-xs font-black tracking-widest uppercase text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 select-none">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-neutral-200 pb-10">
          <div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
              EVENTOS QUE CONFÍAN EN NOSOTROS
            </h2>
          </div>
          <Link
            to="/casos-de-exito"
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black hover:underline shrink-0"
          >
            VER TODOS LOS CASOS
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mirror Grid Blocks */}
        <div className="space-y-24">
          {cases.map((item, index) => {
            const isLeft = item.align === 'left';
            return (
              <div
                key={index}
                id={item.id}
                className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-24"
              >
                {/* Media Area */}
                <div
                  className={`lg:col-span-6 ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <ScrollReveal direction={isLeft ? 'right' : 'left'}>
                    <div className="aspect-[16/10] bg-neutral-100 border border-black overflow-hidden rounded-none relative group w-full h-full">
                      <ParallaxImage
                        src={item.image}
                        alt={item.title}
                        objectPosition={item.objectPosition}
                        yOffset={0}
                        scale={1.0}
                      />
                    </div>
                  </ScrollReveal>
                </div>

                {/* Editorial Text Area */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center lg:min-h-[360px] ${
                    isLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ScrollReveal direction={isLeft ? 'left' : 'right'}>
                    <motion.div layout="position" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                      {/* Tag */}
                      <span className="text-[10px] tracking-[0.2em] text-[#4B5563] font-bold uppercase block mb-2">
                        {item.tag}
                      </span>

                      {/* Title */}
                      <h3 className="font-heading font-black text-3xl sm:text-4xl uppercase mb-1">
                        {item.title}
                      </h3>

                      {/* Participants count */}
                      <span className="text-xs font-bold text-black uppercase tracking-wider block mb-6">
                        {item.participants}
                      </span>

                      {/* Quote */}
                      <div className="border-l-4 border-black pl-4 py-1 mb-8">
                        <p className="text-base font-semibold italic text-black leading-relaxed transition-all duration-300 min-h-[3.5rem] lg:min-h-[4.5rem]">
                          "{item.briefQuote}"
                        </p>
                        <button
                          onClick={() => setActiveCase(item)}
                          className="inline-flex items-center gap-1 text-xs font-black tracking-widest uppercase text-black border-b border-black/30 hover:border-black pb-0.5 transition-colors cursor-pointer mt-4"
                        >
                          VER MÁS
                        </button>
                      </div>

                      <PremiumButton
                        to="/cotizar"
                        text="COTIZAR PROYECTO SIMILAR"
                        icon={<ArrowRight size={12} />}
                        variant="outline-black"
                        className="w-fit"
                      />
                    </motion.div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal/Overlay Portal */}
      <AnimatePresence>
        {activeCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCase(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white text-black p-8 sm:p-10 max-w-xl w-full border border-black/10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCase(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors cursor-pointer p-1"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#4B5563] font-bold uppercase block mb-1">
                  {activeCase.tag}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase leading-tight mb-1">
                  {activeCase.title}
                </h3>
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  {activeCase.participants}
                </span>
              </div>

              {/* Full Testimonial */}
              <div className="border-l-4 border-black pl-5 py-1 my-2">
                <p className="text-base sm:text-lg font-semibold italic text-black leading-relaxed">
                  "{activeCase.quote}"
                </p>
              </div>

              {/* Modal Footer / Close button */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setActiveCase(null)}
                  className="text-xs font-black tracking-widest uppercase text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
