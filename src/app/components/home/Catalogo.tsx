import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { PremiumButton, ParallaxImage } from '../ui/PremiumAnimations';

// Import transparent clean assets without baked static shadows for B2B catalog items
import imgPlayeras from '../../../imports/Playera_pure.webp';
import imgMorrales from '../../../imports/Morral_clean.webp';
import imgMedallas from '../../../imports/Medalla_pure.webp';
import imgKits from '../../../imports/Kit_nobg.webp';
import imgOtros from '../../../imports/Otros_pure.webp';

const products = [
  {
    num: '01',
    id: 'playeras',
    title: 'Playeras atléticas',
    subtitle: 'Microfibras de Alto Rendimiento',
    desc: 'Alto rendimiento para atletas y eventos deportivos.',
    image: imgPlayeras,
    specs: [
      'Secado rápido y máxima comodidad.',
      'Sublimado de alta definición y gran durabilidad.',
      'Colores intensos que no se cuartean.',
      'Catálogo extenso de telas deportivas a elegir.'
    ],
    accent: '#E43537',
  },
  {
    num: '02',
    id: 'morrales',
    title: 'Morrales reforzados',
    subtitle: 'Funcionalidad y Resistencia',
    desc: 'Resistencia y funcionalidad para entregar cada kit.',
    image: imgMorrales,
    specs: [
      'Material de alta resistencia.',
      'Costura reforzada con 3 hilos para mayor durabilidad.',
      'Cordones gruesos para un transporte cómodo.'
    ],
    accent: '#E43537',
  },
  {
    num: '03',
    id: 'medallas',
    title: 'Medallas',
    subtitle: 'Premio al Esfuerzo Máximo',
    desc: 'Medallas conmemorativas de alto relieve. Diseños exclusivos y acabados en 2D/3D con listones satinados sublimados a todo color.',
    image: imgMedallas,
    specs: ['Diseños en 2D y 3D', 'Listón satinado', 'Terminados oro, plata y bronce', 'Costuras de alta resistencia'],
    accent: '#E43537',
  },
  {
    num: '04',
    id: 'kits',
    title: 'Kits deportivos',
    subtitle: 'Paquete de Corredor Listo para Entregar',
    desc: 'Todo lo necesario para entregar un evento completo.',
    image: imgKits,
    specs: [
      'Playera premium personalizada.',
      'Medalla personalizable (diseño, tamaño y estilo).',
      'Morral, número de competidor u otro artículo a elegir.'
    ],
    accent: '#E43537',
  },
  {
    num: '05',
    id: 'otros',
    title: 'Otros Accesorios',
    subtitle: 'Artículos Deportivos Complementarios',
    desc: 'Botellas, gorras y accesorios deportivos personalizados para tu evento.',
    image: imgOtros,
    specs: ['Gorras y viseras de running', 'Botellas de hidratación', 'Cintas y bandas elásticas', 'Calidad de impresión premium', 'Y más...'],
    accent: '#E43537',
  },
];

function CatalogSection({ product, index }: { product: typeof products[0]; index: number }) {
  const isEven = index % 2 === 1; // 0 is odd (first), 1 is even (second), etc.
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setCanHover(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !canHover) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id={product.id}
      className={`w-full border-b border-black select-none ${
        isEven ? 'bg-[#F5F5F7]' : 'bg-white'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Column */}
          <div className={`lg:col-span-6 ${isEven ? 'lg:order-last' : 'lg:order-first'}`}>
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-black bg-white rounded-none transition-transform duration-500 hover:scale-[1.01]"
            >
              {/* Dynamic Cursor Spotlight Follow */}
              {canHover && isHovered && (
                <div
                  className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 z-10"
                  style={{
                    background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 102, 99, 0.15), transparent 85%)`,
                  }}
                />
              )}

              {product.id === 'kits' ? (
                /* Kits / Runner package — bottom aligned to prevent leg clipping, NO shadow */
                <div className="relative w-full h-full flex flex-col items-center justify-end px-4 pt-6 pb-0 bg-white overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-[96%] w-auto object-contain object-bottom relative z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ) : (
                /* Floating products (playeras, morrales, medallas, otros) — centered with 3D shadow underneath */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-4 bg-black/20 rounded-[100%] blur-md pointer-events-none group-hover:scale-110 group-hover:bg-black/35 transition-all duration-500" />
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-[85%] w-auto object-contain relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 border border-white z-20 rounded-none">
                {product.subtitle}
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.25em] text-[#4B5563] font-bold uppercase block mb-3">
              CATEGORÍA {product.num}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase text-black mb-6">
              {product.title}
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-8 font-medium">
              {product.desc}
            </p>

            {/* Technical Specs List */}
            <div className="mb-8">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                Especificaciones:
              </span>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800 font-semibold border-b border-neutral-100 pb-2">
                    <span className="w-1.5 h-1.5 bg-[#E43537] rounded-full shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <PremiumButton
                to="/cotizar"
                text={`Cotizar ${product.title}`}
                icon={<ArrowRight size={12} />}
                variant="primary"
                className="w-full sm:w-auto text-center"
              />
              <Link
                to="/tecnologia-textil"
                className="flex items-center justify-center text-[10px] font-bold text-[#4B5563] hover:text-black uppercase tracking-widest py-4 sm:px-6 hover:underline transition-colors"
              >
                Ver Ficha
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function Catalogo() {
  return (
    <div className="w-full">
      {products.map((product, i) => (
        <CatalogSection key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

export default Catalogo;
