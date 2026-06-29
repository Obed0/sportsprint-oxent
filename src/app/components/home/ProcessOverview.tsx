import { FileText, Palette, Activity, Truck } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

const steps = [
  {
    num: '01',
    icon: <FileText className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />,
    title: 'Cotización Comercial',
    desc: 'Enviamos tu cotización formal y transparente, adaptándonos al volumen y presupuesto de tu evento.',
  },
  {
    num: '02',
    icon: <Palette className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />,
    title: 'Muestreo & Aprobación',
    desc: 'Creamos una muestra física para que compruebes en persona la calidad de las telas, colores y costuras antes de iniciar la producción.',
  },
  {
    num: '03',
    icon: <Activity className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />,
    title: 'Producción en Serie',
    desc: 'Fabricamos tus prendas en nuestra planta industrial utilizando tecnología avanzada que garantiza acabados uniformes e impecables.',
  },
  {
    num: '04',
    icon: <Truck className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />,
    title: 'Entrega a Tiempo',
    desc: 'Gestionamos la logística y distribución de tu pedido de forma puntual y segura, garantizando que todo esté listo para tu evento sin contratiempos.',
  },
];

export function ProcessOverview() {
  return (
    <section className="py-24 bg-white text-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#E5E5EA] pb-10">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
              PROCESO DE PRODUCCIÓN
            </h2>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-8 -translate-y-1/2 left-0 right-0 h-0.5 bg-neutral-200 z-0 hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction="up" className="h-full">
                <div className="flex flex-col h-full group">
                  {/* Step bubble / Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 border border-[#E5E5EA] bg-[#F5F5F7] flex items-center justify-center relative z-20 group-hover:bg-[#FF6663] group-hover:border-black transition-colors duration-300 shadow-sm">
                      {step.icon}
                    </div>
                    <span className="font-heading text-5xl text-neutral-200 group-hover:text-black transition-colors duration-300 leading-none bg-white pl-3 relative z-20">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-heading text-2xl uppercase mb-3 text-black">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
