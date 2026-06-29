import { ScrollReveal } from '../ScrollReveal';

const metrics = [
  { value: '500+', label: 'Eventos Realizados', sub: 'Maratones y carreras nacionales' },
  { value: '100%', label: 'Producción Interna', sub: 'Control de calidad absoluto' },
  { value: 'No. 1', label: 'En Pedidos Masivos', sub: 'Con la mayor capacidad en México' },
];

export function B2BMetrics() {
  return (
    <section className="py-16 bg-white text-black border-y border-black">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-black">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up" className="pt-8 md:pt-0 md:px-8 first:pl-0 last:pr-0">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading font-black text-5xl sm:text-6xl tracking-tight leading-none mb-2 text-black">
                  {metric.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-black mb-1">
                  {metric.label}
                </span>
                <span className="text-[11px] text-[#4B5563] font-medium tracking-wide">
                  {metric.sub}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
