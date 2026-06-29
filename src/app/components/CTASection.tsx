import { ArrowRight, Send } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contacto" className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden" ref={sectionRef}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF4D00]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4FF]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#FF4D00] mb-4 block uppercase">
              Comienza Tu Proyecto
            </span>
            <h2 className="text-white mb-6 leading-[0.95]">
              ¿LISTO PARA TU
              <br />
              <span className="text-white/30">PRÓXIMO EVENTO?</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Cuéntanos sobre tu proyecto. Te respondemos con una propuesta
              detallada y sin compromiso para tu evento.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/525512345678?text=Hola%2C%20me%20interesa%20cotizar%20kits%20deportivos%20para%20mi%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 mb-10 hover:bg-[#22c55e] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div className="text-left">
                <div className="text-sm font-medium">Cotiza por WhatsApp</div>
                <div className="text-[11px] text-white/70">Respuesta inmediata</div>
              </div>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>

            {/* Contact info */}
            <div className="space-y-4 pt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#111] border border-white/[0.06] flex items-center justify-center text-white/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.15em] text-white/25 uppercase">Email</div>
                  <div className="text-white/60 text-sm">contacto@sportsprintmx.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#111] border border-white/[0.06] flex items-center justify-center text-white/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.15em] text-white/25 uppercase">Teléfono</div>
                  <div className="text-white/60 text-sm">+52 55 1234 5678</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#111] border border-white/[0.04] p-6 sm:p-10 relative"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF4D00] via-[#FF4D00]/50 to-transparent" />

            <h3 className="text-white text-2xl sm:text-3xl mb-2">Cotización Rápida</h3>
            <p className="text-white/30 text-sm mb-8">Te respondemos a la brevedad</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="cta-name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                    focused === 'name' ? 'top-1 text-[10px] text-[#FF4D00]' : 'top-3.5 text-white/30'
                  }`}
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="cta-name"
                  className="w-full px-4 pt-5 pb-2 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors"
                  onFocus={() => setFocused('name')}
                  onBlur={(e) => !e.target.value && setFocused(null)}
                />
              </div>

              {/* Email + Phone row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label
                    htmlFor="cta-email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                      focused === 'email' ? 'top-1 text-[10px] text-[#FF4D00]' : 'top-3.5 text-white/30'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="cta-email"
                    className="w-full px-4 pt-5 pb-2 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors"
                    onFocus={() => setFocused('email')}
                    onBlur={(e) => !e.target.value && setFocused(null)}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="cta-phone"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                      focused === 'phone' ? 'top-1 text-[10px] text-[#FF4D00]' : 'top-3.5 text-white/30'
                    }`}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    className="w-full px-4 pt-5 pb-2 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors"
                    onFocus={() => setFocused('phone')}
                    onBlur={(e) => !e.target.value && setFocused(null)}
                  />
                </div>
              </div>

              {/* Event type */}
              <div className="relative">
                <label htmlFor="cta-event" className="block text-[10px] tracking-[0.15em] text-white/30 uppercase mb-2">
                  Tipo de Evento
                </label>
                <select
                  id="cta-event"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white/60 text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#111]">Selecciona una opción</option>
                  <option value="maraton" className="bg-[#111]">Carrera / Maratón</option>
                  <option value="trail" className="bg-[#111]">Trail Running</option>
                  <option value="corporativo" className="bg-[#111]">Evento Corporativo</option>
                  <option value="torneo" className="bg-[#111]">Torneo Deportivo</option>
                  <option value="otro" className="bg-[#111]">Otro</option>
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Quantity */}
              <div className="relative">
                <label
                  htmlFor="cta-qty"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                    focused === 'qty' ? 'top-1 text-[10px] text-[#FF4D00]' : 'top-3.5 text-white/30'
                  }`}
                >
                  Cantidad Aproximada (ej: 1000 kits)
                </label>
                <input
                  type="text"
                  id="cta-qty"
                  className="w-full px-4 pt-5 pb-2 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors"
                  onFocus={() => setFocused('qty')}
                  onBlur={(e) => !e.target.value && setFocused(null)}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="cta-message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${
                    focused === 'message' ? 'top-1 text-[10px] text-[#FF4D00]' : 'top-3.5 text-white/30'
                  }`}
                >
                  Detalles del Proyecto
                </label>
                <textarea
                  id="cta-message"
                  rows={4}
                  className="w-full px-4 pt-6 pb-2 bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF4D00]/50 focus:outline-none transition-colors resize-none"
                  onFocus={() => setFocused('message')}
                  onBlur={(e) => !e.target.value && setFocused(null)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full bg-[#FF4D00] text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-[#FF6B2B] hover:shadow-[0_0_30px_rgba(255,77,0,0.2)] flex items-center justify-center gap-2"
              >
                Enviar Solicitud
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
