import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#FF4D00] mb-4 block uppercase">
              Quiénes Somos
            </span>
            <h2 className="text-white mb-8 leading-[0.95]">
              FABRICANTES
              <br />
              <span className="text-white/30">MEXICANOS PREMIUM</span>
            </h2>

            <div className="space-y-5 text-white/45 text-sm sm:text-base leading-relaxed">
              <p>
                Somos una empresa mexicana especializada en{' '}
                <strong className="text-white/80">sublimado textil deportivo</strong> y
                fabricación integral de kits para carreras y eventos running.
              </p>
              <p>
                Con <strong className="text-white/80">producción 100% interna</strong>, controlamos cada fase del proceso:
                desde el diseño hasta la entrega final, garantizando calidad europea y tiempos competitivos.
              </p>
              <p>
                Trabajamos directamente con organizadores de carreras, marcas deportivas y empresas,
                ofreciendo <strong className="text-white/80">trato personalizado sin intermediarios</strong>.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/[0.06]">
              {[
                { value: '15+', label: 'Años' },
                { value: '5,000m²', label: 'Planta' },
                { value: '500+', label: 'Eventos' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                  <div className="font-accent text-2xl sm:text-3xl text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#111] relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Producción Sports Print MX"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 glass-strong p-6 max-w-[200px]"
            >
              <div className="text-[10px] tracking-[0.2em] text-[#FF4D00] uppercase mb-2">Calidad Certificada</div>
              <div className="font-accent text-2xl text-white mb-1">1200×1200</div>
              <div className="text-[11px] text-white/40">DPI — Estándar Europeo</div>
            </motion.div>

            {/* Decorative corner accent */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t border-r border-[#FF4D00]/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
