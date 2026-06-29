import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref} className="font-accent">{count}{suffix}</span>;
}

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [0, 1], [-15, 15]);
  const bgY = useTransform(mouseY, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
      id="hero"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />
        {/* Gradient orbs */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-[#FF4D00]/10 blur-[120px]"
        />
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-[#00D4FF]/8 blur-[100px]"
        />
      </div>

      {/* Floating geometric shapes */}
      <FloatingShape
        delay={0.5}
        className="absolute top-[15%] right-[10%] w-32 h-32 border border-white/[0.06] rotate-45 animate-float-slow"
      />
      <FloatingShape
        delay={0.8}
        className="absolute bottom-[25%] right-[25%] w-20 h-20 border border-[#FF4D00]/20 rotate-12 animate-float"
      />
      <FloatingShape
        delay={1.0}
        className="absolute top-[40%] left-[5%] w-16 h-16 bg-[#FF4D00]/5 rotate-45 animate-float-slow"
      />
      <FloatingShape
        delay={1.2}
        className="absolute top-[60%] right-[8%] w-3 h-3 bg-[#FF4D00] rounded-full animate-pulse-glow"
      />
      <FloatingShape
        delay={1.4}
        className="absolute top-[20%] left-[30%] w-2 h-2 bg-[#00D4FF] rounded-full animate-float"
      />

      {/* Diagonal accent line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent rotate-[15deg] origin-top" />
        <div className="absolute top-0 right-[60%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF4D00]/[0.06] to-transparent rotate-[-10deg] origin-top" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-4xl">
          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] backdrop-blur-sm text-white/60 text-xs sm:text-sm tracking-[0.2em] border border-white/[0.06] uppercase">
              <span className="w-2 h-2 bg-[#FF4D00] rounded-full animate-breathe" />
              Producción 100% Interna · México
            </span>
          </motion.div>

          {/* Main heading with staggered reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white mb-4 tracking-wide"
          >
            PREPÁRATE
            <br />
            <span className="text-gradient-warm">PARA LA META</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-white/50 mb-10 max-w-xl leading-relaxed"
          >
            Fabricamos kits deportivos personalizados de calidad premium.
            Playeras, medallas, morrales — todo para tu carrera.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contacto"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#FF4D00] text-white px-8 py-4 font-medium tracking-wide uppercase text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Cotizar Proyecto
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
              <span className="absolute inset-0 bg-[#FF6B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.15] text-white/80 px-8 py-4 text-sm tracking-wide uppercase hover:border-white/30 hover:text-white transition-all duration-300"
            >
              Ver Productos
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="grid grid-cols-3 gap-8 sm:gap-12 mt-16 sm:mt-24 pt-8 border-t border-white/[0.06]"
          >
            <div>
              <div className="text-3xl sm:text-4xl text-white mb-1">
                <AnimatedCounter target={500} suffix="+" />
              </div>
              <div className="text-white/40 text-xs sm:text-sm tracking-wide">Eventos Realizados</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl text-white mb-1">
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <div className="text-white/40 text-xs sm:text-sm tracking-wide">Producción Interna</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl text-white mb-1">
                <AnimatedCounter target={15} />
                <span className="font-accent text-lg sm:text-xl text-white/60 ml-1">días</span>
              </div>
              <div className="text-white/40 text-xs sm:text-sm tracking-wide">Tiempo de Entrega</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-[#FF4D00] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
