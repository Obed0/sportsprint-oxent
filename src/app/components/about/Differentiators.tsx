import { Check, Users, MessageCircle, Factory, Shield, Clock, Palette, Layers } from 'lucide-react';
import { motion } from 'motion/react';

const benefits = [
  {
    icon: Users,
    title: 'Trato Personalizado',
    description: 'Acompañamiento de inicio a fin en tu proyecto. Un equipo dedicado que entiende tus necesidades específicas.'
  },
  {
    icon: MessageCircle,
    title: 'Comunicación Directa',
    description: 'Sin intermediarios. Contacto directo con nuestro equipo de producción para resolver cualquier duda al instante.'
  },
  {
    icon: Factory,
    title: 'Producción Interna',
    description: 'No tercerizamos. Todo se fabrica en nuestras instalaciones, garantizando control total de calidad.'
  },
  {
    icon: Shield,
    title: 'Garantía de Muestra',
    description: 'Lo que ves es lo que obtienes. Garantía de que el pedido final es idéntico a la muestra aprobada.'
  },
  {
    icon: Clock,
    title: 'Entregas en 15 Días',
    description: 'Tiempos competitivos garantizados. Producción ágil sin sacrificar calidad.'
  },
  {
    icon: Palette,
    title: 'Calidad Europea 1200x1200 DPI',
    description: 'Resolución de impresión europea. Colores vibrantes y detalles precisos en cada diseño.'
  },
  {
    icon: Layers,
    title: '4 Tipos de Tela',
    description: 'Opciones para cada presupuesto y nivel de evento. Desde económico hasta premium, sin comprometer calidad.'
  }
];

export function Differentiators() {
  return (
    <section className="py-32 bg-gray-50">
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
            DIFERENCIADORES
          </span>
          <h2 className="text-5xl sm:text-6xl mb-6 leading-tight">
            Por Qué Somos
            <br />
            <span className="font-light">Tu Mejor Opción</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Características que nos distinguen en el mercado y generan confianza
            en organizadores de eventos y marcas deportivas.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 hover:shadow-xl transition-all group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black text-white p-12 lg:p-16 text-center"
        >
          <h3 className="text-4xl mb-6">
            ¿Listo Para Experimentar
            <br />
            <span className="font-light">La Diferencia?</span>
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a más de 500 eventos que han confiado en nuestra calidad,
            experiencia y compromiso con la excelencia.
          </p>
          <button className="bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors">
            Solicitar Cotización
          </button>
        </motion.div>
      </div>
    </section>
  );
}
