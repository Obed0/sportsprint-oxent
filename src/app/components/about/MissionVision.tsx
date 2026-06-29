import { Target, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function MissionVision() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm tracking-widest text-gray-400 mb-4 block">
            NUESTRA FILOSOFÍA
          </span>
          <h2 className="text-5xl sm:text-6xl mb-6 leading-tight">
            Misión <span className="font-light">& Visión</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 p-12 hover:bg-white/10 transition-all"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-3xl mb-6">Misión</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Proveer <strong className="text-white">kits deportivos de calidad premium</strong> para eventos running,
              combinando producción interna de clase mundial con servicio personalizado que supere
              las expectativas de organizadores, marcas y empresas.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-12 hover:bg-white/10 transition-all"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black mb-8">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl mb-6">Visión</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ser el <strong className="text-white">proveedor líder en México</strong> de kits deportivos personalizados,
              reconocidos por nuestra capacidad de producción interna, innovación en sublimado textil
              y compromiso con la excelencia en cada proyecto.
            </p>
          </motion.div>
        </div>

        {/* Values Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white text-black p-12"
        >
          <div className="flex items-start gap-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white flex-shrink-0">
              <Heart size={32} />
            </div>
            <div>
              <h3 className="text-3xl mb-6">Nuestros Valores</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl mb-3">Calidad Sin Compromisos</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Estándares europeos en cada producción. Garantía de que la muestra es idéntica al pedido final.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl mb-3">Transparencia Total</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Comunicación directa sin intermediarios. Visibilidad completa del proceso de producción.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl mb-3">Compromiso de Entrega</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Tiempos competitivos de 15 días. Producción interna que nos permite cumplir siempre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
