import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Scissors, Droplet, Printer, CheckCircle } from 'lucide-react';

const productionStages = [
  {
    id: 1,
    title: 'Impresión Digital',
    description: 'Equipos de sublimación de última generación con resolución 1200x1200 DPI para colores vibrantes y detalles precisos.',
    image: 'https://images.unsplash.com/photo-1693031630369-bd429a57f115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    icon: Printer,
    stats: '1200x1200 DPI'
  },
  {
    id: 2,
    title: 'Corte Textil',
    description: 'Tecnología de corte de precisión que garantiza acabados perfectos en cada prenda deportiva.',
    image: 'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    icon: Scissors,
    stats: 'Precisión Milimétrica'
  },
  {
    id: 3,
    title: 'Proceso de Sublimado',
    description: 'Transferencia térmica que fusiona la tinta con la fibra textil, garantizando durabilidad y colores permanentes.',
    image: 'https://images.unsplash.com/photo-1655122878062-a9e885391a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    icon: Droplet,
    stats: 'Colores Permanentes'
  },
  {
    id: 4,
    title: 'Control de Calidad',
    description: 'Inspección rigurosa en cada etapa del proceso para garantizar que cada producto cumpla nuestros estándares europeos.',
    image: 'https://images.unsplash.com/photo-1773525912431-ee1eff5e1ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    icon: CheckCircle,
    stats: '100% Inspeccionado'
  }
];

export function ProductionShowcase() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm tracking-widest text-gray-500 mb-4 block">
            NUESTRA PRODUCCIÓN
          </span>
          <h2 className="text-5xl sm:text-6xl mb-6 leading-tight">
            Instalaciones
            <br />
            <span className="font-light">De Clase Mundial</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            5000m² de planta de producción equipada con tecnología europea
            y un equipo de 50+ profesionales especializados.
          </p>
        </motion.div>

        {/* Production Stages */}
        <div className="space-y-24">
          {productionStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="aspect-[4/3] overflow-hidden bg-gray-900 relative group">
                    <ImageWithFallback
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Floating Number */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-white text-black flex items-center justify-center text-2xl">
                      {stage.id.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-6">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-4xl mb-4">{stage.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {stage.description}
                  </p>
                  <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 border border-gray-200">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-sm tracking-wider">{stage.stats}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Facility Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 bg-black text-white p-12 lg:p-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center border-r border-white/10 last:border-r-0">
              <div className="text-5xl mb-3">5000m²</div>
              <div className="text-gray-400">Planta de Producción</div>
            </div>
            <div className="text-center border-r border-white/10 last:border-r-0">
              <div className="text-5xl mb-3">50+</div>
              <div className="text-gray-400">Profesionales</div>
            </div>
            <div className="text-center border-r border-white/10 last:border-r-0">
              <div className="text-5xl mb-3">24/7</div>
              <div className="text-gray-400">Producción Continua</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">100%</div>
              <div className="text-gray-400">Control Interno</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-all">
              Agendar Visita a Instalaciones
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
