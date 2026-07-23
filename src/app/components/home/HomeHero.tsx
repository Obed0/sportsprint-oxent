import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '../ScrollReveal';
import { PremiumButton, ParallaxImage } from '../ui/PremiumAnimations';

import heroImg from '../../../imports/Gemini_Generated_Image_h21rm5h21rm5h21r.webp';
import carreraWhirlpool from '../../../imports/carrera_whirlpool.jpg';
import carreraIosNew from '../../../imports/carreras/carrera_ios_new.jpg';

function NeonGrid() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-20 overflow-hidden select-none">
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
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#E43537] rounded-full blur-[2px] animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-[#E43537] rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#E43537] rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute top-3/4 left-4/5 w-1.5 h-1.5 bg-[#E43537] rounded-full blur-[1px] animate-ping" style={{ animationDuration: '6s' }} />
    </div>
  );
}

const BANNERS = [
  {
    id: 1,
    badge: 'EVENTOS RUNNING Y DEPORTIVOS',
    titleLine1: 'ARTÍCULOS PARA TUS',
    titleLine2: 'EVENTOS DEPORTIVOS',
    subtitle: 'Producimos playeras, morrales, medallas y más productos de alta calidad para organizadores de carreras, marcas deportivas y eventos running.',
    primaryBtn: {
      text: 'COTIZAR PROYECTO',
      to: '/cotizar',
      icon: <ArrowRight size={14} />
    },
    secondaryBtn: {
      text: 'VER PORTAFOLIO',
      to: '/catalogo'
    },
    image: heroImg,
    imagePosition: 'object-center'
  },
  {
    id: 2,
    badge: 'TECNOLOGÍA TEXTIL DE ALTO RENDIMIENTO',
    titleLine1: 'TEJIDOS ECOLÓGICOS Y',
    titleLine2: 'DE SECADO RÁPIDO',
    subtitle: 'Conoce nuestras microfibras PET 100% recicladas, Cool Dry, Poliéster Plus y Micro Panal. Diseñadas para resistir el rendimiento más exigente.',
    primaryBtn: {
      text: 'VER MÁS',
      to: '/tecnologia-textil',
      icon: <ArrowRight size={14} />
    },
    secondaryBtn: {
      text: 'COMPARAR TELAS',
      to: '/tecnologia-textil#comparador'
    },
    image: carreraWhirlpool,
    imagePosition: 'object-[center_40%]'
  },
  {
    id: 3,
    badge: 'PROCESO INTEGRAL 100% INTERNO',
    titleLine1: 'ARMA LOS KITS COMPLETOS',
    titleLine2: 'PARA TU EVENTO',
    subtitle: 'Playeras sublimadas, morrales reforzados y medallas personalizadas ensamblados en nuestra propia planta. Control total de entregas y calidad.',
    primaryBtn: {
      text: 'CONTÁCTANOS',
      to: 'https://wa.me/525543945069?text=Hola%2C%20me%20interesa%20armar%20kits%20deportivos%20para%20mi%20evento',
      icon: <ArrowRight size={14} />
    },
    secondaryBtn: {
      text: 'VER KITS',
      to: '/catalogo#kits'
    },
    image: carreraIosNew,
    imagePosition: 'object-top translate-y-28 sm:translate-y-40 scale-115'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function HomeHero() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = ((page % BANNERS.length) + BANNERS.length) % BANNERS.length;
  const currentBanner = BANNERS[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const goToSlide = (slideIndex: number) => {
    const dir = slideIndex > activeIndex ? 1 : -1;
    setPage([page + (slideIndex - activeIndex), dir]);
  };

  // Automatic timer transition every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [page, paginate]);

  const metrics = [
    { value: '500+', label: 'Eventos Realizados', sub: 'Eventos y carreras nacionales' },
    { value: '100%', label: 'Producción Interna', sub: 'Control de calidad absoluto' },
    { value: 'No. 1', label: 'En Pedidos Masivos', sub: 'Con la mayor capacidad en México' },
  ];

  return (
    <section 
      className="relative h-[100dvh] min-h-[620px] flex flex-col justify-between pt-24 sm:pt-28 pb-4 overflow-hidden bg-black text-white select-none"
    >
      {/* 100% Fullscreen Background Image Slider Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 220, damping: 28 },
              opacity: { duration: 0.4 }
            }}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
            className="absolute inset-0 w-full h-full bg-black"
          >
            {/* Photo container: right-aligned, with mask-image to feather the left edge smoothly into black */}
            <div 
              className="absolute top-0 bottom-0 right-0 w-full sm:w-[72%] lg:w-[65%] h-full overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.75) 45%, black 60%)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.75) 45%, black 60%)',
              }}
            >
              <img
                src={currentBanner.image}
                alt={currentBanner.titleLine1}
                className={`object-cover ${currentBanner.imagePosition} w-full h-full transform-gpu`}
                loading="eager"
              />
            </div>

            {/* Soft top & bottom vignette for navbar and metrics bar */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      <NeonGrid />

      {/* Multibanner Foreground Content & Controls */}
      <div className="relative z-20 w-full my-auto flex-grow flex items-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? -30 : 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -60) paginate(1);
              else if (offset.x > 60) paginate(-1);
            }}
            className="w-full flex flex-col justify-center max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-4"
          >
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[0.94] uppercase mb-4 text-white select-none max-w-5xl"
            >
              {currentBanner.titleLine1} <br />
              <span className="text-white hover:text-sp-accent transition-colors duration-300">
                {currentBanner.titleLine2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/80 text-xs sm:text-base max-w-xl leading-relaxed mb-6 font-medium"
            >
              {currentBanner.subtitle}
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 mb-2"
            >
              <PremiumButton
                to={currentBanner.primaryBtn.to}
                text={currentBanner.primaryBtn.text}
                icon={currentBanner.primaryBtn.icon}
                variant="white"
                className="w-full sm:w-auto text-center shrink-0"
              />
              <PremiumButton
                to={currentBanner.secondaryBtn.to}
                text={currentBanner.secondaryBtn.text}
                variant="secondary"
                className="w-full sm:w-auto text-center shrink-0"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrow Buttons (Left / Right) */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Banner anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Siguiente banner"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Bar & Organic Morphing Indicators */}
      <div className="relative z-30 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between py-3">
        {/* Slide Counter */}
        <div className="text-xs font-bold tracking-widest text-white/50">
          <span className="text-white font-black">0{activeIndex + 1}</span> / 0{BANNERS.length}
        </div>

        {/* Organic Morphing Dots */}
        <div className="flex items-center gap-3">
          {BANNERS.map((banner, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={banner.id}
                onClick={() => goToSlide(index)}
                className="relative py-1 flex items-center justify-center cursor-pointer group"
                aria-label={`Ir al banner ${index + 1}`}
              >
                {/* Dot base placeholder */}
                <div className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-10 bg-white/10' : 'w-2.5 bg-white/30 group-hover:bg-white/60'
                }`} />

                {/* Organic morphing active red pill sliding with spring physics */}
                {isActive && (
                  <motion.div
                    layoutId="activeDotPill"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                    className="absolute inset-y-1 left-0 right-0 rounded-full bg-[#E43537]/30 border border-[#E43537] overflow-hidden"
                  >
                    <motion.div
                      key={page}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 5,
                        ease: "linear",
                      }}
                      style={{
                        originX: 0,
                        willChange: "transform",
                      }}
                      className="w-full h-full bg-[#E43537] rounded-full"
                    />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Indicator label */}
        <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold hidden sm:block">
          SPORTS PRINT MX
        </div>
      </div>

      {/* Metrics Overlay at the bottom */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 border-t border-white/10 pt-6 mt-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 items-end">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-full flex flex-col text-left cursor-default select-none border-l-0 md:border-l border-white/10 pl-0 md:pl-4 group pb-4 border-b border-white/10 md:border-b-0 md:pb-0"
              >
                <span className="font-heading font-black text-4xl sm:text-5xl tracking-tight leading-none mb-1 text-white select-none group-hover:text-[#E43537] transition-colors duration-300">
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
      </div>
    </section>
  );
}
