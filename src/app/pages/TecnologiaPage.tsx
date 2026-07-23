import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link } from 'react-router';
import { ShieldCheck } from 'lucide-react';
import { BottleRecycleIcon } from '../components/ui/RecycledBottleIcon';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BreathabilityIcon } from '../components/ui/BreathabilityIcon';
import { PremiumButton, Card3DTilt } from '../components/ui/PremiumAnimations';

// Import local fabric images
import fabricPet from '../../imports/fabric_pet.webp';
import fabricCoolDry from '../../imports/fabric_cooldry.webp';
import fabricPolyesterPlus from '../../imports/fabric_polyesterplus.webp';
import fabricMicroPanal from '../../imports/fabric_micropanal.webp';

// Import zoom texture images
import zoomPet from '../../imports/telas_zoom/pet2.png';
import zoomCoolDry from '../../imports/telas_zoom/cool dry2.png';
import zoomPolyesterPlus from '../../imports/telas_zoom/poliesterplus2.png';
import zoomMicroPanal from '../../imports/telas_zoom/micropanal2.png';


interface Fabric {
  id: string;
  name: string;
  weight: string;
  composition: string;
  breathability: string;
  breathabilityLevel: 1 | 2 | 3 | 4;
  elasticity: string;
  uvProtection: string;
  bestFor: string;
  image: string;
  zoomImage: string;
  bulletSpecs: { label: string; text: string }[];
}

const fabrics: Fabric[] = [
  {
    id: 'pet-reciclado',
    name: 'PET (100% Reciclado)',
    weight: '120 g/m²',
    composition: '100% Poliéster Reciclado (PET)',
    breathability: 'Excelente ventilación',
    breathabilityLevel: 3,
    elasticity: 'Media (Trama Elástica)',
    uvProtection: 'UPF 30+',
    bestFor: 'Eventos running ecológicos de alto rendimiento técnico.',
    image: fabricPet,
    zoomImage: zoomPet,
    bulletSpecs: [
      { label: 'IMPACTO ECOLÓGICO', text: 'Cada playera se hace con 8 botellas recicladas.' },
      { label: 'MATERIAL ECOLÓGICO', text: 'Cuida tu rendimiento y el planeta.' },
      { label: 'LIGERA Y TRANSPIRABLE', text: 'Mayor ventilación para entrenar sin límites.' },
      { label: 'SECADO RÁPIDO', text: 'Evacúa el sudor por más tiempo.' },
      { label: 'VALOR SUSTENTABLE', text: 'Impacto ecológico positivo para tu evento.' }
    ]
  },
  {
    id: 'cool-dry',
    name: 'Cool Dry',
    weight: '130 g/m²',
    composition: '100% Poliéster de Rápida Evaporación',
    breathability: 'Secado ultra rápido',
    breathabilityLevel: 4,
    elasticity: 'Alta (Filtro UV e hidrófilo)',
    uvProtection: 'UPF 40+',
    bestFor: 'Corredores élite, eventos y entrenamientos intensos.',
    image: fabricCoolDry,
    zoomImage: zoomCoolDry,
    bulletSpecs: [
      { label: 'SECADO ULTRA RÁPIDO', text: 'Evacúa el sudor rápidamente de tu piel.' },
      { label: 'EXPULSA LA HUMEDAD', text: 'Mantiene tu piel fresca y cómoda siempre.' },
      { label: 'ANTI MAL OLOR', text: 'Previene olores durante el ejercicio.' },
      { label: 'SUAVE AL TACTO', text: 'Ligera y sumamente agradable para la piel.' }
    ]
  },
  {
    id: 'polyester-plus',
    name: 'Poliéster Plus',
    weight: '140 g/m²',
    composition: '100% Poliéster Resistente',
    breathability: 'Buena transpirabilidad',
    breathabilityLevel: 2,
    elasticity: 'Media (Estructural)',
    uvProtection: 'UPF 25+',
    bestFor: 'Prendas duraderas con excelente relación costo-beneficio.',
    image: fabricPolyesterPlus,
    zoomImage: zoomPolyesterPlus,
    bulletSpecs: [
      { label: 'LIGERA Y RESISTENTE', text: 'Comodidad y alta durabilidad en movimiento.' },
      { label: 'EXCELENTE COSTO-BENEFICIO', text: 'Alta calidad a un precio muy accesible.' },
      { label: 'SECADO RÁPIDO', text: 'Te mantiene fresco y listo para rendir.' },
      { label: 'TRANSPIRABILIDAD CONSTANTE', text: 'Permite una óptima circulación del aire.' }
    ]
  },
  {
    id: 'micro-panal',
    name: 'Micro Panal',
    weight: '110 g/m²',
    composition: '100% Poliéster en Tejido de Panal',
    breathability: 'Ventilación extrema',
    breathabilityLevel: 4,
    elasticity: 'Alta (Material Ultraligero)',
    uvProtection: 'UPF 30+',
    bestFor: 'Máxima frescura y ligereza en climas cálidos.',
    image: fabricMicroPanal,
    zoomImage: zoomMicroPanal,
    bulletSpecs: [
      { label: 'VENTILACIÓN PREMIUM', text: 'Estructura que optimiza el flujo de aire.' },
      { label: 'FRESCURA CONSTANTE', text: 'Te mantiene seco ante la mayor exigencia.' },
      { label: 'DISEÑO ULTRALIGERO', text: 'Ajuste cómodo y sin ninguna restricción.' },
      { label: 'TACTO ULTRA SUAVE', text: 'Máximo confort y suavidad al correr.' }
    ]
  },
];



