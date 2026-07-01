import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
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
    elasticity: 'Media (Trama Elástica)',
    uvProtection: 'UPF 30+',
    bestFor: 'Eventos running ecológicos de alto rendimiento técnico.',
    image: fabricPet,
    zoomImage: zoomPet,
    bulletSpecs: [
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
    elasticity: 'Alta (Filtro UV e hidrófilo)',
    uvProtection: 'UPF 40+',
    bestFor: 'Corredores élite, maratones y entrenamientos intensos.',
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
      <section className="pt-44 pb-20 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] mb-6 text-black select-none">
            Telas para cada tipo de evento
          </h1>
        </div>
      </section>

      {/* Fabric Gallery */}
      <section id="tejidos" className="py-24 bg-white text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16 border-b border-neutral-200 pb-10">
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase text-black">
              CATÁLOGO DE TEJIDOS PREMIUM
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fabrics.map((fabric, i) => {
              const isDetailOpen = !!activeTelas[fabric.id];
              return (
                <ScrollReveal key={fabric.id} delay={i * 0.1} direction="up" className="h-full">
                  <Card3DTilt className="h-full">
                    <div 
                      className="bg-white border border-black flex flex-col h-full rounded-none relative overflow-hidden select-none"
                    >
                      <div className="aspect-square bg-neutral-100 overflow-hidden relative border-b border-neutral-200 rounded-none">
                        <ImageWithFallback
                          src={fabric.image}
                          alt={fabric.name}
                          className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                            isDetailOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                          }`}
                          loading="lazy"
                        />
                        <ImageWithFallback
                          src={fabric.zoomImage}
                          alt={`${fabric.name} textura`}
                          className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                            isDetailOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          }`}
                          loading="lazy"
                        />
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="min-h-[56px] flex items-start mb-4">
                            <h3 className="font-heading font-black text-xl uppercase text-black leading-[1.1]">
                              {fabric.name}
                            </h3>
                          </div>
                          
                          <div className="min-h-[170px] transition-all duration-300">
                            {/* Información técnica breve (Siempre visible al inicio) */}
                            {!isDetailOpen ? (
                              <div className="space-y-3 text-xs font-semibold">
                                <div>
                                  <span className="text-[9px] tracking-widest text-[#E43537] font-bold uppercase block mb-1">
                                    Ideal para:
                                  </span>
                                  <p className="text-neutral-600 font-medium leading-relaxed">
                                    {fabric.bestFor}
                                  </p>
                                </div>
                                <div className="pt-2 border-t border-neutral-100">
                                  <div>
                                    <span className="text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                                      Transpirabilidad
                                    </span>
                                    <span className="text-black font-bold text-[11px] block leading-tight">
                                      {fabric.breathability}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Ficha técnica detallada por clic (Especificaciones / Beneficios) */
                              <div className="space-y-3">
                                {fabric.bulletSpecs.map((spec, idx) => (
                                  <div key={idx} className="flex gap-2 items-start text-xs leading-tight">
                                    <span className="w-1.5 h-1.5 bg-[#E43537] rounded-full shrink-0 mt-1" />
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
                              </div>
                            )}
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
