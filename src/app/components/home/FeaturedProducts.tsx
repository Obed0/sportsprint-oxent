import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight, Layers, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal } from '../ScrollReveal';
import { Card3DTilt, PremiumButton } from '../ui/PremiumAnimations';

// Import real local B2B running event photos showing actual products offered
import imgPlayeras from '../../../imports/Playera_pure.webp';
import imgMorrales from '../../../imports/Morral_clean.webp';
import imgKits from '../../../imports/Kit_nobg.webp';

const featured = [
  {
    title: 'Playeras atléticas',
    category: 'PRODUCTO ESTRELLA',
    desc: 'Alto rendimiento para atletas y eventos deportivos.',
    image: imgPlayeras,
    specs: [
      'Secado rápido y máxima comodidad.',
      'Sublimado de alta definición y gran durabilidad.',
      'Colores intensos que no se cuartean.',
      'Catálogo extenso de telas deportivas a elegir.'
    ],
  },
  {
    title: 'Morrales reforzados',
    category: 'ACCESORIO DE EVENTOS',
    desc: 'Resistencia y funcionalidad para entregar cada kit.',
    image: imgMorrales,
    specs: [
      'Material de alta resistencia.',
      'Costura reforzada con 3 hilos para mayor durabilidad.',
      'Cordones gruesos para un transporte cómodo.'
    ],
  },
  {
    title: 'Kits deportivos',
    category: 'SERVICIO INTEGRAL B2B',
    desc: 'Todo lo necesario para entregar un evento completo.',
    image: imgKits,
    specs: [
      'Playera premium personalizada.',
      'Medalla personalizable (diseño, tamaño y estilo).',
      'Morral, número de competidor u otro artículo a elegir.'
    ],
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#F5F5F7] border-y border-[#E5E5EA]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#E5E5EA] pb-10">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-black">
              CATÁLOGO
            </h2>
          </div>
          <Link
            to="/tecnologia-textil"
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black hover:text-neutral-500 transition-colors"
          >
            Ver Fichas Técnicas Textiles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {featured.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up" className="h-full">
              <Card3DTilt className="h-full">
                <div className="bg-white border border-[#E5E5EA] flex flex-col justify-between h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group">
                <div>
                  {/* Image Container with Custom Fit */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-white relative border-b border-[#E5E5EA] flex items-center justify-center p-4">
                    {item.id === 'kits' || item.title?.toLowerCase().includes('kit') ? (
                      /* Kits / Runner package — bottom aligned to prevent leg clipping, NO shadow */
                      <div className="relative w-full h-full flex flex-col items-center justify-end px-4 pt-4 pb-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-[96%] w-auto object-contain object-bottom relative z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      /* Floating products — centered with 3D shadow underneath */
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-3.5 bg-black/20 rounded-[100%] blur-md pointer-events-none group-hover:scale-110 group-hover:bg-black/35 transition-all duration-500" />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-[88%] w-auto object-contain relative z-10 drop-shadow-[0_12px_12px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <h3 className="font-heading text-2xl uppercase text-black mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-black font-semibold text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {item.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 font-medium">
                          <span className="w-1.5 h-1.5 bg-[#E43537] rounded-full shrink-0 mt-1.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-8 pb-8 pt-4">
                  <PremiumButton
                    to="/tecnologia-textil"
                    text="Ver más"
                    variant="outline-black"
                    fullWidth
                  />
                </div>
              </div>
              </Card3DTilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
