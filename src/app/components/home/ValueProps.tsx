import { Zap, ShieldCheck, Factory, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal } from '../ScrollReveal';

const props = [
  {
    icon: <Factory className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />,
    stat: '+50K',
    title: 'Capacidad Masiva',
    subtitle: 'Producción industrial escalable',
    desc: 'Líneas de producción listas para entregar grandes cantidades de uniformes a tiempo, con entregas programadas según el cronograma de tu evento.',
  },
  {
    icon: <Layers className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />,
    stat: 'HD-FIT',
    title: 'Tecnología Dry-Fit',
    subtitle: 'Sublimación de alta fidelidad',
    desc: 'Playeras con telas transpirables que mantienen frescos a los corredores y un estampado de alta fidelidad con tintas seguras que no se deslavan.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />,
    stat: '100%',
    title: 'Cumplimiento Logístico',
    subtitle: 'Contratos con fianza de entrega',
    desc: 'Tu entrega garantizada bajo contrato. Te acompañamos en cada etapa de la distribución para que tu evento sea todo un éxito.',
  },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#E5E5EA] pb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] tracking-[0.2em] text-neutral-400 font-bold uppercase block mb-3">
              Por Qué Elegir Sports Print
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
              POR QUÉ SOMOS TU MEJOR OPCIÓN
            </h2>
          </div>
          <p className="text-neutral-500 text-base max-w-sm leading-relaxed">
            Producción propia. Sin intermediarios. Controlamos cada paso del proceso para garantizarte calidad, precio justo y puntualidad en cada entrega.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, i) => (
            <ScrollReveal key={i} delay={i * 0.15} className="h-full">
              <div className="neu-card border border-[#E5E5EA] bg-[#F5F5F7] p-8 md:p-10 flex flex-col justify-between h-full group hover:bg-white hover:-translate-y-2 transition-all duration-300 ease-out">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div className="p-3 border border-[#E5E5EA] bg-white rounded-none shadow-sm group-hover:bg-[#E43537] group-hover:border-black transition-colors duration-300">
                      {prop.icon}
                    </div>
                    <span className="font-heading text-4xl text-neutral-300 group-hover:text-black transition-colors duration-300">
                      {prop.stat}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl uppercase mb-1 text-black">
                    {prop.title}
                  </h3>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                    {prop.subtitle}
                  </span>
                  
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {prop.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E5EA] flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black group-hover:text-neutral-500 transition-colors">
                  <span>Ver Especificaciones</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Secondary Callout */}
        <div className="mt-16 bg-[#F5F5F7] border border-[#E5E5EA] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <Zap className="text-black shrink-0" size={24} />
            <span className="text-base font-semibold text-neutral-800">
              ¿Listo para dar el siguiente paso? Cotiza hoy y recibe una propuesta personalizada.
            </span>
          </div>
          <Link
            to="/cotizar"
            className="text-sm font-bold tracking-widest uppercase border-b-2 border-black hover:border-[#E43537] transition-colors duration-300 ease-out py-1 shrink-0"
          >
            Cotizar Ahora
          </Link>
        </div>

      </div>
    </section>
  );
}
