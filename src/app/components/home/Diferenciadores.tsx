import { UserCheck, Clock, Factory } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { StaggerContainer, StaggerItem } from '../ui/PremiumAnimations';

const diffs = [
  {
    icon: UserCheck,
    title: 'Trato Personalizado',
    desc: 'Te asignamos un asesor dedicado que te guiará paso a paso, resolviendo tus dudas de diseño, tallas y logística de inmediato.',
  },
  {
    icon: Clock,
    title: 'Tiempos de Entrega Competitivos',
    desc: 'Planificamos cada pedido a detalle sin comprometer la calidad para ofrecer tiempos de producción y entrega ágiles.',
  },
  {
    icon: Factory,
    title: 'Producción Interna',
    desc: 'Fabricamos todo bajo el mismo techo. Así aseguramos colores uniformes y calidad constante en cada playera.',
  },
];

function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setCanHover(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !canHover) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative border border-black bg-white p-8 flex flex-col justify-between h-full hover:scale-[1.02] transition-all duration-300 rounded-none overflow-hidden group ${className}`}
    >
      {/* 60fps Radial Gradient Spotlight follow */}
      {canHover && isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 102, 99, 0.18), transparent 85%)`,
          }}
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

export function Diferenciadores() {
  return (
    <section className="py-24 bg-white text-black select-none">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight uppercase">
            POR QUÉ SOMOS TU MEJOR OPCIÓN
          </h2>
          <p className="text-[#4B5563] text-sm mt-3 font-medium">
            Características que nos distinguen
          </p>
        </div>

        {/* Grid of 3 Cards using Stagger Animations */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {diffs.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <StaggerItem key={i} className="h-full">
                <GlowCard>
                  <div>
                    <div className="w-12 h-12 bg-black flex items-center justify-center mb-6 rounded-none group-hover:bg-[#E43537] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-heading font-black text-2xl uppercase mb-3 text-black">
                      {diff.title}
                    </h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed font-medium">
                      {diff.desc}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
export default Diferenciadores;
