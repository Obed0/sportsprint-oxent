import { motion } from 'motion/react';

const clients = [
  'ASDEPORTE',
  'MARATHON CDMX',
  'TRAIL RUNNING MX',
  'EVENTOS OUTDOOR',
  'RUNNING CLUB',
  'TECH CORP',
  'OLYMPIC SPORTS',
  'IRONMAN MX',
];

export function TrustedBy() {
  // Duplicate for seamless infinite loop
  const doubled = [...clients, ...clients];

  return (
    <section className="py-12 sm:py-16 bg-[#0A0A0A] border-y border-white/[0.04] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-white/30 uppercase">
            Confían en Nosotros
          </p>
        </div>

        {/* Infinite Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((client, index) => (
              <span
                key={index}
                className="mx-8 sm:mx-14 text-lg sm:text-2xl font-heading tracking-[0.15em] text-white/[0.12] hover:text-white/40 transition-colors duration-500 cursor-default select-none"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
