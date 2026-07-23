import { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShieldCheck, Calendar, Users, Cpu, Leaf, Compass, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PremiumButton, Card3DTilt } from '../components/ui/PremiumAnimations';

import gallery1 from '../../imports/gallery_p7.png'; // Fase 1: preparación de materiales (Copilot_20260629_223334.png)
import gallery2 from '../../imports/gallery_p4.png'; // Fase 2: impresión de material (Copilot_20260623_221720.png)
import gallery3 from '../../imports/gallery_p2.png'; // Fase 3: Corte de moldes (ChatGPT Image 30 jun 2026, 22_17_59.png)
import gallery4 from '../../imports/gallery_p3.png'; // Fase 4: inspección de tejidos (Operaria de blusa rosa y calandra)
import gallery5 from '../../imports/gallery_p9.png'; // Fase 5: Sublimación de alto volumen (Copilot_20260629_224039.png)
import gallery6 from '../../imports/gallery_p10.png'; // Fase 6: Confección y costura (ChatGPT Image 30 jun 2026, 22_44_42.png)
import gallery7 from '../../imports/gallery_p8.png'; // Fase 7: Control y empaque (Copilot_20260629_223757.png)
import gallery8 from '../../imports/gallery_p1.png'; // Fase 8: Logística de entrega (Oficina / Calandra)

const galleryImages = [
  { src: gallery1, title: 'Preparación de materiales', desc: 'Preparación y acondicionamiento de rollos de tela.' },
  { src: gallery2, title: 'Impresión de material', desc: 'Impresión digital continua sobre papel de transferencia.' },
  { src: gallery3, title: 'Corte de moldes', desc: 'Corte láser robótico automatizado con desperdicio mínimo.' },
  { src: gallery4, title: 'Inspección de tejidos', desc: 'Control de calidad de la materia prima en planta.' },
  { src: gallery5, title: 'Sublimación de alto volumen', desc: 'Calandras rotativas de alta velocidad para sublimación masiva.' },
  { src: gallery6, title: 'Confección y costura', desc: 'Línea de confección y costura de alta precisión.' },
  { src: gallery7, title: 'Control y empaque', desc: 'Control de calidad final y empaque individual.' },
  { src: gallery8, title: 'Logística de entrega', desc: 'Distribución y logística nacional para eventos.' }
];

const stats = [
  { value: '5,000 m²', label: 'Planta de Manufactura', icon: Compass },
  { value: '150+', label: 'Operarios Especializados', icon: Users },
  { value: '500+', label: 'Eventos Masivos Equipados', icon: Calendar },
  { value: '6M+', label: 'Playeras Producidas', icon: Cpu },
];



export function NosotrosPage() {
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string; desc: string } | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    if (selectedImg) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-44 pb-20 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase mb-6 text-black select-none">
                ¿Quiénes somos?
              </h1>
              <p className="text-[#4B5563] text-base leading-relaxed max-w-2xl mb-6 font-medium">
                Diseñamos, sublimamos, confeccionamos y ensamblamos cada producto en nuestra planta para garantizar calidad, tiempos de entrega competitivos y un mejor control del proceso.
              </p>
              <p className="text-[#4B5563] text-sm leading-relaxed max-w-2xl font-medium">
                Nuestro modelo de producción nos permite cuidar cada detalle desde la impresión hasta el producto terminado, ofreciendo colores vivos, acabados de alta calidad y resultados consistentes en cada pedido.
              </p>
            </div>
            <div className="lg:col-span-6 relative">
              <ScrollReveal direction="left">
                <div className="aspect-[16/10] bg-neutral-100 border border-black overflow-hidden relative rounded-none group">
                  <ImageWithFallback
                    src={gallery2}
                    alt="Planta de manufactura Sports Print"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-6 z-10 pointer-events-none">
                    <span className="text-[10px] font-bold text-white bg-black px-3 py-1 uppercase tracking-widest rounded-none">
                      IMPRESORAS DE ALTA GAMA
                    </span>
                  </div>
                  {/* Accent border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E43537] transition-all duration-300 pointer-events-none z-20" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* Infrastructure & Advanced Machinery Section */}
      <section id="infraestructura" className="py-24 bg-black text-white border-b border-black scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight uppercase mb-8 text-white">
                Nuestra Tecnología
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading font-bold text-xl uppercase text-[#E43537] mb-2">
                    100% Producción Interna
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-medium">
                    Diseño, impresión, corte y costura bajo una misma operación. Controlamos cada proceso en nuestra planta para ofrecerte precios directos de fábrica y la certidumbre total de que cada prenda pasará un control de calidad estricto.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl uppercase text-[#E43537] mb-2">
                    Nitidez que Resiste Todo
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-medium">
                    Tecnología textil que integra la tinta directamente en las fibras de la tela. Tu marca y patrocinadores lucirán impecables en alta definición, con colores que no se borran, no se agrietan y resisten el rendimiento deportivo más exigente.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="aspect-[16/10] bg-neutral-900 border border-neutral-800 overflow-hidden relative rounded-none group">
                  <video
                    src="/VideoPlantaSportsprint.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 z-20 border border-white/10 rounded-none pointer-events-none">
                    VISTA DE PLANTA
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>





      {/* Lightbox / Modal for Gallery */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 transition-colors border border-white/20"
              onClick={() => setSelectedImg(null)}
              aria-label="Cerrar vista"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl max-h-[80vh] overflow-hidden border border-white/20 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg.src} 
                alt={selectedImg.title} 
                className="w-full h-auto max-h-[65vh] object-contain mx-auto"
              />
              <div className="bg-[#0A0A0A] p-6 text-white border-t border-white/10">
                <h4 className="font-heading font-black text-lg uppercase tracking-wider mb-1">
                  {selectedImg.title}
                </h4>
                <p className="text-xs text-neutral-400 font-medium">
                  {selectedImg.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industrial Gallery Section */}
      <section id="galeria" className="py-24 bg-[#F5F5F7] text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] text-[#4B5563] font-bold uppercase block mb-3">
              GALERÍA INDUSTRIAL
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight">
              NUESTRA INFRAESTRUCTURA EN ACCIÓN
            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.05} direction="up">
                <div 
                  className="relative aspect-[4/3] bg-neutral-900 overflow-hidden border border-black cursor-pointer group rounded-none"
                  onClick={() => setSelectedImg(img)}
                >
                  {/* Image full-bleed */}
                  <ImageWithFallback
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 opacity-80 group-hover:opacity-95 z-10" />
                  
                  {/* Text overlay content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 pointer-events-none">
                    {/* Subtle index number or category */}
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#E43537] mb-2 uppercase select-none opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                      FASE {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-heading font-black text-base sm:text-lg uppercase text-white leading-[1.15] mb-1 group-hover:text-[#E43537] transition-colors duration-300">
                      {img.title}
                    </h4>
                    {/* Description collapses on hover */}
                    <p className="text-[10.5px] text-neutral-300 leading-relaxed font-semibold max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-1.5">
                      {img.desc}
                    </p>
                  </div>

                  {/* Accent border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E43537] transition-all duration-300 pointer-events-none z-30" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


    </PageTransition>
  );
}
export default NosotrosPage;