export function TecnologiaPage() {
  const [selectedFabricA, setSelectedFabricA] = useState(fabrics[0].id);
  const [selectedFabricB, setSelectedFabricB] = useState(fabrics[1].id);

  // Controla qué telas muestran su información de detalle
  const [activeTelas, setActiveTelas] = useState<Record<string, boolean>>({});

  const toggleTela = (id: string) => {
    setActiveTelas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fabricA = fabrics.find((f) => f.id === selectedFabricA) || fabrics[0];
  const fabricB = fabrics.find((f) => f.id === selectedFabricB) || fabrics[1];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 lg:pt-44 pb-8 sm:pb-16 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase mb-6 text-black select-none">
            Telas para cada tipo de evento
          </h1>
        </div>
      </section>

      {/* Fabric Gallery */}
      <section id="tejidos" className="py-12 sm:py-20 lg:py-24 bg-white text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 border-b border-neutral-200 pb-8">
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-black">
              CATÁLOGO DE TEJIDOS PREMIUM
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {fabrics.map((fabric, i) => {
              const isDetailOpen = !!activeTelas[fabric.id];
              return (
                <ScrollReveal key={fabric.id} delay={i * 0.1} direction="up" className="h-full">
                  <Card3DTilt className="h-full">
                    <div 
                      className="bg-white border border-black flex flex-col h-full rounded-none relative overflow-hidden select-none"
                    >
                      <div className="aspect-square bg-neutral-100 overflow-hidden relative border-b border-neutral-200 rounded-none group select-none">
                        {/* Capa Inferior (Fondo): Playera principal (siempre visible al inicio) */}
                        <div className="w-full h-full absolute inset-0 z-0 bg-white">
                          <ImageWithFallback
                            src={fabric.image}
                            alt={fabric.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Capa Superior: Textura de tela dentro del Triángulo que Crece hasta cubrir toda la imagen */}
                        <motion.div
                          initial={false}
                          animate={{
                            clipPath: isDetailOpen
                              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                              : 'polygon(45% 100%, 100% 45%, 100% 100%, 45% 100%)',
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          style={{
                            willChange: 'clip-path',
                            transform: 'translateZ(0)',
                          }}
                          className="w-full h-full absolute inset-0 z-10 overflow-hidden bg-neutral-100"
                        >
                          <ImageWithFallback
                            src={fabric.zoomImage}
                            alt={`${fabric.name} textura`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />

                          {/* Barra roja acento en la diagonal del triángulo deslizante */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.line
                              initial={false}
                              animate={{
                                x1: isDetailOpen ? 0 : 45,
                                y1: isDetailOpen ? 0 : 100,
                                x2: isDetailOpen ? 0 : 100,
                                y2: isDetailOpen ? 0 : 45,
                                opacity: isDetailOpen ? 0 : 1,
                              }}
                              transition={{
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                              stroke="#E43537"
                              strokeWidth="3.5"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="min-h-[56px] flex items-start mb-4">
                            <h3 className="font-heading font-black text-xl uppercase text-black leading-[1.1]">
                              {fabric.name}
                            </h3>
                          </div>
                          
                          <div className="min-h-[180px] relative">
                            <AnimatePresence mode="wait" initial={false}>
                              {!isDetailOpen ? (
                                /* Información técnica breve (Siempre visible al inicio) */
                                <motion.div
                                  key="summary"
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="space-y-3 text-xs font-semibold"
                                >
                                  <div>
                                    <span className="text-[9px] tracking-widest text-[#E43537] font-bold uppercase block mb-1">
                                      Ideal para:
                                    </span>
                                    <p className="text-neutral-600 font-medium leading-relaxed">
                                      {fabric.bestFor}
                                    </p>
                                  </div>
                                  <div className="pt-2 border-t border-neutral-100 space-y-2">
                                    <div className="flex flex-col gap-1">
                                      <span className="text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                                        Transpirabilidad
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <BreathabilityIcon linesCount={fabric.breathabilityLevel} size={26} />
                                        <span className="text-black font-bold text-[11px] block leading-tight">
                                          {fabric.breathability}
                                        </span>
                                      </div>
                                    </div>
                                    {fabric.id === 'pet-reciclado' && (
                                      <div className="pt-2 border-t border-neutral-100 flex items-center gap-2.5 text-black font-bold text-[11px]">
                                        <BottleRecycleIcon size={28} />
                                        <span className="leading-tight">Cada playera se hace con 8 botellas recicladas.</span>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              ) : (
                                /* Ficha técnica detallada por clic (Especificaciones / Beneficios) */
                                <motion.div
                                  key="detail"
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="space-y-3"
                                >
                                  {fabric.bulletSpecs.map((spec, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-xs leading-tight">
                                      {spec.label === 'IMPACTO ECOLÓGICO' ? (
                                        <BottleRecycleIcon size={22} className="mt-0.5 shrink-0" />
                                      ) : (
                                        <span className="w-1.5 h-1.5 bg-[#E43537] rounded-full shrink-0 mt-1" />
                                      )}
                                      <div>
                                        <h4 className="text-black font-bold text-[9px] tracking-wider uppercase mb-0.5">
                                          {spec.label}
                                        </h4>
                                        <p className="text-neutral-500 font-medium text-[11px]">
                                          {spec.text}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Botón Ver Tela */}
                        <div className="mt-6 pt-4 border-t border-neutral-100">
                          <button
                            onClick={() => toggleTela(fabric.id)}
                            className={`w-full py-2.5 text-[11px] font-bold tracking-widest uppercase border transition-all duration-300 rounded-none cursor-pointer ${
                              isDetailOpen
                                ? 'bg-black text-white border-black hover:bg-neutral-900 shadow-[2px_2px_0px_#E43537]'
                                : 'bg-white text-black border-black hover:bg-neutral-50'
                            }`}
                          >
                            {isDetailOpen ? 'Ver Ficha' : 'Ver Tela'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card3DTilt>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Banner Antibacterial colocado debajo de las 4 telas */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-3.5 bg-[#F8FAFC] border border-neutral-200 p-4 sm:px-6 sm:py-4 rounded-none w-full max-w-4xl">
              <div className="w-10 h-10 rounded-full bg-[#E43537]/10 flex items-center justify-center text-[#E43537] shrink-0">
                <ShieldCheck size={22} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-700 leading-snug">
                <span className="text-black font-extrabold uppercase tracking-wider block sm:inline mr-1">
                  Tratamiento Antibacterial:
                </span>
                Todas nuestras telas cuentan con un tratamiento especial antibacterial para evitar la acumulación de olores y bacterias durante el rendimiento deportivo.
              </p>
            </div>
          </div>

          {/* Botón WhatsApp Más Opciones de Tela */}
          <div className="flex justify-center mt-10">
            <a
              href="https://wa.me/525543945069?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20opciones%20de%20telas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white border border-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-neutral-900 transition-all duration-300 shadow-[4px_4px_0px_#E43537] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#E43537] rounded-none group cursor-pointer text-center"
            >
              ¿Quieres conocer más opciones de tela. ¡Escríbenos!
              <svg
                className="w-4 h-4 ml-3 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.059-3.52c1.642.975 3.25 1.488 4.792 1.489 5.485.002 9.948-4.46 9.951-9.948.001-2.658-1.034-5.158-2.915-7.04C16.064 3.098 13.567 2.06 10.91 2.06c-5.492 0-9.957 4.462-9.96 9.951-.001 1.942.508 3.826 1.472 5.467L1.442 21.6l4.674-1.226zm11.23-7.93c-.3-.149-1.772-.874-2.046-.973-.275-.1-.475-.149-.675.15-.2.299-.774.973-.95 1.171-.175.199-.35.224-.65.074-1.748-.875-2.884-1.597-3.967-3.454-.285-.49.285-.454.814-.52.29-.036.35-.15.424-.3.075-.15.037-.282-.019-.431-.056-.149-.475-1.144-.65-1.565-.17-.41-.358-.354-.49-.36-.124-.006-.267-.008-.41-.008-.142 0-.374.053-.57.267-.197.214-.752.735-.752 1.791s.769 2.079.875 2.22c.107.143 1.513 2.311 3.665 3.242 1.745.757 2.457.818 3.328.69.57-.085 1.772-.725 2.022-1.425.25-.7.25-1.299.175-1.424-.075-.125-.275-.199-.575-.349z" />
              </svg>
            </a>
          </div>
        </div>
      </section>


      {/* Interactive Comparator */}
      <section id="comparador" className="py-24 bg-white text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase">
              COMPARADOR TEXTIL
            </h2>
            <p className="text-[#4B5563] text-base mt-4 leading-relaxed">
              Selecciona dos telas para analizar sus especificaciones de forma paralela.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Fabric Selectors - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              {/* Selector A */}
              <div className="border border-black p-5 bg-white rounded-none">
                <label className="text-xs font-bold text-[#4B5563] uppercase tracking-wider block mb-3">
                  Tela Principal (A)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabricA(f.id)}
                      disabled={f.id === selectedFabricB}
                      className={`p-3 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ease-out rounded-none ${
                        selectedFabricA === f.id
                          ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E43537]'
                          : f.id === selectedFabricB
                          ? 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                          : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                      }`}
                    >
                      {f.name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector B */}
              <div className="border border-black p-5 bg-white rounded-none">
                <label className="text-xs font-bold text-[#4B5563] uppercase tracking-wider block mb-3">
                  Tela Comparativa (B)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabricB(f.id)}
                      disabled={f.id === selectedFabricA}
                      className={`p-3 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ease-out rounded-none ${
                        selectedFabricB === f.id
                          ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E43537]'
                          : f.id === selectedFabricA
                          ? 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                          : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                      }`}
                    >
                      {f.name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Table - 8 cols */}
            <div className="lg:col-span-8 border border-black overflow-hidden rounded-none">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-black text-white font-heading text-sm sm:text-base tracking-wider">
                    <th className="p-4 uppercase w-1/3 rounded-none">BENEFICIO</th>
                    <th className="p-4 uppercase w-1/3 border-l border-neutral-800 rounded-none">{fabricA.name.split(' (')[0]}</th>
                    <th className="p-4 uppercase w-1/3 border-l border-neutral-800 rounded-none">{fabricB.name.split(' (')[0]}</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm font-semibold">

                  <tr className="border-b border-neutral-200">
                    <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider">Composición</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricA.composition}</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricB.composition}</td>
                  </tr>
                  {[0, 1, 2, 3].map((idx) => (
                    <tr key={idx} className="border-b border-neutral-200 last:border-0">
                      <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider text-xs leading-tight">
                        {fabricA.bulletSpecs[idx]?.label ?? '—'}
                      </td>
                      <td className="p-4 text-black border-l border-black leading-relaxed">
                        {fabricA.bulletSpecs[idx]?.text ?? '—'}
                      </td>
                      <td className="p-4 text-black border-l border-black leading-relaxed">
                        {fabricB.bulletSpecs[idx]?.text ?? '—'}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider">Uso Ideal</td>
                    <td className="p-4 text-neutral-600 border-l border-black leading-relaxed">{fabricA.bestFor}</td>
                    <td className="p-4 text-neutral-600 border-l border-black leading-relaxed">{fabricB.bestFor}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>




      {/* CTA bottom */}
      <section className="py-24 bg-white text-black text-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <ScrollReveal direction="up">
            <h3 className="font-heading font-black text-4xl sm:text-5xl uppercase mb-4">
              ¿Listo para evaluar la textura en persona?
            </h3>
            <p className="text-[#4B5563] text-sm max-w-xl mx-auto mb-8 font-medium">
              Enviamos muestrarios físicos con todas nuestras telas activas, tipos de costura y ejemplos de impresión de logotipos directo a tu oficina.
            </p>
            <PremiumButton
              to="/cotizar"
              text="SOLICITAR KIT DE MUESTRAS GRATIS"
              variant="primary"
              className="mx-auto"
            />
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
export default TecnologiaPage;
