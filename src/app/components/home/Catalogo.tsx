import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { PremiumButton, ParallaxImage } from '../ui/PremiumAnimations';

// Import real local B2B running event photos from the carreras import folder
import imgPlayeras from '../../../imports/Playera_clean.webp';
import imgMorrales from '../../../imports/Morral_clean.webp';
import imgMedallas from '../../../imports/Medalla_clean.webp';
import imgKits from '../../../imports/Kit_clean.webp';
import imgOtros from '../../../imports/Otros_clean.webp';

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
      'Colores intensos que no se cuartean.'
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
      'Esquinas reforzadas para mayor durabilidad.',
      'Cordones gruesos para un transporte cómodo.'
    ],
    accent: '#E43537',
  },
  {
    num: '03',
    id: 'medallas',
    title: 'Medallas Metálicas',
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
      'Morral, medalla y número de competidor.',
      'Listos para entregar a cada participante.'
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

              <ParallaxImage
                src={product.image}
                alt={product.title}
                className="img-bw-high-contrast"
                objectFit="contain"
              />
              
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
