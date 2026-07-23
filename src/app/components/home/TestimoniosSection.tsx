import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal } from '../ScrollReveal';

const testimonials = [
  {
    author: 'Jorge Armando Martínez Aguilera',
    role: 'Director de AllMkting & En Dónde Correr',
    quote: 'Único proveedor de kits por 3 años consecutivos. Han demostrado gran innovación tecnológica y telas de la mayor calidad para carreras con tirajes de 3,000 a 5,000 playeras por evento.',
  },
  {
    author: 'Dirección de Logística de Trotime',
    role: 'Eventos Masivos (Whirlpool, Ragasa, Magic Color Run)',
    quote: 'Aliado estratégico en la producción de kits. Tienen una capacidad de respuesta excelente ante solicitudes urgentes ("bomberazos") sin comprometer la alta calidad y puntualidad.',
  },
  {
    author: 'Representación de Dulce Menta S.A. de C.V.',
    role: 'Cliente Oficial de Fundación Kardias',
    quote: 'Fidelidad de color absoluta y precisión en los acabados de costura profesional. Gran experiencia en el manejo de artes bajo licencias oficiales (Disney, Marvel, Nickelodeon, Minecraft).',
  },
  {
    author: 'Angelica De La Orta',
    role: 'Coordinadora de Eventos en Adient México',
    quote: 'Excelente disposición para adaptarse a nuestras necesidades y plantas en toda la República. Sus kits de carrera garantizan participantes totalmente satisfechos.',
  },
  {
    author: 'Diego Parada',
    role: 'Cofundador y CEO de Fundación Vuela',
    quote: 'Proveedor de kits para la Vuela Run 2025. Mostraron una gran empatía con nuestra causa, ajustándose a presupuestos y entregando materiales de alta calidad en tiempo y forma.',
  },
];

export function TestimoniosSection() {
  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 select-none">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-200 pb-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#4B5563] font-bold uppercase block mb-3">
              TESTIMONIOS
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
              VOCES DE ORGANIZADORES LÍDERES
            </h2>
          </div>
          <Link
            to="/casos-de-exito"
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black hover:underline shrink-0"
          >
            VER CASOS DE ÉXITO
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((test, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div className="group border border-black p-8 flex flex-col justify-between h-full rounded-none hover:border-[#E43537] transition-colors duration-300">
                <div>
                  <Quote className="w-9 h-9 text-neutral-200 group-hover:text-[#E43537] group-hover:fill-[#E43537]/5 transition-all duration-300 mb-6" />
                  <p className="text-[#4B5563] text-sm leading-relaxed mb-8 italic font-medium">
                    "{test.quote}"
                  </p>
                </div>
                <div className="border-t border-black/10 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider block text-black">
                    {test.author}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4B5563] block mt-1">
                    {test.role}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
