import { ScrollReveal } from '../ScrollReveal';
import { brandLogosMap } from '../ClientLogos';

export function ClientLogos() {
  const brandNames = Object.keys(brandLogosMap);
  // Duplicate list to make a seamless loop
  const marqueeItems = [...brandNames, ...brandNames, ...brandNames];

  return (
    <section className="py-12 border-y border-[#E5E5EA] bg-[#F5F5F7] overflow-hidden select-none">
      <div className="w-full">
        <ScrollReveal duration={0.6}>
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.25em] text-[#4B5563] font-bold uppercase mb-8">
              PROVEEDOR OFICIAL DE EVENTOS LÍDERES EN MÉXICO
            </span>

            {/* Infinite scrolling marquee wrapper */}
            <div className="relative w-full overflow-hidden flex items-center py-4">
              {/* Fade out shadows at boundaries */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee flex gap-24 items-center">
                {marqueeItems.map((brand, idx) => {
                  const LogoComponent = brandLogosMap[brand];
                  if (!LogoComponent) return null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center min-w-[160px] sm:min-w-[240px] h-14 sm:h-20 shrink-0 cursor-default transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[1.08] opacity-90 hover:opacity-100"
                    >
                      <LogoComponent className="h-12 sm:h-16 w-auto max-w-[180px] sm:max-w-[260px]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
